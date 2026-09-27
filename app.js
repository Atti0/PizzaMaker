(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const PREF_PREFIX = 'tc7_';
  const PRIVACY_KEY = 'tc_privacy_notice_ok';
  const PREF_IDS = [
    'w','h','n','start','bake','flourProfile','saltProfile',
    'flourType','protein','lmMix','hydration','customHyd','customSalt'
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
      else if (key === 'htmlFor') node.htmlFor = value;
      else node.setAttribute(key, value);
    });
    children.forEach((child) => {
      if (typeof child === 'string') node.append(document.createTextNode(child));
      else if (child) node.append(child);
    });
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function card(title, className = '') {
    const node = create('div', { class: `resultCard ${className}`.trim() });
    node.append(create('h3', { text: title }));
    return node;
  }

  function addParagraph(parent, text) {
    const p = create('p', { text });
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function toggleCustoms() {
    $('customHydWrap')?.classList.toggle('hidden', $('hydration').value !== 'custom');
    $('customSaltWrap')?.classList.toggle('hidden', $('saltProfile').value !== 'custom');
  }

  function applyFlourProfileDefaults() {
    const profile = $('flourProfile').value;
    const flourType = $('flourType');
    const protein = $('protein');
    const lmMix = $('lmMix');

    if (profile === 'common') {
      flourType.value = '00';
      protein.value = '10.8';
      lmMix.value = 'no';
    } else if (profile === 'standard') {
      flourType.value = '0';
      protein.value = '12.5';
      lmMix.value = 'no';
    } else if (profile === 'strong') {
      flourType.value = '0';
      protein.value = '13.2';
      lmMix.value = 'no';
    } else if (profile === 'whole') {
      flourType.value = '1';
      protein.value = '12.5';
      lmMix.value = 'yes';
    }
  }

  function estimateHydration() {
    const protein = clampNumber('protein', 12.5, 8, 17);
    const type = $('flourType').value;
    const lm = $('lmMix').value;
    let hydration;

    if (protein < 10.8) hydration = 64;
    else if (protein < 11.8) hydration = 66;
    else if (protein < 12.8) hydration = 68;
    else if (protein < 13.7) hydration = 70;
    else hydration = 72;

    if (type === '1') hydration += 1.5;
    if (type === '2') hydration += 2.5;
    if (type === 'integrale') hydration += 4;
    if (lm === 'yes') hydration += 1.5;

    const hours = hoursBetween(new Date($('start').value), new Date($('bake').value));
    if (hours >= 18 && protein >= 12) hydration += 0.5;

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
      { label: 'Impasto grezzo', date: start, kind: 'now' },
      { label: 'Riposo 20 min coperto', date: addMinutes(start, 20) },
      { label: 'Sale + olio', date: addMinutes(start, 40) },
      { label: '1ª piega leggera', date: addMinutes(start, 60) },
      { label: '2ª piega leggera', date: addMinutes(start, 85) }
    ];

    if (hours <= 12) {
      timeline.push(
        { label: 'Stesura', date: addMinutes(bake, -75) },
        { label: 'Riposo in teglia coperto', date: addMinutes(bake, -60) },
        { label: 'Cottura', date: bake }
      );
    } else {
      timeline.push(
        { label: 'Frigo coperto dopo le pieghe', date: addMinutes(start, 115) },
        { label: 'Controllo volume', date: addMinutes(bake, -120) },
        { label: 'Fuori frigo o stesura secondo stato impasto', date: addMinutes(bake, -90) },
        { label: 'Cottura', date: bake }
      );
    }

    return timeline;
  }

  function nextTimelineStep(timeline) {
    const now = new Date();
    return timeline.find((item) => item.date > now) ?? timeline[timeline.length - 1];
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

    const next = nextTimelineStep(data.timeline);

    const nextCard = card('Prossimo step', 'primary');
    nextCard.append(create('span', { class: 'bigStep', text: fmtShortDate(next.date) }));
    addParagraph(nextCard, next.label);
    target.append(nextCard);

    const kpis = card('Sintesi');
    const grid = create('div', { class: 'kpi' });
    [
      ['Pizza', resultName(data.load)],
      ['Metodo', methodLabel(data.hours)],
      ['Impasto/teglia', `${round(data.doughPer, 0)} g`],
      ['Tempo', `${round(data.hours, 1)} h`]
    ].forEach(([label, value]) => {
      const item = create('div', { class: 'kpiItem' });
      item.append(create('span', { text: label }), create('strong', { text: value }));
      grid.append(item);
    });
    kpis.append(grid);
    target.append(kpis);

    const weigh = card('Cosa pesare', 'ok');
    const list = create('ul', { class: 'recipeList' });
    const rows = [
      ['Farina', `${round(data.flour)} g`],
      ['Acqua', `${round(data.water)} g (${round(data.hydration, 1)}%)`],
      ['Sale', `${round(data.saltG)} g (${round(data.salt, 1)}%)`],
      ['Olio', `${round(data.oilG)} g`],
      ['Lievito fresco', `${round(data.yeastG, 1)} g`]
    ];
    if (data.honeyG > 0) rows.push(['Miele', `${round(data.honeyG, 1)} g`]);
    rows.forEach(([label, value]) => {
      list.append(create('li', {}, [create('span', { text: label }), create('b', { text: value })]));
    });
    weigh.append(list);
    target.append(weigh);

    const nowCard = card('Cosa fare adesso');
    const actions = create('ul', { class: 'adviceList' });
    [
      'Mescola farina, lievito e circa 85–90% dell’acqua.',
      'Copri la ciotola e lascia riposare 20 minuti.',
      'Aggiungi sale sciolto nell’acqua rimasta, poi olio. Poco lavoro, niente pieghe aggressive.',
      'Tieni 5–10 g d’acqua da parte: aggiungila solo se dopo il riposo l’impasto resta rigido.'
    ].forEach((text) => actions.append(create('li', {}, [create('span', { text })])));
    nowCard.append(actions);
    target.append(nowCard);

    const timelineCard = card('Timeline');
    const timelineList = create('ul', { class: 'timelineList' });
    data.timeline.forEach((item) => {
      timelineList.append(create('li', {}, [create('span', { text: item.label }), create('b', { text: fmtShortDate(item.date) })]));
    });
    timelineCard.append(timelineList);
    target.append(timelineCard);

    const notes = card('Note pratiche', 'warn');
    addParagraph(notes, data.salt <= 2.2 ? 'Sale basso: scelta giusta per condimenti sapidi come lardo, salumi, acciughe, capperi o formaggi molto sapidi.' : 'Sale standard: va bene per margherita e impasti lunghi. Con condimenti molto sapidi puoi scendere a 2,0–2,2%.');
    addParagraph(notes, 'L’idratazione è un consiglio iniziale: la farina decide davvero dopo il primo riposo.');
    target.append(notes);
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

    renderRecipeResult({
      width, height, pans, load, start, bake, hours, hydration, salt, oil, yeast, honey,
      area, doughPer, total, flour, water, saltG, oilG, yeastG, honeyG, timeline
    });
  }

  function doughAdviceText(place, state, time) {
    const context = place === 'frigo' ? 'dal frigo' : place === 'teglia' ? 'già in teglia' : 'a temperatura ambiente';

    const rules = {
      indietro: {
        do: time === 'over6' ? 'Lascialo maturare ancora coperto. Se è in frigo e manca molto, non stressarlo.' : 'Portalo a temperatura ambiente e aspetta finché diventa più gonfio e rilassato.',
        dont: 'Non forzare stesura o pieghe aggressive se è duro e poco sviluppato.',
        next: 'Ricontrolla tra 45–60 minuti.'
      },
      giusto: {
        do: 'Non toccarlo troppo. Stendi quando è rilassato, poi riposo in teglia coperto.',
        dont: 'Non aggiungere pieghe “per sicurezza”: rischi di sgonfiarlo o irrigidirlo.',
        next: time === 'less1' ? 'Stendi ora e fai un riposo breve.' : 'Prepara banco, semola e teglia.'
      },
      triplicato: {
        do: 'Niente pieghe. Stendi delicato e accorcia il riposo in teglia.',
        dont: 'Non ristrutturare: se è bello e gonfio, va accompagnato, non rifatto.',
        next: time === 'over6' ? 'Se manca molto, rimettilo al fresco dopo una gestione minima.' : 'Fuori frigo 20–30 minuti, poi stesura delicata.'
      },
      collasso: {
        do: time === 'over6' || time === '3to6' ? 'Fai una sola piega di salvataggio molto morbida e rimettilo in frigo.' : 'Stendi quasi subito, riposo breve in teglia e cuoci.',
        dont: 'Non fare tre pieghe forti: peggiori strappi e perdita di gas.',
        next: time === 'less1' ? 'Teglia e forno subito.' : 'Controlla dopo 30 minuti.'
      },
      rigido: {
        do: 'Copri e aspetta. Se si ritira, è tensione: serve riposo, non forza.',
        dont: 'Non tirarlo fino a strapparlo e non aggiungere farina sul banco a caso.',
        next: 'Riprova tra 10–20 minuti.'
      },
      molle: {
        do: time === 'less1' ? 'Stendi con mani unte e movimenti minimi.' : 'Una piega morbida può ridare struttura, poi riposo coperto.',
        dont: 'Non sommergerlo di farina: rischi una crosta secca e irregolare.',
        next: 'Valuta consistenza dopo il riposo.'
      },
      strappa: {
        do: 'Stop. Copri e lascia rilassare. Poi riprendi con tocchi leggeri.',
        dont: 'Non insistere con pieghe aggressive: l’impasto sta dicendo che è in tensione o indebolito.',
        next: 'Aspetta 15–20 minuti.'
      }
    };

    return { context, ...rules[state] };
  }

  function renderDoughAdvice() {
    const place = $('doughPlace').value;
    const state = $('doughState').value;
    const time = $('doughTime').value;
    const advice = doughAdviceText(place, state, time);
    const target = $('doughAdvice');
    clear(target);

    const main = card('Cosa fare ora', 'primary');
    addParagraph(main, `${advice.do} Situazione: impasto ${advice.context}.`);
    target.append(main);

    const dont = card('Cosa evitare', 'bad');
    addParagraph(dont, advice.dont);
    target.append(dont);

    const next = card('Prossimo controllo', 'ok');
    addParagraph(next, advice.next);
    target.append(next);
  }

  function renderCookGuide() {
    const pizza = $('pizzaType').value;
    const pan = $('panType').value;
    const target = $('cook');
    clear(target);

    const stretch = card('Stesura', 'ok');
    const stretchList = create('ul', { class: 'adviceList' });
    [
      'Banco con poca semola, lato liscio sopra.',
      'Polpastrelli dal centro verso l’esterno, senza schiacciare tutto.',
      'Se si ritira, pausa 5–10 minuti. La pausa lavora meglio della forza.',
      'Completa in teglia con mani leggere.'
    ].forEach((text) => stretchList.append(create('li', {}, [create('span', { text })])));
    stretch.append(stretchList);
    target.append(stretch);

    const oven = card('Forno e teglia', 'primary');
    const panText = pan === 'leccarda'
      ? 'Con leccarda serve spingere bene la prima fase in basso: è meno conduttiva di ferro/alluminio.'
      : 'Con teglia più conduttiva controlla prima il fondo: può colorire più velocemente.';
    addParagraph(oven, `${panText} Preriscalda davvero 40–45 minuti a 250 °C.`);
    target.append(oven);

    const topping = card('Condimento e cottura');
    if (pizza === 'margherita') {
      addParagraph(topping, 'Pomodoro denso 110–130 g per una 37×26. Prima fase in basso con pomodoro, poi mozzarella scolata solo negli ultimi 2–4 minuti.');
      addParagraph(topping, 'Ventilato o grill solo come rifinitura breve se resta umida sopra.');
    } else if (pizza === 'rossa') {
      addParagraph(topping, 'Pomodoro denso, olio moderato, ripiano basso nella prima fase. È la più adatta se vuoi fondo asciutto e croccante.');
    } else {
      addParagraph(topping, 'Patate sottilissime, sciacquate e asciugate bene. Condiscile prima. Lardo fuori forno o negli ultimi secondi.');
      addParagraph(topping, 'Se le patate sono più spesse, pretrattale o tagliale più sottili: la pizza cuoce più in fretta delle patate grosse.');
    }
    target.append(topping);

    const finish = card('Uscita forno', 'warn');
    addParagraph(finish, 'Appena cotta, togli la pizza dalla teglia e mettila su griglia. Se resta nella teglia, il vapore ammorbidisce il fondo.');
    target.append(finish);
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

  function renderProblemAdvice() {
    const key = $('problemType').value;
    const [cause, now, next] = problemRules[key] ?? problemRules.alta;
    const target = $('problemAdvice');
    clear(target);

    const causeCard = card('Cause probabili', 'warn');
    addParagraph(causeCard, cause);
    target.append(causeCard);

    const nowCard = card('Cosa fare ora', 'primary');
    addParagraph(nowCard, now);
    target.append(nowCard);

    const nextCard = card('Prossima volta', 'ok');
    addParagraph(nextCard, next);
    target.append(nextCard);
  }

  function savePrefs() {
    PREF_IDS.forEach((id) => {
      const node = $(id);
      if (node) localStorage.setItem(PREF_PREFIX + id, node.value);
    });
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
    const savedStyle = localStorage.getItem(PREF_PREFIX + 'style');
    if (savedStyle) {
      const styleNode = document.querySelector(`input[name="style"][value="${CSS.escape(savedStyle)}"]`);
      if (styleNode) styleNode.checked = true;
    }
    toggleCustoms();
  }

  function resetApp() {
    [...PREF_IDS, 'style'].forEach((id) => localStorage.removeItem(PREF_PREFIX + id));
    localStorage.removeItem(PRIVACY_KEY);
    window.location.reload();
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
    $('resetBtn')?.addEventListener('click', resetApp);
    $('printBtn')?.addEventListener('click', () => window.print());
    $('doughAdviceBtn')?.addEventListener('click', renderDoughAdvice);
    $('cookBtn')?.addEventListener('click', renderCookGuide);
    $('problemBtn')?.addEventListener('click', renderProblemAdvice);

    $('flourProfile')?.addEventListener('change', () => {
      applyFlourProfileDefaults();
      calculate();
    });
    $('saltProfile')?.addEventListener('change', () => {
      toggleCustoms();
      calculate();
    });
    $('hydration')?.addEventListener('change', () => {
      toggleCustoms();
      calculate();
    });

    ['w','h','n','start','bake','flourType','protein','lmMix','customHyd','customSalt'].forEach((id) => {
      $(id)?.addEventListener('input', calculate);
      $(id)?.addEventListener('change', calculate);
    });
    $$('input[name="style"]').forEach((node) => node.addEventListener('change', calculate));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && $('privacyOverlay')?.classList.contains('show')) {
        acceptPrivacyNotice();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadPrefs();
    bindEvents();
    calculate();
    renderDoughAdvice();
    renderCookGuide();
    renderProblemAdvice();
    showPrivacyNotice();
  });
})();
