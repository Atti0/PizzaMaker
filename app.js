(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const PREF_PREFIX = 'tc7_';
  const PRIVACY_KEY = 'tc_privacy_notice_ok';
  const LAST_PLAN_KEY = 'tc7_last_plan';
  const PREF_IDS = [
    'w','h','n','start','bake','saltProfile',
    'flourCatalog1','flourType','protein','flourW','lmMix','flour2Pct','flourCatalog2','flourType2','protein2','flourW2','lmMix2',
    'flour3Pct','flourCatalog3','flourType3','protein3','flourW3','lmMix3','hydration','customHyd','customSalt'
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
    // Il calcolatore è una simulazione: rientrando si parte senza un risultato precedente.
    if (id === 'calc') clear($('result'));
    document.querySelectorAll('.view').forEach((view)=>view.classList.remove('active'));
    const next=$(id);
    $('appHero')?.classList.toggle('hidden',id!=='home');
    if(next){
      next.classList.add('active');
      if(id==='impasto'){
        renderSavedTimeline();
        $('checkTool')?.classList.add('hidden');
      }
      if(id==='home') renderHomeSavedStep();
      window.scrollTo({top:0,left:0,behavior:'smooth'});
    document.documentElement.scrollLeft=0;
    document.body.scrollLeft=0;
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

  function openCheckTool(mode = 'dough') {
    openView('impasto');
    $('checkMode').value = mode;
    toggleCheckMode();
    $('checkTool')?.classList.remove('hidden');
    $('doughCheck')?.setAttribute('open','');
    requestAnimationFrame(() => $('checkTool')?.scrollIntoView({behavior:'smooth',block:'start'}));
  }

  function closeCheckTool() {
    $('checkTool')?.classList.add('hidden');
    clear($('adviceOutput'));
    $('savedTimeline')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  const FLOUR_CATALOG = {
    'Caputo Aria': { type:'0', protein:13, w:310, lm:'yes' },
    'Caputo Nuvola': { type:'0', protein:12.5, w:280, lm:'no' },
    'Caputo Nuvola Super': { type:'0', protein:13.5, w:330, lm:'no' },
    'Caputo A Metro': { type:'00', protein:13.5, w:320, lm:'no' },
    'Caputo Saccorosso': { type:'00', protein:13, w:310, lm:'no' },
    'Caputo Pizzeria': { type:'00', protein:12.5, w:270, lm:'no' },
    'Dallagiovanna Far Pizza E Rosa': { type:'00', protein:null, w:250, lm:'no' },
    'Dallagiovanna Far Pizza N Blu': { type:'00', protein:null, w:290, lm:'no' },
    'Dallagiovanna Far Pizza R Verde': { type:'00', protein:null, w:340, lm:'no' },
    'Dallagiovanna Far Pizza S Rossa': { type:'00', protein:null, w:390, lm:'no' },
    'Dallagiovanna Far Pizza LaNapoletana': { type:'00', protein:null, w:310, lm:'no' },
    'Dallagiovanna Far Pizza LaNapoletana 2.0': { type:'0', protein:null, w:310, lm:'no' },
    'Le 5 Stagioni Pizza Teglia': { type:'0', protein:null, w:null, lm:'no' },
    'Le 5 Stagioni Pizza Teglia Integrale': { type:'integrale', protein:null, w:null, lm:'no' },
    'Le 5 Stagioni Ciabatta Romana': { type:'0', protein:null, w:null, lm:'yes' },
    'Le 5 Stagioni La Superiore': { type:'00', protein:null, w:null, lm:'no' },
    'Le 5 Stagioni La Oro': { type:'00', protein:null, w:null, lm:'no' },
    'Le 5 Stagioni La Rustica Tipo 1': { type:'1', protein:14, w:null, lm:'no' },
    'Petra 0101 HP': { type:'1', protein:14, w:405, lm:'no' },
    'Petra 0102 HP': { type:'1', protein:13.5, w:330, lm:'no' },
    'Petra 3 HP': { type:'1', protein:13.5, w:null, lm:'no' },
    'Petra 3': { type:'1', protein:13.5, w:null, lm:'no' },
    'Petra 5037': { type:'0', protein:13.5, w:320, lm:'no' },
    'Petra 5063': { type:'0', protein:12.7, w:270, lm:'no' },
    'Polselli Super': { type:'00', protein:null, w:360, lm:'no' },
    'Polselli Vivace': { type:'00', protein:null, w:290, lm:'no' },
    'Polselli Italiana': { type:'1', protein:null, w:300, lm:'no' },
    'Polselli Classica': { type:'00', protein:null, w:270, lm:'no' },
    'Molini Pizzuti Teglia': { type:'0', protein:null, w:null, lm:'yes' },
    'Molini Pizzuti Pala': { type:'0', protein:null, w:null, lm:'yes' },
    'Molini Pizzuti Vesuvio': { type:'0', protein:null, w:350, lm:'no' },
    'Molini Pizzuti Costa d\'Amalfi': { type:'0', protein:null, w:300, lm:'no' },
    'Molini Pizzuti Tipo 1 ORO': { type:'1', protein:null, w:300, lm:'no' },
    'Molino Magri IN3': { type:'2', protein:null, w:345, lm:'no' },
    'Molino Magri Doppiaesse': { type:'0', protein:null, w:300, lm:'no' },
    'Molino Magri Risocrockizza': { type:'1', protein:null, w:null, lm:'yes' },
    'Molino Magri Farrocrockizza': { type:'1', protein:null, w:null, lm:'yes' },
    'Molino Magri Integralcrockizza': { type:'integrale', protein:null, w:null, lm:'yes' },
    'Molino Vigevano Pizza in Teglia': { type:'0', protein:14.5, w:350, lm:'no' },
    'Molino Vigevano Tramonti': { type:'0', protein:14.5, w:345, lm:'no' },
    'Molino Vigevano Costiera': { type:'0', protein:13.6, w:310, lm:'no' },
    'Le Farine Magiche Pizza Piuma': { type:'0', protein:14.5, w:null, lm:'no' },
    'Le Farine Magiche Farina per Pizza': { type:'00', protein:12.4, w:null, lm:'no' },
    'Le Farine Magiche Manitoba per salati': { type:'0', protein:null, w:null, lm:'no' },
    'Molino Spadoni PZ1': { type:'00', protein:null, w:null, lm:'no' },
    'Molino Spadoni PZ2': { type:'00', protein:null, w:null, lm:'no' },
    'Molino Spadoni PZ4': { type:'00', protein:null, w:null, lm:'no' },
    'Molino Spadoni Gran Mugnaio per pizza': { type:'00', protein:null, w:null, lm:'no' },
    'Molino Pasini Pizza Alta e Soffice': { type:'0', protein:null, w:null, lm:'no' },
    'Molino Casillo Zero L': { type:'0', protein:12.5, w:340, lm:'no' }
  };

  function optionalNumber(id, min, max) {
    const value = Number.parseFloat($(id)?.value ?? '');
    return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : null;
  }

  function applyCatalogFlour(index) {
    const suffix = index === 1 ? '' : String(index);
    const name = $('flourCatalog' + index)?.value.trim();
    const known = FLOUR_CATALOG[name];
    if (!known) return;
    if (known.type) $('flourType' + suffix).value = known.type;
    $('protein' + suffix).value = known.protein === null ? '' : String(known.protein);
    $('flourW' + suffix).value = known.w === null ? '' : String(known.w);
    if (known.lm) $('lmMix' + suffix).value = known.lm;
    updateFlourUI('', false);
  }

  function baseHydrationFor(protein, type, w = null) {
    let value;
    if (protein < 10.8) value = 64;
    else if (protein < 11.8) value = 66;
    else if (protein < 12.8) value = 68;
    else if (protein < 13.7) value = 70;
    else value = 72;

    if (type === '1') value += 1.5;
    if (type === '2') value += 2.5;
    if (type === 'integrale') value += 4;
    if (type === 'semola') value += 1.5;

    // W affina la stima senza fingere una conversione diretta W → acqua.
    if (Number.isFinite(w)) {
      if (w < 220) value -= 1.5;
      else if (w >= 320 && w < 370) value += 1;
      else if (w >= 370) value += 2;
    }
    return value;
  }

  function activeFlours() {
    const items = [{
      index: 1,
      pct: 100,
      type: $('flourType').value,
      protein: clampNumber('protein', 12.5, 8, 17),
      w: optionalNumber('flourW', 80, 500),
      lm: $('lmMix').value
    }];

    if (!$('flour2').classList.contains('hidden')) {
      items.push({
        index: 2,
        pct: clampNumber('flour2Pct', 25, 1, 99),
        type: $('flourType2').value,
        protein: clampNumber('protein2', 12.5, 8, 17),
        w: optionalNumber('flourW2', 80, 500),
        lm: $('lmMix2').value
      });
    }
    if (!$('flour3').classList.contains('hidden')) {
      items.push({
        index: 3,
        pct: clampNumber('flour3Pct', 15, 1, 98),
        type: $('flourType3').value,
        protein: clampNumber('protein3', 12.5, 8, 17),
        w: optionalNumber('flourW3', 80, 500),
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

  function updateFlourUI(changedId = '', normalize = true) {
    if (normalize) normalizeFlourPercentages(changedId);
    const flours = activeFlours();
    $('flour1PctLabel').textContent = `${round(flours[0].pct, 0)}%`;

    ['flour2Pct','flour3Pct'].forEach((id) => $(id)?.classList.remove('inputError'));

    const add = $('addFlourBtn');
    add.classList.toggle('hidden', flours.length >= 3);
    updateHydrationRecommendation();
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
      $('flourCatalog2').value = $('flourCatalog3').value;
      $('protein2').value = $('protein3').value;
      $('flourW2').value = $('flourW3').value;
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
    $('flourCatalog1').value = '';
    $('flourType').value = '0';
    $('protein').value = '12.5';
    $('flourW').value = '';
    $('lmMix').value = 'no';
    $('flour2').classList.add('hidden');
    $('flour3').classList.add('hidden');
    $('flour2Pct').value = '25';
    $('flour3Pct').value = '15';
    $('flourCatalog2').value = '';
    $('flourCatalog3').value = '';
    $('flourType2').value = '0';
    $('flourType3').value = '0';
    $('protein2').value = '12.5';
    $('protein3').value = '12.5';
    $('flourW2').value = '';
    $('flourW3').value = '';
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
      return sum + baseHydrationFor(item.protein, item.type, item.w) * item.pct / 100;
    }, 0);

    const hours = hoursBetween(new Date($('start').value), new Date($('bake').value));
    const weightedProtein = flours.reduce((sum, item) => sum + item.protein * item.pct / 100, 0);
    if (hours >= 18 && weightedProtein >= 12) hydration += 0.5;

    return Math.max(62, Math.min(76, hydration));
  }

  function updateHydrationRecommendation() {
    const value=round(estimateHydration(),1);
    const option=$('hydration')?.querySelector('option[value="auto"]');
    if(option) option.textContent=`Automatica consigliata · ${String(value).replace('.',',')}%`;
    const hint=$('autoHydHint');
    if(hint) hint.textContent=`Consigliata per queste farine: ${String(value).replace('.',',')}%`;
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
      { label: '1ª piega leggera', date: addMinutes(start, 60).toISOString(), action: 'fold' },
      { label: '2ª piega leggera', date: addMinutes(start, 85).toISOString(), action: 'fold' }
    ];

    if (hours <= 12) {
      timeline.push(
        { label: 'Stesura', date: addMinutes(bake, -75).toISOString(), action: 'stretch' },
        { label: 'Riposo in teglia coperto', date: addMinutes(bake, -60).toISOString() },
        { label: 'Cottura', date: bake.toISOString(), action: 'cook' }
      );
    } else {
      timeline.push(
        { label: 'Frigo coperto dopo le pieghe', date: addMinutes(start, 115).toISOString() },
        { label: 'Controlla l’impasto', date: addMinutes(bake, -120).toISOString(), action: 'check' },
        { label: 'Stesura', date: addMinutes(bake, -90).toISOString(), action: 'stretch' },
        { label: 'Riposo in teglia coperto', date: addMinutes(bake, -60).toISOString() },
        { label: 'Cottura', date: bake.toISOString(), action: 'cook' }
      );
    }

    return timeline;
  }

  function timelineStatus(timeline) {
    const now=Date.now();
    const items=(Array.isArray(timeline)?timeline:[]).map(item=>({...item,time:new Date(item.date).getTime()})).filter(item=>Number.isFinite(item.time));
    if(!items.length) return { phase:'empty', current:null, next:null };
    if(now < items[0].time) return { phase:'scheduled', current:null, next:items[0] };
    const nextIndex=items.findIndex(item=>item.time>now);
    if(nextIndex<0) return { phase:'finished', current:items[items.length-1], next:null };
    return { phase:'active', current:items[Math.max(0,nextIndex-1)], next:items[nextIndex] };
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
      if (!raw) return null;
      const plan = JSON.parse(raw);
      if (!Array.isArray(plan.timeline)) return plan;
      const oldControl = plan.timeline.find((item) => item.label === 'Controllo volume');
      const oldDecision = plan.timeline.find((item) => item.label === 'Fuori frigo o stesura secondo stato impasto');
      if (oldControl || oldDecision) {
        const bake = new Date(plan.bake);
        const normalized = plan.timeline.filter((item) => item.label !== 'Controllo volume' && item.label !== 'Fuori frigo o stesura secondo stato impasto');
        normalized.push(
          { label:'Controlla l’impasto', date:(oldControl?.date || addMinutes(bake,-120).toISOString()), action:'check' },
          { label:'Stesura', date:(oldDecision?.date || addMinutes(bake,-90).toISOString()) },
          { label:'Riposo in teglia coperto', date:addMinutes(bake,-60).toISOString() }
        );
        plan.timeline = normalized.sort((a,b) => new Date(a.date) - new Date(b.date));
      }
      return plan;
    } catch {
      return null;
    }
  }

  const TIMELINE_ACTIONS = {
    fold: { label:'Apri guida pieghe →', view:'pieghe' },
    stretch: { label:'Apri guida stesura →', view:'stesura' },
    check: { label:'Controlla lo stato →', view:'check' },
    cook: { label:'Apri guida cottura →', view:'cottura' }
  };

  function timelineActionFor(item) {
    if (!item) return null;
    if (item.action) return item.action;
    if (/piega/i.test(item.label || '')) return 'fold';
    if (item.label === 'Stesura') return 'stretch';
    if (item.label === 'Controlla l’impasto' || item.label === 'Controllo volume' || item.label === 'Fuori frigo o stesura secondo stato impasto') return 'check';
    if (item.label === 'Cottura') return 'cook';
    return null;
  }

  function openTimelineAction(action) {
    const config = TIMELINE_ACTIONS[action];
    if (!config) return;
    if (config.view === 'check') openCheckTool('dough');
    else openView(config.view);
  }

  const TIMELINE_VISUALS = {
    'Impasto grezzo': { icon:'🥣', short:'Unisci farine, acqua e lievito fino a ottenere un impasto grezzo.', duration:'~ 10 min' },
    'Riposo 20 min coperto': { icon:'⏱️', short:'Copri e lascia riposare: l’impasto inizierà a rilassarsi.', duration:'20 min' },
    'Sale + olio': { icon:'🫒', short:'Aggiungi il sale, poi incorpora l’olio senza forzare l’impasto.', duration:'~ 5 min' },
    '1ª piega leggera': { icon:'↪', short:'Fai una piega delicata per dare struttura senza sgonfiare.', duration:'~ 2 min' },
    '2ª piega leggera': { icon:'↪', short:'Ripeti la piega con mani leggere e lascia poi riposare.', duration:'~ 2 min' },
    'Stesura': { icon:'👐', short:'Stendi con i polpastrelli dal centro verso i bordi senza schiacciare le bolle. Se si ritira, aspetta 5–10 minuti e riprendi.', duration:'~ 10 min' },
    'Riposo in teglia coperto': { icon:'◴', short:'Copri la teglia e lascia rilassare l’impasto prima del forno.', duration:'~ 60 min' },
    'Frigo coperto dopo le pieghe': { icon:'❄', short:'Copri bene e trasferisci in frigo per la maturazione.', duration:'Riposo' },
    'Controlla l’impasto': { icon:'◎', short:'Verifica quanto è cresciuto e quanto è stabile prima di decidere come proseguire.', duration:'Controllo' },
    'Cottura': { icon:'♨', short:'Forno già caldo: procedi con condimento e cottura.', duration:'10–15 min' }
  };

  function renderPremiumTimeline(timeline) {
    const status=timelineStatus(timeline);
    const now=Date.now();
    const list=create('ol',{class:'visualTimeline','aria-label':'Timeline impasto'});

    timeline.forEach((item,index)=>{
      const time=new Date(item.date).getTime();
      let state='future',stateLabel='Più tardi';
      if(status.phase==='scheduled'){
        if(index===0){state='next';stateLabel='Inizia qui';}
      } else if(status.phase==='finished'){
        state='done';stateLabel='Completato';
      } else {
        const currentIndex=timeline.findIndex(step=>step.date===status.current?.date&&step.label===status.current?.label);
        const nextIndex=timeline.findIndex(step=>step.date===status.next?.date&&step.label===status.next?.label);
        if(index<currentIndex){state='done';stateLabel='Completato';}
        else if(index===currentIndex){state='current';stateLabel='Adesso';}
        else if(index===nextIndex){state='next';stateLabel='Prossimo';}
      }
      const legacyCheck = item.label === 'Controllo volume' || item.label === 'Fuori frigo o stesura secondo stato impasto';
      const action = timelineActionFor(item);
      const legacyMeta = legacyCheck ? { icon:'◎', short:'Verifica lo stato reale dell’impasto prima di decidere come proseguire.', duration:'Controllo' } : null;
      const meta=TIMELINE_VISUALS[item.label]||legacyMeta||{icon:'•',short:'Segui questo passaggio della lavorazione.',duration:''};
      const row=create('li',{class:`visualTimelineStep ${state}`});
      const rail=create('div',{class:'visualTimelineRail','aria-hidden':'true'});
      rail.append(create('span',{class:'visualTimelineNumber',text:String(index+1)}));
      const card=create('article',{class:'visualTimelineCard'});
      const visual=create('div',{class:'timelineVisual','aria-hidden':'true'});
      visual.append(create('span',{text:meta.icon}));
      const body=create('div',{class:'timelineVisualBody'});
      const top=create('div',{class:'timelineVisualTop'});
      top.append(create('span',{class:'timelineState',text:stateLabel}),create('time',{text:fmtShortDate(new Date(item.date)),datetime:item.date}));
      body.append(top,create('strong',{class:'timelineVisualTitle',text:item.label}),create('p',{text:meta.short}));
      if(meta.duration) body.append(create('span',{class:'timelineDuration',text:`◷ ${meta.duration}`}));
      if(action){
        const config=TIMELINE_ACTIONS[action];
        const actionButton=create('button',{type:'button',class:'timelineAction',text:config?.label||'Apri guida →'});
        actionButton.addEventListener('click',()=>openTimelineAction(action));
        body.append(actionButton);
      }
      card.append(visual,body); row.append(rail,card); list.append(row);
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
    const status = timelineStatus(data.timeline);
    const next = status.phase === 'scheduled' ? status.next : (status.next ?? status.current ?? data.timeline[data.timeline.length - 1]);
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
      create('span', { class: 'nextLabel', text: status.phase === 'scheduled' ? 'In programma' : 'Prossimo' }),
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

    const schedule = create('div', { class: 'premiumSection' });
    schedule.append(create('div', { class: 'sectionBar' }, [
      create('h4', { text: 'Programma' }),
      create('span', { text: 'Anteprima' })
    ]));
    const scheduleList = create('div', { class: 'savedDoseGrid' });
    const previewSteps = [
      data.timeline[0],
      data.timeline.find((item) => item.label === 'Stesura' || item.label === 'Fuori frigo o stesura secondo stato impasto'),
      data.timeline[data.timeline.length - 1]
    ].filter((item, index, items) => item && items.findIndex((candidate) => candidate.date === item.date && candidate.label === item.label) === index);
    previewSteps.forEach((item) => scheduleList.append(
      create('div', { class: 'savedDose' }, [
        create('span', { text: item.label }),
        create('strong', { text: fmtShortDate(new Date(item.date)) })
      ])
    ));
    schedule.append(scheduleList);
    shell.append(schedule);

    const manage = create('button', { class: 'manageDough', type: 'button', text: 'Salva e segui questo impasto →' });
    manage.addEventListener('click', () => {
      saveLastPlan(plan);
      renderSavedTimeline();
      renderHomeSavedStep();
      openView('home');
    });
    shell.append(manage);

    target.append(shell);
  }

  

  function renderSavedTimeline() {
    const target=$('savedTimeline'); if(!target) return; clear(target);
    const plan=getLastPlan();
    if(!plan){
      const empty=create('div',{class:'savedPlan emptyPlan'});
      empty.append(create('span',{class:'flowEyebrow',text:'Nessun impasto pianificato'}),create('h3',{text:'Calcola il tuo prossimo impasto'}),create('p',{text:'Quando creerai una timeline, qui vedrai stato atteso e prossimo passaggio.'}));
      const go=create('button',{type:'button',class:'savedPlanCta',text:'Calcola un impasto →'}); go.addEventListener('click',()=>openView('calc')); empty.append(go); target.append(empty); return;
    }
    const status=timelineStatus(plan.timeline);
    const main=create('section',{class:'savedPlan'});
    const label=status.phase==='scheduled'?'Impasto pianificato':status.phase==='finished'?'Timeline conclusa':'Stato atteso ora';
    main.append(create('span',{class:'flowEyebrow',text:label}));
    const currentBox=create('div',{class:'savedNext'});
    const primary=status.phase==='scheduled'?status.next:status.current;
    const primaryTitle=status.phase==='scheduled'?'Non ancora iniziato':primary?.label||'Timeline conclusa';
    currentBox.append(create('div',{},[create('h3',{text:primaryTitle}),create('p',{text:`${plan.pizza} · cottura ${fmtShortDate(new Date(plan.bake))}`})]));
    if(primary) {
      currentBox.append(create('time',{text:fmtShortDate(new Date(primary.date)),datetime:primary.date}));
      const primaryAction=timelineActionFor(primary);
      if(primaryAction){
        const config=TIMELINE_ACTIONS[primaryAction];
        const go=create('button',{type:'button',class:'timelineAction savedPrimaryAction',text:config?.label||'Apri guida →'});
        go.addEventListener('click',()=>openTimelineAction(primaryAction));
        currentBox.append(go);
      }
    }
    main.append(currentBox);
    if(status.phase==='active'&&status.next){
      const nextRow=create('div',{class:'upNext'});
      nextRow.append(create('span',{text:'Prossimo'}),create('strong',{text:status.next.label}),create('time',{text:fmtShortDate(new Date(status.next.date)),datetime:status.next.date}));
      main.append(nextRow);
    } else if(status.phase==='scheduled'&&status.next){
      const nextRow=create('div',{class:'upNext'});
      nextRow.append(create('span',{text:'Inizia'}),create('strong',{text:status.next.label}),create('time',{text:fmtShortDate(new Date(status.next.date)),datetime:status.next.date}));
      main.append(nextRow);
    }
    const details=create('details',{class:'savedPlanDetails'}); details.append(create('summary',{text:'Timeline e dosi'}));
    const timelineSection=create('div',{class:'savedPlanSection'}); timelineSection.append(create('h4',{text:'Timeline'}),renderPremiumTimeline(plan.timeline)); details.append(timelineSection);
    const ingredientsSection=create('div',{class:'savedPlanSection'}); ingredientsSection.append(create('h4',{text:'Dosi'}));
    const list=create('div',{class:'savedDoseGrid'}),rows=[];
    if(Array.isArray(plan.ingredients.flourBlend)&&plan.ingredients.flourBlend.length>1) plan.ingredients.flourBlend.forEach(item=>rows.push([`Farina ${item.index} · ${round(item.pct,0)}%`,`${round(item.grams)} g`]));
    else rows.push(['Farina',`${round(plan.ingredients.flour)} g`]);
    rows.push(['Acqua',`${round(plan.ingredients.water)} g`],['Sale',`${round(plan.ingredients.saltG)} g`],['Olio',`${round(plan.ingredients.oilG)} g`],['Lievito fresco',`${round(plan.ingredients.yeastG,1)} g`]);
    rows.forEach(([label,value])=>list.append(create('div',{class:'savedDose'},[create('span',{text:label}),create('strong',{text:value})])));
    ingredientsSection.append(list); details.append(ingredientsSection); main.append(details);
    const printActions=create('div',{class:'savedPlanActions'});
    const printButton=create('button',{type:'button',class:'savedPlanPrint',text:'Stampa / salva PDF'});
    printButton.addEventListener('click',()=>printSavedPlan());
    const removeButton=create('button',{type:'button',class:'savedPlanDelete',text:'Elimina impasto'});
    removeButton.addEventListener('click',()=>{
      if(!window.confirm('Eliminare questo impasto e la sua timeline?')) return;
      localStorage.removeItem(LAST_PLAN_KEY);
      renderSavedTimeline();
      renderHomeSavedStep();
      openView('home');
    });
    printActions.append(printButton,removeButton); main.append(printActions);
    target.append(main);
  }

  function renderPrintSheet(plan) {
    const sheet=$('printSheet'); if(!sheet) return; clear(sheet);
    const head=create('header',{class:'printHead'});
    head.append(create('div',{},[
      create('span',{class:'printBrand',text:'PizzaMaker · Teglia Coach'}),
      create('h1',{text:plan.pizza||'Il tuo impasto'}),
      create('p',{text:`${plan.method||''} · cottura ${fmtShortDate(new Date(plan.bake))}`})
    ]));
    head.append(create('div',{class:'printHydration'},[
      create('strong',{text:`${round(plan.ingredients?.hydration||0,0)}%`}),
      create('span',{text:'idratazione'})
    ]));
    sheet.append(head);

    const facts=create('section',{class:'printFacts'});
    [
      ['Impasto totale', plan.total ? `${round(plan.total,0)} g` : '—'],
      ['Per teglia', plan.doughPer ? `${round(plan.doughPer,0)} g` : '—'],
      ['Sale', plan.ingredients?.salt ? `${round(plan.ingredients.salt,1)}%` : '—'],
      ['Cottura', fmtShortDate(new Date(plan.bake))]
    ].forEach(([label,value])=>facts.append(create('div',{},[create('span',{text:label}),create('strong',{text:value})])));
    sheet.append(facts);

    const doses=create('section',{class:'printSection'});
    doses.append(create('h2',{text:'Dosi'}));
    const doseGrid=create('div',{class:'printDoseGrid'}), rows=[];
    const ing=plan.ingredients||{};
    if(Array.isArray(ing.flourBlend)&&ing.flourBlend.length>1) ing.flourBlend.forEach(item=>rows.push([`Farina ${item.index} · ${round(item.pct,0)}%`,`${round(item.grams)} g`]));
    else rows.push(['Farina',`${round(ing.flour)} g`]);
    rows.push(['Acqua',`${round(ing.water)} g`],['Sale',`${round(ing.saltG)} g`],['Olio',`${round(ing.oilG)} g`],['Lievito fresco',`${round(ing.yeastG,1)} g`]);
    if(ing.honeyG>0) rows.push(['Miele',`${round(ing.honeyG,1)} g`]);
    rows.forEach(([label,value])=>doseGrid.append(create('div',{class:'printDose'},[create('span',{text:label}),create('strong',{text:value})])));
    doses.append(doseGrid); sheet.append(doses);

    const method=create('section',{class:'printSection printMethod'});
    method.append(create('h2',{text:'Metodo'}));
    [
      'Mescola farine, lievito e 85–90% dell’acqua.',
      'Copri e lascia riposare 20 minuti.',
      'Aggiungi il sale sciolto nell’acqua rimasta, poi incorpora l’olio.',
      'Lavora poco e fai le pieghe previste dalla timeline senza sgonfiare l’impasto.'
    ].forEach((txt,i)=>method.append(create('div',{class:'printMethodStep'},[create('b',{text:String(i+1)}),create('p',{text:txt})])));
    sheet.append(method);

    const timeline=create('section',{class:'printSection printTimeline'});
    timeline.append(create('h2',{text:'Timeline completa'}));
    (plan.timeline||[]).forEach((item,i)=>{
      const meta=TIMELINE_VISUALS[item.label]||{short:'Segui questo passaggio della lavorazione.',duration:''};
      const row=create('div',{class:'printTimelineRow'});
      row.append(create('b',{class:'printTimelineNumber',text:String(i+1)}),create('time',{text:fmtShortDate(new Date(item.date)),datetime:item.date}),create('div',{},[
        create('strong',{text:item.label}),
        create('p',{text:meta.short})
      ]));
      timeline.append(row);
    });
    sheet.append(timeline);

    sheet.append(create('footer',{class:'printFooter',text:'PizzaMaker · Scheda impasto personale'}));
  }

  function printSavedPlan() {
    const plan=getLastPlan();
    if(!plan) return;
    renderPrintSheet(plan);
    window.print();
  }

  function renderHomeSavedStep() {
    const plan=getLastPlan();
    const empty=$('homeEmptyState'), active=$('homeActiveState'), mount=$('homeSavedPlan');
    if(!empty||!active||!mount) return;
    if(!plan){
      empty.classList.remove('hidden');
      active.classList.add('hidden');
      clear(mount);
      return;
    }
    empty.classList.add('hidden');
    active.classList.remove('hidden');
    const original=$('savedTimeline');
    const proxyId=original?.id;
    if(original) original.id='savedTimelineOffscreen';
    mount.id='savedTimeline';
    renderSavedTimeline();
    mount.id='homeSavedPlan';
    if(original) original.id=proxyId;
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
    const pizza=$('pizzaType').value, pan=$('panType').value, target=$('cook');
    clear(target); closeCookTimer();
    const panel=card('Guida operativa','cookGuide');
    const stretchLink=create('button',{type:'button',class:'timelineAction',text:'Serve aiuto con la stesura? Apri la guida →'});
    stretchLink.addEventListener('click',()=>openView('stesura'));
    panel.append(stretchLink);

    const panText=pan==='leccarda'
      ? 'Leccarda: prima fase ben in basso; conduce meno di ferro e alluminio.'
      : 'Teglia più conduttiva: controlla il fondo prima perché può colorire più velocemente.';
    panel.append(guideStep(1,'Preriscalda',[panText,'Forno statico a 250 °C per 40–45 minuti.']));
    const preheat=create('button',{type:'button',class:'stepTimer',text:'Timer preriscaldo · 40 min'});
    preheat.addEventListener('click',()=>startCookTimer(40,'Preriscaldo forno')); panel.lastElementChild.append(preheat);

    if(pizza==='margherita'){
      panel.append(guideStep(2,'Prima cottura',['Pomodoro denso 110–130 g per una 37×26. Cuoci sul ripiano basso.']));
      const first=create('button',{type:'button',class:'stepTimer',text:'Timer prima cottura · 10 min'}); first.addEventListener('click',()=>startCookTimer(10,'Prima cottura')); panel.lastElementChild.append(first);
      panel.append(guideStep(3,'Completa',['Aggiungi 120–140 g di mozzarella ben scolata. Sposta medio-alto e termina la cottura.']));
      const finish=create('button',{type:'button',class:'stepTimer',text:'Timer mozzarella · 3 min'}); finish.addEventListener('click',()=>startCookTimer(3,'Mozzarella')); panel.lastElementChild.append(finish);
    }else if(pizza==='rossa'){
      panel.append(guideStep(2,'Cottura',['Pomodoro denso e olio moderato. Parti in basso e controlla il fondo prima di proseguire.']));
      const first=create('button',{type:'button',class:'stepTimer',text:'Timer controllo · 10 min'}); first.addEventListener('click',()=>startCookTimer(10,'Prima cottura')); panel.lastElementChild.append(first);
    }else{
      panel.append(guideStep(2,'Patate e cottura',['Patate sottilissime, sciacquate e asciugate bene. Condiscile prima e cuoci in basso.']));
      const first=create('button',{type:'button',class:'stepTimer',text:'Timer primo controllo · 11 min'}); first.addEventListener('click',()=>startCookTimer(11,'Patate · primo controllo')); panel.lastElementChild.append(first);
      panel.append(guideStep(3,'Completa',['Sposta medio-alto per finire. Lardo fuori forno o negli ultimi secondi.']));
      const finish=create('button',{type:'button',class:'stepTimer',text:'Timer finitura · 4 min'}); finish.addEventListener('click',()=>startCookTimer(4,'Finitura')); panel.lastElementChild.append(finish);
    }
    const finalNo= pizza==='rossa'?3:4;
    panel.append(guideStep(finalNo,'Sforna e asciuga',['Fondo dorato e superficie asciutta? Togli subito la pizza dalla teglia e appoggiala su griglia.']));
    target.append(panel);
  }


  let timerState={remaining:0,initial:0,running:false,label:'Timer',interval:null,deadline:0};
  function formatTimer(seconds){
    const safe=Math.max(0,Math.ceil(seconds));
    return `${pad(Math.floor(safe/60))}:${pad(safe%60)}`;
  }
  function paintTimer(){
    if(!$('cookTimer'))return;
    $('timerDisplay').textContent=formatTimer(timerState.remaining);
    $('timerLabel').textContent=timerState.label;
    $('timerToggle').textContent=timerState.running?'Pausa':timerState.remaining<=0?'Ricomincia':'Riprendi';
    $('cookTimer').classList.toggle('timerDone',timerState.remaining<=0);
    document.title=timerState.running?`${formatTimer(timerState.remaining)} · PizzaMaker`:'PizzaMaker — Teglia Coach';
  }
  function stopTimer(){
    if(timerState.interval){window.clearInterval(timerState.interval);timerState.interval=null;}
    timerState.running=false;paintTimer();
  }
  function tickTimer(){
    if(!timerState.running)return;
    timerState.remaining=Math.max(0,Math.ceil((timerState.deadline-Date.now())/1000));
    if(timerState.remaining===0){
      stopTimer();
      if('vibrate' in navigator)navigator.vibrate([180,90,180]);
    }
    paintTimer();
  }
  function startCookTimer(minutes,label){
    if(timerState.interval)window.clearInterval(timerState.interval);
    timerState.initial=Math.max(1,Math.round(minutes*60));
    timerState.remaining=timerState.initial;
    timerState.label=label;timerState.running=true;
    timerState.deadline=Date.now()+timerState.remaining*1000;
    $('cookTimer').classList.remove('hidden');
    timerState.interval=window.setInterval(tickTimer,250);
    paintTimer();$('cookTimer').scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function toggleCookTimer(){
    if(timerState.remaining<=0)timerState.remaining=timerState.initial;
    timerState.running=!timerState.running;
    if(timerState.running){
      timerState.deadline=Date.now()+timerState.remaining*1000;
      if(!timerState.interval)timerState.interval=window.setInterval(tickTimer,250);
    }else if(timerState.interval){
      timerState.remaining=Math.max(0,Math.ceil((timerState.deadline-Date.now())/1000));
      window.clearInterval(timerState.interval);timerState.interval=null;
    }
    paintTimer();
  }
  function closeCookTimer(){
    stopTimer();$('cookTimer')?.classList.add('hidden');
    document.title='PizzaMaker — Teglia Coach';
  }

  function savePrefs(showConfirmation = true) {
    PREF_IDS.forEach((id) => {
      const node = $(id);
      if (node) localStorage.setItem(PREF_PREFIX + id, node.value);
    });
    localStorage.setItem(PREF_PREFIX + 'flourCount', String(activeFlours().length));
    const style = document.querySelector('input[name="style"]:checked')?.value;
    if (style) localStorage.setItem(PREF_PREFIX + 'style', style);
    if (showConfirmation) alert('Preferenze salvate in questo browser.');
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
    document.querySelectorAll('[data-open]').forEach((button) => {
      button.addEventListener('click', () => openView(button.dataset.open));
    });
    document.querySelectorAll('[data-open-check]').forEach((button) => {
      button.addEventListener('click', () => openCheckTool('dough'));
    });
    $('closeCheckTool')?.addEventListener('click', closeCheckTool);

    $('acceptPrivacy')?.addEventListener('click', acceptPrivacyNotice);
    $('calculateBtn')?.addEventListener('click', calculate);
    $('adviceBtn')?.addEventListener('click', renderAdvice);
    $('cookBtn')?.addEventListener('click', renderCookGuide);
    $('timerToggle')?.addEventListener('click', toggleCookTimer);
    $('timerAdd')?.addEventListener('click', ()=>{timerState.remaining+=60; if(timerState.running)timerState.deadline+=60000; paintTimer();});
    $('timerReset')?.addEventListener('click', ()=>{timerState.remaining=timerState.initial; if(timerState.running)timerState.deadline=Date.now()+timerState.initial*1000; paintTimer();});
    $('timerClose')?.addEventListener('click', closeCookTimer);
    $('checkMode')?.addEventListener('change', toggleCheckMode);

    $('saltProfile')?.addEventListener('change', toggleCustoms);
    $('addFlourBtn')?.addEventListener('click', addFlour);
    $('flourBlend')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-remove-flour]');
      if (button) removeFlour(button.dataset.removeFlour);
    });
    $('resetAdvancedBtn')?.addEventListener('click', resetAdvanced);
    ['flourType','protein','flourW','lmMix','flourType2','protein2','flourW2','lmMix2','flourType3','protein3','flourW3','lmMix3']
      .forEach((id) => {
        const node = $(id);
        node?.addEventListener('input', () => updateFlourUI('', false));
        node?.addEventListener('change', () => updateFlourUI('', false));
      });
    ['flour2Pct','flour3Pct'].forEach((id) => {
      const node = $(id);
      // Durante la digitazione il campo può restare vuoto: normalizziamo solo a modifica conclusa.
      node?.addEventListener('input', () => updateFlourUI('', false));
      node?.addEventListener('change', () => updateFlourUI(id, true));
      node?.addEventListener('blur', () => updateFlourUI(id, true));
    });
    [1,2,3].forEach((index) => {
      $('flourCatalog' + index)?.addEventListener('change', () => applyCatalogFlour(index));
    });
    $('hydration')?.addEventListener('change', toggleCustoms);
    ['start','bake'].forEach((id)=>$(id)?.addEventListener('change', updateHydrationRecommendation));

    $('recipeForm')?.addEventListener('change', () => savePrefs(false));
    $('recipeForm')?.addEventListener('input', (event) => {
      if (event.target.matches('input[type="number"], input[type="datetime-local"]')) savePrefs(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $('privacyOverlay')?.classList.contains('show')) {
        acceptPrivacyNotice();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // La navigazione deve restare disponibile anche se un'inizializzazione secondaria fallisce.
    bindEvents();
    const initializers = [
      loadPrefs,
      emptyResult,
      renderSavedTimeline,
      renderHomeSavedStep,
      () => clear($('cook')),
      toggleCheckMode,
      showPrivacyNotice
    ];
    initializers.forEach((initialize) => {
      try { initialize(); }
      catch (error) { console.error('PizzaMaker init:', error); }
    });
  });
})();
