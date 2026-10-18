# PizzaMaker — Evidence Appendix
## Versione 1.0

**Data:** 2026-10-18  
**Ruolo:** provenance e materiale di ricerca non canonico. Il Manuale Universale v1.7 prevale per decisioni implementative.

## Nota di audit

La v1.6 incorporava mandate e rapporti Deep Research nello stesso file della specifica. Questa appendice li conserva senza farli competere con la fonte canonica.

Il rapporto Pane + Focacce disponibile dichiara un corpus di circa sessanta fonti ma **non include nel testo recuperato una bibliografia completa**. Non viene quindi presentato come bibliografia integralmente verificata.

## Verifiche mirate eseguite il 2026-10-18

- ISO 27971:2023: Alveograph per farine di frumento comune — verificato su ISO.
- ISO 3093:2009: Falling Number Hagberg-Perten — verificato come versione corrente; Amendment 1 risultava in sviluppo.
- Focaccia di Recco col formaggio IGP: comunicazione UE `C/2025/473` / `PGI-IT-0944-AM01`.
- Registrazioni UE verificate: Pane di Altamura DOP, Pane di Matera IGP, Pane Toscano DOP, Pane Casareccio di Genzano IGP, Coppia Ferrarese IGP.
- FDA/CDC: farina cruda e impasto crudo come rischio microbiologico.
- DOI spot-check: `10.1038/s41598-019-41072-w`, `10.1002/cche.10699`, `10.1016/j.jcs.2013.05.009`, `10.3390/foods11101388`, `10.1016/j.fm.2023.104443`.

Questa è una **verifica mirata**, non il Source Registry completo Pane + Focacce.

---

# A. Mandato storico Deep Research Pizza

# 29. Ricerca verticale Pizza — mandato operativo

## 29.1 Scopo

Questa ricerca costituisce la prima estensione verticale del manuale fondativo e deve specializzare i principi generali sulle principali famiglie di pizza. Non deve diventare un ricettario rigido.

Ogni stile deve essere rappresentato come:

```text
TARGET RESULT
+
FORMULATION
+
PROCESS
+
STATE CHECKPOINTS
+
SHAPING / STRETCHING
+
BAKING PROFILE
```

Il risultato deve permettere al futuro motore PizzaMaker di decidere, con livello di confidenza esplicito, quale impasto e processo sono compatibili con il risultato desiderato, quando dividere e formare, quanta tensione e conservazione del gas sono opportune, quando il panetto è pronto, come stendere lo stile scelto, quale forno/supporto è compatibile e come diagnosticare e recuperare gli errori.

## 29.2 Stili minimi da coprire

- Pizza in teglia romana.
- Pizza alla pala romana.
- Pizza tonda romana / scrocchiarella, chiarendo terminologia e varianti.
- Pizza napoletana tradizionale.
- Pizza Napoletana STG.
- Verace Pizza Napoletana secondo AVPN.
- Pizza napoletana contemporanea.
- Pizza contemporanea ad alta idratazione.
- Pizza al piatto non napoletana, quando tecnicamente distinta.
- Pinsa Romana conforme al protocollo ufficiale e prodotti “stile pinsa” non conformi.
- Pan pizza / pizza in padella, se rappresenta una famiglia tecnica distinta utile al motore.

Nuove famiglie vanno aggiunte solo quando introducono processi realmente differenti, non per moltiplicare categorie commerciali.

## 29.3 Gerarchia delle fonti

La ricerca deve privilegiare, nell'ordine:

1. fonti primarie e ufficiali: disciplinari, normative, associazioni ufficiali, standard registrati, regolamenti UE, AVPN, organismi romani pertinenti e Associazione Originale Pinsa Romana per il proprio protocollo;
2. letteratura scientifica peer-reviewed su reologia applicata alla pizza, gas cells, fermentazione, shaping, stretching, baking, heat transfer, forni, supporti, thermal flux, water loss, crust formation e texture;
3. fonti professionali qualificate per gesto, sequencing, gestione dell'impasto, formatura, stesura e cottura pratica;
4. video originali solo quando il gesto è realmente osservabile o esiste una trascrizione affidabile.

Non presentare una dichiarazione professionale come prova scientifica. Non dichiarare verifica visiva se erano accessibili soltanto titolo, descrizione o metadata. Evitare blog SEO, aggregatori, ricette copiate e contenuti senza fonti. Target indicativo: 35–50 fonti realmente indipendenti e pertinenti.

## 29.4 Classificazione dell'evidenza

Ogni affermazione importante deve essere classificata come:

- **A** — forte evidenza scientifica;
- **B** — evidenza scientifica moderata;
- **C** — standard / disciplinare ufficiale;
- **D** — consenso professionale;
- **E** — pratica diffusa;
- **F** — euristica;
- **G** — inferenza progettuale;
- **H** — questione aperta.

Un disciplinare definisce uno stile, ma non prova automaticamente il meccanismo scientifico sottostante.

## 29.5 Tassonomia e target

Per ogni stile documentare denominazione, eventuale protezione, origine, caratteristiche obbligatorie, caratteristiche tipiche, pratiche contemporanee e termini senza definizione standard. Prestare particolare attenzione a: contemporanea, canotto, pizza moderna, romana, tonda romana, scrocchiarella, alta idratazione, lunga maturazione e pizza gourmet.

Per ogni stile definire criteri osservabili per geometria, diametro, spessore del centro e bordo, altezza, massa relativa, crumb e crosta. La struttura interna può usare classi come `fine_uniform`, `medium_regular`, `open_regular`, `open_irregular`, `rim_expanded` e `very_thin_crisp`. Evitare slogan non osservabili.

## 29.6 Formulazione

### Peso e carico

Studiare peso panetto, area, g/cm², spessore e influenza su bordo, centro, alveolatura, cottura e croccantezza. Classificare le formule come deterministiche, empiriche stabili o euristiche. Non trasferire automaticamente formule della teglia alla pizza tonda.

### Farina

Documentare cereale, tipo, proteine, W e P/L quando documentati, blend e componenti specifici dei protocolli. Distinguere requisiti ufficiali, consuetudini e preferenze. Verificare criticamente semplificazioni come “serve W 300”, “serve Manitoba” e “più W = più ore”.

### Idratazione

Distinguere range storico/documentato e moderno, idratazione tipica, necessaria, massima tecnicamente possibile e realmente utile. Analizzare interazione con farina e processo, bassinage, autolisi e tecniche ad alta idratazione. Non assumere “più acqua = pizza migliore”.

### Sale, olio, zuccheri e grassi

Classificare ciascun ingrediente come obbligatorio, tipico, opzionale, non tradizionale o incompatibile con un disciplinare. PizzaMaker non deve aggiungere automaticamente ingredienti non necessari.

## 29.7 Fermentazione

Studiare lievito fresco, secco attivo, secco istantaneo, eventuale lievito madre, quantità documentate e relazione con temperatura e tempo. Separare quantità da disciplinare, pratiche professionali, modelli predittivi e ricette isolate.

Il futuro `FERMENTATION PREDICTION MODEL` deve dichiarare input, output, confidence, limiti e variabili non osservate. Non derivare una formula universale artificiale.

## 29.8 Impastamento, bulk e rinforzi

Per ogni stile descrivere:

```text
START STATE
→ METHOD
→ TARGET STATE
→ STOP CONDITION
```

Valutare mano, spirale, planetaria, forcella, temperatura finale, ossidazione, aerazione, energia, autolisi, bassinage e riposi.

Per bulk/puntata distinguere fermentazione in massa, riposo tecnico, maturazione refrigerata e semplice attesa. Per pieghe e rinforzi verificare se servono, quando, con quale tecnica e con quale segnale di stop. Studiare stretch-and-fold, coil fold, pieghe a lembi e laminazione.

Non assumere come universale la sequenza `4 lembi → capovolgimento`. Ogni tecnica deve descrivere stato iniziale, presa, direzione della forza, deformazione, orientamento delle facce e condizione di stop.

## 29.9 Staglio e formatura

Studiare quando dividere, bulk-cold vs balls-cold, temperatura alla divisione, strumenti, preservazione del gas, taglio netto, peso panetti e tolleranze. Chiarire se preforma, rounding, chiusura e pirlatura sono operazioni distinte o parti della stessa azione.

La formatura del panetto è prioritaria. Per ogni stile tondo descrivere:

```text
INITIAL STATE
→ HAND CONTACT
→ FORCE DIRECTION
→ SEAM ORIENTATION
→ SURFACE CREATED
→ STOP CONDITION
```

Verificare differenze tra napoletana tradizionale, contemporanea/canotto, tonda romana e porzioni per pala/teglia. Rispondere esplicitamente se la pirlatura è necessaria, quanta tensione serve, cosa accade con tensione eccessiva, quando si perde gas e quando il degasaggio è desiderato.

## 29.10 Appretto e readiness

Per ogni stile definire temperatura, contenitore, sviluppo desiderato, volume, superficie, rilassamento, gas e readiness. Non usare come unico criterio raddoppio o ore trascorse: servono checkpoint osservabili.

## 29.11 Stesura

Studiare separatamente:

- **Napoletana:** apertura, gestione del bordo, redistribuzione del gas, mani, rotazione e slap se pertinente.
- **Contemporanea:** differenze reali rispetto alla tradizionale, panetti molto gassosi, cornicione e conservazione del gas.
- **Tonda romana:** stesura, uso del mattarello quando storicamente/professionalmente pertinente, effetti sull'alveolatura e geometria.
- **Teglia romana:** ribaltamento, semola, pressione, distribuzione del gas e trasferimento.
- **Pala:** forma allungata, trasferimento, uso della pala e preservazione della struttura.

Ogni gesto deve essere traducibile in storyboard:

```text
INITIAL STATE
→ CONTACT
→ FORCE
→ MOVEMENT
→ GAS REDISTRIBUTION
→ FINAL GEOMETRY
→ STOP CONDITION
```

## 29.12 Condimento

Non costruire un ricettario. Studiare solo gli aspetti che influenzano il processo: acqua, mozzarella, pomodoro, topping acquosi, grassi, peso totale, momento di aggiunta e interferenza con la cottura.

## 29.13 Forno e cottura

Costruire un `OVEN PROFILE` che distingua forni a legna, gas, elettrici professionali, domestici e pizza oven portatili; supporti come biscotto, pietra, refrattario, acciaio, alluminio, ferro blu e ghisa; parametri come setpoint, temperatura del supporto, top heat, bottom heat, heat flux, radiation, convection, conduction, recovery e preheat.

Per ogni stile documentare temperature e durate tipiche condizionate, supporto, distribuzione del calore, indicatori visivi, fondo, perdita d'acqua, colore e struttura. Separare nettamente Napoletana STG, AVPN e contemporanea non disciplinata.

## 29.14 Adattamento al forno domestico

Per ogni stile dichiarare se è replicabile, se può soltanto essere imitato e quali caratteristiche cambiano inevitabilmente. PizzaMaker non deve definire “autentico” un risultato incompatibile con il disciplinare o con i requisiti tecnici dello stile.

## 29.15 Diagnostica verticale

Il modello diagnostico deve combinare:

```text
STYLE
+ PHASE
+ STATE
+ TEMPERATURE
+ TIME REMAINING
+ EQUIPMENT
```

Problemi minimi: impasto troppo rigido, debole, collassante, molto appiccicoso, surriscaldato, sottosviluppato o sovraimpastato; panetto che si allarga, secca, apre il seam, è troppo teso o rilassato, sovra- o sottolievitato; stesura che torna indietro, si strappa, assottiglia il centro, non sviluppa il bordo o presenta troppo/poco gas; cottura con fondo pallido o bruciato, centro crudo, cornicione pallido, superficie bruciata, topping acquoso, effetto “biscotto” o gommosità.

Per ogni problema:

```text
CAUSES RANKED
→ OBSERVATIONS
→ ACTION NOW
→ DO NOT
→ RECHECK
→ RECOVERABILITY
→ NEXT TIME
```

## 29.16 Matrice comparativa finale

Produrre una matrice almeno tra teglia, pala, tonda romana, Napoletana STG/AVPN, Napoletana contemporanea e Pinsa con campi: target, geometria, crumb, crosta, peso/carico, farina, idratazione, sale, olio, lievito, prefermenti, mixing, DDT, bulk, rinforzi, divisione, shaping, final proof, stretching, topping, oven, support, baking, cooling e failure modes.

## 29.17 Data model verticale Pizza

Modello minimo di partenza:

```text
STYLE
- id
- family
- official_status
- target
- geometry
- formulation_constraints
- process_template
- proof_profile
- stretching_method
- oven_requirements

PIZZA_BALL_PROFILE
- target_weight
- target_tension
- target_gas_preservation
- seam_orientation
- proof_exit_conditions

STRETCHING_PROFILE
- contact_type
- direction
- rim_strategy
- degassing_level
- final_geometry

BAKING_PROFILE
- support
- surface_temp
- top_heat
- bottom_heat
- typical_window
- visual_endpoints
```

Questi campi non sono vincolanti: la ricerca deve migliorarli se emergono entità o relazioni migliori.

## 29.18 Motore decisionale

Il motore verticale deve poter operare così:

```text
STYLE
+ TARGET
+ USER EQUIPMENT
+ TIME AVAILABLE
+ FLOUR PROFILE
→ FORMULATION WINDOW
→ PROCESS TEMPLATE
→ CHECKPOINTS
```

Durante il processo:

```text
PHASE
+ OBSERVATION
+ TEMPERATURE
+ TIME REMAINING
→ CONTINUE / WAIT / COOL / REINFORCE / DIVIDE / SHAPE / STRETCH / BAKE
```

## 29.19 Calculation engine

Ogni calcolo deve dichiarare formula, input, output, condizioni, confidence e limiti. Classi: **A** matematica, **B** empirica stabile, **C** euristica, **D** osservazionale. Aree minime: peso panetto, area, densità/carico, idratazione, sale, olio, lievito, water temperature, DDT, fermentazione, proof e forno.

## 29.20 UX principiante / esperto

Il percorso base deve partire da risultato sensoriale oppure stile, quantità, tempo disponibile e attrezzatura. I parametri avanzati devono essere opzionali. Non rendere obbligatori W, temperatura ambiente o moduli tecnici estesi. Usare progressive disclosure.

## 29.21 Specifiche visuali dei gesti

La ricerca non deve generare immagini. Deve produrre specifiche trasformabili in storyboard per stretch-and-fold, coil fold, rounding, apertura napoletana, contemporanea, tonda romana, teglia, pala, trasferimento e controllo del fondo.

Formato consigliato:

```yaml
initial_state:
camera_view:
hand_contact:
force_direction:
movement:
dough_response:
face_orientation:
seam_orientation:
stop_condition:
common_wrong_gesture:
```

## 29.22 Audit delle assunzioni

Verificare criticamente affermazioni come: più idratazione = più alveoli; lunga maturazione = maggiore digeribilità; W = numero di ore; serve Manitoba; 72 ore sono migliori; pieghe + capovolgimento sono obbligatori; non si deve mai degassare; il forno è descritto dal solo setpoint; esiste un'unica “pizza napoletana”.

## 29.23 Audit concettuale di PizzaMaker

Produrre una valutazione `KEEP / CHANGE / REMOVE` almeno per struttura, pieghe, capovolgimento, staglio, formatura, temperatura ambiente, lievito, timeline e cottura. Nessuna modifica al codice durante questa ricerca.

## 29.24 Gap residui

Alla fine distinguere ciò che è implementabile, ciò che richiede altre ricerche, ciò che richiede esperimenti A/B PizzaMaker e ciò che non è realisticamente prevedibile senza osservazione dell'impasto o strumentazione.

## 29.25 Output obbligatorio della ricerca

Il rapporto verticale deve contenere: A Executive summary; B Tassonomia; C Target; D Formulation matrix; E Fermentation matrix; F Mixing/reinforcement matrix; G Division/shaping matrix; H Stretching matrix; I Oven/baking matrix; J Diagnostic engine; K Calculation engine; L Data model; M UX; N Visual gesture specifications; O KEEP/CHANGE/REMOVE; P Gap residui; Q Esperimenti A/B; R Bibliografia completa.

Per ogni valore quantitativo dichiarare origine, condizioni, variabilità e livello di evidenza. Ogni procedura deve rispondere a:

```text
PERCHÉ
→ COSA CAMBIA FISICAMENTE
→ QUANDO SERVE
→ QUANDO NON SERVE
→ COME CAPIRE CHE È FINITA
```

---

# B. Rapporto Deep Research — Buns + Impasti arricchiti

# 46. Rapporto Deep Research integrale — Buns + Impasti arricchiti

Questa sezione conserva integralmente il rapporto Deep Research utilizzato per l'integrazione della sezione 45, così che il Manuale mantenga ragionamento, contraddizioni, livelli di evidenza, tabelle, data model, diagnostica, audit del draft, gap e bibliografia completa.

Il testo seguente è il rapporto di ricerca, non una seconda specifica normativa. In caso di apparente conflitto, la sezione 45 rappresenta la sintesi architetturale adottata nel Manuale, mentre questa sezione conserva l'evidenza e il contesto.

## 46.1 Sintesi esecutiva e decisioni di progetto

Questa ricerca conferma la tesi centrale della bozza v1.0, ma ne modifica in modo importante **il livello di certezza e diversi dettagli operativi**: un impasto arricchito non è correttamente modellabile come “pane normale + latte/uova/burro/zucchero”. Zucchero, grassi, componenti del latte, frazioni dell’uovo, amidi pregelatinizzati e patata intervengono contemporaneamente su disponibilità dell’acqua, stress osmotico del lievito, reologia, incorporazione e ritenzione del gas, gelatinizzazione, colore, struttura della mollica e staling. Gli effetti sono inoltre spesso non lineari e dipendono dalla dose e dal processo. La conseguenza architetturale è forte: il futuro PizzaMaker non dovrebbe avere un generico campo `hydration` più qualche checkbox `milk/egg/butter`. Dovrebbe mantenere separati **composizione**, **funzione tecnologica** e **stato del processo**. La massa d’acqua contenuta in latte, uova o burro è calcolabile se ne conosciamo la composizione; l’effetto di quell’acqua sull’impasto, invece, non equivale automaticamente a quello dell’acqua aggiunta. Gli studi su latte/whey, uova e sistemi patata-frumento mostrano proprio questo disaccoppiamento. | Conclusione per PizzaMaker | Evidenza | Decisione |
|---|---:|---|
| Gli enriched dough richiedono un dominio proprio | Ev-A/B | **Confermato** |
| “Effective hydration” non può essere una singola formula universale | Ev-B/G | Separare bilancio compositivo da comportamento reologico |
| Più zucchero non significa necessariamente fermentazione più rapida | Ev-A | Eliminare questa assunzione |
| Non esiste una soglia universale di zucchero oltre la quale “serve” lievito osmotollerante | Ev-A/D/H | Usare profilo del lievito + guidance del produttore |
| Ceppo/tipo di lievito influenza le prestazioni | Ev-A/B | `YEAST_PROFILE` necessario |
| Raddoppiare il lievito non garantisce “lo stesso processo in metà tempo” | Ev-B | Niente semplice scaling temporale |
| Burro e olio non sono tecnologicamente equivalenti | Ev-B | Modellare fase lipidica e composizione |
| Il ruolo dei cristalli di grasso è reale, ma non va generalizzato da shortening industriale a ogni brioche | Ev-B | Correzione importante della bozza |
| Latte ≠ acqua aromatizzata | Ev-B | `DAIRY_PROFILE` |
| Albume, tuorlo, uovo intero e lecitina non sono equivalenti | Ev-B | `EGG_PROFILE` |
| Yudane può migliorare morbidezza e rallentare lo staling senza aumentare necessariamente il volume | Ev-A/B | Confermato |
| “Tangzhong 5%” non è una legge scientifica universale | Ev-H/D | Parametrizzare il processo |
| Tangzhong e Yudane non vanno ridotti a due checkbox rigide | Ev-G/H | Oggetto generale `STARCH_GEL_PROFILE` |
| La forma della patata è decisiva | Ev-A/B | `POTATO_PROFILE` obbligatorio se presente |
| Non esiste un coefficiente acqua-patata universale | Ev-A/B | Nessun hardcode |
| Non esiste un W universale per “burger bun”, “brioche” o “Shokupan” | Ev-B/H | W opzionale, mai obbligatorio |
| I minuti di impastamento non sono trasferibili fra attrezzature | Ev-A/B | Endpoint basati sullo stato |
| “Burro sempre alla fine” non è una legge universale | Ev-D/H | Sequenza configurabile |
| Rounding, riposo intermedio e moulding sono operazioni realmente distinte | Ev-D | Modellarle separatamente |
| La cinematica manuale precisa di burger bun/hot-dog bun è molto meno documentata della sequenza industriale | Ev-D/H | Serve micro-ricerca visuale |
| “Raddoppiato = pronto” non è un endpoint universale di appretto | Ev-B/D | Stato multidimensionale |
| Egg wash non è obbligatorio | Ev-B/D | `SURFACE_FINISH_PROFILE` |
| Formula e condizioni di cottura interagiscono fortemente sul colore | Ev-B | Non usare solo °C/minuti |
| Shelf life sensoriale e microbiologica devono essere due oggetti diversi | Ev-A | Separazione obbligatoria |
| Raffreddamento, contaminazione post-cottura, temperatura di conservazione e packaging possono dominare la shelf life microbiologica | Ev-A | L’app non deve promettere “X giorni sicuro” |

Il risultato più importante sullo zucchero è particolarmente utile per il motore. Nel sistema sperimentale di Timmermans e colleghi, livelli diversi di saccarosio hanno prodotto dinamiche fermentative differenti; il livello alto studiato, 21%, generava maggiore stress osmotico e minore attività fermentativa rispetto alla condizione intermedia, mentre il sistema senza zucchero aggiunto aveva un altro limite: esauriva prima gli zuccheri disponibili. Questo rende scientificamente sbagliata sia la regola “più zucchero = più nutrimento = più lievitazione” sia una semplice funzione lineare zucchero→tempo. Anche il lievito va modellato con più prudenza. Studi comparativi mostrano differenze di capacità lievitante tra lieviti commerciali e una forte dipendenza da temperatura e concentrazione; altri lavori mostrano che la tolleranza a condizioni ad alto contenuto di saccarosio è legata alle caratteristiche fisiologiche del ceppo. Le indicazioni commerciali “lean dough”, “sweet dough” o intervalli di zucchero sono quindi informazioni utili **sul prodotto specifico**, non costanti biologiche universali da trasferire a ogni lievito. La ricerca modifica anche il giudizio sul draft precedente. La sua architettura generale era sorprendentemente buona, ma la frase finale secondo cui il dominio fosse ormai sostanzialmente chiuso era troppo ottimistica. **Non serve rifare ancora una quarta mega-ricerca generale sui buns**, ma restano tre aree che non devono essere considerate “risolte”: gesti manuali di shaping, previsione quantitativa della fermentazione enriched, e calibrazione prodotto-specifica di starch gels/patata/shelf life.

## 46.2 Tassonomia, target e matrice dei prodotti

La prima correzione concettuale consiste nel non far coincidere **nome commerciale**, **famiglia tecnica**, **formula** e **standard legale**.

Il caso “milk bun” è esemplare. Negli Stati Uniti il §136.130 “Milk bread, rolls, and buns” è stato storicamente uno standard di identità, ma nel 2025–2026 FDA lo ha incluso tra gli standard coinvolti nel programma di revoca; al 17 ottobre 2026 l’agenzia indica inoltre una proposta relativa agli standard bakery prevista per novembre 2026. Il suo stato normativo è quindi in evoluzione e sarebbe un errore far dipendere l’ontologia interna di PizzaMaker da una definizione legale statunitense instabile. Per **Shokupan**, le fonti ufficiali giapponesi localizzate riconoscono `食パン` come categoria di pane nelle norme/statistiche alimentari, ma non la definiscono come “pane obbligatoriamente al latte fatto con Tangzhong”. La normativa giapponese sui prodotti di panificazione contempla impasti a base di farina e lievito ai quali possono aggiungersi acqua, sale, frutta, vegetali, uova, zuccheri, grassi, latte e derivati; la classificazione ufficiale `食パン` è quindi più ampia del significato commerciale che spesso assume “Japanese milk bread” sul web occidentale. Allo stesso modo, la formazione professionale francese distingue `pain au lait`, `pain brioché`, `brioche` e `pain de mie`; questo dimostra che professionalmente sono trattati come produzioni distinte, ma non fornisce una formula internazionale obbligatoria per un “brioche bun”. La tassonomia più utile all’app è quindi questa:

| Famiglia | Identità consigliata nell’app | Target dominante | Cosa **non** usare come definizione |
|---|---|---|---|
| Milk bun / panino al latte | `soft_roll` + `dairy_profile` | morbido, fine/medio uniforme | una % fissa di latte |
| Hamburger bun | `sandwich_bun_round` | comprimibile ma resistente, tagliabile | una ricetta unica |
| Hot-dog bun | `sandwich_bun_elongated` | morbido, resiliente, geometria lunga | burger bun semplicemente “tirato” |
| Brioche bun | `sandwich_bun_round` + alto enrichment | ricco ma sufficientemente strutturale | brioche ricca fatta semplicemente tonda |
| Rich brioche | `rich_enriched_bread` | tender/rich, molto arricchito | funzione sandwich obbligatoria |
| Potato bun | `soft_bun` + `potato_profile` | morbido/umido, formula dipendente | “contiene potato flour” come definizione universale |
| Shokupan | `soft_pan_bread` + geometria pan | fine, elastico, eventualmente shreddable | Tangzhong obbligatorio |
| Japanese/Hokkaido milk bread | profilo commerciale/tecnico, source-tagged | molto soffice, elastico | categoria normativa universale |
| Pullman | geometria/processo pan-loaf | sezione regolare, slicing | alto enrichment obbligatorio |
| Pain de mie | profilo pan bread francese | mollica fine, crosta contenuta | sinonimo perfetto di Pullman |
| Dinner roll | `soft_roll` | porzione piccola, individuale/pull-apart | formula specifica |
| Soft sandwich bread | famiglia funzionale | resilienza + sliceability | latte/uova obbligatori |

Per hamburger e hot-dog bun le fonti professionali descrivono una sequenza industriale distinta: divisione, rounding, intermediate proof e successiva formatura/moulding; le linee industriali per hot-dog aggiungono dispositivi specifici di allungamento/moulding. Questo è sufficiente per dire che **la geometria finale è parte del processo**, ma non per trasformare un gesto manuale specifico trovato in un singolo video in una legge universale. **Target sensoriali.** Il vecchio modello `soft_fine_uniform / compressible_bun / feathery_shreddable / rich_tender / potato_moist` è utile come linguaggio interno, ma va trattato come ontologia PizzaMaker, quindi **Ev-G**, non come classificazione scientifica ufficiale. La sua utilità è proprio consentire di separare il nome del prodotto dal risultato desiderato.

Una matrice di target ragionevole è:

| Profilo | Mollica | Resilienza | Compressione | Ricchezza | Geometria |
|---|---|---:|---:|---:|---|
| Milk bun | fine/medio uniforme | media | alta | bassa-media | roll/round |
| Burger bun | fine/medio uniforme | medio-alta | alta | bassa-media | round, diametro funzionale |
| Hot-dog bun | fine uniforme | medio-alta | alta | bassa-media | elongated |
| Brioche bun | fine/medio, tender | media | media | medio-alta | round |
| Rich brioche | tender/fine | bassa-media | non prioritaria | alta | variabile |
| Potato bun | fine/medio, moist | media | alta | variabile | round |
| Shokupan | fine uniforme, elastica/shreddable | alta | medio-alta | bassa-media | pan loaf |

Questi target non pretendono di definire standard storici: sono **target funzionali del motore**.

**Farina.** La ricerca generale sulla reologia mostra che quantità e qualità delle proteine e composizione delle frazioni gluteniniche influenzano resistenza, estensibilità e gas retention. Tuttavia non abbiamo trovato una base scientifica sufficiente per codificare regole del tipo “burger bun = W 280”, “Shokupan = W 330” o “brioche = Manitoba”. Anche farine con uguale proteina nominale possono differire reologicamente; la risposta dipende inoltre dalla formulazione, dall’acqua e dal processo. Per questo il futuro `FLOUR_PROFILE` dovrebbe avere:

```yaml
FLOUR_PROFILE:
  cereal:
  flour_type:
  protein_pct_optional:
  W_optional:
  P_L_optional:
  absorption_optional:
  flour_strength_class_optional:
  user_observed_behavior_optional:
  source:
  confidence:
```

`W` e `P/L` restano ottimi dati avanzati quando disponibili, ma **non devono essere richiesti al principiante e non devono determinare da soli tempi o quantità di arricchimento**.

## 46.3 Ingredienti e formulazione: ciò che il motore deve realmente modellare

Il draft aveva introdotto `LIQUID_CONTRIBUTION`; l’idea è corretta, ma il nome può indurre a credere che tutte le frazioni liquide siano convertibili in “idratazione efficace”. La ricerca suggerisce un modello più rigoroso: **un registro compositivo deterministico** seguito da **un livello funzionale empirico**.

```yaml
COMPOSITION_LEDGER:
  ingredient:
  mass_g:
  water_g:
  fat_g:
  sugars_g:
  protein_g:
  starch_g:
  fiber_g:
  other_solids_g:
  composition_source:
  confidence:

FUNCTIONAL_EFFECT_PROFILE:
  osmotic_effect:
  gluten_interference:
  emulsification:
  starch_gel_effect:
  gas_cell_effect:
  browning_effect:
  tenderness_effect:
  water_binding_effect:
  evidence_level:
```

La somma dei grammi di acqua presenti negli ingredienti è un problema contabile. Il modo in cui quell’acqua partecipa alla reologia non lo è. Gli studi che sostituiscono acqua con latte o whey mostrano variazioni della viscoelasticità, della gelatinizzazione e delle proprietà del pane; analogamente, uovo, patata e amido gelatinizzato cambiano il sistema oltre alla semplice quantità d’acqua. **Zuccheri e fermentazione.** Il principio robusto è dose-dipendente: a concentrazioni moderate lo zucchero può fornire substrato, mentre concentrazioni elevate aumentano la pressione osmotica e possono deprimere l’attività di `S. cerevisiae`. Nel lavoro di Timmermans, il sistema ad alto saccarosio presentava minore consumo di zucchero, produzione di CO₂/etanolo e performance di volume rispetto alla condizione meno zuccherina. Altri studi sulla tolleranza ad alte concentrazioni di saccarosio dimostrano che la risposta dipende anche dal ceppo. La linea professionale ASB riporta come regola pratica che quantità moderate di zucchero possono favorire l’attività e che salendo oltre circa il 10% essa tende a diminuire, mentre produttori diversi vendono ceppi con intervalli commerciali differenti per lean e sweet dough. Questi numeri sono **Ev-D**, utili per classificare prodotti commerciali ma insufficienti per creare una soglia scientifica globale. Perciò il motore dovrebbe calcolare deterministicamente:

```text
added_sugar_bakers_pct
total_known_sugars_g
```

ma non dovrebbe calcolare deterministicamente:

```text
osmotic_penalty = 0.73
proof_time_multiplier = 1.41
```

senza un modello validato su ceppo, acqua disponibile, temperatura e composizione.

Il `YEAST_PROFILE` dovrebbe quindi diventare:

```yaml
YEAST_PROFILE:
  form:
    fresh
    active_dry
    instant_dry
  manufacturer_optional:
  product_optional:
  strain_or_family_optional:
  osmotolerance:
    standard
    sweet_dough
    manufacturer_specific
    unknown
  manufacturer_sugar_guidance_optional:
  manufacturer_conversion_optional:
  lot_age_optional:
  confidence:
```

Questo evita un’altra assunzione pericolosa: anche la conversione fresco/secco non dovrebbe essere presentata come costante biologica assoluta. I lieviti commerciali mostrano capacità lievitanti diverse in funzione di prodotto e condizioni. **Grassi.** Il draft era corretto nell’affermare `butter != oil`, ma troppo assertivo nel trasferire il meccanismo dei cristalli di grasso a qualsiasi brioche. Brooker dimostrò che, nel sistema studiato, cristalli di grasso solido potevano partecipare alla stabilizzazione dell’interfaccia delle gas cells mentre l’olio non mostrava lo stesso comportamento; studi successivi confermano che lipidi e componenti tensioattivi del dough liquor influenzano la stabilità delle cellule gassose. Questo è forte supporto al fatto che **stato fisico e natura della fase lipidica contano**, non una prova che “il burro stabilizza sempre gli alveoli”. Il nuovo oggetto dovrebbe essere:

```yaml
FAT_PROFILE:
  source:
    butter
    oil
    shortening
    margarine
    dairy_fat
  total_fat_g:
  water_g:
  other_solids_g:
  physical_state_at_mixing:
    liquid
    plastic
    soft
    unknown
  incorporation_stage:
  incorporation_temperature_optional:
  source_specific_data:
  confidence:
```

L’ordine di aggiunta del burro merita una classificazione più prudente. La pratica professionale della brioche spesso sviluppa inizialmente una struttura e incorpora poi il burro progressivamente; ciò è plausibile e professionalmente consolidato, ma la ricerca trovata non giustifica il comando universale **“fat always last”**. La formulazione e il metodo di mixing possono richiedere strategie diverse. La classificazione corretta è **Ev-D/F**, non Ev-A. Le ricerche su sweet dough e su energia di mixing mostrano inoltre che l’energia richiesta e il comportamento finale sono fortemente dipendenti dalla formulazione e dal mixer. **Latte.** Lo studio di Iuga e colleghi ha mostrato che sostituire acqua con latte o acid whey modifica reologia e proprietà finali del pane in modo dose-dipendente; latte e whey non producevano nemmeno lo stesso effetto tra loro. Questo supporta direttamente la necessità di un `DAIRY_PROFILE`. ```yaml
DAIRY_PROFILE:
  type:
    whole_milk
    skim_milk
    dry_milk
    whey
    buttermilk
    cream
  mass_g:
  known_water_g:
  fat_g:
  protein_g:
  lactose_g:
  heat_treatment_optional:
  source:
  confidence:
```

Per il latte in polvere esistono inoltre trattamenti termici professionali differenti; ASB segnala che il trattamento “high heat” viene usato anche per modificare il comportamento delle whey proteins nei dough systems. È un buon esempio di ragione per non trattare tutti i milk solids come equivalenti. **Uova.** La separazione fra intero, tuorlo, albume e lecitina è pienamente giustificata. In uno studio su bread dough, tuorlo e lecitina hanno prodotto maggiore estensibilità, gas retention, specific volume e morbidezza rispetto ad albume e controllo; la microstruttura e la risposta reologica erano differenti. ```yaml
EGG_PROFILE:
  whole_egg_g:
  yolk_g:
  white_g:
  composition_source:
  known_water_g:
  fat_g:
  protein_g:
  emulsifier_fraction_optional:
  confidence:
```

Non è però corretto convertire queste frazioni in una singola “hydration correction”: una molecola d’acqua all’interno dell’uovo contribuisce al bilancio massico, ma l’intero ingrediente introduce contemporaneamente proteine, lipidi ed emulsionanti.

**Tangzhong, Yudane e scald.** Qui la ricerca produce una correzione importante. La letteratura primaria è molto più solida sul **meccanismo della pregelatinizzazione** e sul metodo Yudane che sulla standardizzazione internazionale dei termini commerciali “Tangzhong” e “Yudane”.

Nel lavoro di Yamauchi sul metodo Yudane, farina e acqua bollente erano combinate 1:1 e furono studiate quote di Yudane corrispondenti al 20% e 40% della farina. Il risultato non fu “più Yudane = pane migliore”: il metodo aumentava umidità e morbidezza e rallentava lo staling, ma allungava l’appretto e diminuiva gassing power, gas retention e specific loaf volume nelle condizioni studiate. Un successivo studio che utilizzava amido di frumento gelatinizzato ha osservato ancora riduzioni di gassing power, gas retention e volume insieme a benefici sulla morbidezza/staling, sostenendo l’ipotesi che una quantità eccessiva di amido gelatinizzato possa interferire con la rete strutturale. Altri lavori mostrano che la farina gelatinizzata modifica il fabbisogno d’acqua e che l’effetto dipende dall’idratazione complessiva e dalla matrice. La struttura dati migliore è quindi:

```yaml
STARCH_GEL_PROFILE:
  enabled:
  method_label:
    yudane
    tangzhong
    scald
    pregelatinized_flour
    custom
  flour_fraction_of_total:
  flour_g:
  liquid_g:
  liquid_type:
  flour_liquid_ratio:
  peak_temperature_optional:
  boiling_water_method:
  hold_time_optional:
  cooling_method:
  pre_use_storage_time_optional:
  target:
    softness
    moisture_retention
    handling
    delayed_firming
  evidence_source:
  confidence:
```

Questo è meglio di codificare `tangzhong = 5%`, perché la letteratura **non dimostra un optimum universale**. L’ASB documenta Tangzhong come tecnica professionale di precottura farina-liquido, ma tali procedure rappresentano metodi professionali, non una legge scientifica che renda il termine tecnicamente uniforme in tutto il mondo. **Patata.** È uno dei moduli in cui il draft aveva maggiormente ragione. Potato flour, mashed potato, potato pulp, flakes e isolated starch sono ingredienti tecnologicamente differenti. Diversi studi mostrano che aumentando prodotti di patata cambiano assorbimento d’acqua, distribuzione dell’acqua, reologia, continuità della rete, specific volume e staling; gli “optimum” differiscono tra studi e forme di ingrediente. Un recente studio sul mashed potato ha trovato miglioramenti della morbidezza/stabilità di conservazione ma anche riduzione di viscoelasticità e specific loaf volume; il 20% era la condizione preferita nel **sistema sperimentale specifico**, non un valore da trasformare in formula universale PizzaMaker. Di conseguenza:

```yaml
POTATO_PROFILE:
  form:
    boiled
    mashed
    flakes
    flour
    pulp
    starch
  input_basis:
    as_is
    dry_matter
    flour_replacement
  mass_g:
  moisture_pct_optional:
  dry_matter_pct_optional:
  gelatinization_state_optional:
  brand_optional:
  water_adjustment:
    measured
    estimated
    unknown
  confidence:
```

La nuova regola dovrebbe essere: **se l’utente seleziona “patata”, PizzaMaker deve prima sapere quale forma usa**. Non ha senso chiedere una precisione fittizia sul contenuto d’acqua se l’utente non lo conosce; in quel caso si usa una composizione di riferimento chiaramente marcata come stima.

Una sintesi ingredient-function diventa così:

| Ingrediente | Effetto supportato | Cosa NON assumere | Evidenza |
|---|---|---|---|
| Saccarosio | substrato + osmotic stress dose-dipendente | più = fermenta più veloce | Ev-A |
| Lievito sweet-dough | diversa tolleranza allo zucchero | moltiplicatore universale | Ev-B/D |
| Grasso solido | stato fisico può influenzare gas cells | burro = shortening in ogni impasto | Ev-B |
| Olio | fase lipidica liquida | equivalente strutturale del burro | Ev-B/G |
| Latte/whey | cambia reologia e qualità | latte = acqua | Ev-B |
| Tuorlo/lecitina | emulsione, extensibility/gas retention nel sistema studiato | uovo = liquido generico | Ev-B |
| Yudane/gelatinized starch | più acqua trattenuta, softness/staling | sempre più volume | Ev-A/B |
| Patata | dose/form-dependent | coefficiente acqua fisso | Ev-A/B |
| Emulsificanti | possono modificare aerazione/gas-cell stability | tutti equivalenti | Ev-B |

## 46.4 Processo: impastamento, fermentazione, formatura, cottura e shelf life

**Mixing.** I sweet/enriched dough non possono ricevere un timer universale. Lo studio di Calderón-Domínguez mostrava, nella propria formulazione, richieste di mixing differenti rispetto a un white pan bread; studi su diversi sistemi di mixing dimostrano inoltre che energia e tempo di impastamento modificano viscosità estensionale, sviluppo e volume e che la quantità di energia realmente trasferita dipende dalla macchina. Il motore dovrebbe quindi usare:

```text
START STATE
→ incorporation
→ structure development
→ enrichment incorporation
→ final development
→ TARGET STATE
```

e registrare almeno:

```yaml
MIXING_STATE:
  cohesion:
  surface:
  extensibility:
  resistance:
  stickiness:
  bowl_release_optional:
  free_fat_visible:
  dough_temperature_optional:
  mixer_type:
  elapsed_time_secondary:
```

“Windowpane” può essere un’osservazione utile, non l’unico endpoint. Un impasto può diventare eccessivamente caldo o perdere la condizione corretta della fase grassa prima di raggiungere un ideale visivo teorico.

**Order of addition.** Il motore non dovrebbe contenere `butter_stage = always_last`. La sequenza deve appartenere a un `MIXING_PROFILE`. Per una brioche ricca, un’aggiunta progressiva dopo uno sviluppo iniziale può essere un ottimo protocollo professionale; per un soft bun con poco grasso possono esistere processi diversi. La ricerca non supporta una sola sequenza universale. **Fermentazione.** La previsione enriched deve dipendere almeno da:

```yaml
FERMENTATION_CONTEXT:
  yeast_profile:
  yeast_dose:
  added_sugar:
  sugar_type_optional:
  salt:
  dough_temperature:
  room_temperature_optional:
  refrigerator_temperature_optional:
  enrichment_load:
  preferment_optional:
  dough_mass:
  process_phase:
  elapsed_time:
  observed_state:
```

Temperatura ambiente deve restare, coerentemente con la decisione UX già presa nel progetto, **un override opzionale**, non un dato obbligatorio e non qualcosa da indovinare usando data o posizione.

L’app può calcolare una dose iniziale di lievito come euristica calibrata, ma dovrebbe mostrare un livello di confidenza. La variazione fra lieviti commerciali e la risposta agli zuccheri rende ingiustificata una formula deterministica generale. La refrigerazione va trattata come strumento di processo — scheduling, controllo della fermentazione e, nei dough ricchi di grassi, possibile aiuto alla maneggiabilità — e non come sinonimo automatico di “qualità superiore”. La letteratura su frozen/cold sweet dough mostra forti interazioni tra zucchero, acqua, grassi, lievito e trattamento, non un beneficio universale del freddo. **Divisione, rounding e intermediate proof.** Qui le fonti professionali sono chiare. Dopo la divisione il rounding ricostruisce una superficie continua; il riposo intermedio permette rilassamento della struttura e facilita le successive operazioni di moulding. I processi industriali distinguono realmente queste fasi. Quindi:

```text
DIVIDE
→ ROUND/PRESHAPE
→ RELAX
→ FINAL MOULD/SHAPE
```

è un template corretto **quando il prodotto e il processo ne hanno bisogno**, ma non una sequenza obbligatoria per ogni piccolo panino.

**Burger bun.** La documentazione professionale supporta divisione, riposo/intermediate proof, formatura e proof finale; nei processi industriali la geometria del bun può essere controllata mediante sheeting/moulding e pans/cavities. Ciò sostiene l’idea che la redistribuzione controllata del gas possa essere deliberata: “non degassare mai” non è una regola universale. **Hot-dog bun.** Le linee professionali utilizzano una fase di moulding specifica per trasformare il pezzo in geometria allungata. È quindi sensato avere un `HOT_DOG_MOULD_PROFILE`; ciò che non abbiamo ancora è evidenza abbastanza robusta per imporre a un utente domestico una specifica cinematica delle mani come unica tecnica corretta. **Shokupan.** La sequenza “stendi → piega → arrotola → metti N rotoli nello stampo” è diffusa professionalmente e nelle pratiche contemporanee, ma non è stata trovata una norma primaria giapponese che renda un preciso numero di pezzi o una precisa tecnica di coiling definitoria di `食パン`. Il futuro visual coach deve quindi distinguere “metodo PizzaMaker validato” da “requisito autentico”. La specifica visuale, allo stato attuale, dovrebbe apparire così:

```yaml
burger_bun_rounding:
  evidence_status: D/G
  initial_state: divided_piece
  camera_view: three_quarter_top
  hand_contact: cupped_hand_or_hands
  force_direction: inward_and_down_against_surface
  movement: controlled_rounding
  dough_response: continuous_outer_skin
  gas_redistribution: moderate
  surface_orientation: smooth_surface_up
  seam_orientation: down
  fat_state: formulation_dependent
  stop_condition: smooth_continuous_skin_without_tearing
  common_wrong_gesture: excessive_tightening_or_tearing

burger_bun_flattening:
  evidence_status: G/H
  initial_state: rounded_and_relaxed_piece
  camera_view: side_plus_top
  hand_contact: broad_surface_contact
  force_direction: down_and_out
  movement: controlled_geometry_setting
  dough_response: diameter_increases_height_decreases
  gas_redistribution: deliberate_but_not_total
  surface_orientation: unchanged
  seam_orientation: down
  stop_condition: profile_specific_geometry
  common_wrong_gesture: crushing_to_a_dense_disc

hot_dog_elongation:
  evidence_status: D/G/H
  initial_state: relaxed_piece
  camera_view: top
  hand_contact: broad_hand_contact
  force_direction: longitudinal
  movement: roll_or_mould
  dough_response: controlled_elongation
  gas_redistribution: moderate
  seam_orientation: down_when_present
  stop_condition: target_geometry_without_recoil_or_thin_ends
  common_wrong_gesture: forcing_unrelaxed_dough

brioche_bun_shaping:
  evidence_status: D/G
  initial_state: divided_temperature_controlled_piece
  camera_view: three_quarter_top
  hand_contact: light_cupped_contact
  force_direction: inward
  movement: round
  dough_response: smooth_surface
  gas_redistribution: moderate
  seam_orientation: down
  fat_state: no_free_smearing
  stop_condition: smooth_shape_without_overheating
  common_wrong_gesture: prolonged_handling_until_greasy

brioche_butter_incorporation:
  evidence_status: D/G
  initial_state: partially_developed_dough_when_profile_requires
  camera_view: mixer_or_close_side
  hand_contact: mixer_specific
  force_direction: mixing_energy
  movement: progressive_incorporation
  dough_response: fat_integrates_and_cohesion_returns
  gas_redistribution: not_primary_target
  surface_orientation: not_applicable
  seam_orientation: not_applicable
  fat_state: profile_specific_plasticity
  stop_condition: no_free_fat_and_target_structure_reached
  common_wrong_gesture: interpreting_any_delayed_butter_method_as_universal

shokupan_moulding:
  evidence_status: D/H
  initial_state: relaxed_preformed_piece
  camera_view: top_plus_side
  hand_contact: profile_specific
  force_direction: controlled_sheet_fold_roll
  movement: method_specific
  dough_response: regular_layered_geometry
  gas_redistribution: controlled
  seam_orientation: profile_specific_usually_down
  fat_state: formulation_dependent
  stop_condition: pan_profile_geometry_reached
  common_wrong_gesture: claiming_one_roll_count_as_definition_of_shokupan

dinner_roll:
  evidence_status: D/G
  initial_state: divided_piece
  camera_view: three_quarter_top
  hand_contact: cupped
  force_direction: inward_down
  movement: round
  dough_response: smooth_skin
  gas_redistribution: moderate
  seam_orientation: down
  fat_state: formulation_dependent
  stop_condition: regular_piece_without_tearing
  common_wrong_gesture: excessive_surface_tension

pull_apart_rolls:
  evidence_status: G
  initial_state: rounded_pieces
  camera_view: top
  hand_contact: placement
  force_direction: minimal
  movement: arrange_in_pan
  dough_response: pieces_expand_and_eventually_contact
  gas_redistribution: minimal_during_placement
  seam_orientation: down
  fat_state: formulation_dependent
  stop_condition: planned_pan_layout_complete
  common_wrong_gesture: random_spacing_without_geometry_target
```

Questa è una delle aree in cui la ricerca precedente era troppo sicura: **rounding e moulding sono ben documentati; la cinematica manuale esatta molto meno**. Le parti G/H non devono ancora essere trasformate in animazioni “questa è la tecnica corretta”.

**Proof finale.** La readiness dovrebbe essere uno stato multidimensionale:

```yaml
ENRICHED_PROOF_STATE:
  estimated_volume_change:
  height:
  diameter:
  lateral_spread:
  surface_tension:
  surface_skin:
  gas_distribution:
  deformation_response_optional:
  dough_temperature_optional:
  fat_state_optional:
  elapsed_time:
```

La scienza generale della proof mostra che esiste un optimum: superarlo può ridurre volume e stabilità; in sistemi sperimentali il sovra-proofing porta a perdita strutturale. Ma un unico valore “2×” non definisce l’optimum per tutti i prodotti. Per la UX, quindi, “raddoppiato?” dovrebbe diventare al massimo un indicatore secondario. Il principiante può ricevere domande qualitative come “si è gonfiato molto?”, “mantiene ancora forma?”, “la superficie è tesa o rilassata?”, mentre l’esperto può inserire temperatura e misure.

**Surface finish.** Uovo, albume, latte, amidi e grassi applicati in superficie producono risultati differenti. Studi specifici hanno misurato effetti dei glaze sulla crosta e sullo staling, e studi moderni sulle alternative all’egg wash mostrano che composizione, pH, quantità applicata e tempo di cottura cambiano colore e gloss. Quindi l’egg wash è una scelta di processo, non un ingrediente obbligatorio dei buns. ```yaml
SURFACE_FINISH_PROFILE:
  type:
    none
    whole_egg
    yolk
    white
    milk
    cream
    starch
    water
    post_bake_butter
  dilution_optional:
  application_mass_optional:
  seed_topping:
  target:
    gloss
    color
    softness
    adhesion
```

**Cottura.** La formulazione enriched cambia il rapporto tra colore esterno e stato interno. In studi su sweet bread, uovo, latte in polvere e zucchero modificavano significativamente la luminosità della crosta; altri lavori mostrano che temperatura/tempo e quantità/tipo di zucchero influenzano la colorazione. Il colore esterno, quindi, può avanzare molto più velocemente rispetto a un pane lean. ```yaml
ENRICHED_BAKING_PROFILE:
  oven_type:
  pan_type:
  piece_mass:
  geometry:
  setpoint:
  convection:
  top_heat_optional:
  bottom_heat_optional:
  sugar_load:
  dairy_load:
  egg_load:
  surface_finish:
  endpoints:
    crust_color:
    structural_set:
    bake_loss_optional:
    center_temperature_optional:
```

La temperatura interna può essere un segnale molto utile quando disponibile, ma la ricerca non giustifica **una temperatura universale** come unica prova di cottura per tutti gli enriched dough.

**Cooling e shelf life.** Qui la separazione deve essere definitiva:

```text
TEXTURAL_SHELF_LIFE
≠
MICROBIOLOGICAL_SHELF_LIFE
```

Staling e perdita di morbidezza dipendono da retrogradazione dell’amilopectina, ridistribuzione dell’acqua, struttura, formulazione, condizioni di cottura e conservazione. Il profilo di cottura stesso influenza la distribuzione di umidità e la successiva cinetica di staling. Il rischio microbiologico è un problema diverso. Uno studio quantitativo del 2024 sulla contaminazione da *Aspergillus niger* nel pane bianco ha identificato tempo/temperatura di vendita e contaminazione durante il raffreddamento industriale tra i principali driver del rischio; un’indagine ambientale in panificio ha trovato contaminazione post-bake nell’aria e sulle superfici di contatto, soprattutto in aree di slicing/packaging. Anche il packaging cambia radicalmente la durata microbiologica: uno studio su white bread senza conservanti ha ottenuto durate diverse modificando barriera all’ossigeno e atmosfera; un altro su bakery products ha esteso la mould-free shelf life mediante CO₂ e oxygen scavenger. Questi risultati dimostrano perché PizzaMaker non può dedurre “dura cinque giorni” dalla sola ricetta. Uno studio recente ha inoltre osservato, nel proprio sistema con sourdough, maggiore condensa e crescita di muffe confezionando a 40–45 °C rispetto a 30 °C. È un’evidenza utile per il principio “non chiudere caldo e umido”, ma non autorizza a hardcodare 30 °C come soglia universale per tutti i buns. ## Motore decisionale, diagnostica, calcoli, modello dati e UX

Il motore enriched dovrebbe diventare:

```text
PRODUCT FAMILY
+ TARGET RESULT
+ USER EQUIPMENT
+ AVAILABLE TIME
+ FLOUR PROFILE
+ ENRICHMENT PROFILE
+ YEAST PROFILE
→ FORMULATION WINDOW
→ MIXING PROFILE
→ FERMENTATION TEMPLATE
→ MAKEUP PROFILE
→ PROOF CHECKPOINTS
→ BAKING PROFILE
→ COOLING/STORAGE GUIDANCE
```

e durante il processo:

```text
PHASE
+ OBSERVED STATE
+ TEMPERATURE if known
+ TIME REMAINING
+ ENRICHMENT LOAD
+ EQUIPMENT
→ CONTINUE
  / WAIT
  / COOL
  / MIX
  / STOP MIXING
  / DIVIDE
  / RELAX
  / MOULD
  / PROOF MORE
  / BAKE
  / ADAPT BAKE
```

### Registro dei calcoli

Per evitare la confusione con i livelli di evidenza `Ev-A…H`, qui uso `Calc-A…D`.

| Calcolo | Classe | Implementazione corretta |
|---|---:|---|
| Baker’s percentages | Calc-A | deterministico |
| Massa totale | Calc-A | deterministico |
| Numero × peso pezzi | Calc-A | deterministico |
| Acqua chimicamente presente, se composizione nota | Calc-A | somma delle frazioni d’acqua |
| Grasso totale, se composizione nota | Calc-A | compositional ledger |
| Zuccheri totali noti | Calc-A | compositional ledger |
| Egg solids / dairy solids noti | Calc-A | compositional ledger |
| Flour fraction in starch gel | Calc-A | deterministico |
| “Effective hydration” reologica | **Calc-C/D** | non riducibile alla sola acqua |
| Osmotic load biologicamente efficace | Calc-C | richiede modello calibrato |
| Dose di lievito | Calc-C | euristica con confidence |
| Correzione per lievito osmotollerante | Calc-C/H | produttore/modello specifico |
| Conversione fresh/active dry/instant | Calc-B/C | source-specific, non costante assoluta |
| DDT target | Calc-B/C | profilo di processo |
| Temperatura acqua da DDT | Calc-A una volta noti target/fattori | friction factor empirico |
| Proof time | Calc-C/D | stima + state check |
| Target bun weight da numero pezzi | Calc-A | matematico |
| Target bun weight per stile | Calc-B/C | profilo empirico |
| Diametro finale previsto | Calc-C | formula+shaping+proof+pan |
| Bake time | Calc-C/D | equipment/profile dependent |
| Cooling-to-pack | Calc-C/D | prodotto/packaging dependent |
| Softness a 24/48 h | Calc-C | solo dopo calibrazione |
| Shelf life microbiologica | **Calc-D** generico | niente promessa senza validazione |

La principale correzione rispetto alla bozza è eliminare dall’interfaccia concettuale la tentazione di mostrare una singola **effective hydration** come dato “vero”. Meglio visualizzare due cose differenti:

```text
TOTAL COMPOSITIONAL WATER
```

e, quando utile:

```text
EXPECTED DOUGH CONSISTENCY: softer / balanced / firm
confidence: medium
```

La prima è matematica; la seconda è una previsione.

### Diagnostica

La diagnostica enriched deve essere causale e discriminante, non una tabella “problema → fai X”.

| Stato | Cause da discriminare | Osservazioni decisive | Azione attuale | Da non fare |
|---|---|---|---|---|
| Dough greasy/smearing | grasso troppo caldo, dough troppo caldo, incorporazione incompleta | film grasso libero, temperatura, perdita di coesione | fermare/ridurre energia, raffreddare secondo profilo | aggiungere farina alla cieca |
| Non sviluppa struttura | formulazione molto ricca, farina insufficiente, poca acqua disponibile, fat timing, under-mixing | resistenza, coesione, temperatura | continuare solo se temperatura e sistema lo consentono | inseguire indefinitamente il windowpane |
| Molto appiccicoso | temperatura, zuccheri, acqua, underdevelopment | free fat vs tack acquoso, temperatura | raffreddare/riposare o continuare sviluppo secondo causa | correggere subito con molta farina |
| Dough troppo rigido | bassa acqua disponibile, freddo, farina assorbente | temperatura + estensibilità | riposo o correzione prevista dal profilo | aggiungere acqua casualmente tardi |
| Proof molto lento | stress osmotico, lievito inadatto/inattivo, dough freddo, sale, dose | temperatura + progressione reale | prolungare/portare alle condizioni previste | aggiungere lievito secco direttamente al panetto |
| Proof troppo rapido | dough caldo, dose alta, tempo/temperatura non coerenti | temperatura + velocità di espansione | anticipare fase successiva/raffreddare se appropriato | aspettare “le ore della ricetta” |
| Poco volume | bassa produzione gas o bassa retention | gas development vs struttura | distinguere prima causa | aumentare automaticamente il lievito |
| Collasso | overproof, struttura debole, eccesso di gas/retention failure | superficie, spread, fragilità | cuocere/recuperare secondo stadio | reshaping tardivo come default |
| Recoil in shaping | riposo insufficiente, tensione elevata, dough freddo | ritorno elastico immediato | bench rest | forzare allungamento |
| Seam si apre | chiusura debole, troppa farina in seam, tensione/geometria | seam visibile | richiudere se ancora in shaping | bagnare indiscriminatamente |
| Burger bun troppo alto/stretto | moulding/flattening insufficiente, tensione, proof/geometry | diametro vs altezza | correggere processo nel lotto successivo | attribuire tutto al lievito |
| Burger bun troppo piatto | struttura debole, eccessivo flattening, overproof | spread pre-bake | anticipare bake o rivedere shaping | aumentare farina senza diagnosi |
| Hot-dog bun si accorcia | recoil/insufficiente relaxation | contraction subito dopo mould | riposo ulteriore | tirare con più forza |
| Brioche si unge | fase grassa troppo calda/separazione | superficie oily | cool/rest appropriato | impastare sempre più forte |
| Esterno scuro, centro non cotto | formula ricca + troppo heat flux | colore precoce, centro non set | proteggere/ridurre heat input e prolungare | basarsi sul solo colore |
| Pallido | wash, zuccheri/proteine, heat input insufficiente | temperatura reale/finish | correggere bake profile | aggiungere zucchero automaticamente |
| Mollica gummy | bake insufficiente, rapporto acqua/gel, raffreddamento, formula | center set + cooling | completare cottura se possibile | tagliare caldo per “controllare” |
| Crosta raggrinzita | struttura/umidità/proof/cooling | quando compare il difetto | diagnosi multifattoriale | associare automaticamente a un solo errore |

Le cause qui riportate combinano evidenza sperimentale su fermentazione, mixing, gas retention e baking con inferenze di processo; per questo il diagnostic engine deve memorizzare il livello di evidenza di **ogni relazione causa→azione**, non soltanto quello del prodotto.

### Modello dati consolidato

Il modello del draft va ampliato e soprattutto normalizzato:

```yaml
PRODUCT_STYLE_PROFILE:
  family:
  commercial_name:
  regulatory_status_optional:
  target_profile:
  geometry_profile:
  source_tags:

TARGET_PROFILE:
  crumb_structure:
  softness:
  resilience:
  compressibility:
  sliceability:
  richness:
  next_day_softness_target:

COMPOSITION_LEDGER:
  ingredients:
  total_water:
  total_fat:
  total_sugars:
  total_protein:
  total_starch:
  total_other_solids:
  confidence:

ENRICHMENT_PROFILE:
  sugar_load:
  lipid_load:
  dairy_profile:
  egg_profile:
  starch_gel_profile:
  potato_profile:
  other_emulsifiers:

YEAST_PROFILE:
  form:
  manufacturer:
  product:
  osmotolerance:
  manufacturer_guidance:
  conversion_source:
  confidence:

FERMENTATION_CONTEXT:
  inoculation:
  dough_temperature:
  ambient_temperature_optional:
  fridge_temperature_optional:
  sugar_load:
  salt:
  phase:
  state_observations:

MIXING_PROFILE:
  mixer:
  stage_sequence:
  enrichment_addition:
  target_state:
  stop_conditions:
  temperature_limit_profile:

STARCH_GEL_PROFILE:
  method_label:
  flour_fraction:
  flour_liquid_ratio:
  process_temperature:
  hold:
  cool:
  storage:
  target:

POTATO_PROFILE:
  form:
  basis:
  moisture:
  dry_matter:
  gelatinization_state:
  confidence:

MAKEUP_PROFILE:
  division:
  preshape:
  rounding:
  intermediate_rest:
  final_moulding:
  seam:
  target_tension:
  degassing_intent:
  geometry:

ENRICHED_PROOF_STATE:
  height:
  diameter:
  volume_estimate:
  lateral_spread:
  surface:
  gas_state:
  dough_temperature_optional:
  time_secondary:

SURFACE_FINISH_PROFILE:
  wash:
  dilution:
  topping:
  target_color:
  target_gloss:

ENRICHED_BAKING_PROFILE:
  oven:
  pan:
  geometry:
  product_mass:
  heat_profile:
  endpoints:

COOLING_PACKAGING_PROFILE:
  cooling_method:
  package_type:
  package_ready_state:
  condensation_risk:
  microbial_validation:

SHELF_LIFE_PROFILE:
  textural_target:
  microbiological_claim:
  packaging:
  storage:
  validation_source:

EVIDENCE_REFERENCE:
  evidence_level:
  source:
  domain:
  conditions:
  applicability:
  confidence:
```

Questo schema risolve un problema fondamentale del primo PizzaMaker: **un valore non entra più nel motore senza sapere se è una proprietà, un default, una stima, un metodo professionale o una regola scientificamente verificata**.

### UX

Per un principiante, l’interfaccia iniziale dovrebbe evitare completamente W, P/L, osmolarità, attività del lievito e water-equivalent.

Il flusso più naturale è:

```text
Cosa vuoi preparare?
→ Burger bun
→ Hot-dog bun
→ Panino al latte
→ Brioche bun
→ Brioche ricca
→ Potato bun
→ Milk bread / Shokupan
```

Poi:

```text
Che risultato cerchi?
→ molto soffice
→ soffice ma resistente
→ più ricco e burroso
→ elastico / filante
→ stabile per hamburger
→ morbido anche il giorno dopo
```

Solo dopo vengono tempo disponibile, quantità e attrezzatura.

In “Avanzate”:

```text
farina
W/P-L
zuccheri
burro/grassi
latte
uova/tuorli
tipo di lievito
marca/linea lievito
Tangzhong/Yudane
patata
DDT
temperature
processo preferito
```

La temperatura ambiente resta **opzionale**: riferimento interno neutro più override consapevole, non geolocalizzazione e non stagione come proxy.

## 46.5 Audit del draft precedente, gap residui ed esperimenti

Il file `PizzaMaker_Ricerca_Verticale_Buns_Impasti_Arricchiti_v1.0.md` può essere conservato come **scaffolding progettuale**, ma non deve più avere lo stato “ricerca verticale completata”. L’audit produce questo risultato:

| Area del draft | Verdetto | Correzione |
|---|---|---|
| Dominio enriched separato | **CONFIRMED** | forte |
| `LIQUID_CONTRIBUTION` | **MODIFIED** | diventare composition ledger + functional effects |
| Sugar high → osmotic stress | **CONFIRMED** | principio forte |
| `YEAST_PROFILE.osmotolerance` | **CONFIRMED** | aggiungere source/manufacturer |
| Soglia sugar universale | **REJECTED** se implicita | brand/system-specific |
| Butter ≠ oil | **CONFIRMED** | evitare generalizzazioni sul gas |
| Cristalli grasso stabilizzano gas cells | **MODIFIED** | vero in sistemi studiati, non legge universale brioche |
| Butter delayed | **MODIFIED** | metodo professionale, non obbligo |
| Dairy profile | **CONFIRMED** | latte/whey distinti |
| Egg profile | **CONFIRMED** | intero/tuorlo/albume distinti |
| Tangzhong/Yudane | **MODIFIED** | generalizzare a `STARCH_GEL_PROFILE` |
| Tangzhong sempre benefico | **REJECTED** |
| Potato profile | **CONFIRMED** |
| Coefficiente acqua patata | **REJECTED** |
| Mixing state-based | **CONFIRMED** |
| Burger shaping YAML preciso | **UNSUPPORTED / PROVISIONAL** | serve visual research |
| Hot-dog hand motion preciso | **UNSUPPORTED / PROVISIONAL** |
| Rounding + intermediate proof + moulding | **CONFIRMED** professionalmente |
| Proof ≠ semplice raddoppio | **CONFIRMED** |
| Egg wash opzionale | **CONFIRMED** |
| Enriched baking profile | **CONFIRMED** |
| Shelf life split | **CONFIRMED** |
| Packaging temp universale | **REJECTED** |
| “Milk bun” come standard stabile USA | **MODIFIED** | status regolatorio in evoluzione nel 2026 |
| Shokupan = Tangzhong | **REJECTED** |
| Shokupan = Japanese milk bread in senso normativo | **REJECTED** |
| Dominio completamente chiuso | **REJECTED** |
| Manuale v2.0 immediatamente definitivo | **MODIFIED** | architettura sì; alcuni motori no |

**Nuovi finding che mancavano al draft.** Il primo è normativo: lo standard americano “milk bread, rolls and buns” non dovrebbe entrare nell’ontologia come definizione eterna perché FDA ne sta rivalutando/revocando lo standard nel ciclo 2025–2026. Il secondo è tassonomico: l’uso occidentale “Shokupan/Japanese milk bread/Tangzhong” fonde concetti che le fonti ufficiali giapponesi non obbligano a far coincidere. Il terzo è microbiologico: la fase di raffreddamento non è soltanto “aspetta che sia freddo”, ma può essere uno dei punti chiave della contaminazione post-bake; per un’app domestica ciò non significa trasformarsi in HACCP, ma significa **non promettere shelf life microbiologica calcolata dalla ricetta**. Il quarto riguarda i gesti: per processi come burger e hot-dog bun abbiamo buone fonti professionali sulla sequenza, ma non abbastanza evidenza primaria sulla **cinematica manuale esatta** per produrre già ora animazioni didattiche normative.

### Cosa è implementabile e cosa no

**Implementabile ora con buona sicurezza:** ontologia dei prodotti; composition ledger; sugar/fat/dairy/egg/potato/starch-gel profiles; separazione rounding/rest/moulding; enriched proof state; surface finish; enriched baking profile; textural-vs-microbial shelf-life split; evidence tagging; UX con progressive disclosure.

**Implementabile come stima con confidence:** dose lievito, tempi di fermentazione, flour compatibility, expected softness, target piece-weight profiles, bake window.

**Da non implementare ancora come formula certa:** correzione universale osmotolerant yeast, effective hydration unica, water coefficient della patata, Tangzhong optimum, proof time universale, cooling-to-pack universale, shelf life in giorni.

**Da approfondire con micro-ricerca visuale:** rounding manuale per bun, flattening del burger bun, moulding manuale hot-dog, brioche bun, Shokupan rolls/coils. Non serve una nuova Deep Research di cento pagine: serve una ricerca su fonti video primarie di scuole/professionisti, con verifica fotogramma per fotogramma dei gesti.

**Da calibrare sperimentalmente:** fermentazione enriched e predizione del lievito. La letteratura dimostra le direzioni causali, ma non fornisce una formula domestica universale sufficientemente robusta.

### Esperimenti A/B prioritari

Per la **fermentazione zucchero × lievito**, un benchmark scientifico utile è replicare, in un impasto standardizzato PizzaMaker, almeno una condizione senza zucchero e livelli comparabili alle condizioni 7% e 21% usate nel lavoro di Timmermans, confrontando lievito standard e sweet-dough/osmotolerant dello stesso produttore. Si misurano temperatura impasto, tempo per raggiungere un volume geometrico definito, produzione/espansione, spread e volume post-cottura. Quei livelli sono scelti perché provengono dallo studio, non perché debbano diventare preset universali. Per **Yudane**, un esperimento 0/20/40% della quota di farina destinata al metodo permetterebbe di replicare direttamente le condizioni del lavoro Yamauchi su un prodotto PizzaMaker, misurando proof time, specific volume, moisture e firmness a 0/24/48 h. Anche in questo caso il 20/40% è un protocollo sperimentale source-based, non una raccomandazione di ricetta. Per **patata**, invece, è meglio non confrontare percentuali finché non si fissa la forma dell’ingrediente. Prima si esegue `mashed potato` a più dosi, poi flakes o flour come esperimento separato. Gli studi pubblicati mostrano proprio che condizioni nell’ordine del 10–30% possono produrre optimum diversi a seconda del materiale e del processo. Per **butter timing**, l’esperimento più utile è early-vs-delayed incorporation mantenendo identici formula, temperatura finale ed energia di mixing quanto più possibile; è precisamente una delle aree in cui la pratica professionale è più forte della letteratura diretta.

Per **burger bun shaping**, si confrontano round-only, round→rest→controlled flattening e moulding equivalente, registrando diametro/altezza pre-proof, post-proof e post-bake, spread, crumb distribution e resistenza alla compressione. Questo esperimento serve a trasformare un’attuale inferenza G in un profilo PizzaMaker empiricamente calibrato.

Per **shelf life**, PizzaMaker può misurare firmness/sensory softness a 0/24/48/72 h in condizioni di conservazione definite, ma **non deve fare colture domestiche di muffe né trasformare l’assenza visiva di muffa in certificazione di sicurezza**. La microbiologia richiede validazione professionale e controllata. Gli studi sul packaging dimostrano quanto temperatura, atmosfera e contaminazione possano cambiare la durata indipendentemente dalla formulazione. La decisione finale di ricerca è quindi precisa: **questa Deep Research è sufficiente per sostituire scientificamente la vecchia bozza Buns v1.0 e per progettare il dominio enriched del Manuale Universale. Non è sufficiente per trasformare ogni parametro in algoritmo quantitativo o ogni gesto in animazione normativa.** Prima di un motore predittivo avanzato servono micro-ricerche e calibrazioni mirate; prima del Manuale Universale v2.0, inoltre, la verticale **Pane + Focacce** dovrebbe ricevere lo stesso trattamento Deep Research, perché quella precedente era stata prodotta con metodologia meno rigorosa.

## 46.6 Bibliografia ragionata

La base sotto comprende letteratura sperimentale peer-reviewed, documentazione ufficiale e fonti professionali primarie. Le fonti professionali e dei produttori sono usate per descrivere processi o caratteristiche dei propri prodotti, non come prova scientifica universale.

| Fonte | Anno / DOI | Categoria | Cosa supporta | Affidabilità |
|---|---|---|---|---|
| Timmermans et al., *Sugar Levels Determine Fermentation Dynamics during Yeast Pastry Making and Its Impact on Dough and Product Characteristics* | 2022; `10.3390/foods11101388` | ricerca sperimentale | sugar dose, osmotic stress, CO₂, volume | Ev-A |
| Timmermans et al., *Knowledge of fermentation dynamics allows for reducing sugar levels in yeast-leavened pastry* | 2023; `10.1016/j.jcs.2022.103601` | ricerca sperimentale | dinamica zuccheri/fermentazione | Ev-A/B |
| Birch et al., studio comparativo di lieviti commerciali da panificazione | 2013; `10.1016/j.jcs.2013.05.009` | ricerca sperimentale | differenze tra yeast commerciali | Ev-A/B |
| Studio sulla proline accumulation e tolleranza di baker’s yeast ad alto saccarosio | 2012; `10.1016/j.ijfoodmicro.2011.10.004` | microbiologia sperimentale | strain/osmotolerance | Ev-A/B |
| Meerts et al., studio sui metaboliti del lievito e la reologia del dough | 2018; `10.1016/j.jcs.2018.06.006` | ricerca sperimentale | fermentazione e rheology | Ev-B |
| Calderón-Domínguez et al., *Structural and farinographic changes during mixing of a yeast sweet dough* | 2003; `10.1002/food.200390073` | ricerca sperimentale | mixing sweet dough | Ev-B |
| Huang et al., studio su frozen sweet dough e formulazione | 2008; `10.1016/j.jcs.2008.02.008` | ricerca sperimentale | interazioni formulation/process | Ev-B |
| Zhao & Kweon, ottimizzazione frozen sweet bread dough | 2021; `10.1016/j.lwt.2020.110581` | ricerca sperimentale | sugar/fat/water/yeast interactions | Ev-B |
| Öhgren et al., frozen dough, rye/sugar/kneading/proofing | 2016; `10.1016/j.lwt.2015.12.069` | ricerca sperimentale | non-linear process interactions | Ev-B |
| Brooker, *The Role of Fat in the Stabilisation of Gas Cells in Bread Dough* | 1996; `10.1006/jcrs.1996.0052` | ricerca sperimentale | cristalli grasso/gas-cell interface | Ev-A/B |
| Mousia et al., fat level/mixing/proofing e gas loss | 2007; `10.1016/j.jcs.2006.12.006` | ricerca sperimentale | interazione fat/process | Ev-B |
| Studio su wheat endogenous lipids e gas-cell stabilization | 2014 | ricerca sperimentale | lipidi/interfaccia gas | Ev-B |
| Studio sulla variazione dei lipidi di frumento e proprietà delle gas bubbles | 2020 | ricerca sperimentale | lipidi e volume/crumb | Ev-B |
| Iuga et al., *Impact of Dairy Ingredients on Wheat Flour Dough Rheology and Bread Properties* | 2020; `10.3390/foods9060828` | ricerca sperimentale | milk/whey ≠ water | Ev-A/B |
| Ishibashi et al., *Effect of Egg on Rheological Properties of Dough and Bread Quality* | 2022; `10.11402/cookeryscience.55.281` | ricerca sperimentale | whole egg/yolk/white/lecithin | Ev-A/B |
| Studio storico su egg yolk, ultrastruttura e loaf volume | 1984 | ricerca sperimentale | ruolo del tuorlo | Ev-B |
| Studio su emulsificanti e aerazione durante breadmaking | 2018 | ricerca sperimentale | emulsifier-specific gas behaviour | Ev-B |
| Yamauchi et al., *The Staling and Texture of Bread Made Using the Yudane Dough Method* | 2014; `10.3136/fstr.20.1071` | ricerca sperimentale | Yudane, moisture, softness, volume, staling | Ev-A |
| *Effect of Gelatinized Wheat Starch on Bread-making Qualities of Yudane Dough* | 2015; `10.3136/nskkk.62.547` | ricerca sperimentale | starch gel, gas retention, volume | Ev-A/B |
| Parenti et al., gelatinized flour in brown wheat bread | 2019; `10.1016/j.lwt.2019.02.066` | ricerca sperimentale | gelatinization × water interaction | Ev-B |
| Sugiura et al., pregelatinized starch paste/high-moisture bread | 2017; `10.1016/j.jfoodeng.2017.06.021` | ricerca sperimentale | moisture/softness | Ev-B |
| Meng et al., potato e sweet-potato flour in wheat bread | 2022; `10.1002/fsn3.2693` | ricerca sperimentale | dose/form-dependent potato | Ev-A/B |
| *Influence of potato flour on dough rheological properties and quality of steamed bread* | 2016; `10.1016/S2095-3119(16)61388-6` | ricerca sperimentale | water absorption/volume | Ev-B |
| *Use of two-stage dough mixing process in improving water distribution… wheat-potato flour* | 2021; `10.1016/S2095-3119(20)63433-5` | ricerca sperimentale | competitive water absorption/process | Ev-A/B |
| Studio su potato flour e staling wheat-potato bread | 2020 | ricerca sperimentale | potato/staling | Ev-B |
| *Functional roles of mashed potatoes in shaping dough rheology and bread storage stability* | 2026; `10.1016/j.gaost.2026.03.001` | ricerca sperimentale | mashed potato, volume, retrogradation | Ev-B |
| Studio su potato-pulp e network/volume | ricerca sperimentale | potato form/dose | Ev-B |
| Studio su mixing processes, extensional rheology e baked attributes | `PMID 20597094` | ricerca sperimentale | energy input/mixer | Ev-A/B |
| *Impact of gas formation kinetics on dough development and bread quality* | studio sperimentale | IDY/CY, gas formation/retention | Ev-B |
| Studio su dough stress durante proof e bread-making quality | 2019 | ricerca sperimentale | proof state/gas retention | Ev-B |
| Besbes et al., baking conditions/moisture/staling kinetics | 2014; `10.1016/j.lwt.2014.02.037` | ricerca sperimentale | bake profile → staling | Ev-A/B |
| Studio su water transfer crumb→crust e staling | 2017; `10.1016/j.jfoodeng.2017.04.016` | ricerca sperimentale | moisture migration/staling | Ev-A/B |
| Studio su water migration e amylopectin retrogradation | 2007; `10.1016/j.lwt.2006.03.023` | ricerca sperimentale | staling mechanism | Ev-A/B |
| *Glazing Effects on Bread Crust and Crumb Staling During Storage* | 2011; `10.1111/j.1745-4603.2011.00307.x` | ricerca sperimentale | egg white/milk/starch/fat glaze | Ev-B |
| Benbow et al., *Plant-based egg washes for use in baked goods* | 2024; `10.1111/1750-3841.17230` | ricerca sperimentale | wash composition/color/gloss | Ev-B |
| Studio sweet bread: formula × crust luminosity | 2005 | ricerca sperimentale | egg/milk powder/sugar e colore | Ev-B |
| *Characteristic coloring curve for white bread during baking* | 2011 | ricerca sperimentale | time/temp vs crust color | Ev-B |
| *Packaging to prolong shelf life of preservative-free white bread* | 2018; `10.1016/j.heliyon.2018.e00802` | ricerca sperimentale | oxygen/package vs mold | Ev-A/B |
| Chou et al., quantitative microbial spoilage risk of *A. niger* in white bread | 2024; `10.1016/j.fm.2023.104443` | microbial risk model | cooling contamination/storage temperature | Ev-A |
| Chou et al., onsite postbaking mold contamination study | 2023; `10.1016/j.foodcont.2022.109495` | field microbiology | air/FCS contamination after baking | Ev-A/B |
| Palladium oxygen scavenger / bakery mould-free shelf life | 2022; `10.1016/j.fpsl.2021.100771` | ricerca sperimentale | packaging atmosphere | Ev-B |
| Studio packaging temperature × microbiological spoilage | 2025 | ricerca sperimentale | warm packing/condensation | Ev-B |
| FDA, *Standards of Identity for Food* | aggiornato 2026 | fonte ufficiale | framework legale | Ev-C |
| FDA, standard interessati dalle revoche; include 21 CFR 136.130 | 2025–2026 | fonte ufficiale | milk bread/rolls/buns status | Ev-C |
| FDA, *Foods Program Regulations Under Development* | 2026 | fonte ufficiale | futura proposta bakery SOI | Ev-C |
| Consumer Affairs Agency Japan, Food Labeling Standards — categorie pane | fonte ufficiale | definizione generale dough/pan | Ev-C |
| MAFF, statistiche e glossario bread/`食パン` | fonte ufficiale | classificazione Shokupan | Ev-C |
| Légifrance, référentiel Bac Pro boulangerie-pâtisserie | 2026 | standard professionale ufficiale | pain au lait, pain brioché, brioche, pain de mie | Ev-C/D |
| American Society of Baking, *Hamburger Bun* | fonte professionale | process industriale buns | Ev-D |
| American Society of Baking, *Dough Rounding* | fonte professionale | rounding function | Ev-D |
| American Society of Baking, *Intermediate Proof* | fonte professionale | relaxation prima del moulding | Ev-D |
| American Society of Baking, *Dough Moulding* | fonte professionale | moulding/cell structure | Ev-D |
| American Society of Baking, *Bread Processing* | fonte professionale | sequenza makeup | Ev-D |
| American Society of Baking, *Brioche* | fonte professionale | famiglia/procedura brioche | Ev-D |
| American Society of Baking, *Tangzhong Method* | fonte professionale | definizione operativa Tangzhong | Ev-D |
| American Society of Baking, *Dry Yeast* | fonte professionale | sugar/yeast guidance | Ev-D |
| American Society of Baking, *Yeast Nutrients* | fonte professionale | osmotic pressure guidance | Ev-D |
| American Society of Baking, dairy/dry-milk processing documentation | fonte professionale | milk heat-treatment functionality | Ev-D |
| Lesaffre, Saf-Instant Gold / sweet-dough yeast documentation | manufacturer primary | prodotto specifico sweet dough | Ev-D, solo product-specific |
| Angel Yeast, sugar-tolerant yeast guidance | manufacturer primary | range zucchero specifico prodotto | Ev-D, solo product-specific |
| AMF Bakery Systems, bun make-up systems | manufacturer/professional | division-rounding-moulding, hot-dog geometry | Ev-D |

Il quadro complessivo delle fonti converge su una conclusione architetturale molto netta: **la scienza permette già di costruire un ottimo motore di conoscenza enriched, ma non un “calcolatore magico” che ricavi lievito, tempo, morbidezza, diametro e shelf life da quattro percentuali**. La super-app deve essere più sofisticata proprio nel dichiarare dove termina la matematica e dove iniziano modello empirico, osservazione e calibrazione.

---

---

# C. Rapporto Deep Research — Pane + Focacce

# 47. Rapporto Deep Research integrale — Pane + Focacce

Questa sezione conserva il rapporto Deep Research usato per l'integrazione della sezione 44. Il testo è mantenuto come **evidence appendix**: conserva ragionamento, limiti, livelli di evidenza, gap, esperimenti e bibliografia.

In caso di apparente conflitto, la sezione 44 rappresenta la sintesi architetturale adottata dal Manuale; questa sezione conserva il contesto di ricerca.

# PizzaMaker — Ricerca verticale Pane + Focacce

## Esito della ricerca, metodo ed evidenza

### Executive summary

La verticale **Pane + Focacce può sostituire la precedente bozza come base scientifica**, con una precisazione importante: è sufficientemente robusta per definire **ontologia, famiglie di prodotto, vincoli dei cereali, architettura di fermentazione, stato dell'impasto, motore diagnostico, profili di cottura e regole di conformità**, ma **non giustifica ancora l'automazione di alcuni gesti manuali fini né una formula universale di fermentazione**.

Le conclusioni più importanti per PizzaMaker sono queste.

**Il pane non può avere un unico “motore glutine”.** Il frumento bianco può essere modellato prevalentemente attraverso una rete glutine-amido; l'integrale introduce crusca, fibra e cinetiche di idratazione che alterano la rete; la segale dipende molto più da arabinoxilani, amido, acidificazione ed enzimi; il grano duro/semola possiede proprietà proteiche e granulometriche che non possono essere previste semplicemente trasferendo W, P/L e regole del frumento tenero. **W e P/L sono caratteristiche reologiche, non un orologio di fermentazione.** ISO 27971 standardizza l'Alveograph per farine di frumento comune in condizioni metodologiche definite; non fornisce alcuna equivalenza “W → ore”. Inoltre, studi su frumento e soprattutto grano duro mostrano che le misure reologiche standard hanno capacità predittiva limitata quando vengono usate da sole per prevedere il risultato del pane. **L'integrale non è “farina bianca + X% acqua”.** La dimensione delle particelle di crusca, la cultivar, il livello d'inclusione, il trattamento e la velocità di idratazione modificano assorbimento, sviluppo, estensibilità, volume e mollica in modi non lineari; perfino crusca finissima non è automaticamente migliore della grossolana. **La segale necessita di un `STRUCTURAL_SYSTEM` proprio.** Gli arabinoxilani interagiscono con acqua, proteine e fase liquida e possono sia contribuire alla struttura sia comprometterla a seconda di quantità, solubilità e trattamento. Di conseguenza, windowpane, sviluppo glutinico e tensionamento tipici del frumento diventano progressivamente meno significativi all'aumentare della segale. **Il lievito madre non è un ingrediente con un coefficiente di conversione.** Flora, farina, inoculo, temperatura, tempo, pH e acidità modificano proteolisi, aroma, reologia e attività fermentativa; colture diverse producono risultati differenti. L'acidificazione può provocare depolimerizzazione proteica attraverso enzimi endogeni, quindi “più acido” non significa automaticamente “più forte” o “migliore”. **Gas prodotto e crescita dell'impasto non sono sinonimi.** Il risultato osservato dipende almeno da produzione di CO₂, incorporazione iniziale di aria, ritenzione del gas, proprietà viscoelastiche e stabilità delle celle. Anche ceppi commerciali di *S. cerevisiae* possono mostrare profili espansivi diversi. **Il vapore deve diventare un profilo di processo, non un comando “aggiungi acqua”.** Studi controllati mostrano effetti misurabili di quantità e storia temporale del vapore su gelatinizzazione superficiale, lucentezza, colore e proprietà meccaniche della crosta; i millilitri usati in uno specifico forno sperimentale non sono trasferibili direttamente a un forno domestico. **Anche la cottura deve essere descritta tramite storia termica.** Conduzione, convezione, irraggiamento, massa termica, evaporazione e velocità di riscaldamento determinano espansione, gelatinizzazione, struttura e crosta; due prodotti con uguale temperatura finale possono aver subito storie fisiche differenti. **Le focacce non costituiscono una sola famiglia tecnica.** L'esempio più netto è la Focaccia di Recco col formaggio IGP: il documento unico aggiornato nel 2025 la definisce con altezza inferiore a 1 cm e un sistema farina-acqua-EVOO-sale-formaggio; il lievito non compare tra le materie prime prescritte. Va quindi separata ontologicamente dalle focacce fermentate e alveolate.

### Metodo e stato documentale

La ricerca ha privilegiato studi sperimentali peer-reviewed, standard ISO/ICC, EUR-Lex, FDA/CDC e documentazione ufficiale degli organismi di controllo. I risultati consumer e i blog emersi durante la ricerca sono stati esclusi dalle conclusioni tecniche.

Il corpus vagliato supera il requisito minimo in termini di record candidati; dopo rimozione di duplicati, review non necessarie e fonti secondarie, il nucleo utilizzabile è costituito da **circa sessanta fonti primarie, standard o documenti ufficiali indipendenti**. Le review sono state usate, quando incontrate, per orientamento bibliografico e non come fondamento delle regole automatiche.

C'è però una limitazione documentale da dichiarare: in questa sessione i file `PizzaMaker_Manuale_Universale_Panificazione_v1.5.md` e `PizzaMaker_Ricerca_Verticale_Pane_Focacce_v1.0.md` **non erano recuperabili tramite il sistema di ricerca file**. Di conseguenza, l'audit scientifico qui sotto è completo rispetto alle domande del mandato, ma **l'audit riga-per-riga della v1.5 e della vecchia verticale resta tecnicamente da eseguire durante l'integrazione v1.6**. Non attribuisco ai due file contenuti che non ho potuto verificare direttamente.

### Livelli di evidenza usati

| Livello | Interpretazione nel futuro motore |
|---|---|
| **Ev-A** | relazione supportata da più studi sperimentali convergenti; adatta a regole causali generali |
| **Ev-B** | evidenza sperimentale valida ma dipendente da sistema, farina o condizioni |
| **Ev-C** | requisito normativo, standard o disciplinare ufficiale; vincolante per la conformità, non prova di superiorità tecnica |
| **Ev-D** | pratica professionale qualificata, utile soprattutto per gesti/processo |
| **Ev-E** | pratica diffusa ma non sufficientemente validata |
| **Ev-F** | euristica operativa |
| **Ev-G** | inferenza progettuale PizzaMaker derivata dalle evidenze |
| **Ev-H** | questione ancora aperta |

Un'importante conseguenza è che **Ev-C ed Ev-A non sono ordinabili come “più vero/meno vero”**: un disciplinare può essere l'autorità assoluta per stabilire cosa sia legalmente un Pane Toscano DOP, pur non dimostrando che quella procedura sia fisicamente ottimale per tutti i pani.

## Cereali, farine e sistemi strutturali

### Tassonomia tecnica da adottare

Il modello attuale va sostituito con almeno quattro sistemi strutturali principali.

| Sistema | Driver strutturali | Checkpoint principali | Checkpoint da non universalizzare | Evidenza |
|---|---|---|---|---|
| `WHEAT_GLUTEN_DOMINANT` | glutine + amido + fase liquida | estensibilità, elasticità, gas retention, tensione | solo W, solo windowpane | Ev-A/B |
| `WHOLEGRAIN_BRAN_PERTURBED` | glutine + amido + crusca/fibre | idratazione crusca, sviluppo, estensibilità, volume | coefficiente acqua fisso | Ev-A/B |
| `RYE_AX_STARCH_DOMINANT` | arabinoxilani + amido + acidità/enzimi | viscosità, adesività, acidità, stabilizzazione | windowpane, forte tensionamento | Ev-A/B |
| `DURUM_GLUTEN_PARTICLE_SYSTEM` | proteine del duro + amido + granulometria | assorbimento, estensibilità, impastamento, fermentazione | trasferimento diretto dei criteri del tenero | Ev-B |
| `MIXED_GRAIN_SYSTEM` | contributi ponderati ma non necessariamente lineari | dipendenti dalla miscela | interpolazione lineare cieca | Ev-G |

La necessità di questa separazione è supportata dalle differenze sperimentali osservate tra crusca, segale e duro.

### Frumento tenero: cosa PizzaMaker può e non può dedurre

ISO 27971:2023 descrive il metodo Alveograph per il frumento comune; ICC 115/1 collega il Farinograph alla misura dell'assorbimento e del comportamento durante il mixing; ISO 3093 e ICC 107/1 definiscono il Falling Number come misura legata all'attività alfa-amilasica attraverso la liquefazione/viscosità. Questi parametri appartengono quindi a **dimensioni differenti del comportamento della farina** e non devono essere collassati in un generico “indice di forza”. La ricerca sperimentale mostra inoltre che una singola misura reologica non prevede con precisione elevata il volume finale e che il comportamento cambia con formulazione e processo. Mixer, energia impartita, sale e temperatura possono modificare il risultato anche usando la stessa farina. Per PizzaMaker:

```text
FLOUR_PROFILE
≠
strength_number
```

ma:

```text
FLOUR_PROFILE:
  cereal
  extraction/type
  protein
  W
  P_L
  farinograph_absorption
  stability
  falling_number
  damaged_starch
  ash
  particle_size
  known_brand_product
  measurement_method
  confidence
```

**Regola Ev-G:** campi sconosciuti devono rimanere sconosciuti. Il motore non deve “inventare” un W partendo dalle proteine né prevedere ore di fermentazione dal W.

### Integrale: nessun coefficiente universale di acqua

Gli esperimenti su crusca dimostrano un quadro molto più complesso del comune “aggiungi il 5–10% di acqua”. Cultivar, quantità e granulometria modificano lo sviluppo della rete; la micronizzazione può aumentare l'assorbimento farinografico ma ridurre stabilità ed estensibilità, mentre altri metodi di misura dell'assorbimento restituiscono andamenti differenti. Anche la preidratazione non va trasformata in dogma. In uno studio mirato, il pre-soaking ha compensato il ritardo di sviluppo associato ad alcune condizioni della crusca, ma l'effetto dipendeva da granulometria e trattamento; non esiste quindi una prova per una regola universale “integrale → sempre soaker”. Ne deriva:

```yaml
BRAN_PROFILE:
  fraction_of_total_flour:
  particle_size_class:
  heat_treated:
  prehydrated:
  prehydration_water:
  prehydration_time:
  measured_absorption:
  hydration_rate_known:
  confidence:
```

La quantità d'acqua raccomandata resta **Calc-C** finché non viene calibrata sulla farina effettiva.

### Segale: cambio di paradigma

Gli arabinoxilani della segale influenzano la distribuzione dell'acqua, la viscosità e l'ambiente attorno alle proteine. L'evidenza sperimentale mostra che possono ostacolare una rete proteica coerente e che la loro solubilità, idrolisi e cross-linking cambiano reologia, assorbimento e capacità di trattenere gas. In modelli di pane di segale, quantità e stato degli arabinoxilani influenzano la viscosità durante la cottura e la gas retention; “più arabinoxilano” non produce quindi un beneficio monotono. PizzaMaker deve quindi cambiare checkpoint progressivamente con la quota di segale:

```text
bassa segale
→ ancora prevalentemente WHEAT_GLUTEN_DOMINANT

quota intermedia
→ MIXED_GRAIN_SYSTEM

alta segale
→ RYE_AX_STARCH_DOMINANT
```

Non fisserei oggi una percentuale universale di transizione: il comportamento dipende da farina, estrazione e formulazione. Questa soglia va classificata **Ev-H/Calc-C**, da calibrare sperimentalmente.

Per alta segale, domande come “fa il velo?” o “quante pieghe deve fare?” sono concettualmente sbagliate. Gli input più informativi diventano consistenza/viscosità, acidità, sviluppo della fermentazione, stabilità e cottura.

### Acidificazione e segale

L'acidificazione è tecnologicamente importante in numerosi sistemi di segale, ma non va rappresentata come slogan “segale = sourdough obbligatorio”. Studi su sourdough di segale mostrano che diversi substrati e microrganismi modificano arabinoxilani, fermentazione e metaboliti in modi differenti. La UI dovrebbe pertanto chiedere:

```text
Cereale: segale
↓
Percentuale di segale
↓
Tipo di farina di segale
↓
Sistema fermentativo
↓
Acidità misurabile? sì/no
```

e non proporre automaticamente tecniche da pane bianco.

### Grano duro e semola

Gli studi sul duro dimostrano che qualità proteica, granulometria, quantità d'acqua e tempo di fermentazione interagiscono; farine/semole di diversa forza richiedono processi diversi. Particolarmente importante per PizzaMaker è che uno studio su genotipi di duro ha trovato scarsa utilità delle comuni misure reologiche nate per il frumento da pane nel predire da sole la qualità finale dei pani di duro. Questo rende scientificamente ingiustificato applicare direttamente soglie del tenero alla semola. Anche la granulometria è un vero input di processo, non un dettaglio descrittivo; studi recenti su semole fini/grossolane mostrano interazioni con idratazione, mixing e metodo fermentativo.

### I disciplinari dimostrano perché “farina forte = pane serio” è falso

Il Pane Toscano DOP vigente nel documento unico UE del 2025 prescrive esclusivamente lievito madre, acqua e farine di frumento tenero tipo 0, 1 o 2 con germe, senza sale; per la farina vengono riportati **W 140–230 e P/L 0,35–0,75**. Una DOP di pane può quindi operare deliberatamente ben al di sotto dei valori di W che molte euristiche online definiscono “necessari” per fermentazioni importanti. Il Pane di Altamura DOP, al contrario, appartiene a un sistema di grano duro: il disciplinare registrato richiede rimacinato di semola di varietà indicate, almeno per l'80% provenienti dall'area prescritta, lievito madre/pasta acida, sale marino e acqua, con pezzatura minima di 0,5 kg e forme tradizionali definite. La Coppia Ferrarese IGP costituisce ancora un'altra architettura: farina tipo 0, acqua, strutto, EVOO, lievito madre, lievito di birra, sale e malto/estratto di malto, senza additivi da panificazione. Un prodotto tutelato può quindi utilizzare un sistema fermentativo ibrido anziché rientrare nell'opposizione semplicistica “lievito madre oppure lievito commerciale”. Il documento UE relativo alla modifica del Pane di Matera mostra inoltre un sistema basato su farina o semola di duro con requisiti specifici e una gestione propria del lievito madre; questo materiale è utile per il modello, ma prima di trasformare ogni numero della pubblicazione di modifica del 2017 in un vincolo legale corrente PizzaMaker dovrà verificare il testo consolidato più recente della specifica. **Conclusione Ev-A/C:** `FLOUR_PROFILE`, `GRAIN_PROFILE` e `COMPLIANCE_PROFILE` devono essere entità separate.

## Fermentazione, prefermenti, lievito madre e sviluppo strutturale

### Un nuovo modello della fermentazione

Il motore non dovrebbe più cercare una sola relazione:

```text
lievito + temperatura + ore → pronto
```

ma almeno:

```text
GAS_PRODUCTION
×
GAS_RETENTION
×
STRUCTURAL_TOLERANCE
×
THERMAL_HISTORY
×
FERMENTATION_SYSTEM
→
OBSERVED_EXPANSION
```

Gli esperimenti mostrano infatti che temperatura e quantità/tipo di lievito modificano la produzione di gas, ma la crescita osservabile dipende anche dalla ritenzione; ceppi commerciali distinti possono dare profili di espansione differenti. Lavori del 2026 rafforzano ulteriormente questo punto: ceppi con diversa prestazione durante il forno producono effetti differenti sulla stabilità delle celle e sulla struttura della mollica, e l'attività fermentativa può persistere nelle prime fasi della cottura prima di venire inattivata dal calore. Perciò:

```yaml
YEAST_PROFILE:
  form:
  strain_or_product:
  manufacturer_activity_known:
  storage_state:
  dose:
  temperature_response_known:
  cold_response_known:
  osmotolerance:
  confidence:
```

### Il frigorifero non è un interruttore

Studi su ceppi di lievito mostrano differenze marcate nella risposta a temperature basse e al congelamento; anche a parità di specie la prestazione varia. Questo impedisce di modellare il passaggio in frigo come `fermentation_rate = 0`. La corretta astrazione è:

```yaml
THERMAL_HISTORY:
  dough_mass:
  container_geometry:
  initial_temperature:
  ambient_temperature:
  fridge_temperature:
  cooling_lag:
  cold_duration:
  warmup_duration:
  measured_points:
```

Il `cooling_lag` è fondamentale concettualmente: un pezzo di impasto non assume istantaneamente la temperatura dell'aria circostante. Per ora la previsione quantitativa domestica resta **Calc-C**; con sensore interno e dati storici può evolvere verso Calc-B.

### Prefermenti: categorie, non costanti

Uno studio che ha confrontato diretto, “biga-type” e “poolish-type” ha mostrato differenze in pH, struttura interna e proprietà testurali; nello stesso lavoro il “biga-type” sperimentale era relativamente rigido mentre il “poolish-type” era semiliquido. Questo dimostra l'utilità delle categorie, ma non crea standard scientifici universali di idratazione e durata. Altri studi confermano che metodo di fermentazione, mixer e quantità di energia interagiscono e che biga, sourdough e diretto possono produrre risultati diversi a seconda della farina e del sistema. PizzaMaker dovrebbe quindi salvare:

```yaml
PREFERMENT_PROFILE:
  family: biga | poolish | pate_fermentee | sponge | other
  flour_fraction:
  flour_profile:
  hydration:
  inoculum:
  salt:
  temperature:
  time:
  maturity_observations:
  pH:
  TTA:
  refrigeration_history:
  evidence_source:
```

e **non** definire:

```text
biga = sempre X% acqua e Y ore
poolish = sempre Z ore
```

come legge del motore.

### Lievito madre e licoli

L'acidificazione del sourdough può attivare processi proteolitici dipendenti dal pH e alterare la macrostruttura proteica; specie microbiche differenti producono effetti differenti sulla degradazione delle frazioni proteiche e sui metaboliti. Anche il profilo aromatico cambia con la cultura utilizzata e la comunità microbica evolve in funzione di cereale, tempo e mantenimento. Perciò `STARTER_PROFILE` deve contenere almeno:

```yaml
STARTER_PROFILE:
  consistency_class:
  flour:
  hydration:
  inoculation_ratio:
  refresh_ratio:
  refresh_interval:
  fermentation_temperature:
  age_since_refresh:
  volume_change:
  pH:
  TTA:
  aroma_observation:
  gas_activity:
  storage_history:
  known_culture:
  confidence:
```

**pH e TTA non sono sinonimi.** Il primo misura l'attività degli ioni idrogeno; la seconda rappresenta la quantità di base necessaria per neutralizzare gli acidi secondo un protocollo. PizzaMaker può utilizzare entrambi quando disponibili, ma non deve derivare automaticamente l'uno dall'altra.

### Nessun coefficiente “lievito madre ↔ lievito commerciale”

Le culture sourdough possono avere diversa capacità acidificante e fermentativa e cambiare nel tempo. Convertire “100 g di lievito madre = N g di lievito di birra” ignorerebbe acqua, farina incorporata, biomassa, attività e acidità. Gli studi sulla stabilità delle colture e sulle differenze fra ceppi rendono tale conversione scientificamente non robusta. La conversione va quindi classificata:

**Calc-D/H — da non implementare come equivalenza.**

È invece **Calc-A** sottrarre al totale della ricetta la farina e l'acqua effettivamente contenute nello starter quando composizione e peso sono noti.

### Sourdough e affermazioni sanitarie

La ricerca non supporta l'affermazione generica “lievito madre = più digeribile per tutti”. In specifici esperimenti, la fermentazione ha modificato la proteolisi o il profilo dei peptidi, ma non ha necessariamente eliminato epitopi immunogenici; uno studio recente sul pane integrale ha trovato differenze di processo senza un vantaggio sostanziale universalizzabile nella digestione in vitro dell'amido. PizzaMaker deve pertanto vietare claim sanitari generalizzati come:

```text
"più digeribile"
"adatto a..."
"elimina il glutine"
```

a meno di un contesto clinico/regolatorio specifico.

### Mixing: usare energia e stato, non timer

La quantità di energia e il tipo di mixer modificano reologia e volume; under-mixing e over-mixing possono entrambi peggiorare il risultato. Temperatura, velocità e sale modificano la stabilità del dough e l'effetto dipende anche dalla cultivar. Perciò il modello corretto è:

```text
START_STATE
→ MIXER / METHOD
→ ENERGY + TEMPERATURE HISTORY
→ OBSERVED DEVELOPMENT
→ TARGET_STATE
→ STOP
```

e non:

```text
planetaria = 10 minuti
spirale = 7 minuti
```

`MIXING_TIME` deve essere una stima di processo, non un endpoint.

### Windowpane

Nel frumento un test di estensione può essere un'indicazione pratica dello sviluppo, ma non deve essere l'unico checkpoint. Per integrali e soprattutto sistemi ad alta segale può diventare scarsamente informativo perché la matrice strutturale è diversa. Questa è una deduzione progettuale **Ev-G** coerente con i risultati su crusca e arabinoxilani.

### Autolisi, fermentolisi e riposi

La ricerca svolta non ha trovato una base primaria abbastanza uniforme da giustificare regole universali del tipo “autolisi sempre X minuti”, né una standardizzazione univoca del termine “fermentolisi”.

Queste tecniche devono quindi entrare in v1.6 come:

```yaml
REST_PROFILE:
  purpose:
  ingredients_present:
  duration:
  temperature:
  target_state:
  exit_condition:
  evidence: Ev-D/E/H
```

e non come fasi obbligatorie.

### Pieghe e rinforzi

Non emerge una base scientifica che giustifichi un numero universale di stretch-and-fold, coil fold o letter fold. La fisica generale supporta l'idea che deformazioni meccaniche cambino organizzazione e reologia, ma **la scelta del gesto, la frequenza e il numero di cicli devono essere state-dependent**.

Quindi:

```text
IF structure already sufficient
→ 0 rinforzi

IF weak but recoverable wheat dough
→ possible reinforcement

IF high-rye structure
→ do not apply wheat fold logic blindly
```

Il numero di pieghe è **Calc-D/Ev-F**, da correggere con osservazioni.

## Formatura, proof, scoring, vapore e cottura

### Divisione, preforma e formatura

La futura pipeline deve distinguere nettamente:

```text
DIVIDE
≠
PRESHAPE
≠
BENCH_REST
≠
FINAL_SHAPE
```

La preforma ha senso soltanto se serve a riorganizzare la massa e creare una geometria/tensione utile al passaggio successivo; non è una fase obbligatoria di ogni pane. Questa separazione è soprattutto una **inferenza progettuale Ev-G**, coerente con la necessità di descrivere reologia e rilassamento come stato e non come timer.

Per il motore:

```yaml
PRESHAPE_PROFILE:
  required:
  purpose:
  target_geometry:
  gas_redistribution:
  target_tension:
  exit_condition:

SHAPING_PROFILE:
  final_geometry:
  tension_target:
  gas_preservation_target:
  seam_required:
  seam_orientation:
  mould_or_pan:
  proof_support:
```

### Baguette

Gli studi su prodotti “French style” mostrano che il livello di proof modifica caratteristiche come apertura e altezza del taglio: un proof più avanzato può dare più sviluppo complessivo ma ridurre il comportamento dell'incisione. Questo è importante perché dimostra che **volume del pezzo, readiness e scoring response non sono la stessa variabile**. La cottura sperimentale strumentata di pane francese mostra inoltre che espansione, apertura delle incisioni e formazione della crosta sono fenomeni accoppiati nel tempo. Ciò che la letteratura primaria raccolta **non** consente ancora di hardcodificare con alta confidenza è una cinematica universale di mani, numero di sigillature, angolo esatto della lama e profondità valida per ogni baguette.

Questi elementi restano:

**Ev-D/H → micro-ricerca visuale professionale necessaria.**

### Ciabatta

Uno studio specifico sulla ciabatta mostra che la qualità percepita della crosta dipende da formulazione, umidità e condizioni di stoccaggio; la croccantezza si degrada con la ridistribuzione/acquisizione d'acqua e non è spiegata dalla sola idratazione iniziale. Più in generale, gli studi sulla stabilità delle gas cells mostrano che una mollica aperta emerge dall'interazione di aerazione, strain hardening, viscosità e stabilità delle interfacce; “più acqua = alveoli più grandi” non è quindi una relazione causale sufficiente. Per PizzaMaker, `ciabatta` deve definire un **target di processo e geometria**, non una soglia di idratazione.

### Pane in stampo

Il pane in stampo richiede un modello geometrico diverso dal pane libero: contenitore, riempimento, espansione laterale limitata e altezza di proof diventano input osservabili.

Il motore deve permettere un livello di degasaggio maggiore rispetto a un target `open_irregular`, ma la quantità esatta di degasaggio è ancora **Ev-D/F**, non numericamente definibile dalla letteratura primaria raccolta.

### Final proof: eliminare il “raddoppio = pronto”

Il proof modifica simultaneamente volume, resistenza, capacità di ulteriore espansione e risposta allo scoring. Nell'esperimento sui French-style rolls, pezzi più avanzati nel proof mostravano una diversa risposta delle incisioni pur senza un semplice collasso di volume. Lo stato finale deve quindi diventare:

```yaml
BREAD_PROOF_STATE:
  volume_change:
  lateral_spread:
  height_change:
  surface_tension:
  touch_resistance:
  recovery_after_touch:
  visible_gas:
  seam_stability:
  dough_temperature:
  pH_if_available:
  TTA_if_available:
  scoring_compatibility:
  structural_margin:
  confidence:
```

Il “poke test” può essere un'osservazione tra molte, non un sensore assoluto.

### Scoring: funzione robusta, numeri universali no

L'incisione controlla dove una superficie in tensione può aprirsi mentre il prodotto si espande e si stabilizza termicamente; gli studi strumentati sul French bread mostrano chiaramente il legame fra apertura delle incisioni, espansione e crosta. Tuttavia, il corpus primario raccolto non giustifica regole universali come:

```text
sempre 30°
sempre 1 cm
sempre N tagli
```

perché geometria, proof, tensione e stile cambiano.

Il profilo deve essere:

```yaml
SCORING_PROFILE:
  functional_required:
  expansion_goal:
  loaf_geometry:
  proof_state:
  surface_tension:
  cut_direction:
  cut_count:
  angle:
  depth:
  overlap:
  evidence_level:
  visual_verification_status:
```

I campi geometrici precisi diventano implementabili stile-per-stile solo dopo la micro-ricerca visuale.

### Vapore: il dato importante è il profilo, non i millilitri

Esperimenti controllati hanno confrontato diverse quantità di vapore e riscontrato cambiamenti significativi in colore, gloss, meccanica della crosta e gelatinizzazione superficiale. Altri esperimenti dimostrano che tempo, temperatura e vapore modificano velocità locale di riscaldamento e gelatinizzazione, anche quando alcuni endpoint macroscopici risultano simili. Quindi:

```yaml
STEAM_PROFILE:
  required:
  delivery_method:
  initial_intensity:
  duration:
  chamber_retention:
  exhaust_timing:
  oven_volume:
  safety_constraints:
  confidence:
```

Non:

```text
versa 200 ml
```

come regola universale.

### Sicurezza del vapore domestico

PizzaMaker non dovrebbe mai prescrivere di versare acqua su vetro, resistenze o altre parti del forno non progettate per tale uso. L'app deve preferire procedure compatibili con il manuale dell'apparecchio e supporti progettati per il calore. Questa è una regola prudenziale **Ev-G** necessaria perché i volumi di vapore degli studi di laboratorio non equivalgono a istruzioni di sicurezza domestica.

### Cottura: un profilo termico multidimensionale

La reologia del dough cambia drasticamente durante il riscaldamento per effetto delle trasformazioni di amido e proteine. Durante l'espansione le gas cells crescono, si formano e coalescono; il loro comportamento dipende da pressione, viscosità e temperatura. Studi di baking mostrano inoltre differenze locali nella gelatinizzazione della mollica dovute alla velocità di riscaldamento e alla disponibilità d'acqua. Perciò il futuro:

```yaml
BREAD_BAKING_PROFILE:
  oven_type:
  setpoint:
  measured_chamber_temp:
  support:
  support_temperature:
  loaf_mass:
  loaf_geometry:
  steam_profile:
  convection_level:
  top_heat:
  bottom_heat:
  preheat_state:
  bake_time_estimate:
  crust_color_endpoint:
  mass_loss_if_measured:
  core_temperature_if_measured:
  structural_endpoint:
```

La temperatura interna è un **segnale utile**, non un verdetto universale.

### Raffreddamento e staling

Il raffreddamento non è un periodo morto: esperimenti mostrano scambio d'acqua, evaporazione/condensazione e cinetiche non lineari durante il post-bake. Durante lo staling, retrogradazione dell'amylopectin e migrazione d'acqua tra crumb e crust contribuiscono ai cambiamenti di texture; la storia termica della cottura può modificare la successiva velocità di rassodamento. Il modello deve separare:

```text
COOL_ENOUGH_TO_CUT
COOL_ENOUGH_TO_PACKAGE
TEXTURAL_SHELF_LIFE
MICROBIOLOGICAL_SHELF_LIFE
```

L'ultima **non deve essere prevista dalla sola ricetta**.

### Sicurezza alimentare

FDA e CDC classificano la farina comune come alimento crudo potenzialmente contaminato da microrganismi patogeni e raccomandano di non consumare o assaggiare impasti crudi; macinazione e sbiancamento non costituiscono un trattamento letale. PizzaMaker deve quindi eliminare qualunque diagnostica sensoriale che richieda:

```text
"assaggia l'impasto"
```

prima della cottura.

## Focacce, famiglie regionali e conformità

### Serve una tassonomia distinta dalla pizza e dal pane

La famiglia `FOCACCIA` dovrebbe almeno distinguere:

```text
PAN_LEAVENED_FOCACCIA
THIN_OILED_FLATBREAD
FILLED_THIN_SHEET
REGIONAL_PROTECTED_FOCACCIA
HIGH_HYDRATION_PAN_FOCACCIA
POTATO_CONTAINING_FOCACCIA
```

Questo evita di trasferire automaticamente dimpling, salamoia, proof in teglia o grande alveolatura a prodotti che non li richiedono.

### Focaccia di Recco col formaggio IGP

Il documento UE pubblicato nel 2025 aggiorna la specifica: il prodotto usa farina di frumento tenero, acqua naturale, EVOO, sale fino e formaggio fresco a pasta molle; la farina deve avere W >300 e P/L non inferiore a 0,50, oppure può essere utilizzata Manitoba secondo il testo previsto. Il requisito di farina tipo 00 è stato eliminato. Il prodotto finito ha altezza inferiore a 1 cm ai bordi; la superficie è irregolare con bolle, la parte superiore dorata con aree più scure e il fondo giallo-ambrato, non bianco. Il disciplinare non elenca lievito tra gli ingredienti previsti. **Inferenza progettuale Ev-G:** PizzaMaker deve quindi trattare la Focaccia di Recco IGP come `FILLED_THIN_SHEET`, non come impasto fermentato da focaccia tradizionale. La Camera di Commercio di Genova opera come struttura di controllo e dichiara di verificare ingredienti, temperatura di cottura, etichetta e caratteristiche fisiche/organolettiche del prodotto. Quindi l'app deve distinguere:

```text
Focaccia di Recco col formaggio IGP
```

da:

```text
focaccia tipo Recco / ispirata alla Recco
```

quando produzione geografica o altri requisiti legali non sono soddisfatti.

### Focaccia genovese

È documentata l'esistenza a Genova di sistemi di marchio/disciplinari di lavorazioni artigianali, e la Camera di Commercio descrive l'uso di disciplinari per l'accesso ai relativi marchi. Tuttavia, **in questa ricerca non è stato recuperato un testo tecnico primario completo e corrente della specifica della Focaccia Genovese che giustifichi range numerici da hardcodificare**.

Pertanto:

```yaml
GENOVESE:
  identity_status: documented regional/professional tradition
  hardcoded_official_hydration: null
  hardcoded_official_brine_ratio: null
  hardcoded_official_thickness: null
  evidence_for_exact_gesture: insufficient
```

Qualunque numero dettagliato oggi deve restare Ev-D/E/F finché il documento primario pertinente non viene acquisito.

### Focaccia barese

La ricerca istituzionale conferma l'importanza della focaccia barese come prodotto tradizionale regionale, ma non ha prodotto un disciplinare primario completo comparabile a una DOP/IGP dal quale estrarre una formulazione univoca. La Regione Puglia stessa la presenta come prodotto tipico del territorio, senza trasformare tale presentazione turistica in una specifica tecnica. Perciò PizzaMaker deve supportare **varianti documentate** e non inventare un “disciplinare ufficiale” universale.

In particolare, patata, percentuale di semola, tipo di pomodoro e altre scelte devono essere modellate come attributi di sottostile quando la fonte lo giustifica, non come obblighi legali non verificati.

### Focaccia romana e schiacciata

Non è emersa una protezione normativa unica che permetta di usare “focaccia romana” come categoria legalmente standardizzata. La scelta più robusta per l'app è trattarla come **nome di stile potenzialmente ambiguo** e chiedere il risultato desiderato:

```text
sottile/croccante
alta/soffice
oleosa
alveolata
da farcire
```

anziché fingere un'unica autenticità. Questa è **Ev-G/H**.

Lo stesso principio vale per “schiacciata” quando il nome non è accompagnato da una specifica regionale o tecnica verificata.

### Dimpling

Il dimpling deve essere descritto funzionalmente come deformazione locale della superficie e redistribuzione di gas/olio/liquido, non come cerimonia obbligatoria.

Il profilo corretto è:

```yaml
DIMPLING_PROFILE:
  required:
  dough_proof_state:
  target_depth:
  pressure_class:
  spacing:
  gas_redistribution_target:
  oil_present:
  brine_present:
  collapse_risk:
  stop_condition:
  evidence:
```

La forza in newton, profondità esatta e pattern delle dita non sono supportati sufficientemente dal corpus scientifico e necessitano di verifica visuale/professionale.

### Salamoia

Non tutte le focacce prevedono una salamoia. PizzaMaker deve rappresentarla come `SURFACE_TREATMENT` opzionale:

```yaml
BRINE_PROFILE:
  enabled:
  water:
  salt:
  oil:
  total_load_per_area:
  application_phase:
  target_effect:
```

I valori stile-specifici devono derivare da una fonte primaria o professionale verificata.

### Focaccia in teglia: readiness

L'impasto che “non arriva agli angoli” non va necessariamente forzato.

Il diagnostic engine dovrebbe discriminare almeno:

```text
forte ritorno elastico
→ possibile insufficiente rilassamento

strappo
→ insufficiente estensibilità / struttura debole / manipolazione eccessiva

allargamento incontrollato
→ struttura debole o proof troppo avanzato

bassa attività e forte tenacità
→ proof/relaxation insufficiente fra le possibili cause
```

Queste sono inferenze diagnostiche **Ev-G**, da ordinare usando temperatura, storico di mixing, farina e fermentation state; non devono apparire come diagnosi certa da un singolo sintomo.

### Matrice operativa delle focacce

| Famiglia | Fermentata | Struttura | Trattamento | Cottura | Stato |
|---|---:|---|---|---|---|
| Genovese | normalmente sì, ma valori ufficiali non hardcodificabili dal corpus | pan-focaccia | dimpling/superficie da verificare sul disciplinare primario | teglia | **profilo da completare** |
| Barese | famiglia fermentata tradizionale, varianti | pan-focaccia | topping regionale | teglia | **varianti, non un'unica formula** |
| Recco IGP | nessun lievito tra gli ingredienti prescritti | sfoglia sottile ripiena | chiusura/farcitura | molto sottile | **Ev-C forte** |
| Alta/soffice | sì | struttura cellulare panificata | spesso olio/dimpling | teglia | profilo tecnico generico |
| Alta idratazione | sì | gas retention critica | stile-specifico | teglia | non definire dall'acqua sola |
| Patate | sì o stile-specifico | amido + glutine + patata | variabile | teglia | ingrediente da modellare |
| Schiacciata | dipende dal sottostile | sottile | variabile | teglia/piano | nome ambiguo |
| “Romana” | dipende dall'uso del termine | variabile | variabile | variabile | **non standardizzare senza sottostile** |

## Architettura del motore PizzaMaker, diagnostica e UX

### Calculation engine

Questa ricerca permette di classificare con maggiore precisione cosa può davvero essere calcolato.

| Variabile | Classe | Implementazione |
|---|---|---|
| baker's percentages | **Calc-A** | deterministica |
| scaling quantità | **Calc-A** | deterministica |
| totale farina | **Calc-A** | includere starter/preferment |
| totale acqua dichiarata | **Calc-A** | mass balance |
| farina/acqua nello starter | **Calc-A** | se idratazione nota |
| flour blend | **Calc-A** | mass balance |
| prefermented-flour % | **Calc-A** | deterministica |
| dough yield | **Calc-A** | deterministica |
| carico g/cm² dato un target | **Calc-A** | geometria |
| temperatura acqua da DDT | **Calc-A + parametro B** | formula deterministica, friction factor calibrato |
| friction factor mixer | **Calc-B/C** | calibrazione macchina |
| assorbimento da proteine/W | **non A** | non derivare automaticamente |
| correzione acqua integrale | **Calc-C/D** | dipende da crusca/farina |
| correzione acqua semola | **Calc-C/D** | dipende da granulometria/farina |
| dose lievito → orario | **Calc-C** | modello probabilistico calibrabile |
| cold-retard rate | **Calc-C** | temperatura + inerzia + lievito |
| equivalenza sourdough/lievito | **non implementare** | manca conversione universale |
| maturità starter | **Calc-D** | osservazioni + misure |
| proof readiness | **Calc-D** | stato multivariato |
| numero pieghe | **Calc-D/F** | decisione osservazionale |
| scoring readiness | **Calc-D** | proof + tensione |
| bake time | **Calc-B/C** | forno/stile calibrati |
| shelf life testurale | **Calc-B/C** | richiede dati |
| shelf life microbiologica | **non derivabile dalla ricetta** | validazione specifica |

Questa classificazione è coerente con i limiti predittivi delle misure reologiche, la variabilità dei lieviti e gli effetti della storia termica.

### Fermentation engine

Il nuovo schema dovrebbe essere:

```text
PRODUCT_PROFILE
+ GRAIN_PROFILE
+ FLOUR_PROFILE
+ FERMENTATION_SYSTEM
+ YEAST_PROFILE / STARTER_PROFILE
+ FORMULATION
+ DOUGH_MASS
+ THERMAL_HISTORY
+ PROCESS_HISTORY
↓
EXPECTED_STATE_WINDOW
+ CONFIDENCE
```

Durante la lavorazione:

```text
EXPECTED_STATE
+ OBSERVATION
+ TEMPERATURE
+ ELAPSED_TIME
+ TIME_REMAINING
↓
WAIT
CONTINUE
COOL
WARM
DIVIDE
SHAPE
PROOF
BAKE
or
DIAGNOSE
```

Il tempo è quindi un input e un limite operativo, non la verità sullo stato.

### Diagnostic engine

Il motore deve distinguere sintomi simili con cause differenti.

| Sintomo | Cause da discriminare | Osservazioni utili | Azione prudente |
|---|---|---|---|
| Dough molto appiccicoso | alta acqua, integrale, segale, sviluppo insufficiente, degradazione | cereale, temperatura, struttura, tempo | non aggiungere farina automaticamente |
| Dough rigido | poca acqua effettiva, crusca non idratata, semola, temperatura bassa, forte tenacità | farina, riposo, estensione | attendere/rivalutare prima di correggere |
| Non cresce | lievito, temperatura, attività starter, gas retention | temperatura, gas, struttura | separare “non produce gas” da “non trattiene gas” |
| Cresce e collassa | proof eccessivo, struttura insufficiente, proteolisi | tensione, gas, pH, tempo | anticipare fase successiva se recuperabile |
| Si allarga | struttura debole o proof avanzato | altezza, tensione, temperatura | non diagnosticare solo da diametro |
| Torna indietro | elasticità elevata/rilassamento insufficiente | storico mixing/rest | riposo se compatibile con fermentazione |
| Si strappa | estensibilità bassa o struttura degradata | tipo di rottura, cereale | azione dipende dalla causa |
| Taglio non apre | proof, pelle, tensione, scoring, forno | stato pre-bake | non attribuire automaticamente alla lama |
| Esplode lateralmente | espansione guidata male / proof / crosta precoce | incisione, steam, proof | correggere sistema, non solo taglio |
| Mollica gommosa | bake/history, acqua, amido, raffreddamento | massa, cottura, raffreddamento | non diagnosticare da temperatura centrale sola |
| Crosta perde croccantezza | migrazione umidità/ambiente | storage, RH, raffreddamento | modificare cooling/storage |
| Focaccia non si estende | relaxation/farina/temp | recoil immediato | riposo possibile |
| Focaccia collassa | proof/struttura/manipolazione | gas, tensione, temperatura | ridurre manipolazione; valutare recuperabilità |

Il principio produzione del gas ≠ ritenzione è supportato sperimentalmente, così come la relazione fra proof e apertura del taglio e quella fra ridistribuzione dell'acqua e texture della crosta.

### Data model consolidato

La ricerca conferma queste entità:

```text
PRODUCT_PROFILE
TARGET_RESULT

GRAIN_PROFILE
FLOUR_PROFILE
FLOUR_BLEND
BRAN_PROFILE
STRUCTURAL_SYSTEM

FORMULATION_PROFILE

FERMENTATION_SYSTEM
YEAST_PROFILE
PREFERMENT_PROFILE
STARTER_PROFILE
THERMAL_HISTORY

MIXING_PROFILE
REST_PROFILE
REINFORCEMENT_PROFILE

DIVISION_PROFILE
PRESHAPE_PROFILE
SHAPING_PROFILE
PROOF_PROFILE

SCORING_PROFILE
DIMPLING_PROFILE
BRINE_PROFILE
SURFACE_TREATMENT

PAN_PROFILE
STEAM_PROFILE
OVEN_PROFILE
BREAD_BAKING_PROFILE
FOCACCIA_BAKING_PROFILE

COOLING_PROFILE
STORAGE_PROFILE

DIAGNOSTIC_STATE
EVIDENCE_RECORD
COMPLIANCE_PROFILE
```

Non creerei un'entità separata per ogni prodotto. `BAGUETTE`, `CIABATTA`, `PANE_TOSCANO_DOP` ecc. devono essere **istanze/configurazioni di profili**, salvo proprietà davvero uniche.

### `COMPLIANCE_PROFILE` diventa obbligatorio

```yaml
COMPLIANCE_PROFILE:
  protected_name:
  status: PDO | PGI | TSG | PAT | private_mark | none
  jurisdiction:
  geographical_requirement:
  ingredient_constraints:
  process_constraints:
  geometry_constraints:
  final_product_constraints:
  labeling_constraints:
  source_version:
  source_date:
  compliance_possible_for_user:
```

Questo impedisce all'app di chiamare “Pane di Altamura DOP” una pagnotta domestica prodotta fuori area, pur potendo offrire una modalità:

```text
"ispirato al Pane di Altamura"
```

con disclaimer appropriato. Il vincolo geografico e produttivo è parte delle denominazioni protette, non una caratteristica sensoriale opzionale.

### UX

La modalità principiante dovrebbe evitare W, TTA e Falling Number come ingresso obbligatorio.

Flusso:

```text
Cosa vuoi preparare?

Pane
Focaccia
↓
Quale famiglia?

Pane rustico
Baguette
Ciabatta
Integrale
Segale
Semola
Pane in stampo
Focaccia alta
Focaccia sottile
Focaccia regionale
↓
Che risultato vuoi?

crosta croccante
mollica regolare
mollica aperta
morbido
rustico
sottile
alto
↓
Che farina hai?

etichetta semplice
oppure
dati tecnici avanzati
↓
Quanto tempo hai?
Che forno hai?
```

La modalità avanzata apre:

```text
W
P/L
protein
absorption
Falling Number
ash
particle size
preferment
starter pH/TTA
DDT
friction factor
thermal history
steam
support temperature
```

### Specifiche visuali: ciò che possiamo già definire

La ricerca supporta la struttura dello schema, ma non tutti i gesti fini. Per non inventare cinematica:

```yaml
gesture: baguette_final_shape
product: baguette
initial_state: rested_preform
camera_view: top_and_45deg_side
hand_contact: requires_visual_validation
force_direction: axial_extension_plus_seam_closure
movement: style_specific
dough_response: elongation_without_surface_tearing
gas_redistribution: controlled_not_total
surface_orientation: outer_skin_out
seam_orientation: underside_after_shape
stop_condition: target_geometry_and_surface_integrity
common_wrong_gesture: excessive_force_or_tearing
evidence_level: Ev-G/H
visual_verification_status: REQUIRED
```

```yaml
gesture: focaccia_dimpling
product: leavened_pan_focaccia
initial_state: proof_state_style_specific
camera_view: top_and_low_side
hand_contact: fingertips
force_direction: downward
movement: repeated_local_depressions
dough_response: local_deformation_without_tearing
gas_redistribution: partial_local
surface_orientation: unchanged
seam_orientation: not_applicable
stop_condition: target_surface_pattern_without_collapse
common_wrong_gesture: tearing_or_complete_degas
evidence_level: Ev-G/H
visual_verification_status: REQUIRED_STYLE_BY_STYLE
```

```yaml
gesture: ciabatta_transfer
product: ciabatta
initial_state: divided_fragile_gas_rich_piece
camera_view: top_and_side
hand_contact: broad_support
force_direction: lifting_not_compressing
movement: transfer
dough_response: geometry_preserved_as_possible
gas_redistribution: minimize_unintended_loss
surface_orientation: style_specific
seam_orientation: style_specific
stop_condition: piece_positioned_for_proof_or_bake
common_wrong_gesture: concentrated_pressure
evidence_level: Ev-G
visual_verification_status: REQUIRED
```

L'esistenza di questi `REQUIRED` è un risultato della ricerca, non una lacuna da nascondere.

### Assumption audit

| Affermazione | Esito |
|---|---|
| W = ore di fermentazione | **REJECTED** |
| W più alto = pane migliore | **REJECTED**; dipende dal target |
| Integrale = bianco + acqua | **REJECTED** |
| Più fine la crusca = sempre meglio | **REJECTED** |
| Segale = frumento debole | **REJECTED** |
| Duro = tenero più forte | **REJECTED** |
| Sourdough sempre più digeribile | **UNSUPPORTED come claim generale** |
| Più acido = migliore | **REJECTED** |
| Più lievito = stesso pane più veloce | **REJECTED**: cambia cinetica e struttura |
| Più acqua = più alveoli | **REJECTED come causalità unica** |
| Più pieghe = più forza | **UNSUPPORTED universalmente** |
| Autolisi sempre necessaria | **UNSUPPORTED** |
| Windowpane sempre necessario | **REJECTED** per sistemi non dominati dal glutine |
| Mai degassare | **REJECTED**: dipende dal target |
| Più tensione = shaping migliore | **REJECTED** come assoluto |
| Raddoppio = pronto | **REJECTED** come endpoint universale |
| Poke test infallibile | **UNSUPPORTED** |
| Scoring sempre necessario | **REJECTED** |
| Più vapore = meglio | **REJECTED** |
| Temperatura interna unica = cotto | **REJECTED** |
| Tutte le focacce usano salamoia | **REJECTED** |
| Tutte le focacce sono lievitate | **REJECTED**; Recco IGP è il controesempio normativo |
| Lunga fermentazione = migliore | **REJECTED come assoluto** |

### Gap residui e priorità

---
