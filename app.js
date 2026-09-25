(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const PREF_PREFIX = 'tc6_';
  const PRIVACY_KEY = 'tc_privacy_notice_ok';
  const PREF_IDS = ['w','h','n','style','flourType','protein','lmMix','hydration','customHyd','saltProfile','customSalt','start','bake'];

  function n(id, fallback, min, max) {
    const el = $(id);
    const value = Number.parseFloat(el?.value ?? '');
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

  function fmtLocalInput(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function fmtDT(date) {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  function addMinDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  function hoursBetween(start, end) {
    return (end - start) / 36e5;
  }

  function clearNode(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else node.setAttribute(key, value);
    });
    children.forEach((child) => node.append(child));
    return node;
  }

  function strong(text, extraStyle = '') {
    const node = el('strong', { text });
    if (extraStyle) node.setAttribute('style', extraStyle);
    return node;
  }

  function note(text, type = '') {
    const node = el('div', { class: `note ${type}`.trim() });
    node.textContent = text;
    return node;
  }

  function initDates() {
    if ($('start').value && $('bake').value) return;
    const now = new Date();
    let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0);
    let bake = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0);
    if (now.getHours() >= 14) {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0);
      bake = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 20, 0);
    }
    $('start').value = fmtLocalInput(start);
    $('bake').value = fmtLocalInput(bake);
  }

  function toggleCustoms() {
    $('customHydWrap').classList.toggle('hidden', $('hydration').value !== 'custom');
    $('customSaltWrap').classList.toggle('hidden', $('saltProfile').value !== 'custom');
  }

  function estimateHydration() {
    const protein = n('protein', 12.5, 8, 17);
    const type = $('flourType').value;
    const lm = $('lmMix').value;
    let hyd;

    if (protein < 10.8) hyd = 64;
    else if (protein < 11.8) hyd = 66;
    else if (protein < 12.8) hyd = 68;
    else if (protein < 13.7) hyd = 70;
    else hyd = 72;

    if (type === '1') hyd += 1.5;
    if (type === '2') hyd += 2.5;
    if (type === 'integrale') hyd += 4;
    if (lm === 'yes') hyd += 1.5;

    const hrs = hoursBetween(new Date($('start').value), new Date($('bake').value));
    if (hrs >= 18 && protein >= 12) hyd += 0.5;
    return Math.max(62, Math.min(76, hyd));
  }

  function hydrationValue() {
    const value = $('hydration').value;
    if (value === 'auto') return estimateHydration();
    if (value === 'custom') return n('customHyd', 69, 55, 85);
    return Number.parseFloat(value);
  }

  function saltValue() {
    const value = $('saltProfile').value;
    if (value === 'custom') return n('customSalt', 2.3, 1.5, 3.0);
    return Number.parseFloat(value);
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
    if (hours <= 0) return 'date da correggere';
    if (hours <= 12) return 'in giornata';
    if (hours <= 18) return 'intermedio';
    if (hours <= 30) return 'giorno dopo / frigo';
    if (hours <= 48) return 'lunga maturazione';
    return 'molto lunga';
  }

  function flourCategoryText() {
    const protein = n('protein', 12.5, 8, 17);
    if (protein < 10.8) return 'debole';
    if (protein < 11.8) return 'medio-debole';
    if (protein < 12.8) return 'media';
    if (protein < 13.7) return 'forte';
    return 'molto forte';
  }

  function buildTimeline(start, bake, hours) {
    const items = [
      ['Impasto', start],
      ['Riposo 20 min, ciotola coperta', addMinDate(start, 20)],
      ['Sale + olio', addMinDate(start, 40)],
      ['Riposo 10 min coperto', addMinDate(start, 50)],
      ['1ª piega', addMinDate(start, 60)],
      ['2ª piega', addMinDate(start, 85)],
      ['3ª piega solo se serve', addMinDate(start, 110)]
    ];

    if (hours <= 12) {
      items.push(
        ['Frigo facoltativo se fa caldo', addMinDate(start, 120)],
        ['Stesura', addMinDate(bake, -75)],
        ['Riposo in teglia coperto', addMinDate(bake, -60)],
        ['Cottura', bake]
      );
    } else {
      items.push(
        ['Frigo coperto dopo le pieghe', addMinDate(start, 120)],
        ['Valuta volume: non seguire solo l’orologio', addMinDate(bake, -120)],
        ['Se giusto: fuori frigo 45–75 min', addMinDate(bake, -105)],
        ['Se molto avanti: fuori 20–30 min', addMinDate(bake, -70)],
        ['Stesura + riposo in teglia modulato', addMinDate(bake, -55)],
        ['Cottura', bake]
      );
    }
    return items;
  }

  function addTableRow(table, label, value) {
    const tr = el('tr');
    tr.append(el('td', { text: label }), el('td', { text: value }));
    table.append(tr);
  }

  function renderKpis(parent, hours, doughPer, total) {
    const kpi = el('div', { class: 'kpi' });
    const data = [
      ['Tempo totale', hours > 0 ? round(hours, 1) : '—', 'ore'],
      ['Impasto/teglia', round(doughPer, 0), 'g'],
      ['Totale', round(total, 0), 'g'],
      ['Metodo', methodLabel(hours), 'automatico']
    ];

    data.forEach(([label, value, suffix]) => {
      const box = el('div');
      box.append(el('span', { text: label }), strong(value, label === 'Metodo' ? 'font-size:18px' : ''), el('small', { text: suffix }));
      kpi.append(box);
    });
    parent.append(kpi);
  }

  function renderTimeline(parent, start, bake, hours) {
    parent.append(el('h3', { class: 'timelineTitle', text: 'Timeline' }));
    buildTimeline(start, bake, hours).forEach(([label, date]) => {
      const item = el('div', { class: 'timelineItem' });
      item.append(el('div', { class: 'time', text: fmtDT(date) }), el('div', { text: label }));
      parent.append(item);
    });
  }

  function calculate() {
    initDates();

    const width = n('w', 37, 10, 80);
    const height = n('h', 26, 10, 80);
    const pans = Math.round(n('n', 1, 1, 10));
    const load = Number.parseFloat($('style').value);
    const start = new Date($('start').value);
    const bake = new Date($('bake').value);
    const hours = hoursBetween(start, bake);
    const hyd = hydrationValue();
    const salt = saltValue();
    const oil = 2.5;
    const yeast = yeastPctByHours(hours);
    const honey = hours > 0 && hours <= 12 ? 0.5 : 0;
    const area = width * height;
    const doughPer = area * load;
    const total = doughPer * pans;
    const flour = total / (1 + hyd / 100 + salt / 100 + oil / 100 + yeast / 100 + honey / 100);
    const water = flour * hyd / 100;
    const saltG = flour * salt / 100;
    const oilG = flour * oil / 100;
    const yeastG = flour * yeast / 100;
    const honeyG = flour * honey / 100;

    $('methodPreview').value = `${methodLabel(hours)} · ${hours > 0 ? `${round(hours, 1)} h` : 'controlla date'}`;

    const result = $('result');
    clearNode(result);

    if (hours <= 0 || !Number.isFinite(hours)) {
      result.append(note('Attenzione: la cottura deve essere dopo l’inizio impasto.', 'bad'));
    }

    renderKpis(result, hours, doughPer, total);

    const table = el('table', { class: 'table' });
    const header = el('tr');
    header.append(el('th', { text: 'Ingrediente' }), el('th', { text: `Totale per ${pans} teglia/e` }));
    table.append(header);

    if ($('lmMix').value === 'yes') {
      addTableRow(table, 'Farina totale', `${round(flour)} g`);
      addTableRow(table, 'Farina con lievito madre, se 25%', `${round(flour * 0.25)} g`);
      addTableRow(table, 'Farina base, se 75%', `${round(flour * 0.75)} g`);
    } else {
      addTableRow(table, 'Farina totale', `${round(flour)} g`);
    }

    addTableRow(table, `Acqua ${round(hyd, 1)}%`, `${round(water)} g`);
    addTableRow(table, `Sale ${round(salt, 1)}%`, `${round(saltG)} g`);
    addTableRow(table, 'Olio 2,5%', `${round(oilG)} g`);
    addTableRow(table, `Lievito fresco ${round(yeast, 2)}%`, `${round(yeastG, 1)} g`);
    if (honey > 0) addTableRow(table, 'Miele 0,5%', `${round(honeyG, 1)} g`);
    result.append(table);

    result.append(note(`Acqua: stimata da tipo/proteine: farina ${flourCategoryText()}, tipo ${$('flourType').value}. Se dopo il primo riposo resta rigido, aggiungi 5 g alla volta.`, 'ok'));
    result.append(note('Sale: per lardo/salumi/acciughe scendi a 2,0–2,2%; per tempi lunghi/caldo puoi salire a 2,4–2,5%.'));

    renderTimeline(result, start, bake, hours);
  }

  function diagnose() {
    const state = $('state').value;
    const timeLeft = n('timeLeft', 2, 0, 72);
    let text;

    if (state === 'triplicato') text = 'Niente pieghe. Fuori frigo 20–30 minuti, stesura delicata, riposo in teglia 20–35 minuti.';
    else if (state === 'perfetto') text = 'Non toccarlo troppo. Fuori 45–75 minuti, stendi quando è rilassato, riposo in teglia 45–60 minuti.';
    else if (state === 'collasso') text = timeLeft >= 6 ? 'Una sola piega di salvataggio morbida a portafoglio, poi frigo immediato.' : 'Niente pieghe: stendi quasi subito, riposo breve 15–25 minuti, poi cuoci.';
    else if (state === 'rigido') text = 'Copri e aspetta 15–20 minuti. Non forzare la stesura.';
    else if (state === 'strappa') text = 'Stop immediato. Copri 15–20 minuti. L’olio va incorporato con poco lavoro + riposo, non con pieghe aggressive.';
    else text = timeLeft >= 3 ? 'Una sola piega morbida, copri e aspetta.' : 'Stendi delicato e riposo breve in teglia.';

    const out = $('diagnosis');
    clearNode(out);
    out.append(strong('Risposta: '), document.createTextNode(text));
  }

  function cookGuide() {
    const pizza = $('pizzaType').value;
    const pan = $('panType').value;
    const base = pan === 'leccarda'
      ? 'Con leccarda: spingi bene la prima fase in basso e non usare carta forno se puoi.'
      : 'Con teglia più conduttiva: attenzione a non bruciare sotto, controlla prima.';
    const text = pizza === 'margherita'
      ? `${base}\n\nMargherita: pomodoro denso 110–130 g. Statico 250 °C, ripiano basso 9–11 min. Aggiungi mozzarella scolata 120–140 g, medio-alto 2–4 min. Ventilato/grill solo 30–60 sec se resta bagnata.`
      : `${base}\n\nBianca patate/lardo: patate sottilissime 220–260 g, asciutte e condite. Statico 250 °C: 10–12 min in basso + 3–5 min medio-alto. Lardo 40–60 g fuori forno.`;
    const out = $('cook');
    clearNode(out);
    text.split('\n').forEach((line, index) => {
      if (index > 0) out.append(el('br'));
      out.append(document.createTextNode(line));
    });
  }

  function savePrefs() {
    PREF_IDS.forEach((id) => localStorage.setItem(PREF_PREFIX + id, $(id).value));
    alert('Preferenze salvate in questo browser.');
  }

  function loadPrefs() {
    initDates();
    PREF_IDS.forEach((id) => {
      const value = localStorage.getItem(PREF_PREFIX + id);
      if (value !== null && $(id)) $(id).value = value;
    });
    toggleCustoms();
    calculate();
  }

  function resetDefaults() {
    PREF_IDS.forEach((id) => localStorage.removeItem(PREF_PREFIX + id));
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
    document.querySelectorAll('[data-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-tab]').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        document.querySelectorAll('.section').forEach((section) => section.classList.remove('active'));
        $(button.dataset.tab).classList.add('active');
      });
    });

    ['hydration', 'saltProfile'].forEach((id) => $(id).addEventListener('change', () => { toggleCustoms(); calculate(); }));
    PREF_IDS.forEach((id) => $(id)?.addEventListener('input', calculate));

    $('calculateBtn').addEventListener('click', calculate);
    $('diagnoseBtn').addEventListener('click', diagnose);
    $('cookBtn').addEventListener('click', cookGuide);
    $('printBtn').addEventListener('click', () => window.print());
    $('saveBtn').addEventListener('click', savePrefs);
    $('resetBtn').addEventListener('click', resetDefaults);
    $('acceptPrivacy').addEventListener('click', acceptPrivacyNotice);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') acceptPrivacyNotice();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadPrefs();
    showPrivacyNotice();
  });
})();
