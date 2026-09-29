(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const PREF_PREFIX = 'tc7_';
  const PRIVACY_KEY = 'tc_privacy_notice_ok';
  const LAST_PLAN_KEY = 'tc7_last_plan';
  const PREF_IDS = [
    'w','h','n','start','bake','saltProfile',
    'flourType','protein','lmMix','flour2Pct','flourType2','protein2','lmMix2',
    'flour3Pct','flourType3','protein3','lmMix3','hydration','customHyd','customSalt'
  ];

  function clampNumber(id, fallback, min, max) {
    const node = $(id);
    const value = Number.parseFloat(node?.value ?? '');
    const safe = Number.isFinite(value) ? value : fallback;
    return Math.min(max, Math.max(min, safe));
  }

  function round(value, digits = 1) {
    const safe = Number.isFinite(value) ? value : 0;
    return safe.toFixed(digits).replace('.', ',');
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function fmtInputDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function fmtShortDate(date) {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function hoursBetween(start, end) {
    return (end - start) / 36e5;
  }

  function create(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value);
    });
    children.forEach((child) => {
      if (typeof child === 'string') node.append(document.createTextNode(child));
      else if (child) node.append(child);
    });
    return node;
  }

  function clear(node) {
    while (node?.firstChild) node.removeChild(node.firstChild);
  }

  function card(title, className = '') {
    const node = create('div', { class: `resultCard ${className}`.trim() });
    node.append(create('h3', { text: title }));
    return node;
  }

  function addParagraph(parent, text, className = '') {
    const p = create('p', { text, class: className });
    parent.append(p);
    return p;
  }

  function getSelectedStyle() {
    const selected = document.querySelector('input[name="style"]:checked');
    return Number.parseFloat(selected?.value ?? '0.54');
  }

  function initDates() {
    if ($('start')?.value && $('bake')?.value) return;
    const now = new Date();
    let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0);
    let bake = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0);

    if (now.getHours() >= 14) {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0);
      bake = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 20, 0);
    }

    $('start').value = fmtInputDate(start);
    $('bake').value = fmtInputDate(bake);
  }

  function openView(id) {
    $$('.view').forEach((view) => view.classList.remove('active'));
    const next = $(id);
    if (next) {
      next.classList.add('active');
      if (id === 'impasto') renderSavedTimeline();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function toggleCustoms() {
    $('customHydWrap')?.classList.toggle('hidden', $('hydration').value !== 'custom');
    $('customSaltWrap')?.classList.toggle('hidden', $('saltProfile').value !== 'custom');
  }

  function toggleCheckMode() {
    const isDough = $('checkMode').value === 'dough';
    $('doughFields').classList.toggle('hidden', !isDough);
    $('resultFields').classList.toggle('hidden', isDough);
    clear($('adviceOutput'));
  }

  function baseHydrationFor(protein, type) {
    let value;
    if (protein < 10.8) value = 64;
    else if (protein < 11.8) value = 66;
    else if (protein < 12.8) value = 68;
    else if (protein < 13.7) value = 70;
    else value = 72;

    if (type === '1') value += 1.5;
    if (type === '2') value += 2.5;
    if (type === 'integrale') value += 4;
    return value;
  }

  function activeFlours() {
    const items = [{
      index: 1,
      pct: 100,
      type: $('flourType').value,
      protein: clampNumber('protein', 12.5, 8, 17),
      lm: $('lmMix').value
    }];

    if (!$('flour2').classList.contains('hidden')) {
      items.push({
        index: 2,
        pct: clampNumber('flour2Pct', 25, 1, 99),
        type: $('flourType2').value,
        protein: clampNumber('protein2', 12.5, 8, 17),
        lm: $('lmMix2').value
      });
    }
    if (!$('flour3').classList.contains('hidden')) {
      items.push({
        index: 3,
        pct: clampNumber('flour3Pct', 15, 1, 98),
        type: $('flourType3').value,
        protein: clampNumber('protein3', 12.5, 8, 17),
        lm: $('lmMix3').value
      });
    }

    const secondary = items.slice(1).reduce((sum, item) => sum + item.pct, 0);
    items[0].pct = Math.max(1, 100 - secondary);
    return items;
  }

  function normalizeFlourPercentages(changedId = '') {
    const flour2Active = !$('flour2').classList.contains('hidden');
    const flour3Active = !$('flour3').classList.contains('hidden');
    if (!flour2Active && !flour3Active) return;

    const p2 = $('flour2Pct');
    const p3 = $('flour3Pct');
    let v2 = flour2Active ? Number.parseFloat(p2.value) : 0;
    let v3 = flour3Active ? Number.parseFloat(p3.value) : 0;
    if (!Number.isFinite(v2)) v2 = 1;
    if (!Number.isFinite(v3)) v3 = 1;

    v2 = Math.min(99, Math.max(1, v2));
    v3 = Math.min(98, Math.max(1, v3));

    if (flour2Active && flour3Active && v2 + v3 > 99) {
      if (changedId === 'flour2Pct') v2 = 99 - v3;
      else v3 = 99 - v2;
    }

    if (flour2Active) p2.value = String(Math.max(1, v2));
    if (flour3Active) p3.value = String(Math.max(1, v3));
  }

  function flourBlendIsValid() {
    const secondary = activeFlours().slice(1).reduce((sum, item) => sum + item.pct, 0);
    return secondary <= 99;
  }

  function updateFlourUI(changedId = '') {
    normalizeFlourPercentages(changedId);
    const flours = activeFlours();
    $('flour1PctLabel').textContent = `${round(flours[0].pct, 0)}%`;

    ['flour2Pct','flour3Pct'].forEach((id) => $(id)?.classList.remove('inputError'));

    const summary = flours.length === 1
      ? `1 farina · tipo ${flours[0].type} · ${round(flours[0].protein, 1)} g proteine`
      : `${flours.length} farine · ${flours.map((item) => round(item.pct, 0) + '%').join(' + ')}`;
    $('flourSummary').textContent = summary;

    const add = $('addFlourBtn');
    add.classList.toggle('hidden', flours.length >= 3);
  }

  function addFlour() {
    if ($('flour2').classList.contains('hidden')) $('flour2').classList.remove('hidden');
    else if ($('flour3').classList.contains('hidden')) $('flour3').classList.remove('hidden');
    updateFlourUI();
  }

  function removeFlour(index) {
    const node = $('flour' + index);
    if (!node) return;

    if (String(index) === '2' && !$('flour3').classList.contains('hidden')) {
      $('flour2Pct').value = $('flour3Pct').value;
      $('flourType2').value = $('flourType3').value;
      $('protein2').value = $('protein3').value;
      $('lmMix2').value = $('lmMix3').value;
      $('flour3').classList.add('hidden');
      $('flour3Pct').value = '15';
    } else {
      node.classList.add('hidden');
      if (String(index) === '2') $('flour2Pct').value = '25';
      if (String(index) === '3') $('flour3Pct').value = '15';
    }
    updateFlourUI();
  }

  function resetAdvanced() {
    $('flourType').value = '0';
    $('protein').value = '12.5';
    $('lmMix').value = 'no';
    $('flour2').classList.add('hidden');
    $('flour3').classList.add('hidden');
    $('flour2Pct').value = '25';
    $('flour3Pct').value = '15';
    $('flourType2').value = '0';
    $('flourType3').value = '0';
    $('protein2').value = '12.5';
    $('protein3').value = '12.5';
    $('lmMix2').value = 'no';
    $('lmMix3').value = 'no';
    $('hydration').value = 'auto';
    $('customHyd').value = '69';
    $('saltProfile').value = '2.3';
    $('customSalt').value = '2.3';
    toggleCustoms();
    updateFlourUI();
  }

  function estimateHydration() {
    const flours = activeFlours();
    let hydration = flours.reduce((sum, item) => {
      return sum + baseHydrationFor(item.protein, item.type) * item.pct / 100;
    }, 0);

    const hours = hoursBetween(new Date($('start').value), new Date($('bake').value));
    const weightedProtein = flours.reduce((sum, item) => sum + item.protein * item.pct / 100, 0);
    if (hours >= 18 && weightedProtein >= 12) hydration += 0.5;

    return Math.max(62, Math.min(76, hydration));
  }

  function hydrationValue() {
    const selected = $('hydration').value;
    if (selected === 'auto') return estimateHydration();
    if (selected === 'custom') return clampNumber('customHyd', 69, 55, 85);
    return Number.parseFloat(selected);
  }

  function saltValue() {
    const selected = $('saltProfile').value;
    if (selected === 'custom') return clampNumber('customSalt', 2.3, 1.5, 3.0);
    return Number.parseFloat(selected);
  }

  function yeastPctByHours(hours) {
    if (hours <= 0) return 0.8;
    if (hours <= 8) return 0.9;
    if (hours <= 12) return 0.7;
    if (hours <= 18) return 0.4;
    if (hours <= 30) return 0.22;
    if (hours <= 48) return 0.13;
    return 0.08;
  }

  function methodLabel(hours) {
    if (hours <= 0 || !Number.isFinite(hours)) return 'date da correggere';
    if (hours <= 12) return 'in giornata';
    if (hours <= 18) return 'intermedio';
    if (hours <= 30) return 'giorno dopo / frigo';
    if (hours <= 48) return 'lunga maturazione';
    return 'molto lunga';
  }

  function resultName(load) {
    if (load <= 0.49) return 'Extra croccante';
    if (load <= 0.51) return 'Romana classica';
    if (load <= 0.55) return 'Bassa-media equilibrata';
    if (load <= 0.59) return 'Romana contemporanea';
    return 'Più soffice';
  }

  function buildTimeline(start, bake, hours) {
    const timeline = [
      { label: 'Impasto grezzo', date: start.toISOString() },
      { label: 'Riposo 20 min coperto', date: addMinutes(start, 20).toISOString() },
      { label: 'Sale + olio', date: addMinutes(start, 40).toISOString() },
      { label: '1ª piega leggera', date: addMinutes(start, 60).toISOString() },
      { label: '2ª piega leggera', date: addMinutes(start, 85).toISOString() }
    ];

    if (hours <= 12) {
      timeline.push(
        { label: 'Stesura', date: addMinutes(bake, -75).toISOString() },
        { label: 'Riposo in teglia coperto', date: addMinutes(bake, -60).toISOString() },
        { label: 'Cottura', date: bake.toISOString() }
      );
    } else {
      timeline.push(
        { label: 'Frigo coperto dopo le pieghe', date: addMinutes(start, 115).toISOString() },
        { label: 'Controllo volume', date: addMinutes(bake, -120).toISOString() },
        { label: 'Fuori frigo o stesura secondo stato impasto', date: addMinutes(bake, -90).toISOString() },
        { label: 'Cottura', date: bake.toISOString() }
      );
    }

    return timeline;
  }

  function nextTimelineStep(timeline) {
    const now = Date.now();
    return timeline.find((item) => new Date(item.date).getTime() > now) ?? timeline[timeline.length - 1];
  }

  function emptyResult() {
    clear($('result'));
  }

  function saveLastPlan(plan) {
    localStorage.setItem(LAST_PLAN_KEY, JSON.stringify(plan));
  }

  function getLastPlan() {
    try {
      const raw = localStorage.getItem(LAST_PLAN_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function renderPremiumTimeline(timeline) {
    const now = Date.now();
    const nextIndex = timeline.findIndex((item) => new Date(item.date).getTime() > now);
    const activeIndex = nextIndex >= 0 ? nextIndex : timeline.length - 1;
    const list = create('ol', { class: 'premiumTimeline' });

    timeline.forEach((item, index) => {
      const state = index < activeIndex ? 'done' : index === activeIndex ? 'current' : 'future';
      const row = create('li', { class: `timelineStep ${state}` });
      const marker = create('span', { class: 'timelineMarker', 'aria-hidden': 'true', text: index < activeIndex ? '✓' : '' });
      const copy = create('div', { class: 'timelineCopy' });
      copy.append(
        create('strong', { text: item.label }),
        create('span', { text: fmtShortDate(new Date(item.date)) })
      );
      row.append(marker, copy);
      list.append(row);
    });
    return list;
  }

  function renderRecipeResult(data) {
    const target = $('result');
    clear(target);

    if (data.hours <= 0 || !Number.isFinite(data.hours)) {
      const error = card('Date da correggere', 'bad');
      addParagraph(error, 'La cottura deve essere dopo l’inizio impasto.');
      target.append(error);
      return;
    }

    const plan = {
      createdAt: new Date().toISOString(),
      pizza: resultName(data.load),
      method: methodLabel(data.hours),
      doughPer: data.doughPer,
      total: data.total,
      bake: data.bake.toISOString(),
      timeline: data.timeline,
      ingredients: {
        flour: data.flour, water: data.water, saltG: data.saltG, oilG: data.oilG,
        yeastG: data.yeastG, honeyG: data.honeyG, hydration: data.hydration,
        salt: data.salt, flourBlend: data.flourBlend
      }
    };
    saveLastPlan(plan);

    const next = nextTimelineStep(data.timeline);
    const shell = create('section', { class: 'doughResult', 'aria-label': 'Il tuo impasto' });

    const head = create('div', { class: 'doughResultHead' });
    const title = create('div');
    title.append(
      create('span', { class: 'resultEyebrow', text: 'Il tuo impasto' }),
      create('h3', { text: resultName(data.load) }),
      create('p', { class: 'resultMeta', text: `${methodLabel(data.hours)} · ${round(data.hours, 1)} h · ${round(data.doughPer, 0)} g per teglia` })
    );
    const hydrationBadge = create('div', { class: 'hydrationBadge' });
    hydrationBadge.append(
      create('strong', { text: `${round(data.hydration, 0)}%` }),
      create('span', { text: 'idratazione' })
    );
    head.append(title, hydrationBadge);
    shell.append(head);

    const now = create('div', { class: 'nextAction' });
    now.append(
      create('span', { class: 'nextLabel', text: 'Adesso' }),
      create('strong', { text: next.label }),
      create('time', { text: fmtShortDate(new Date(next.date)), datetime: next.date })
    );
    shell.append(now);

    const doses = create('div', { class: 'premiumSection' });
    doses.append(create('div', { class: 'sectionBar' }, [
      create('h4', { text: 'Dosi' }),
      create('span', { text: `${round(data.total, 0)} g impasto totale` })
    ]));
    const doseGrid = create('div', { class: 'doseGrid' });
    const rows = [];
    if (data.flourBlend.length === 1) rows.push(['Farina', `${round(data.flour)} g`]);
    else data.flourBlend.forEach((item) => rows.push([`Farina ${item.index} · ${round(item.pct, 0)}%`, `${round(item.grams)} g`]));
    rows.push(
      ['Acqua', `${round(data.water)} g`],
      ['Sale', `${round(data.saltG)} g`],
      ['Olio', `${round(data.oilG)} g`],
      ['Lievito', `${round(data.yeastG, 1)} g`]
    );
    if (data.honeyG > 0) rows.push(['Miele', `${round(data.honeyG, 1)} g`]);
    rows.forEach(([label,value]) => {
      const item=create('div',{class:'doseItem'});
      item.append(create('span',{text:label}),create('strong',{text:value}));
      doseGrid.append(item);
    });
    doses.append(doseGrid);
    shell.append(doses);

    const firstSteps = create('div', { class: 'premiumSection firstSteps' });
    firstSteps.append(create('h4', { text: 'Parti così' }));
    const steps=create('ol',{class:'compactSteps'});
    [
      'Mescola farina, lievito e 85–90% dell’acqua.',
      'Copri e lascia riposare 20 minuti.',
      'Aggiungi sale sciolto nell’acqua rimasta, poi olio.',
      'Lavora poco: le pieghe strutturali vengono dopo.'
    ].forEach((text,index)=>{
      const li=create('li');
      li.append(create('span',{text:String(index+1)}),create('p',{text}));
      steps.append(li);
    });
    firstSteps.append(steps);
    shell.append(firstSteps);

    const timeline = create('details', { class: 'timelineDisclosure' });
    timeline.append(create('summary', { text: 'Timeline completa' }), renderPremiumTimeline(data.timeline));
    shell.append(timeline);

    const manage = create('button', { class: 'manageDough', type: 'button', text: 'Segui questo impasto' });
    manage.addEventListener('click', () => openView('impasto'));
    shell.append(manage);

    target.append(shell);
    renderSavedTimeline();
    renderHomeSavedStep();
  }

  function renderTimelineList(timeline) {
    const timelineList = create('ul', { class: 'timelineList' });
    timeline.forEach((item) => {
      timelineList.append(create('li', {}, [
        create('span', { text: item.label }),
        create('b', { text: fmtShortDate(new Date(item.date)) })
      ]));
    });
    return timelineList;
  }

  function renderSavedTimeline() {
    const target = $('savedTimeline');
    if (!target) return;
    clear(target);

    const plan = getLastPlan();
    if (!plan) {
      const empty = card('Dati salvati');
      addParagraph(empty, 'Non c’è ancora un impasto salvato. Calcola un nuovo impasto per ritrovare qui timeline e dosi.');
      target.append(empty);
      return;
    }

    const next = nextTimelineStep(plan.timeline);
    const main = card('Prossimo step', 'primary compactResult');
    main.append(create('span', { class: 'bigStep', text: fmtShortDate(new Date(next.date)) }));
    addParagraph(main, next.label);
    addParagraph(main, `${plan.pizza} · cottura ${fmtShortDate(new Date(plan.bake))}`, 'mutedLine');
    target.append(main);

    const details = create('details', { class: 'savedDetails' });
    details.append(create('summary', { text: 'Timeline e dosi salvate' }));

    const timelineSection = create('div', { class: 'savedSection' });
    timelineSection.append(create('h3', { text: 'Timeline completa' }), renderTimelineList(plan.timeline));
    details.append(timelineSection);

    const ingredientsSection = create('div', { class: 'savedSection' });
    ingredientsSection.append(create('h3', { text: 'Dosi' }));
    const list = create('ul', { class: 'recipeList' });
    const savedRows = [];
    if (Array.isArray(plan.ingredients.flourBlend) && plan.ingredients.flourBlend.length > 1) {
      plan.ingredients.flourBlend.forEach((item) => savedRows.push([
        `Farina ${item.index} · ${round(item.pct, 0)}%`,
        `${round(item.grams)} g`
      ]));
    } else {
      savedRows.push(['Farina', `${round(plan.ingredients.flour)} g`]);
    }
    savedRows.push(
      ['Acqua', `${round(plan.ingredients.water)} g`],
      ['Sale', `${round(plan.ingredients.saltG)} g`],
      ['Olio', `${round(plan.ingredients.oilG)} g`],
      ['Lievito fresco', `${round(plan.ingredients.yeastG, 1)} g`]
    );
    savedRows.forEach(([label, value]) => list.append(create('li', {}, [create('span', { text: label }), create('b', { text: value })])));
    ingredientsSection.append(list);
    details.append(ingredientsSection);
    target.append(details);
  }

  function renderHomeSavedStep() {
    const target = $('homeSavedStep');
    if (!target) return;
    clear(target);

    const plan = getLastPlan();
    if (!plan) {
      target.classList.add('hidden');
      return;
    }

    const next = nextTimelineStep(plan.timeline);
    target.classList.remove('hidden');
    target.append(
      create('b', { text: `Prossimo step · ${fmtShortDate(new Date(next.date))}` }),
      create('span', { text: next.label })
    );
    const button = create('button', { type: 'button', class: 'secondary', text: 'Apri timeline' });
    button.addEventListener('click', () => openView('impasto'));
    target.append(button);
  }

  function calculate() {
    initDates();

    const width = clampNumber('w', 37, 10, 80);
    const height = clampNumber('h', 26, 10, 80);
    const pans = Math.round(clampNumber('n', 1, 1, 10));
    const load = getSelectedStyle();
    const start = new Date($('start').value);
    const bake = new Date($('bake').value);
    const hours = hoursBetween(start, bake);
    if (!flourBlendIsValid()) {
      const target = $('result');
      clear(target);
      const error = card('Percentuali da correggere', 'bad');
      addParagraph(error, 'Farina 2 e Farina 3 insieme devono lasciare almeno l’1% alla Farina 1.');
      target.append(error);
      return;
    }
    const hydration = hydrationValue();
    const salt = saltValue();
    const oil = 2.5;
    const yeast = yeastPctByHours(hours);
    const honey = hours > 0 && hours <= 12 ? 0.5 : 0;
    const area = width * height;
    const doughPer = area * load;
    const total = doughPer * pans;
    const flour = total / (1 + hydration / 100 + salt / 100 + oil / 100 + yeast / 100 + honey / 100);
    const water = flour * hydration / 100;
    const saltG = flour * salt / 100;
    const oilG = flour * oil / 100;
    const yeastG = flour * yeast / 100;
    const honeyG = flour * honey / 100;
    const timeline = buildTimeline(start, bake, hours);
    const flourBlend = activeFlours().map((item) => ({
      ...item,
      grams: flour * item.pct / 100
    }));

    renderRecipeResult({
      width, height, pans, load, start, bake, hours, hydration, salt, oil, yeast, honey,
      area, doughPer, total, flour, water, saltG, oilG, yeastG, honeyG, timeline, flourBlend
    });
  }

  function doughAdviceText(place, state, time) {
    const context = place === 'frigo' ? 'dal frigo' : place === 'teglia' ? 'già in teglia' : 'a temperatura ambiente';

    const rules = {
      indietro: ['Portalo a temperatura ambiente e aspetta finché diventa più gonfio e rilassato.', 'Non forzare stesura o pieghe aggressive se è duro e poco sviluppato.', 'Ricontrolla tra 45–60 minuti.'],
      giusto: ['Non toccarlo troppo. Stendi quando è rilassato, poi riposo in teglia coperto.', 'Non aggiungere pieghe “per sicurezza”.', time === 'less1' ? 'Stendi ora e fai un riposo breve.' : 'Prepara banco, semola e teglia.'],
      triplicato: ['Niente pieghe. Stendi delicato e accorcia il riposo in teglia.', 'Non ristrutturare: se è bello e gonfio, va accompagnato.', time === 'over6' ? 'Se manca molto, rimettilo al fresco dopo una gestione minima.' : 'Fuori frigo 20–30 minuti, poi stesura delicata.'],
      collasso: [time === 'over6' || time === '3to6' ? 'Fai una sola piega di salvataggio molto morbida e rimettilo in frigo.' : 'Stendi quasi subito, riposo breve in teglia e cuoci.', 'Non fare tre pieghe forti: peggiori strappi e perdita di gas.', time === 'less1' ? 'Teglia e forno subito.' : 'Controlla dopo 30 minuti.'],
      rigido: ['Copri e aspetta. Se si ritira, è tensione: serve riposo, non forza.', 'Non tirarlo fino a strapparlo e non aggiungere farina sul banco a caso.', 'Riprova tra 10–20 minuti.'],
      molle: [time === 'less1' ? 'Stendi con mani unte e movimenti minimi.' : 'Una piega morbida può ridare struttura, poi riposo coperto.', 'Non sommergerlo di farina: rischi una crosta secca e irregolare.', 'Valuta consistenza dopo il riposo.'],
      strappa: ['Stop. Copri e lascia rilassare. Poi riprendi con tocchi leggeri.', 'Non insistere con pieghe aggressive: l’impasto è in tensione o indebolito.', 'Aspetta 15–20 minuti.']
    };

    const [doNow, avoid, next] = rules[state] ?? rules.giusto;
    return { context, doNow, avoid, next };
  }

  const problemRules = {
    alta: ['Troppo impasto per la teglia, riposo in teglia lungo o impasto già molto avanti.', 'Cuoci bene sotto e taglia porzioni più piccole.', 'Scendi a 0,48–0,54 g/cm² o accorcia il riposo in teglia.'],
    bassaDura: ['Troppo poco impasto, poca fermentazione, stesura aggressiva o cottura troppo lunga.', 'Evita altra cottura; usa condimento umido o olio a crudo.', 'Aumenta leggermente carico impasto e non schiacciare tutta l’aria.'],
    fondoPallido: ['Forno non abbastanza preriscaldato, ripiano troppo alto, teglia poco conduttiva o troppa umidità.', 'Sposta in basso e prolunga la prima fase.', 'Preriscalda 40–45 minuti e limita acqua dei condimenti.'],
    fondoBruciato: ['Teglia molto conduttiva, ripiano troppo basso troppo a lungo o forno aggressivo sotto.', 'Sposta medio-alto e completa sopra.', 'Riduci minuti in basso o usa teglia meno aggressiva.'],
    sopraBagnata: ['Pomodoro/mozzarella troppo acquosi, verdure non asciutte o mozzarella messa troppo presto.', 'Rifinisci brevemente ventilato/grill controllando a vista.', 'Scola mozzarella, usa pomodoro denso e aggiungi latticini alla fine.'],
    mozzarellaAcqua: ['Mozzarella non scolata o messa troppo presto.', 'Rifinitura breve medio-alta; non prolungare troppo o secchi la base.', 'Taglia e scola 3–6 ore prima, usane meno.'],
    patateCrude: ['Taglio troppo spesso o patate non asciugate/pretrattate.', 'Prolunga medio-alto se la base lo permette.', 'Taglio 1–1,5 mm, asciuga bene; se spesse, sbollenta 2 minuti.'],
    noAlveoli: ['Impasto schiacciato in stesura, fermentazione scarsa, farina debole o troppa manipolazione.', 'Non puoi creare alveoli in cottura, ma puoi salvare croccantezza.', 'Meno pressione, più riposo, pieghe leggere e farina adatta.'],
    collassato: ['Lievitazione troppo avanti o gestione troppo aggressiva.', 'Se manca poco, stendi delicato e cuoci. Se manca molto, piega morbida e frigo.', 'Riduci lievito o tempo a temperatura ambiente.'],
    siRitira: ['Impasto in tensione, freddo o lavorato troppo.', 'Copri e aspetta 10–20 minuti.', 'Non forzare: stendi in due tempi.'],
    siStrappa: ['Maglia indebolita, olio incorporato male, troppa forza o idratazione non gestita.', 'Stop, copri, riposo. Riprendi con mani unte e tocchi minimi.', 'Olio dopo sale ma prima delle pieghe strutturali, poco lavoro e riposo.']
  };

  function adviceRow(label, text, tone = '') {
    const row = create('div', { class: `adviceRow ${tone}`.trim() });
    row.append(create('strong', { text: label }), create('p', { text }));
    return row;
  }

  function renderAdvice() {
    const target = $('adviceOutput');
    clear(target);
    const panel = card('Indicazioni', 'compactResult');

    if ($('checkMode').value === 'dough') {
      const advice = doughAdviceText($('doughPlace').value, $('doughState').value, $('doughTime').value);
      panel.append(
        adviceRow('Adesso', `${advice.doNow} Situazione: impasto ${advice.context}.`, 'primaryRow'),
        adviceRow('Evita', advice.avoid, 'badRow'),
        adviceRow('Poi', advice.next, 'okRow')
      );
    } else {
      const [cause, now, next] = problemRules[$('problemType').value] ?? problemRules.alta;
      panel.append(
        adviceRow('Possibile causa', cause, 'warnRow'),
        adviceRow('Adesso', now, 'primaryRow'),
        adviceRow('Prossima volta', next, 'okRow')
      );
    }
    target.append(panel);
  }

  function guideStep(number, title, texts) {
    const step = create('div', { class: 'guideStep' });
    const head = create('div', { class: 'guideStepHead' });
    head.append(create('span', { class: 'stepNumber', text: String(number) }), create('strong', { text: title }));
    step.append(head);
    texts.forEach((text) => step.append(create('p', { text })));
    return step;
  }

  function renderCookGuide() {
    const pizza = $('pizzaType').value;
    const pan = $('panType').value;
    const target = $('cook');
    clear(target);

    const panel = card('Guida operativa', 'cookGuide');
    panel.append(guideStep(1, 'Stesura', [
      'Banco con poca semola, lato liscio sopra. Polpastrelli dal centro verso l’esterno senza schiacciare tutto.',
      'Se si ritira, pausa 5–10 minuti. Completa in teglia con mani leggere.'
    ]));

    const panText = pan === 'leccarda'
      ? 'Con la leccarda spingi bene la prima fase in basso: è meno conduttiva di ferro e alluminio.'
      : 'Con una teglia più conduttiva controlla prima il fondo: può colorire più velocemente.';
    panel.append(guideStep(2, 'Forno e teglia', [`${panText} Preriscalda 40–45 minuti a 250 °C.`]));

    let toppingTexts;
    if (pizza === 'margherita') {
      toppingTexts = [
        'Pomodoro denso 110–130 g per una 37×26. Prima fase in basso con pomodoro; mozzarella scolata solo negli ultimi 2–4 minuti.',
        'Ventilato o grill solo come rifinitura breve se resta umida sopra.'
      ];
    } else if (pizza === 'rossa') {
      toppingTexts = ['Pomodoro denso, olio moderato, ripiano basso nella prima fase per mantenere il fondo asciutto e croccante.'];
    } else {
      toppingTexts = [
        'Patate sottilissime, sciacquate e asciugate bene. Condiscile prima. Lardo fuori forno o negli ultimi secondi.',
        'Se le patate sono più spesse, pretrattale o tagliale più sottili.'
      ];
    }
    panel.append(guideStep(3, 'Condimento e cottura', toppingTexts));
    panel.append(guideStep(4, 'Uscita forno', [
      'Appena cotta, togli la pizza dalla teglia e mettila su griglia: il vapore nella teglia ammorbidisce il fondo.'
    ]));
    target.append(panel);
  }

  function savePrefs() {
    PREF_IDS.forEach((id) => {
      const node = $(id);
      if (node) localStorage.setItem(PREF_PREFIX + id, node.value);
    });
    localStorage.setItem(PREF_PREFIX + 'flourCount', String(activeFlours().length));
    const style = document.querySelector('input[name="style"]:checked')?.value;
    if (style) localStorage.setItem(PREF_PREFIX + 'style', style);
    alert('Preferenze salvate in questo browser.');
  }

  function loadPrefs() {
    initDates();
    PREF_IDS.forEach((id) => {
      const saved = localStorage.getItem(PREF_PREFIX + id);
      const node = $(id);
      if (saved !== null && node) node.value = saved;
    });
    const flourCount = Number.parseInt(localStorage.getItem(PREF_PREFIX + 'flourCount') ?? '1', 10);
    $('flour2').classList.toggle('hidden', flourCount < 2);
    $('flour3').classList.toggle('hidden', flourCount < 3);
    updateFlourUI();
    const savedStyle = localStorage.getItem(PREF_PREFIX + 'style');
    if (savedStyle) {
      const styleNode = $$('input[name="style"]').find((node) => node.value === savedStyle);
      if (styleNode) styleNode.checked = true;
    }
    toggleCustoms();
  }

  function resetApp() {
    [...PREF_IDS, 'style', 'flourCount'].forEach((id) => localStorage.removeItem(PREF_PREFIX + id));
    localStorage.removeItem(LAST_PLAN_KEY);
    clear($('result'));
    emptyResult();
    renderSavedTimeline();
    renderHomeSavedStep();
  }

  function showPrivacyNotice() {
    const overlay = $('privacyOverlay');
    if (overlay && localStorage.getItem(PRIVACY_KEY) !== 'yes') {
      overlay.classList.add('show');
      overlay.focus();
    }
  }

  function acceptPrivacyNotice() {
    localStorage.setItem(PRIVACY_KEY, 'yes');
    $('privacyOverlay')?.classList.remove('show');
  }

  function bindEvents() {
    $$('[data-open]').forEach((button) => {
      button.addEventListener('click', () => openView(button.dataset.open));
    });

    $('acceptPrivacy')?.addEventListener('click', acceptPrivacyNotice);
    $('calculateBtn')?.addEventListener('click', calculate);
    $('saveBtn')?.addEventListener('click', savePrefs);
    $('homeResetBtn')?.addEventListener('click', resetApp);
    $('homePrintBtn')?.addEventListener('click', () => window.print());
    $('adviceBtn')?.addEventListener('click', renderAdvice);
    $('cookBtn')?.addEventListener('click', renderCookGuide);
    $('checkMode')?.addEventListener('change', toggleCheckMode);

    $('saltProfile')?.addEventListener('change', toggleCustoms);
    $('addFlourBtn')?.addEventListener('click', addFlour);
    $('flourBlend')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-remove-flour]');
      if (button) removeFlour(button.dataset.removeFlour);
    });
    $('resetAdvancedBtn')?.addEventListener('click', resetAdvanced);
    ['flourType','protein','lmMix','flour2Pct','flourType2','protein2','lmMix2','flour3Pct','flourType3','protein3','lmMix3']
      .forEach((id) => {
        const node = $(id);
        node?.addEventListener('input', () => updateFlourUI(id));
        node?.addEventListener('change', () => updateFlourUI(id));
      });
    $('hydration')?.addEventListener('change', toggleCustoms);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $('privacyOverlay')?.classList.contains('show')) {
        acceptPrivacyNotice();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadPrefs();
    bindEvents();
    emptyResult();
    renderSavedTimeline();
    renderHomeSavedStep();
    clear($('cook'));
    toggleCheckMode();
    showPrivacyNotice();
  });
})();
