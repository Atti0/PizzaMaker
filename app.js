(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const PREF_PREFIX = 'tc7_';
  const PRIVACY_KEY = 'tc_privacy_notice_ok';
  const LAST_PLAN_KEY = 'tc7_last_plan';
  const PREF_IDS = [
    'w','h','n','saltProfile',
    'flourCatalog1','flourType','protein','flourW','lmMix','flour2Pct','flourCatalog2','flourType2','protein2','flourW2','lmMix2',
    'flour3Pct','flourCatalog3','flourType3','protein3','flourW3','lmMix3','hydration','customHyd','customSalt','kneadMethod','coldProcess','fridgeTemp'
  ];

  let techniqueOrigin = { view:'home', step:null, action:null };


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

  function resetViewScroll() {
    const root=document.documentElement;
    const previous=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    window.scrollTo(0,0);
    document.body.scrollTop=0;
    root.scrollTop=0;
    requestAnimationFrame(() => {
      window.scrollTo(0,0);
      document.body.scrollTop=0;
      root.scrollTop=0;
      requestAnimationFrame(() => {
        root.style.scrollBehavior=previous;
      });
    });
  }

  function openView(id, options = {}) {
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
      if(id==='pieghe'||id==='formatura'||id==='stesura'||id==='cottura') renderTechniqueContext(id);
      if(!options.preserveScroll) resetViewScroll();
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
    const input = $('flourCatalog' + index);
    const name = input?.value.trim() ?? '';
    const key = Object.keys(FLOUR_CATALOG).find((item) => item.toLocaleLowerCase('it') === name.toLocaleLowerCase('it'));
    const known = key ? FLOUR_CATALOG[key] : null;

    if (!known) {
      if (input?.dataset.catalogMatched === 'true') {
        $('flourType' + suffix).value = '0';
        $('protein' + suffix).value = '12.5';
        $('flourW' + suffix).value = '';
        $('lmMix' + suffix).value = 'no';
        updateFlourUI('', false);
      }
      if (input) {
        delete input.dataset.catalogMatched;
        input.classList.remove('catalogMatched');
      }
      return false;
    }

    if (input && input.value !== key) input.value = key;
    if (known.type) $('flourType' + suffix).value = known.type;
    $('protein' + suffix).value = known.protein === null ? '' : String(known.protein);
    $('flourW' + suffix).value = known.w === null ? '' : String(known.w);
    if (known.lm) $('lmMix' + suffix).value = known.lm;
    if (input) {
      input.dataset.catalogMatched = 'true';
      input.classList.add('catalogMatched');
    }
    updateFlourUI('', false);
    return true;
  }

  function setStartNow() {
    const now = new Date();
    $('start').value = fmtInputDate(now);
    const bake = new Date($('bake').value);
    if (!Number.isFinite(bake.getTime()) || bake <= now) {
      $('bake').value = fmtInputDate(addMinutes(now, 7 * 60));
    }
    updateHydrationRecommendation();
    savePrefs(false);
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
    $('kneadMethod').value = 'hand';
    $('coldProcess').value = 'bulk';
    $('fridgeTemp').value = '';
    $('doughTemp').value = '';
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

  function kneadMethodLabel(value) {
    if (value === 'planetary') return 'planetaria';
    if (value === 'spiral') return 'spirale';
    return 'a mano';
  }

  function coldProcessLabel(value) {
    return value === 'balls' ? 'frigo in panetti' : 'frigo in massa';
  }

  function doughPhaseLabel(value) {
    const labels={
      initial:'fine impasto / puntata iniziale',
      cold:'durante il frigo',
      postcold:'dopo frigo / staglio',
      proof:'dopo formatura / appretto',
      stretch:'durante la stesura'
    };
    return labels[value] || 'fase non specificata';
  }

  function resultName(load) {
    if (load <= 0.49) return 'Extra croccante';
    if (load <= 0.51) return 'Romana classica';
    if (load <= 0.55) return 'Bassa-media equilibrata';
    if (load <= 0.59) return 'Romana contemporanea';
    return 'Più soffice';
  }

  function buildTimeline(start, bake, hours, kneadMethod = 'hand', coldProcess = 'bulk', fridgeTemp = null) {
    const timeline = [
      { label: 'Impasto grezzo', date: start.toISOString() },
      { label: 'Riposo 20 min coperto', date: addMinutes(start, 20).toISOString() },
      { label: 'Sale + olio', date: addMinutes(start, 40).toISOString() },
      { label: 'Controlla la struttura', date: addMinutes(start, 60).toISOString(), action: 'fold' },
      { label: 'Ricontrolla dopo il riposo', date: addMinutes(start, 85).toISOString(), action: 'fold' }
    ];

    if (hours <= 12) {
      timeline.push(
        { label: 'Formatura · solo se hai stagliato', date: addMinutes(bake, -120).toISOString(), action: 'shape' },
        { label: 'Controlla l’appretto', date: addMinutes(bake, -60).toISOString(), action: 'check' },
        { label: 'Stesura', date: addMinutes(bake, -30).toISOString(), action: 'stretch' },
        { label: 'Riposo finale in teglia · se serve', date: addMinutes(bake, -20).toISOString() },
        { label: 'Cottura', date: bake.toISOString(), action: 'cook' }
      );
      return timeline;
    }

    const checkLead = 180;

    if (coldProcess === 'balls') {
      timeline.push(
        { label: 'Staglio + formatura', date: addMinutes(start, 110).toISOString(), action: 'shape' },
        { label: 'Frigo in panetti', date: addMinutes(start, 130).toISOString() },
        { label: 'Inizia il controllo dei panetti', date: addMinutes(bake, -checkLead).toISOString(), action: 'check' },
        { label: 'Stesura', date: addMinutes(bake, -30).toISOString(), action: 'stretch' },
        { label: 'Riposo finale in teglia · se serve', date: addMinutes(bake, -20).toISOString() },
        { label: 'Cottura', date: bake.toISOString(), action: 'cook' }
      );
    } else {
      timeline.push(
        { label: 'Frigo in massa', date: addMinutes(start, 110).toISOString() },
        { label: 'Inizia il controllo per staglio', date: addMinutes(bake, -checkLead).toISOString(), action: 'check' },
        { label: 'Finestra di staglio + formatura', date: addMinutes(bake, -150).toISOString(), action: 'shape' },
        { label: 'Appretto · controlla lo stato', date: addMinutes(bake, -90).toISOString(), action: 'check' },
        { label: 'Stesura', date: addMinutes(bake, -30).toISOString(), action: 'stretch' },
        { label: 'Riposo finale in teglia · se serve', date: addMinutes(bake, -20).toISOString() },
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
      let migratedStructure = false;
      plan.timeline = plan.timeline.map((item) => {
        if (item.label === '1ª piega leggera') {
          migratedStructure = true;
          return { ...item, label:'Controlla la struttura', action:'fold' };
        }
        if (item.label === '2ª piega leggera') {
          migratedStructure = true;
          return { ...item, label:'Ricontrolla dopo il riposo', action:'fold' };
        }
        if (item.label === 'Frigo coperto dopo le pieghe') {
          migratedStructure = true;
          return { ...item, label:'Frigo coperto' };
        }
        if (item.label === 'Riposo in teglia coperto') {
          return { ...item, label:'Riposo finale in teglia · se serve' };
        }
        return item;
      });
      if (migratedStructure && !plan.kneadMethod) plan.kneadMethod = 'hand';
      if (!plan.coldProcess) plan.coldProcess = 'bulk';
      plan.timeline = plan.timeline.map((item) => {
        if (item.label === 'Frigo coperto') return { ...item, label:'Frigo in massa' };
        if (item.label === 'Preforma e appretto · se serve') return { ...item, label:'Staglio + formatura', action:'shape' };
        return item;
      });
      const oldControl = plan.timeline.find((item) => item.label === 'Controllo volume');
      const oldDecision = plan.timeline.find((item) => item.label === 'Fuori frigo o stesura secondo stato impasto');
      if (oldControl || oldDecision) {
        const bake = new Date(plan.bake);
        const normalized = plan.timeline.filter((item) => item.label !== 'Controllo volume' && item.label !== 'Fuori frigo o stesura secondo stato impasto');
        normalized.push(
          { label:'Controlla l’impasto', date:(oldControl?.date || addMinutes(bake,-120).toISOString()), action:'check' },
          { label:'Stesura', date:(oldDecision?.date || addMinutes(bake,-90).toISOString()) },
          { label:'Riposo finale in teglia · se serve', date:addMinutes(bake,-20).toISOString() }
        );
        plan.timeline = normalized.sort((a,b) => new Date(a.date) - new Date(b.date));
      }
      return plan;
    } catch {
      return null;
    }
  }

  const TIMELINE_ACTIONS = {
    fold: { label:'Apri Struttura →', view:'pieghe' },
    shape: { label:'Apri Formatura →', view:'formatura' },
    stretch: { label:'Apri guida stesura →', view:'stesura' },
    check: { label:'Controlla lo stato →', view:'check' },
    cook: { label:'Apri guida cottura →', view:'cottura' }
  };

  function timelineActionFor(item) {
    if (!item) return null;
    if (item.action) return item.action;
    if (/piega|struttura|ricontrolla/i.test(item.label || '')) return 'fold';
    if (/formatura|staglio/i.test(item.label || '')) return 'shape';
    if (item.label === 'Stesura') return 'stretch';
    if (item.label === 'Controlla l’impasto' || item.label === 'Controllo volume' || item.label === 'Fuori frigo o stesura secondo stato impasto') return 'check';
    if (item.label === 'Cottura') return 'cook';
    return null;
  }

  function openTimelineAction(action, item = null) {
    const config = TIMELINE_ACTIONS[action];
    if (!config) return;
    techniqueOrigin = { view:'impasto', step:item, action };
    if (config.view === 'check') openCheckTool('dough');
    else openView(config.view);
  }

  function openTechniqueFromHome(view) {
    techniqueOrigin = { view:'home', step:null, action:null };
    openView(view);
  }

  function goBackFromTechnique() {
    if (techniqueOrigin.view === 'impasto') {
      openView('impasto');
      requestAnimationFrame(() => {
        const target = techniqueOrigin.step?.label
          ? document.querySelector(`[data-step-label="${CSS.escape(techniqueOrigin.step.label)}"]`)
          : $('savedTimeline');
        target?.scrollIntoView({behavior:'smooth',block:'center'});
      });
    } else {
      openView('home');
    }
  }

  function planSummary(plan) {
    if (!plan) return null;
    const tray = plan.tray || {};
    const width = Number(tray.width);
    const height = Number(tray.height);
    const pans = Number(tray.pans) || 1;
    const area = Number.isFinite(width) && Number.isFinite(height) ? width * height : null;
    return { width, height, pans, area };
  }

  function renderTechniqueContext(id) {
    const plan=getLastPlan();
    const step=techniqueOrigin.step;
    const summary=planSummary(plan);
    const fromTimeline=techniqueOrigin.view==='impasto' && plan && step;

    if(id==='pieghe'){
      const box=$('foldContext');
      box?.classList.toggle('hidden',!fromTimeline);
      if(fromTimeline){
        $('foldContextTitle').textContent=step.label;
        const hyd=plan.ingredients?.hydration;
        $('foldContextMeta').textContent=`${Number.isFinite(hyd)?`${round(hyd,0)}% idratazione · `:''}${kneadMethodLabel(plan.kneadMethod)} · ${coldProcessLabel(plan.coldProcess)} · ${plan.pizza}. Prima osserva la struttura: il rinforzo è un'opzione, non un passaggio obbligatorio.`;
      }
    }

    if(id==='formatura'){
      const box=$('shapeContext');
      selectShapeProcess(plan?.coldProcess || 'bulk');
      box?.classList.toggle('hidden',!fromTimeline);
      if(fromTimeline){
        $('shapeContextTitle').textContent=step.label;
        $('shapeContextMeta').textContent=coldProcessLabel(plan.coldProcess) + ' · ' + round(plan.doughPer||0,0) + ' g per panetto. Forma il minimo necessario e poi lascia che sia l’appretto a rilassare la superficie.';
      }
    }

    if(id==='stesura'){
      const box=$('stretchContext');
      box?.classList.toggle('hidden',!fromTimeline);
      if(fromTimeline){
        $('stretchContextTitle').textContent=summary?.area
          ? round(summary.width,0) + ' × ' + round(summary.height,0) + ' cm · ' + round(plan.doughPer,0) + ' g'
          : 'Stesura del tuo impasto';
        const oilMin=summary?.area ? Math.max(3, summary.area*0.0062) : null;
        const oilMax=summary?.area ? Math.max(5, summary.area*0.0092) : null;
        $('stretchContextMeta').textContent=summary?.area
          ? plan.pizza + ' · ' + round(plan.ingredients?.hydration||0,0) + '% idratazione · teglia leggermente unta con circa ' + round(oilMin,0) + '–' + round(oilMax,0) + ' g di olio. Se si ritira, riposo; se è fragile, meno movimenti.'
          : plan.pizza + ' · ' + round(plan.ingredients?.hydration||0,0) + '% idratazione. Se l’impasto non collabora, fermati prima di forzarlo.';
      }
    }
    if(id==='cottura') renderCookPlanContext(fromTimeline ? plan : null);
  }

  function renderStructureStateAdvice(state) {
    const target=$('structureStateAdvice');
    if(!target) return;
    const states={
      ready:{title:'Fermati qui',text:'La struttura è sufficiente. Copri e lascia proseguire fermentazione e riposo: una piega in più aggiungerebbe lavoro senza un beneficio evidente.'},
      weak:{title:'Fai un solo ciclo leggero',text:'Se sei ancora nella puntata iniziale, fai il ciclo descritto sotto. Nel metodo PizzaMaker, dopo i quattro lembi capovolgi una volta la massa, poi copri e ricontrolla dopo il riposo.'},
      tight:{title:'Riposo, non forza',text:'Copri e aspetta 15–20 minuti. Se l’impasto fa resistenza o tende a lacerarsi, altra trazione rischia di peggiorarlo.'},
      hot:{title:'Prima controlla temperatura e fermentazione',text:'Se cola, è caldo o si sfalda, non presumere che serva una piega. Riduci la manipolazione e valuta se è già molto avanti.'}
    };
    const advice=states[state]||states.ready;
    clear(target);
    target.append(create('strong',{text:advice.title}),create('p',{text:advice.text}));
  }
  function renderShapeProcessAdvice(process) {
    const target=$('shapeProcessAdvice');
    if(!target) return;
    const content=process==='balls'
      ? {title:'Panetti prima del frigo',text:'Forma con delicatezza, chiusura sotto e tensione moderata. Il freddo rallenterà poi la fermentazione del panetto: non inseguire una pelle rigida.'}
      : {title:'Dopo il frigo in massa',text:'Taglia la porzione con il tarocco, preserva una faccia continua e forma con il minimo numero di movimenti. L’appretto successivo deve restituire estensibilità e volume.'};
    clear(target);
    target.append(create('strong',{text:content.title}),create('p',{text:content.text}));
  }

  function selectShapeProcess(process) {
    document.querySelectorAll('[data-shape-process]').forEach((item)=>{
      const active=item.dataset.shapeProcess===process;
      item.classList.toggle('selected',active);
      item.setAttribute('aria-pressed',active?'true':'false');
    });
    renderShapeProcessAdvice(process);
  }

  function renderStretchStateAdvice(state) {
    const target=$('stretchStateAdvice');
    if(!target) return;
    const states={
      ready:{
        title:'Puoi stendere ora',
        text:'Lavora con pressioni progressive e mani larghe. Mantieni volume anche al centro e fermati quando sei vicino alla misura della teglia.'
      },
      tight:{
        title:'Aspetta 10–15 minuti',
        text:'Copri l’impasto e lascialo rilassare. Se si ritira ancora, ripeti un secondo breve riposo: non compensare tirando più forte.'
      },
      fragile:{
        title:'Manipola il minimo indispensabile',
        text:'Sostieni la massa con più superficie possibile, fai pochi passaggi e trasferisci presto in teglia. Evita un appretto finale lungo se è già molto gonfia e debole.'
      },
      tear:{
        title:'Stop: non continuare a tirare',
        text:'Copri 10–15 minuti e riprendi con mani più larghe. Se continua a cedere, limita la manipolazione e trasferisci in teglia senza cercare la forma perfetta sul banco.'
      }
    };
    const advice=states[state]||states.ready;
    clear(target);
    target.append(create('strong',{text:advice.title}),create('p',{text:advice.text}));
  }
  function renderCookPlanContext(plan) {
    const box=$('cookPlanContext');
    const summary=planSummary(plan);
    const hasTray=Boolean(plan&&summary?.area);
    box?.classList.toggle('hidden',!hasTray);
    if(hasTray){
      clear(box);
      box.append(
        create('span',{class:'flowEyebrow',text:'Dalla tua ricetta'}),
        create('strong',{text:`${round(summary.width,0)} × ${round(summary.height,0)} cm · ${round(plan.doughPer,0)} g per teglia`}),
        create('p',{text:`${plan.pizza} · ${round(plan.ingredients?.hydration||0,0)}% idratazione. Le quantità sotto vengono adattate alla tua teglia.`})
      );
      $('cookSetupEyebrow').textContent='Completa due dettagli';
      $('cookSetupTitle').textContent='Condimento e teglia';
      $('cookSetupHint').textContent='Dimensioni e peso impasto sono già recuperati dalla tua ricetta.';
      renderCookGuide();
    } else {
      $('cookSetupEyebrow').textContent='Due scelte';
      $('cookSetupTitle').textContent='Adatta la cottura';
      $('cookSetupHint').textContent='Scegli condimento e materiale della teglia.';
    }
  }

  const TIMELINE_VISUALS = {
    'Impasto grezzo': { icon:'🥣', short:'Unisci farine, acqua e lievito fino a ottenere un impasto grezzo.', duration:'~ 10 min' },
    'Riposo 20 min coperto': { icon:'⏱️', short:'Copri e lascia riposare: l’impasto inizierà a rilassarsi.', duration:'20 min' },
    'Sale + olio': { icon:'🫒', short:'Aggiungi il sale, poi incorpora l’olio senza forzare l’impasto.', duration:'~ 5 min' },
    'Controlla la struttura': { icon:'◎', short:'Guarda tenuta, tensione e continuità prima di decidere se serve un rinforzo.', duration:'Controllo' },
    'Ricontrolla dopo il riposo': { icon:'↪', short:'Dopo il riposo verifica se la massa è più raccolta. Un altro ciclo serve solo se resta debole.', duration:'Controllo' },
    'Formatura · solo se hai stagliato': { icon:'◯', short:'Se hai diviso l’impasto, crea una sola cucitura sotto e una superficie moderatamente tesa.', duration:'Controllo' },
    'Staglio + formatura': { icon:'◯', short:'Taglia netto, raccogli i bordi, capovolgi la cucitura sotto e tendi solo quanto basta.', duration:'~ 5 min' },
    'Finestra di staglio + formatura': { icon:'◯', short:'È una finestra orientativa: se la massa è pronta, staglia e forma; se è ancora molto fredda o rigida, aspetta.', duration:'Controllo' },
    'Frigo in massa': { icon:'❄', short:'Copri bene e matura la massa intera al freddo. La formatura arriverà dopo.', duration:'Riposo' },
    'Frigo in panetti': { icon:'❄', short:'Conserva i panetti già formati, con chiusura sotto e spazio per l’espansione.', duration:'Riposo' },
    'Inizia il controllo per staglio': { icon:'◎', short:'È una finestra di controllo, non un ordine: valuta freddo, volume e tenuta prima di stagliare.', duration:'Controllo' },
    'Inizia il controllo dei panetti': { icon:'◎', short:'Valuta quanto sono rilassati e sviluppati prima di portarli verso la stesura.', duration:'Controllo' },
    'Appretto · controlla lo stato': { icon:'◴', short:'Lascia che il panetto recuperi estensibilità e volume; il tempo reale dipende da temperatura e fermentazione.', duration:'Controllo' },
    'Controlla l’appretto': { icon:'◴', short:'Il panetto deve essere rilassato e vivo, non rigido né collassante.', duration:'Controllo' },
    'Stesura': { icon:'👐', short:'Distribuisci il gas con pressioni progressive e mani larghe; se si ritira, riposo invece di forza.', duration:'~ 10 min' },
    'Riposo finale in teglia · se serve': { icon:'◴', short:'Solo se l’impasto ha ancora tensione: copri e lascia rilassare brevemente prima del forno.', duration:'15–30 min' },
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
      const row=create('li',{class:`visualTimelineStep ${state}`,'data-step-label':item.label});
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
        actionButton.addEventListener('click',()=>openTimelineAction(action,item));
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
      tray: { width:data.width, height:data.height, pans:data.pans },
      kneadMethod: data.kneadMethod || 'hand',
      coldProcess: data.coldProcess || 'bulk',
      fridgeTemp: Number.isFinite(data.fridgeTemp) ? data.fridgeTemp : null,
      doughTemp: Number.isFinite(data.doughTemp) ? data.doughTemp : null,
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
      create('p', { class: 'resultMeta', text: `${methodLabel(data.hours)} · ${kneadMethodLabel(data.kneadMethod)}${data.hours>12?` · ${coldProcessLabel(data.coldProcess)}`:''} · ${round(data.hours, 1)} h · ${round(data.doughPer, 0)} g per teglia` })
    );
    const hydrationBadge = create('div', { class: 'hydrationBadge' });
    hydrationBadge.append(
      create('strong', { text: `${round(data.hydration, 0)}%` }),
      create('span', { text: 'idratazione' })
    );
    head.append(title, hydrationBadge);
    shell.append(head);

    if (Number.isFinite(data.doughTemp)) {
      const tempStatus = data.doughTemp < 22
        ? ['Impasto fresco', 'Sotto 22 °C: fermentazione più lenta; usa la timeline come riferimento e guarda soprattutto i segnali reali.']
        : data.doughTemp <= 24
          ? ['Temperatura in zona utile', '22–24 °C è un riferimento pratico per una gestione domestica controllabile.']
          : ['Impasto caldo', 'Sopra 24 °C la fermentazione accelera: riduci le attese automatiche e controlla prima volume e struttura.'];
      const tempNote=create('div',{class:'processNote'});
      tempNote.append(
        create('span',{class:'resultEyebrow',text:'Temperatura finale'}),
        create('strong',{text:`${round(data.doughTemp,1)} °C · ${tempStatus[0]}`}),
        create('p',{text:tempStatus[1]})
      );
      shell.append(tempNote);
    }

    if (data.hours > 12 && Number.isFinite(data.fridgeTemp)) {
      const fridgeWarm=data.fridgeTemp>5;
      const fridgeNote=create('div',{class:'processNote'});
      fridgeNote.append(
        create('span',{class:'resultEyebrow',text:'Frigorifero misurato'}),
        create('strong',{text:`${round(data.fridgeTemp,1)} °C · ${fridgeWarm?'controllo più attento':'freddo regolare'}`}),
        create('p',{text:fridgeWarm
          ? 'Un frigo sopra circa 5 °C rallenta meno la fermentazione: considera gli orari come finestre di controllo e osserva il volume più spesso.'
          : 'La temperatura è compatibile con una gestione fredda domestica; stato reale e volume restano comunque prioritari rispetto all’orologio.'})
      );
      shell.append(fridgeNote);
    }

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
      data.kneadMethod === 'hand'
        ? 'Lavora poco: dopo il riposo controllerai se serve un rinforzo.'
        : 'Porta l’impasto a uno sviluppo ordinato, poi controlla la struttura prima di aggiungere altre pieghe.',
      data.hours > 12
        ? (data.coldProcess === 'balls'
            ? 'Dopo la struttura: staglia e forma i panetti prima del frigo, senza creare una pelle rigida.'
            : 'Dopo la struttura: frigo in massa; staglio e formatura arriveranno più vicino alla stesura.')
        : 'Se stagli prima della stesura, separa la formatura dalle pieghe di rinforzo.'
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
    const main=create('section',{class:`savedPlan ${status.phase==='finished'?'finishedPlan':''}`});
    const label=status.phase==='scheduled'?'Impasto pianificato':status.phase==='finished'?'Ultimo impasto':'Stato atteso ora';
    main.append(create('span',{class:'flowEyebrow',text:label}));
    const currentBox=create('div',{class:'savedNext'});
    const primary=status.phase==='scheduled'?status.next:status.current;

    if(status.phase==='finished'){
      currentBox.append(create('div',{},[
        create('h3',{text:plan.pizza||'Impasto completato'}),
        create('p',{text:`Completato · cottura ${fmtShortDate(new Date(plan.bake))}`})
      ]));
      const finishedActions=create('div',{class:'finishedActions'});
      const remake=create('button',{type:'button',class:'finishedPrimary',text:'Nuovo impasto'});
      remake.addEventListener('click',()=>openView('calc'));
      const feedback=create('button',{type:'button',class:'finishedSecondary',text:'Com’è venuta?'});
      feedback.addEventListener('click',()=>openCheckTool('result'));
      finishedActions.append(remake,feedback);
      currentBox.append(finishedActions);
    } else {
      const primaryTitle=status.phase==='scheduled'?'Non ancora iniziato':primary?.label||'Timeline conclusa';
      currentBox.append(create('div',{},[create('h3',{text:primaryTitle}),create('p',{text:`${plan.pizza} · cottura ${fmtShortDate(new Date(plan.bake))}`})]));
      if(primary) {
        currentBox.append(create('time',{text:fmtShortDate(new Date(primary.date)),datetime:primary.date}));
        const primaryAction=timelineActionFor(primary);
        if(primaryAction){
          const config=TIMELINE_ACTIONS[primaryAction];
          const go=create('button',{type:'button',class:'timelineAction savedPrimaryAction',text:config?.label||'Apri guida →'});
          go.addEventListener('click',()=>openTimelineAction(primaryAction,primary));
          currentBox.append(go);
        }
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
    const details=create('details',{class:'savedPlanDetails'}); details.append(create('summary',{text:'Dosi e timeline'}));
    const ingredientsSection=create('div',{class:'savedPlanSection savedDosesSection'}); ingredientsSection.append(create('h4',{text:'Dosi'}));
    const list=create('div',{class:'savedDoseGrid'}),rows=[];
    if(Array.isArray(plan.ingredients.flourBlend)&&plan.ingredients.flourBlend.length>1) plan.ingredients.flourBlend.forEach(item=>rows.push([`Farina ${item.index} · ${round(item.pct,0)}%`,`${round(item.grams)} g`]));
    else rows.push(['Farina',`${round(plan.ingredients.flour)} g`]);
    rows.push(['Acqua',`${round(plan.ingredients.water)} g`],['Sale',`${round(plan.ingredients.saltG)} g`],['Olio',`${round(plan.ingredients.oilG)} g`],['Lievito fresco',`${round(plan.ingredients.yeastG,1)} g`]);
    rows.forEach(([label,value])=>list.append(create('div',{class:'savedDose'},[create('span',{text:label}),create('strong',{text:value})])));
    ingredientsSection.append(list); details.append(ingredientsSection);
    const timelineSection=create('div',{class:'savedPlanSection'}); timelineSection.append(create('h4',{text:'Timeline'}),renderPremiumTimeline(plan.timeline)); details.append(timelineSection);
    main.append(details);
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
      'Dopo il riposo controlla la struttura: fai un rinforzo solo se la massa ne ha bisogno.',
      plan.method && /frigo|maturazione|intermedio|lunga/i.test(plan.method)
        ? (plan.coldProcess === 'balls'
            ? 'Staglia e forma i panetti prima del frigo: chiusura sotto, tensione moderata.'
            : 'Matura in massa al freddo; staglio e formatura arrivano più vicino alla stesura.')
        : 'Se stagli, tieni separata la formatura dalle pieghe di rinforzo.'
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
    const status=timelineStatus(plan.timeline);
    if($('homeActiveTitle')) $('homeActiveTitle').textContent=status.phase==='finished'?'Il tuo ultimo impasto':'Segui il prossimo passaggio';
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
    const kneadMethod = $('kneadMethod')?.value || 'hand';
    const coldProcess = $('coldProcess')?.value || 'bulk';
    const fridgeTemp = optionalNumber('fridgeTemp', 1, 12);
    const doughTemp = optionalNumber('doughTemp', 10, 40);
    const timeline = buildTimeline(start, bake, hours, kneadMethod, coldProcess, fridgeTemp);
    const flourBlend = activeFlours().map((item) => ({
      ...item,
      grams: flour * item.pct / 100
    }));

    renderRecipeResult({
      width, height, pans, load, start, bake, hours, hydration, salt, oil, yeast, honey, kneadMethod, coldProcess, fridgeTemp, doughTemp,
      area, doughPer, total, flour, water, saltG, oilG, yeastG, honeyG, timeline, flourBlend
    });
  }

  function doughAdviceText(place, state, time, phase = 'initial') {
    const context = place === 'frigo' ? 'in frigo' : place === 'teglia' ? 'già in teglia' : 'a temperatura ambiente';
    const isSoon = time === 'less1';
    const isLong = time === 'over6';
    const isSeveralHours = time === '3to6' || isLong;

    if (phase !== 'initial' && state === 'molle') {
      return {
        context,
        doNow:phase === 'stretch'
          ? 'Sostienilo con mani larghe e riduci al minimo i movimenti: ora la priorità è trasferire senza perdere altro gas.'
          : 'Riduci la manipolazione e valuta volume, temperatura e tenuta prima di pensare a un rinforzo.',
        avoid:'Non usare una piega di rinforzo come correzione automatica fuori dalla puntata iniziale.',
        next:phase === 'proof'
          ? 'Se è già molto gonfio, accorcia l’appretto e passa alla stesura.'
          : 'Prosegui in base allo stato reale, non alla voglia di “stringerlo”.'
      };
    }

    if ((phase === 'postcold' || phase === 'proof') && state === 'rigido') {
      return {
        context,
        doNow:'Copri e lascia che il panetto si rilassi: dopo freddo e formatura la tensione deve scendere prima della stesura.',
        avoid:'Non aggiungere altre pieghe e non pirlare ancora per vincere la resistenza.',
        next:'Ricontrolla tra 15–30 minuti; quando si allarga con meno ritorno elastico, passa alla stesura.'
      };
    }

    if (state === 'indietro') {
      if (place === 'frigo' && isLong) {
        return {
          context,
          doNow:'Lascialo coperto in frigo: con più di 6 ore davanti non serve accelerarlo adesso.',
          avoid:'Non portarlo a temperatura ambiente con così tanto anticipo e non aggiungere pieghe solo perché è poco cresciuto.',
          next:'Ricontrollalo più vicino alla stesura; tiralo fuori solo quando serve davvero far ripartire la fermentazione.'
        };
      }
      if (place === 'frigo') {
        return {
          context,
          doNow:'Portalo fuori e lascialo riprendere temperatura, coperto.',
          avoid:'Non forzare stesura o pieghe mentre è ancora freddo e contratto.',
          next:isSoon?'Controllalo ogni 15–20 minuti: se si rilassa, passa alla stesura.':'Ricontrolla volume e morbidezza tra 30–45 minuti.'
        };
      }
      if (place === 'teglia') {
        return {
          context,
          doNow:'Tienilo coperto e dagli ancora tempo se il forno non è imminente.',
          avoid:'Non schiacciarlo di nuovo per “farlo crescere”.',
          next:isSoon?'Se resta molto indietro, cuoci quando mostra almeno un minimo di rilassamento e volume.':'Ricontrolla tra 20–30 minuti.'
        };
      }
      return {
        context,
        doNow:'Lascialo coperto a temperatura ambiente e osserva se acquista volume e si rilassa.',
        avoid:'Non aggiungere lavorazioni aggressive: poco volume non significa automaticamente poca struttura.',
        next:isSeveralHours?'Ricontrolla tra 30–45 minuti; se l’ambiente è caldo e accelera troppo, spostalo al fresco.':'Ricontrolla tra 20–30 minuti.'
      };
    }

    if (state === 'giusto') {
      if (isLong) {
        return {
          context,
          doNow:place === 'frigo' ? 'Tienilo coperto in frigo: è già in una buona condizione e deve solo conservarla.' : 'Se mancano ancora molte ore, rallentalo mettendolo al fresco.',
          avoid:'Non aggiungere pieghe o lunghi periodi al caldo “per sicurezza”.',
          next:'Ricontrollalo quando ti avvicini alla stesura.'
        };
      }
      return {
        context,
        doNow:place === 'frigo' ? 'Portalo fuori con il solo anticipo necessario a farlo rilassare prima della stesura.' : 'Non lavorarlo più del necessario: è nella condizione che cerchi.',
        avoid:'Non aggiungere pieghe “per sicurezza”.',
        next:isSoon?'Quando è rilassato, stendi e passa alla cottura secondo la guida.':'Prepara banco e teglia e ricontrolla più vicino alla stesura.'
      };
    }

    if (state === 'triplicato') {
      if (isLong) {
        return {
          context,
          doNow:place === 'frigo' ? 'Tienilo freddo e manipolalo il meno possibile.' : 'Raffreddalo ora per rallentare la fermentazione.',
          avoid:'Non fare pieghe per ridargli forma: perderesti gas senza riportare indietro la fermentazione.',
          next:'Ricontrolla più tardi; se continua a crescere rapidamente, valuta di anticipare la cottura.'
        };
      }
      return {
        context,
        doNow:'Accompagnalo senza ristrutturarlo: stesura delicata e riposo finale breve o nullo se è già molto gonfio.',
        avoid:'Niente pieghe e niente lunga attesa al caldo.',
        next:'Cuoci appena è steso e stabile in teglia.'
      };
    }

    if (state === 'collasso') {
      if (place === 'teglia') {
        return {
          context,
          doNow:'Non rimaneggiarlo: se riesce ancora a sostenersi, inforna appena il forno è pronto.',
          avoid:'Non ripiegare o ristendere da capo un impasto che sta già perdendo struttura.',
          next:'Per la prossima volta riduci la fase finale al caldo o anticipa la stesura/cottura.'
        };
      }
      if (isSoon) {
        return {
          context,
          doNow:'Manipolalo il minimo indispensabile, stendi con delicatezza e cuoci presto.',
          avoid:'Non cercare di “salvarlo” con pieghe forti o ripetute.',
          next:'Accorcia al minimo il riposo finale in teglia.'
        };
      }
      return {
        context,
        doNow:place === 'frigo' ? 'Tienilo coperto e freddo. Se sta davvero perdendo volume anche in frigo, non aspettare passivamente tutte le ore previste.' : 'Rimettilo subito al fresco per rallentare la fermentazione.',
        avoid:'Non sommare pieghe: un collasso può dipendere da fermentazione troppo avanzata o struttura già degradata.',
        next:'Ricontrolla tra 30–45 minuti. Se continua a cedere, valuta di anticipare stesura e cottura rispetto al programma.'
      };
    }

    if (state === 'rigido') {
      if (place === 'frigo') {
        return {
          context,
          doNow:'Lascialo coperto fuori dal frigo finché perde tensione e diventa più estensibile.',
          avoid:'Non giudicarlo o stenderlo appena freddo: il freddo aumenta la resistenza.',
          next:'Riprova delicatamente dopo 20–30 minuti.'
        };
      }
      return {
        context,
        doNow:'Copri e lascialo rilassare senza toccarlo.',
        avoid:'Non tirarlo più forte e non aggiungere altra farina per vincere la resistenza.',
        next:place === 'teglia' ? 'Completa la stesura dopo 10–15 minuti.' : 'Riprova dopo 15–20 minuti.'
      };
    }

    if (state === 'molle') {
      if (isSoon) {
        return {
          context,
          doNow:'Riduci al minimo i movimenti e sostienilo con mani larghe durante la stesura.',
          avoid:'Non correggerlo aggiungendo molta farina o facendo pieghe all’ultimo momento.',
          next:'Trasferiscilo in teglia e cuoci senza un lungo riposo finale.'
        };
      }
      if (place === 'frigo') {
        return {
          context,
          doNow:'Tienilo freddo e osserva se è ancora continuo e capace di mantenere una massa riconoscibile.',
          avoid:'Non fare una piega solo perché è morbido: se è già molto gonfio, potresti sgonfiarlo senza risolvere la causa.',
          next:'Se è ancora all’inizio, poco gonfio e continuo, valuta un solo rinforzo leggero; altrimenti limita la manipolazione.'
        };
      }
      return {
        context,
        doNow:isSeveralHours?'Mettilo al fresco e riduci la manipolazione.':'Lascialo riposare coperto e valuta la tenuta, non solo quanto appiccica.',
        avoid:'Non sommergerlo di farina e non concatenare pieghe senza capire se è semplicemente caldo o già molto fermentato.',
        next:'Ricontrolla tra 15–20 minuti e scegli in base a tenuta, volume e temperatura.'
      };
    }

    if (state === 'strappa') {
      return {
        context,
        doNow:'Fermati e coprilo. La prima correzione è il riposo, non altra forza.',
        avoid:'Non continuare a tirare e non cercare di chiudere gli strappi con altra lavorazione aggressiva.',
        next:isSoon?'Dopo 10–15 minuti riprendi con mani larghe e movimenti minimi; se continua a cedere, trasferisci in teglia senza cercare la perfezione.':'Ricontrolla dopo 15–20 minuti e valuta se è teso oppure già indebolito.'
      };
    }

    return {
      context,
      doNow:'Osserva volume, tenuta e temperatura prima di intervenire.',
      avoid:'Non applicare una correzione automatica senza leggere lo stato reale dell’impasto.',
      next:'Ricontrolla dopo un breve riposo.'
    };
  }

  const problemRules = {
    alta: ['Troppo impasto per la teglia, riposo in teglia lungo o impasto già molto avanti.', 'Cuoci bene sotto e taglia porzioni più piccole.', 'Scendi a 0,48–0,54 g/cm² o accorcia il riposo in teglia.'],
    bassaDura: ['Troppo poco impasto, poca fermentazione, stesura aggressiva o cottura troppo lunga.', 'Evita altra cottura; usa condimento umido o olio a crudo.', 'Aumenta leggermente carico impasto e non schiacciare tutta l’aria.'],
    fondoPallido: ['Forno non abbastanza preriscaldato, ripiano troppo alto, teglia poco conduttiva o troppa umidità.', 'Sposta in basso e prolunga la prima fase.', 'Preriscalda 40–45 minuti e limita acqua dei condimenti.'],
    fondoBruciato: ['Teglia molto conduttiva, ripiano troppo basso troppo a lungo o forno aggressivo sotto.', 'Sposta medio-alto e completa sopra.', 'Riduci minuti in basso o usa teglia meno aggressiva.'],
    sopraBagnata: ['Pomodoro/mozzarella troppo acquosi, verdure non asciutte o mozzarella messa troppo presto.', 'Se il fondo è già pronto, rifinisci medio-alto; ventilato solo brevemente negli ultimi minuti se il tuo forno lo richiede.', 'Scola mozzarella, usa pomodoro denso e aggiungi latticini nella seconda fase.'],
    mozzarellaAcqua: ['Mozzarella non scolata o messa troppo presto.', 'Rifinitura breve medio-alta; non prolungare troppo o secchi la base.', 'Taglia 2–4 ore prima e scola coperta in frigorifero; aggiungila solo nella seconda fase.'],
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
      const advice = doughAdviceText($('doughPlace').value, $('doughState').value, $('doughTime').value, $('doughPhase')?.value || 'initial');
      panel.append(
        adviceRow('Adesso', advice.doNow, 'primaryRow'),
        adviceRow('Evita', advice.avoid, 'badRow'),
        adviceRow('Poi', advice.next, 'okRow'),
        adviceRow('Contesto', `Impasto ${advice.context} · ${doughPhaseLabel($('doughPhase')?.value)} · ${$('doughTime').selectedOptions[0]?.textContent || ''}.`, 'contextRow')
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

  function refreshAdviceIfVisible() {
    const target=$('adviceOutput');
    if(target?.childElementCount) renderAdvice();
  }

  function guideStep(number, title, texts) {
    const step = create('div', { class: 'guideStep' });
    const head = create('div', { class: 'guideStepHead' });
    head.append(create('span', { class: 'stepNumber', text: String(number) }), create('strong', { text: title }));
    step.append(head);
    texts.forEach((text) => step.append(create('p', { text })));
    return step;
  }

  function cookQuantityRange(area, lowPerCm2, highPerCm2, step = 5) {
    const low=Math.max(step,Math.round((area*lowPerCm2)/step)*step);
    const high=Math.max(low,Math.round((area*highPerCm2)/step)*step);
    return `${low}–${high} g`;
  }

  function renderCookBottomAdvice(state, pizza) {
    const target=$('cookBottomAdvice');
    if(!target) return;
    const hasMozzarella=pizza==='margherita';
    const states={
      pale:{
        title:'Resta sul livello basso',
        text:hasMozzarella
          ? 'Il fondo è ancora pallido o molle. Aggiungi rapidamente la mozzarella ben scolata e rimetti la teglia in basso; controlla presto perché ora la superficie inizierà comunque a cuocere.'
          : 'Il fondo è ancora pallido o molle. Continua sul livello basso e ricontrolla a breve prima di spostare la teglia.'
      },
      ready:{
        title:'Passa alla finitura',
        text:hasMozzarella
          ? 'Fondo asciutto con prime zone dorate: aggiungi la mozzarella ben scolata e sposta la teglia al livello medio o alto per 3–6 minuti, controllando superficie e bordo.'
          : 'Fondo asciutto con prime zone dorate: sposta al livello medio o alto per completare superficie e bordo senza seccare la base.'
      },
      dark:{
        title:'Proteggi subito il fondo',
        text:hasMozzarella
          ? 'Il fondo è già molto colorito. Aggiungi la mozzarella, sposta subito medio-alto e termina nel minor tempo possibile. Evita ventilato o grill se non strettamente necessario.'
          : 'Il fondo è già molto colorito. Sposta subito medio-alto e termina rapidamente; evita altro calore dal basso.'
      }
    };
    const advice=states[state]||states.ready;
    clear(target);
    target.append(create('strong',{text:advice.title}),create('p',{text:advice.text}));
  }

  function renderCookGuide() {
    const pizza=$('pizzaType').value, pan=$('panType').value, target=$('cook');
    clear(target); closeCookTimer();

    const plan=techniqueOrigin.view==='impasto'?getLastPlan():null;
    const summary=planSummary(plan);
    const area=summary?.area || (37*26);
    const sizeLabel=summary?.area?`${round(summary.width,0)}×${round(summary.height,0)}`:'37×26';
    const tomatoRange=cookQuantityRange(area,0.092,0.132,5);
    const mozzarellaRange=cookQuantityRange(area,0.092,0.126,5);
    const finishOilRange=cookQuantityRange(area,0.003,0.006,1);
    const firstCheckMinutes=area >= 1400 ? 12 : 10;
    const firstWindow=area >= 1400 ? '12–16 min' : '10–14 min';

    const panel=card('Guida operativa','cookGuide cookGuideV2');

    const summaryBox=create('div',{class:'cookRecipeSummary'});
    summaryBox.append(
      create('span',{class:'flowEyebrow',text:`${sizeLabel} · ${pan==='leccarda'?'leccarda':pan}`}),
      create('strong',{text:pizza==='margherita'?'Margherita':pizza==='rossa'?'Rossa semplice':'Bianca patate e lardo'}),
      create('p',{text:pizza==='margherita'
        ? `Pomodoro ${tomatoRange} · mozzarella asciutta ${mozzarellaRange} · olio finale ${finishOilRange}`
        : pizza==='rossa'
          ? `Pomodoro ${tomatoRange} · olio finale ${finishOilRange}`
          : `Poco olio e sale prima della cottura; topping asciutti o già cotti quando possibile.`})
    );
    panel.append(summaryBox);

    const panText=pan==='leccarda'
      ? 'Leccarda: comportamento molto variabile. Parti in basso e fidati del fondo reale più che del tempo.'
      : pan==='ferro'
        ? 'Ferro blu: favorisce la doratura. Controlla il fondo presto e sposta in alto appena è pronto.'
        : pan==='alluminio'
          ? 'Alluminio: buona conduzione e risposta rapida. Il fondo va controllato prima di prolungare la prima fase.'
          : 'Antiaderente: conduzione spesso più moderata. Preriscaldo completo e livello basso diventano ancora più importanti.';

    panel.append(guideStep(1,'Preriscalda davvero',[panText,'Forno statico a 250 °C per 40–50 minuti. La spia di temperatura non garantisce che pareti e camera siano già stabilizzate.']));
    const preheat=create('button',{type:'button',class:'stepTimer',text:'Timer minimo · 40 min'});
    preheat.addEventListener('click',()=>startCookTimer(40,'Preriscaldo minimo'));
    panel.lastElementChild.append(preheat);

    const phaseOneTexts=[];
    if(pizza==='margherita'||pizza==='rossa') phaseOneTexts.push(`Stendi uno strato sottile di pomodoro: per ${sizeLabel}, riferimento ${tomatoRange}.`);
    else phaseOneTexts.push('Condisci leggermente con olio e sale. Per patate: fettine molto sottili, ben asciutte e in strato non spesso; il lardo arriverà solo alla fine.');
    phaseOneTexts.push(`Inforna sul livello basso. Non aprire inutilmente per i primi 8–10 minuti. Finestra esplorativa per questa teglia: ${firstWindow}.`);
    phaseOneTexts.push('Il passaggio di fase arriva quando il bordo comincia a colorire e, sollevando un angolo con una spatola, il fondo è asciutto con le prime zone dorate.');
    panel.append(guideStep(2,'Prima fase · costruisci il fondo',phaseOneTexts));
    const first=create('button',{type:'button',class:'stepTimer',text:`Primo controllo · ${firstCheckMinutes} min`});
    first.addEventListener('click',()=>startCookTimer(firstCheckMinutes,'Controlla il fondo'));
    panel.lastElementChild.append(first);

    const bottomCheck=create('section',{class:'cookBottomCheck','aria-labelledby':'cookBottomTitle'});
    bottomCheck.append(create('div',{class:'techniqueSectionHead'},[
      create('span',{class:'flowEyebrow',text:'Bivio reale'}),
      create('h3',{id:'cookBottomTitle',text:'Com’è il fondo?'})
    ]));
    const choices=create('div',{class:'cookBottomChoices'});
    [
      ['pale','Pallido / molle','Non ha ancora costruito crosta.'],
      ['ready','Asciutto / prime zone dorate','È pronto per la seconda fase.'],
      ['dark','Già molto colorito','Proteggilo dal calore sotto.']
    ].forEach(([value,title,desc])=>{
      const btn=create('button',{type:'button',class:'cookBottomChoice','data-bottom-state':value});
      btn.append(create('strong',{text:title}),create('small',{text:desc}));
      btn.addEventListener('click',()=>{
        choices.querySelectorAll('.cookBottomChoice').forEach(item=>item.classList.remove('selected'));
        btn.classList.add('selected');
        renderCookBottomAdvice(value,pizza);
      });
      choices.append(btn);
    });
    bottomCheck.append(choices,create('div',{id:'cookBottomAdvice',class:'cookBottomAdvice'},[
      create('strong',{text:'Sollevane un angolo'}),
      create('p',{text:'Scegli lo stato del fondo: sarà lui a decidere posizione e seconda fase.'})
    ]));
    panel.append(bottomCheck);

    const finishTexts=[];
    if(pizza==='margherita') {
      finishTexts.push(`Aggiungi mozzarella ben scolata: riferimento ${mozzarellaRange}. Lavora rapidamente.`);
    } else if(pizza==='bianca') {
      finishTexts.push('Completa la superficie; il lardo va fuori forno o negli ultimissimi secondi. Altri ingredienti freschi o molto umidi arrivano solo quando la base è pronta.');
    } else {
      finishTexts.push('Completa senza aggiungere umidità inutile: il pomodoro deve concentrarsi, non ribollire in superficie.');
    }
    finishTexts.push('Seconda fase: circa 3–6 minuti. Statico resta la scelta base; ventilato solo negli ultimi 2–4 minuti se serve davvero ad asciugare la superficie.');
    finishTexts.push('Grill solo brevissimo, sorvegliato e solo se il manuale del forno lo consente.');
    panel.append(guideStep(3,'Seconda fase · asciuga e completa',finishTexts));
    const finishTimer=create('button',{type:'button',class:'stepTimer',text:'Controllo finitura · 3 min'});
    finishTimer.addEventListener('click',()=>startCookTimer(3,'Controlla superficie e fondo'));
    panel.lastElementChild.append(finishTimer);

    const finalChecks=create('section',{class:'cookFinalChecks'});
    finalChecks.append(create('div',{class:'techniqueSectionHead'},[
      create('span',{class:'flowEyebrow',text:'Prima di sfornare'}),
      create('h3',{text:'Tre controlli'})
    ]));
    const grid=create('div',{class:'cookFinalGrid'});
    [
      ['Fondo','Asciutto e dorato, non molle o bianco.'],
      ['Centro','Premendo leggermente non deve sembrare vischioso, umido e schiacciato.'],
      ['Superficie','Mozzarella fusa senza acqua libera; pomodoro concentrato; verdure senza pozze.']
    ].forEach(([title,textValue])=>grid.append(create('article',{},[create('strong',{text:title}),create('p',{text:textValue})])));
    finalChecks.append(grid);
    panel.append(finalChecks);

    panel.append(guideStep(4,'Fuori dal forno',['Togli subito la pizza dalla teglia e trasferiscila su una griglia per 2–4 minuti. Taglia dopo un breve assestamento: lasciarla nella teglia rovente favorisce condensa e perdita di croccantezza.']));

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
    updateColdProcessHint();
  }

  

  function updateColdProcessHint() {
    const field=$('coldProcess');
    const hint=$('coldProcessHint');
    if(!field||!hint) return;
    hint.textContent=field.value==='balls'
      ? 'Panetti già formati prima del frigo: utile se conosci bene volume, contenitori e temperatura del tuo frigorifero.'
      : 'Per programmi oltre 12 ore: maturazione in massa, poi staglio e formatura dopo il frigo.';
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
      button.addEventListener('click', () => {
        const target=button.dataset.open;
        const isTechniqueTarget=target==='pieghe'||target==='formatura'||target==='stesura'||target==='cottura';
        const activeTechnique=document.querySelector('.techniqueView.active');
        if(isTechniqueTarget && activeTechnique) openView(target);
        else if(isTechniqueTarget) openTechniqueFromHome(target);
        else openView(target);
      });
    });
    document.querySelectorAll('[data-tech-back]').forEach((button) => {
      button.addEventListener('click', goBackFromTechnique);
    });
    document.querySelectorAll('[data-structure-state]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-structure-state]').forEach((item)=>{
          item.classList.remove('selected');
          item.setAttribute('aria-pressed','false');
        });
        button.classList.add('selected');
        button.setAttribute('aria-pressed','true');
        renderStructureStateAdvice(button.dataset.structureState);
      });
    });
    document.querySelectorAll('[data-shape-process]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-shape-process]').forEach((item)=>{
          item.classList.remove('selected');
          item.setAttribute('aria-pressed','false');
        });
        button.classList.add('selected');
        button.setAttribute('aria-pressed','true');
        renderShapeProcessAdvice(button.dataset.shapeProcess);
      });
    });
    document.querySelectorAll('[data-stretch-state]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-stretch-state]').forEach((item)=>item.classList.remove('selected'));
        button.classList.add('selected');
        renderStretchStateAdvice(button.dataset.stretchState);
      });
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
    $('coldProcess')?.addEventListener('change', updateColdProcessHint);
    ['doughPhase','doughPlace','doughTime','doughState','problemType'].forEach((id)=>{
      $(id)?.addEventListener('change', refreshAdviceIfVisible);
    });

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
      const field=$('flourCatalog' + index);
      field?.addEventListener('input', () => applyCatalogFlour(index));
      field?.addEventListener('change', () => applyCatalogFlour(index));
    });
    $('startNowBtn')?.addEventListener('click', setStartNow);
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
