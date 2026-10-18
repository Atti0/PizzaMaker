# PizzaMaker / Teglia Coach
# Manuale universale della panificazione — Fondazioni scientifiche e architettura
## Versione 1.7

**Data:** 2026-10-18  
**Stato:** knowledge base scientifica auditata pre-v2.0; verticali generali complete, fonte canonica deduplicata e gate residui espliciti  
**Uso previsto:** Fonte di progetto per progettazione funzionale, UX, motore di calcolo, motore diagnostico, manuale didattico, storyboard visuali e test.

### Changelog v1.7 — audit pre-v2.0

Questa versione esegue l'audit di coerenza richiesto prima del consolidamento v2.0. In particolare:
- definisce un solo **modello dati canonico**;
- separa definitivamente `Calc-A…D` da `Ev-A…H`;
- corregge stati storici obsoleti, inclusa la nota sulla patata;
- sposta mandate e rapporti Deep Research integrali in un **Evidence Appendix** separato;
- introduce `CALIBRATION_RECORD` e rafforza il versionamento di `COMPLIANCE_PROFILE`;
- registra verifiche mirate su standard, disciplinari e riferimenti scientifici ad alto impatto;
- marca come gate P1 il `SOURCE_REGISTRY` Pane + Focacce, perché la bibliografia completa promessa dal mandato non è presente nel testo del rapporto integrato;
- mantiene aperto il `Visual Gesture Research Pack` per i gesti che richiedono verifica visuale primaria.

---

## 0. Scopo e regola fondamentale

PizzaMaker non deve diventare una collezione di ricette rigide.

Il sistema deve descrivere ogni prodotto attraverso quattro livelli separati:

1. **Obiettivo finale**
2. **Formulazione**
3. **Processo**
4. **Stato reale dell'impasto**

La stessa farina, idratazione o durata non produce lo stesso risultato se cambiano impastamento, temperatura, fermentazione, manipolazione delle cellule gassose, formatura e cottura.

La regola architetturale principale è quindi:

```text
TARGET RESULT
    ↓
FORMULATION
    ↓
PROCESS PLAN
    ↓
PREDICTION
    ↓
CHECKPOINT
    ↓
OBSERVATION
    ↓
DIAGNOSTIC ENGINE
    ↓
ACTION
```

Il motore deve sempre distinguere ciò che è:
- deterministico;
- empirico;
- euristico;
- osservazionale.

---

# 1. Principi scientifici fondamentali

## 1.1 La farina non è descritta da un solo numero

La percentuale proteica non basta a descrivere:
- qualità della rete proteica;
- estensibilità;
- elasticità;
- assorbimento;
- tolleranza;
- comportamento durante fermentazione;
- comportamento durante cottura.

Devono essere trattati, quando disponibili:

- proteine;
- tipo/ceneri;
- W;
- P/L;
- Falling Number;
- amido danneggiato;
- fibre/crusca;
- cereale;
- granulometria;
- eventuali enzimi/miglioratori;
- assorbimento misurato.

### Regola di prodotto

`W`, `P/L`, proteine e assorbimento non devono essere convertiti automaticamente in una “idratazione corretta” con formule semplicistiche.

---

## 1.2 L'impasto è un materiale viscoelastico composito

Il dough di frumento è un sistema costituito da:

- proteine del glutine;
- amido;
- acqua;
- lipidi e componenti minori;
- fase gassosa.

Le proprietà operative vanno separate:

- **elasticità**: tendenza a recuperare la forma;
- **estensibilità**: capacità di allungarsi;
- **resistenza/tenacità**: opposizione alla deformazione;
- **viscosità**: componente dissipativa;
- **rilassamento**: diminuzione della tensione col tempo;
- **stickiness**: adesività superficiale.

L'app non deve ridurre tutto a un singolo valore “forza impasto”.

---

## 1.3 Amido e amido danneggiato

L'amido:
- assorbe acqua;
- interagisce con proteine e fibre;
- gelatinizza in cottura;
- contribuisce alla struttura della mollica;
- partecipa allo staling.

L'amido danneggiato aumenta la disponibilità di acqua e l'accessibilità enzimatica, ma una quantità maggiore non è automaticamente migliore.

---

## 1.4 Fibre, crusca e cereali non-frumento

### Integrale

Non è corretto modellare un impasto integrale come “farina bianca + più acqua”.

Fibre e crusca:
- modificano distribuzione dell'acqua;
- alterano la microstruttura;
- possono interrompere la continuità glutine-amido;
- dipendono da dimensione e trattamento.

### Segale

La segale deve avere una famiglia strutturale propria.

Gli arabinoxilani e la composizione proteica fanno sì che non sia semplicemente “frumento con poco glutine”.

### Grano duro / semola

Non importare automaticamente soglie e logiche del tenero.

Contano:
- varietà;
- granulometria;
- acqua;
- qualità proteica;
- tempo e intensità di impasto.

---

# 2. Knowledge base degli ingredienti

## 2.1 Acqua

L'acqua influenza:
- consistenza;
- mobilità molecolare;
- idratazione proteica;
- amido;
- fibre;
- lavorabilità;
- trasferimento termico;
- shelf life.

Il motore futuro deve distinguere:

```text
added_water
effective_liquid
ingredient_water
```

Latte, uova, prefermenti e patate non possono essere trattati semplicemente come grammi equivalenti di acqua.

---

## 2.2 Sale

Il sale:
- contribuisce al gusto;
- modifica la matrice;
- interagisce con la fermentazione;
- modifica osmolarità.

Non deve essere escluso dai modelli fermentativi.

---

## 2.3 Lievito commerciale

La fermentazione dipende da:
- quantità;
- ceppo;
- formulazione commerciale;
- stato fisiologico;
- temperatura;
- composizione dell'impasto.

Prodotti commerciali diversi possono avere profili di espansione diversi.

### Fresco / secco

La conversione circa 1:3 può essere mantenuta come **default pratico**, ma non come legge scientifica universale.

Quando disponibile:
- prevale l'etichetta del produttore;
- deve essere consentito override.

---

## 2.4 Zucchero

A basse dosi può modificare disponibilità di substrato.

A dosi elevate:
- aumenta pressione osmotica;
- può rallentare la produzione di CO₂;
- cambia struttura, colore e morbidezza.

Non usare la regola “più zucchero = lievito più attivo”.

---

## 2.5 Miele

Non è necessario per “attivare il lievito”.

Va trattato come:
- ingrediente zuccherino;
- ingrediente aromatico;
- sorgente di acqua e solidi.

Deve essere opzionale e dose-dipendente.

---

## 2.6 Grassi, olio e burro

Modificano:
- lavorabilità;
- lubrificazione;
- struttura;
- texture;
- morbidezza;
- shelf life.

L'effetto dipende dalla quantità e dal tipo.

Nessuna percentuale deve essere universalizzata.

---

## 2.7 Latte e derivati

Il latte non equivale ad acqua.

Introduce:
- proteine;
- lattosio;
- minerali;
- grassi;
- solidi.

Gli effetti reologici possono essere non lineari.

---

## 2.8 Uova

Albume, tuorlo e uovo intero hanno effetti differenti.

Possono modificare:
- viscoelasticità;
- emulsione;
- gas cells;
- colore;
- volume;
- morbidezza.

---

## 2.9 Malto ed enzimi

Non devono essere aggiunti automaticamente.

L'utilità dipende dall'attività enzimatica reale della farina.

Il Falling Number è uno dei parametri che può aiutare a descrivere l'attività α-amilasica.

---

## 2.10 Tangzhong, Yudane, scalding

Sono tecniche che pregelatinizzano una quota dell'amido.

Effetti supportati:
- maggiore acqua trattenuta;
- texture più morbida;
- rallentamento dell'aumento di durezza;
- modifica della shelf life.

Non sono tecniche per “sviluppare glutine”.

---

## 2.11 Patata

È un ingrediente funzionale importante per:
- potato buns;
- alcune focacce;
- pani morbidi.

La verticale Buns/Impasti arricchiti ha confermato che **non esiste un coefficiente universale affidabile** per tradurre “X% patata” in acqua, morbidezza o volume.

Il motore deve usare `POTATO_PROFILE` e distinguere forma dell'ingrediente, base di misura, umidità/dry matter quando note e stato di gelatinizzazione. Le correzioni d'acqua restano prodotto-specifiche e, se non calibrate, `Calc-C` con confidence esplicita.

**Stato ricerca:** verticale scientifica completata; resta calibrazione sperimentale PizzaMaker per forma × dose × acqua × target.

---

## 2.12 Lievito madre

Non è un equivalente in grammi del lievito di birra.

Deve essere modellato come oggetto con:
- idratazione;
- rapporto di rinfresco;
- maturità;
- temperatura;
- stato;
- pH/acidi se disponibili;
- storico di mantenimento.

---

# 3. Fermentazione

## 3.1 Principio

La fermentazione non può essere descritta con una singola relazione:

```text
grammi lievito × ore × °C
```

perché cambiano:
- ceppo;
- farina;
- zuccheri;
- grassi;
- sale;
- pH;
- temperatura;
- refrigerazione;
- geometria;
- stato del lievito.

---

## 3.2 Frigorifero

Il frigo non blocca istantaneamente la fermentazione.

La massa:
- possiede inerzia termica;
- continua a raffreddarsi progressivamente;
- continua a evolvere durante il raffreddamento.

Quindi:

```text
enter_fridge != instant_cold_state
```

Il motore futuro deve modellare il freddo come transizione, non come interruttore.

---

## 3.3 Endpoint fermentativo

I tempi devono essere presentati come:

- previsione;
- finestra;
- checkpoint.

L'endpoint reale deve usare osservazioni:

- volume;
- tensione;
- rilassamento;
- gas;
- temperatura;
- stabilità;
- comportamento alla manipolazione.

---

## 3.4 Temperatura ambiente

PizzaMaker può usare un riferimento neutro interno, ma non deve fingere di conoscere la temperatura reale.

La data non è un proxy affidabile della temperatura di una cucina.

La temperatura reale deve essere:
- opzionale;
- misurata manualmente;
- usata solo quando il modello sa realmente interpretarla.

---

# 4. Gas cells e alveolatura

## 4.1 Origine delle cellule gassose

Durante il mixing viene incorporata una popolazione iniziale di bolle.

Durante fermentazione:
- viene prodotta CO₂;
- le cellule crescono;
- possono coalescere;
- possono interconnettersi;
- possono rompersi.

---

## 4.2 La piega non “crea gli alveoli”

Le pieghe:
- modificano tensioni;
- modificano geometria;
- ridistribuiscono le cellule;
- possono migliorare la capacità di ritenzione;
- possono anche uniformare o ridurre la distribuzione delle dimensioni.

L'alveolatura finale dipende dall'interazione fra:

```text
aerazione iniziale
+ fermentazione
+ reologia
+ manipolazione
+ shaping
+ proof
+ cottura
```

---

## 4.3 Alveolatura come target

Non esiste:

```text
alveolatura = massima
```

Il target deve essere esplicito.

Esempio:

```text
crumb_target:
  fine_uniform
  medium_regular
  open_irregular
  open_regular
  rim_expanded
```

### Esempi

- ciabatta → open irregular;
- teglia contemporanea → open / regular-irregular secondo stile;
- napoletana → bordo espanso;
- pan carré → fine uniform;
- burger bun → fine/medium uniform.

---

# 5. Impastamento

## 5.1 Variabili fisiche

Il motore non deve basarsi soltanto sul nome della tecnica.

Deve descrivere:

```text
energia meccanica
tempo
intensità
deformazione
aerazione
incremento termico
fase del processo
```

---

## 5.2 Metodi supportabili

- manuale;
- no-knead;
- slap-and-fold;
- stretch-and-fold;
- laminazione;
- planetaria;
- spirale;
- forcella;
- altri.

---

## 5.3 Temperatura finale impasto

Il dato più importante dopo l'impasto è la temperatura finale misurata.

Un'indicazione come “8 minuti in seconda velocità” non è universalizzabile tra macchine diverse.

---

## 5.4 Friction factor

Il calcolo della temperatura dell'acqua può usare un friction factor, ma:
- è specifico di macchina/processo;
- deve essere calibrato;
- non può essere un valore universale.

---

# 6. Dizionario rigoroso delle fasi

## Impastamento / Mixing

Dal contatto intenzionale degli ingredienti allo stop del lavoro meccanico principale.

## Riposo iniziale

Pausa destinata a idratazione, rilassamento o gestione del processo.

## Autolisi

Riposo intenzionale della fase farina/acqua prima del completamento dell'impasto.

Non ogni riposo è autolisi.

## Puntata / Bulk fermentation

Dalla fine dell'impasto a divisione/staglio.

Può comprendere:
- fermentazione;
- riposi;
- rinforzi.

## Piega / Rinforzo

Deformazione applicata durante bulk per modificare organizzazione e comportamento della massa.

**Non è formatura.**

## Staglio / Divisione

Separazione della massa in porzioni.

## Preforma

Geometrizzazione preliminare per organizzare il pezzo prima della formatura finale.

Non è universale.

## Bench rest

Riposo tra preforma/divisione e formatura finale.

## Formatura

Costruzione di:
- geometria;
- superficie;
- distribuzione di tensione;
- cucitura.

## Pirlatura / Rounding

Tecnica di formatura/tensionamento.

Non è sinonimo di piega.

## Appretto / Final proof

Fermentazione dopo formatura finale e prima di stesura o cottura.

## Stesura

Deformazione finale di pizza, focaccia o flatbread.

## Riposo in teglia

Fase specifica per prodotti che completano rilassamento/fermentazione sul supporto di cottura.

## Cottura

Trasformazione termo-fisica del prodotto.

## Raffreddamento

Fase strutturale post-forno.

---

# 7. Riposi: modello decisionale

Ogni riposo deve essere definito da:

```yaml
starting_state:
purpose:
temperature:
expected_window:
exit_condition:
```

Non da un singolo timer.

Esempio:

```yaml
phase: bench_rest
purpose: relaxation
expected_window: 10-30 min
exit_condition:
  - reduced_spring_back
  - shaping_possible_without_tearing
```

Il numero è una finestra, non la condizione di uscita.

---

# 8. Rinforzo vs formatura

## 8.1 Rinforzo

Obiettivo:
- modificare stato della massa durante bulk.

Non deve:
- creare la geometria finale;
- essere prescritto in numero fisso.

---

## 8.2 Formatura

Obiettivo:
- costruire geometria finale;
- orientare facce;
- creare cucitura;
- generare tensione adeguata al prodotto.

---

## 8.3 Correzione importante

Non esiste una legge universale:

```text
quattro lembi → capovolgi
```

Può essere una tecnica specifica.

Il capovolgimento:
- dipende dalla tecnica;
- dipende dalla geometria;
- dipende dal prodotto;
- non deve essere globalizzato nel motore.

---

## 8.4 Pizza ball

Modello geometrico utile:

```text
porzione irregolare
→ raccolta/chiusura
→ faccia esterna continua
→ seam raccolta sotto
→ tensione sufficiente
→ stop
```

“Tensione sufficiente” ≠ “più tesa possibile”.

---

# 9. Manipolazione e degasaggio

Il principio “non degassare mai” è falso universalmente.

### Open crumb

Prodotti come:
- ciabatta;
- alcune teglie;
- alcune contemporanee

richiedono manipolazione delicata.

### Close crumb

Prodotti come:
- pan carré;
- burger buns;
- alcuni pani morbidi

possono richiedere:
- degasaggio controllato;
- uniformazione;
- shaping più deciso.

---

# 10. Famiglie di prodotto

## 10.1 Pizza

Sottofamiglie da modellare:

- teglia romana;
- pala romana;
- tonda romana;
- napoletana STG;
- napoletana AVPN;
- napoletana contemporanea;
- pizza contemporanea;
- pinsa conforme a protocollo;
- stile ispirato alla pinsa;
- pizza in padella.

### Regola

Stili disciplinati e stili commerciali/non disciplinati devono avere status diverso.

---

## 10.2 Pane

Tassonomia tecnica:

- lean wheat breads;
- enriched breads;
- high hydration;
- low hydration;
- wholegrain;
- rye-dominant;
- durum wheat;
- sourdough;
- prefermented;
- sandwich breads;
- hearth breads;
- flatbreads.

---

## 10.3 Focacce

Famiglie da approfondire:

- genovese;
- barese;
- romana;
- schiacciata;
- focacce alte;
- focacce ad alta idratazione;
- con patate.

La scienza comune è già condivisibile, ma le regole autentiche degli stili richiedono ricerca verticale.

---

## 10.4 Buns e impasti arricchiti

Famiglie:

- panino al latte;
- burger bun;
- brioche bun;
- potato bun;
- shokupan/milk bread;
- hot dog bun.

Richiedono un modulo enriched dedicato.

---

# 11. Prefermenti e sourdough

## 11.1 Prefermenti commerciali

Da modellare:

- biga;
- poolish;
- pâte fermentée;
- sponge.

Campi:

```yaml
preferment_type:
flour_pct:
hydration:
yeast_inoculation:
temperature:
maturity:
duration:
```

---

## 11.2 Lievito madre / licoli

Richiedono un oggetto più ricco:

```yaml
starter_type:
hydration:
refresh_ratio:
temperature:
maturity:
acidity:
feed_flour:
history:
```

Nessuna equivalenza diretta con grammi di lievito commerciale.

---

# 12. Cottura

## 12.1 Il setpoint non descrive il forno

`250 °C` non è un profilo forno.

Servono almeno:

- temperatura impostata;
- temperatura reale;
- supporto;
- massa termica;
- posizione;
- convezione;
- irraggiamento;
- conduzione;
- umidità;
- carico.

---

## 12.2 Profilo forno/supporto

La futura app deve evolvere da:

```text
oven_max_temp
```

a:

```yaml
oven_profile:
  max_temp:
  mode:
  support:
  rack_position:
  preheat:
  top_heat:
  bottom_heat:
```

---

## 12.3 Trasformazioni principali

- espansione;
- evaporazione;
- gelatinizzazione amido;
- denaturazione proteica;
- Maillard;
- caramellizzazione;
- formazione crosta;
- redistribuzione dell'acqua.

---

# 13. Sicurezza alimentare

## 13.1 Farina cruda

La farina è un alimento crudo.

L'app non deve mai suggerire:
- assaggiare impasto crudo;
- assaggiare pastella cruda;
- usare il gusto dell'impasto crudo come test.

---

## 13.2 Ingredienti deperibili

Latte, uova, burro, topping e farciture devono essere gestiti separando:

```text
fermentation process
≠
food storage
```

Le regole di conservazione non devono essere applicate ciecamente a ogni fase di proofing, ma il motore deve evitare indicazioni rischiose.

---

# 14. Motore diagnostico

Schema:

```text
PRODUCT
+ PHASE
+ STATE
+ TEMPERATURE
+ TIME_REMAINING
+ EQUIPMENT
→ DIAGNOSIS
```

Per ogni problema:

1. cause plausibili;
2. indizi discriminanti;
3. azione immediata;
4. cosa non fare;
5. tempo di rivalutazione;
6. recuperabilità;
7. modifica futura.

---

# 15. Calculation engine — classi canoniche

La classe di calcolo descrive **quanto l'output è derivabile dagli input**. Non descrive la qualità della fonte scientifica: quella appartiene a `EVIDENCE_RECORD`.

## Calc-A — deterministico
Formula matematica o bilancio massico con input noti.

Esempi: baker's percentages, scaling, geometria, massa totale, accounting farina/acqua di starter o prefermento quando la composizione è nota.

## Calc-B — empirico calibrato
Relazione quantitativa utilizzabile entro condizioni dichiarate e sostenuta da dati sperimentali o da calibrazione del sistema.

Esempi: friction factor di una macchina, bake window di uno specifico forno/supporto, massa→geometria per un profilo validato.

## Calc-C — euristico/predittivo
Stima utile ma dipendente da assunzioni, contesto o dati incompleti.

Esempi: dose lievito iniziale, finestra fermentativa, correzione acqua di una farina non caratterizzata, previsione di cottura senza calibrazione.

## Calc-D — osservazionale/state-based
Decisione che richiede osservazione dello stato reale, eventualmente assistita da misure.

Esempi: readiness di bulk/proof, mixing endpoint, necessità di rinforzo, readiness per shaping/scoring/forno, recuperabilità.

## Regola per formule ibride
Non usare notazioni come `Calc-D`, `Calc-C` o combinazioni fra classe di calcolo e livello di evidenza.

```yaml
calculation:
  formula_class: Calc-A
  parameter_class: Calc-B
  output_class: Calc-B
  confidence: medium
  evidence_record_ids: []
```

Un output non deve apparire più preciso del parametro meno certo che lo alimenta.

# 16. Modello dati canonico

Questa sezione è la **fonte normativa interna** per l'ontologia. Le verticali possono aggiungere campi, ma non ridefinire entità concorrenti.

## 16.1 Core prodotto
```text
PRODUCT_PROFILE
TARGET_RESULT
COMPLIANCE_PROFILE
```

## 16.2 Materie prime e composizione
```text
GRAIN_PROFILE
FLOUR_PROFILE
FLOUR_BLEND
BRAN_PROFILE
INGREDIENT_PROFILE
FORMULATION_PROFILE
COMPOSITION_LEDGER
FUNCTIONAL_EFFECT_PROFILE
ENRICHMENT_PROFILE
DAIRY_PROFILE
EGG_PROFILE
FAT_PROFILE
STARCH_GEL_PROFILE
POTATO_PROFILE
```

## 16.3 Sistema strutturale e fermentativo
```text
STRUCTURAL_SYSTEM
FERMENTATION_SYSTEM
YEAST_PROFILE
PREFERMENT_PROFILE
STARTER_PROFILE
FERMENTATION_CONTEXT
THERMAL_HISTORY
```

## 16.4 State machine di processo
```text
PROCESS_PHASE
PROCESS_STATE
MIXING_PROFILE
MIXING_STATE
REST_PROFILE
REINFORCEMENT_PROFILE
DIVISION_PROFILE
PRESHAPE_PROFILE
SHAPING_PROFILE
PROOF_PROFILE
PIZZA_BALL_PROFILE
STRETCHING_PROFILE
BUN_SHAPING_PROFILE
HOT_DOG_MOULD_PROFILE
ENRICHED_PROOF_STATE
BREAD_PROOF_STATE
```

Ogni fase deve avere almeno:
```yaml
phase_id:
purpose:
starting_state:
actions:
expected_window:
exit_conditions:
fallbacks:
observations:
```

## 16.5 Superficie, supporto e cottura
```text
SURFACE_TREATMENT
SCORING_PROFILE
DIMPLING_PROFILE
BRINE_PROFILE
SURFACE_FINISH_PROFILE
PAN_PROFILE
STEAM_PROFILE
OVEN_PROFILE
BAKING_PROFILE
BREAD_BAKING_PROFILE
FOCACCIA_BAKING_PROFILE
ENRICHED_BAKING_PROFILE
```

## 16.6 Post-cottura
```text
COOLING_PROFILE
COOLING_STATE
STORAGE_PROFILE
TEXTURAL_SHELF_LIFE
MICROBIOLOGICAL_SHELF_LIFE
```

## 16.7 Decisione, evidenza e calibrazione
```text
DIAGNOSTIC_STATE
EVIDENCE_RECORD
CALIBRATION_RECORD
SOURCE_RECORD
```

```yaml
EVIDENCE_RECORD:
  id:
  statement:
  evidence_level: Ev-A | Ev-B | Ev-C | Ev-D | Ev-E | Ev-F | Ev-G | Ev-H
  source_ids: []
  scope:
  conditions:
  limitations:
  reviewed_on:

CALIBRATION_RECORD:
  id:
  parameter:
  source_type: project_experiment | manufacturer | official_profile | literature | heuristic
  conditions:
  value_or_range:
  unit:
  sample_size_optional:
  uncertainty_optional:
  valid_scope:
  evidence_record_ids: []
  status: proposed | active | superseded
  reviewed_on:

SOURCE_RECORD:
  id:
  title:
  source_type:
  doi_or_identifier_optional:
  url_optional:
  source_date_optional:
  verified_on:
  version_optional:
  supersedes_optional:
  status: verified | provisional | superseded | unavailable
```

## 16.8 Alias deprecati
Le strutture storiche non devono diventare seconde entità concorrenti:

```text
ProductFamily/Style → PRODUCT_PROFILE
Flour               → FLOUR_PROFILE
Ingredient           → INGREDIENT_PROFILE + COMPOSITION_LEDGER
Dough                → FORMULATION_PROFILE + PROCESS_STATE
ProcessPhase         → PROCESS_PHASE
DiagnosticState      → DIAGNOSTIC_STATE
```

Il codice futuro deve usare i nomi canonici.

# 17. Architettura contenuti

Il manuale non deve duplicare concetti per prodotto.

## Layer 1 — Scienza comune

- farina;
- acqua;
- glutine;
- amido;
- fermentazione;
- gas;
- temperatura;
- ingredienti;
- cottura.

## Layer 2 — Tecniche

- mixing;
- rinforzo;
- divisione;
- preforma;
- rounding;
- shaping;
- scoring;
- stretching;
- baking.

## Layer 3 — Famiglie

- pizza;
- pane;
- focaccia;
- enriched/buns.

## Layer 4 — Stili

- teglia romana;
- napoletana;
- genovese;
- baguette;
- burger bun;
- ecc.

## Layer 5 — Diagnostica

Stati trasversali collegati alle fasi.

## Layer 6 — Guida contestuale

Solo ciò che serve:
- fai ora;
- osserva;
- aspetta;
- fallback.

---

# 18. UX della super-app

## Percorso base

```text
Cosa vuoi ottenere?
→ famiglia
→ stile
→ quantità
→ quando vuoi cuocere
→ attrezzatura essenziale
→ piano
```

## Percorso avanzato

Espansione opzionale di:
- farina;
- prefermenti;
- temperature;
- idratazione;
- fermentazione;
- attrezzatura;
- personalizzazioni.

## Regola

Mai chiedere un dato tecnico:
- che l'utente probabilmente non conosce;
- che non cambia una decisione;
- che il motore non sa interpretare con sufficiente affidabilità.

---

# 19. Assunzioni da eliminare

Non introdurre nel motore come regole universali:

1. più proteine = più acqua;
2. W = idratazione;
3. più acqua = più alveoli;
4. pieghe = creazione delle bolle;
5. sempre N pieghe;
6. sempre capovolgere dopo quattro lembi;
7. panetto più teso = migliore;
8. mai degassare;
9. frigo = fermentazione bloccata;
10. 1 g secco = sempre 3 g fresco;
11. più lievito = stessa fermentazione più veloce;
12. 22 °C = temperatura reale dell'utente;
13. data = temperatura ambiente;
14. 250 °C = profilo forno;
15. lunga fermentazione = promessa di maggiore digeribilità.

---

# 20. Correzioni da applicare a PizzaMaker prima del motore universale

## 20.1 Capovolgimento

“Quattro lembi + capovolgimento” non deve essere descritto come principio universale.

Deve diventare una variante della tecnica selezionata.

## 20.2 Dose di lievito

Deve essere etichettata come:

```text
previsione / stima
confidence: low | medium | high
```

e non come equivalente deterministico di farina/acqua.

## 20.3 Conversione fresco/secco

Default pratico configurabile.

L'etichetta del produttore deve poter prevalere.

## 20.4 Cottura

Passare da:
- sola temperatura massima

a:
- profilo forno/supporto.

---

# 21. Ricerca residua dopo le verticali Deep Research

Le quattro basi principali sono ora disponibili:
- Fondazioni scientifiche e architettura universale;
- verticale Pizza;
- verticale Pane + Focacce;
- verticale Buns + Impasti arricchiti.

Non è più necessaria un'altra mega-ricerca generale prima di consolidare il prodotto. Restano invece lavori mirati che devono essere mantenuti come backlog esplicito.

## Priorità 1 — Micro-ricerca visuale dei gesti

Da verificare con fonti professionali originali e materiale visuale realmente osservabile:
- boule e bâtard shaping;
- baguette shaping e scoring;
- trasferimento della ciabatta;
- pan-bread moulding;
- dimpling di focacce regionali;
- burger bun flattening;
- hot-dog bun moulding;
- brioche variants;
- Shokupan moulding.

Il motore può già descrivere **obiettivo fisico, stato iniziale, errore e stop condition**, ma non deve inventare una cinematica manuale unica quando la fonte non la dimostra.

## Priorità 2 — Fonti regionali e compliance

Restano da recuperare o consolidare:
- testo tecnico corrente del disciplinare/marchio pertinente alla Focaccia Genovese, prima di hardcodificare spessore, salamoia, olio o sequencing;
- status e documenti tecnici effettivamente normativi/associativi per Focaccia Barese;
- testo consolidato corrente dei disciplinari quando la ricerca ha intercettato una sola pubblicazione di modifica;
- versionamento delle fonti normative dentro `COMPLIANCE_PROFILE`.

## Priorità 3 — Calibrazione quantitativa PizzaMaker

Richiedono dataset sperimentali dell'app, non altra teoria generale:
- dose lievito × temperatura × massa × tempo;
- thermal lag e raffreddamento in frigorifero;
- proof-state prediction;
- friction factor per mixer;
- oven profile reale;
- steam profile domestico sicuro;
- bake time per massa/geometria/supporto;
- starch-gel/patata per enriched;
- shelf life testurale e sensoriale.

La shelf life microbiologica resta fuori dal calcolo ricetta-based e richiede validazione specifica.

## Priorità 4 — Verticali separate non bloccanti

Il gluten-free non deve essere simulato come estensione lineare del frumento. Se entrerà nel perimetro del prodotto, richiederà una verticale dedicata su amidi, idrocolloidi e proteine non-glutine.

---

# 22. Esperimenti domestici per calibrazione

| Esperimento | Variabile | Outcome |
|---|---|---|
| Farina × idratazione | 3 livelli acqua | spread, handling, volume, crumb |
| Rinforzi | 0/1/2/3 | spread, resistenza, crumb |
| Formatura | minima vs intensa | spring-back, gas distribution |
| Cold bulk vs balls | momento staglio | handling, proof, stesura |
| Dough temp | 3 target | curva volume |
| Frigo | 3/5/7 °C | volume/stato |
| Supporto forno | teglia/stone/steel | fondo, tempo, colore |
| Tangzhong/Yudane | 0 vs quota gelatinizzata | softness 0/24/48/72 h |

Ogni test deve registrare:
- formula;
- temperature;
- orari;
- fotografie;
- volume;
- spread;
- stato tattile;
- cottura;
- crumb image;
- peso prima/dopo.

---

# 23. Regola per le guide visuali

Ogni gesto deve essere definito prima con cinque coordinate:

```text
stato iniziale
→ presa
→ direzione delle forze
→ orientamento facce / seam
→ condizione di stop
```

Solo dopo si genera una fotografia o animazione.

---

# 24. Matrice universale vs specifico

| Concetto | Portata |
|---|---|
| Baker's percentages | Universale |
| Scaling | Universale |
| Bilancio acqua | Universale, composizione-specifico |
| Temperatura finale impasto | Molto comune |
| Bulk fermentation | Comune |
| Rinforzo | Comune, condizionale |
| Staglio | Prodotti porzionati |
| Rounding | Pizza balls / buns / molti pani |
| Preforma + bench rest | Alcuni pani |
| Degasaggio | Target-specifico |
| Stesura | Pizza / flatbread |
| Fossette + brine | Focacce specifiche |
| Scoring | Pani specifici |
| Cottura ultra-rapida 60–90 s | Napoletana specifica |
| Yudane/Tangzhong | Soft/enriched opzionale |
| Sourdough ecology | Modulo fermentativo |

---

# 25. Livelli di evidenza — schema canonico

Il Manuale usa esclusivamente `Ev-A…Ev-H`. La classe non coincide con `Calc-A…D`.

| Livello | Significato | Uso |
|---|---|---|
| **Ev-A** | evidenza scientifica forte e convergente | relazione causale generale entro scope |
| **Ev-B** | evidenza valida ma condizionale/limitata | regola condizionata/range |
| **Ev-C** | norma, standard o disciplinare ufficiale | conformità/definizione |
| **Ev-D** | consenso/procedura professionale qualificata | metodo operativo con fonte |
| **Ev-E** | pratica diffusa non sufficientemente validata | contesto, non default automatico |
| **Ev-F** | euristica operativa | suggerimento esplicitamente incerto |
| **Ev-G** | inferenza progettuale PizzaMaker | decisione derivata dalle evidenze |
| **Ev-H** | questione aperta | non automatizzare come verità |

`Ev-C` ed `Ev-A` rispondono a domande diverse: un disciplinare può essere vincolante per la conformità senza dimostrare superiorità tecnica.

```yaml
claim_id:
statement:
evidence_level: Ev-A | Ev-B | Ev-C | Ev-D | Ev-E | Ev-F | Ev-G | Ev-H
confidence: low | medium | high
source_ids: []
scope: []
conditions: []
limitations: []
phase_optional:
```

`project_experiment`, `manufacturer`, `peer_reviewed`, `official_specification` sono `source_type`, non nuovi livelli di evidenza.

# 26. Bibliografia fondativa

## Scienza e reologia

- Lucas, I.; Petermeier, H.; Becker, T.; Jekle, M. **Definition of network types – Prediction of dough mechanical behaviour under shear by gluten microstructure**. *Scientific Reports*, 2019. DOI `10.1038/s41598-019-41072-w`.
- Sun, X.; Scanlon, M.G.; Koksel, F.; Nickerson, M.T. **The entrainment and evolution of gas bubbles in bread dough—A review**. DOI `10.1002/cche.10699`.
- Lu et al. **Bread dough aeration dynamics during pressure step-change mixing: Studies by X-ray tomography...**, 2013.
- Turbin-Orger et al. **Growth and setting of gas bubbles in a viscoelastic matrix imaged by X-ray microtomography**. *Soft Matter*, 2015.
- Sandoval, A.; Chaunier, L.; Chiron, H.; Della Valle, G.; Reguerre, A-L. **Cellular structure and rheological properties of shaped fermented wheat flour dough**. *Journal of Cereal Science*, 2017. DOI `10.1016/j.jcs.2016.12.001`.
- **The time-dependent rheology of fermenting wheat flour dough: effects of salt and sugar**. *Rheologica Acta*, 2018. DOI `10.1007/s00397-018-1113-9`.
- **Sugar Levels Determine Fermentation Dynamics during Yeast Pastry Making...** *Foods*, 2022. DOI `10.3390/foods11101388`.
- **Expansion profiles of wheat doughs fermented by seven commercial baker's yeasts**. *Journal of Cereal Science*, 2013. DOI `10.1016/j.jcs.2013.05.009`.
- Xie et al. **Effect of different producing methods on physicochemical and fermentation properties of refrigerated dough**, 2023. DOI `10.1016/j.jfca.2023.105268`.
- **Bread fermentation monitoring through NIR spectroscopy and PLS-DA**. *Journal of Food Engineering*, 2024.
- **The diversity and function of sourdough starter microbiomes**.
- **Microbial dynamics of sourdough ferment produced with six different wheat flours**, 2026.
- Zeng et al. **Effect of fermentation methods on properties of dough and whole wheat bread**, 2023. DOI `10.1002/jsfa.12565`.

## Standard tecnici

- ISO 27971:2023 — Alveograph su farine di frumento comune a idratazione costante. **Verificato 2026-10-18**.
- ISO 3093:2009 — Falling Number secondo Hagberg-Perten per frumento, segale e relative farine, grano duro e semola. **Confermato vigente nel 2026**; Amendment 1 risultava ancora in sviluppo al 2026-10-18.
- ICC Standard 107/1 — Falling Number.
- ICC Standard 121/2 — Chopin Alveograph.
- ICC Standard 115/1 — Brabender Farinograph.
- ICC Standard 114/1 — Brabender Extensograph.

## Farina, amido, fibre e cereali

- **Effects of damaged starch on the rheological properties of starch–gluten dough**, 2025. DOI `10.1093/ijfood/vvaf122`.
- **The role of wheat flour minor components in predicting water absorption**, *Food Chemistry*, 2025.
- **Impact of wheat bran dietary fiber on gluten and gluten-starch microstructure formation in dough**.
- **Selective modification of wheat bran affects its impact on gluten-starch dough rheology...**, 2021.
- **The role of arabinoxylan in determining the non-linear and linear rheology of bread doughs made from wheat/rye blends**.
- **Impact of arabinoxylan addition on protein microstructure formation in wheat and rye dough**.
- **Rheological, microstructural and sensorial properties of durum wheat bread as affected by dough water content**, 2013.
- **A study on relationships between durum wheat semolina properties, technological mixing parameters and dough properties**, 2013.

## Dairy, uova, soft bread e staling

- Iuga, M. et al. **Impact of Dairy Ingredients on Wheat Flour Dough Rheology and Bread Properties**. *Foods*, 2020. DOI `10.3390/foods9060828`.
- Ishibashi, C. et al. **Effect of Egg on Rheological Properties of Dough and Bread Quality**, 2022. DOI `10.11402/cookeryscience.55.281`.
- Yamauchi, H. et al. **The Staling and Texture of Bread Made Using the Yudane Dough Method**, 2014. DOI `10.3136/fstr.20.1071`.
- **Amylose and amylopectin functionality during storage of bread...**, 2020.
- **Kinetic study of staling in breads with high-amylose resistant starch**, 2020.

## Cottura

- **Experiment and multiphysic simulation of dough baking by convection, infrared radiation and direct conduction**.
- Falciano, A.; Moresi, M.; Masi, P. **Phenomenology of Neapolitan Pizza Baking in a Traditional Wood-Fired Oven**. *Foods*, 2023. DOI `10.3390/foods12040890`.

## Fonti professionali

American Society of Baking:
- Dough Processing
- Dough Handling Properties
- Dough Rounding
- Dough Moulding
- Ciabatta
- Oven Baking Parameters
- Water Absorption

King Arthur Baking Professional:
- Dough Temperature

## Disciplinari e standard di stile

- AVPN — **Disciplinare internazionale Verace Pizza Napoletana**, ed. 2024.
- Commissione Europea — **Regolamento UE 97/2010 – Pizza Napoletana STG**.
- Quelli di Bonci — **Disciplinare della Pizza in Teglia alla Romana**.
- Associazione Originale Pinsa Romana — **Regolamento e Protocollo**.

## Sicurezza

- FDA — **Flour Is a Raw Food / Handling Flour Safely**.
- EFSA — corretta manipolazione e conservazione alimenti.
- Ministero della Salute italiano — conservazione domestica in frigorifero.

---

# 27. Decisione di progetto

La knowledge base è ora abbastanza robusta per progettare e implementare:
- tassonomia universale;
- data model multi-famiglia;
- process/state engine;
- diagnostic engine probabilistico;
- calculation registry A/B/C/D;
- evidence registry Ev-A…Ev-H;
- `COMPLIANCE_PROFILE`;
- UX principiante/avanzata con progressive disclosure;
- profili forno, vapore, raffreddamento e conservazione;
- esperimenti di calibrazione tracciabili.

Non è invece scientificamente corretto automatizzare come verità universali:
- `W → ore di fermentazione`;
- correzione acqua integrale fissa;
- equivalenza lievito madre ↔ lievito commerciale;
- numero fisso di pieghe;
- proof endpoint basato solo sul raddoppio o sul poke test;
- angoli/profondità di scoring universali;
- dose di vapore universale in mL;
- tempo di cottura ricavato dal solo setpoint;
- shelf life microbiologica derivata dalla ricetta;
- gesti manuali fini non ancora verificati visualmente.

Il prossimo passo corretto non è una nuova mega-ricerca, ma **consolidamento v2.0 + Visual Gesture Research Pack + calibrazione sperimentale**.

---

# 28. Principio finale

Il futuro motore non deve essere:

```text
ricetta → tempo → azione
```

ma:

```text
prodotto
+ target
+ formula
+ fase
+ stato
+ temperatura
+ tempo disponibile
+ attrezzatura
→ previsione
→ checkpoint
→ osservazione
→ azione
```

Questa è la base da preservare in tutte le evoluzioni successive di PizzaMaker.

---

# 29. Provenance verticale Pizza — storico non normativo

Il mandato operativo usato per la Deep Research Pizza è conservato in `PizzaMaker_Evidence_Appendix_v1.0.md`.

Questa sezione resta numerata per compatibilità, ma **non contiene regole di prodotto**.

Fonte canonica:
- sezioni 31–40 del presente Manuale;
- Evidence Appendix per mandato, contesto e tracciabilità.

In caso di conflitto prevale la specifica canonica più recente, non il mandato storico.

# 30. Stato integrazione della ricerca verticale Pizza

**Stato:** integrata e sufficientemente matura per l'architettura universale.

Il rapporto verticale Pizza ha prodotto i profili validati delle sezioni 31–40. Mandato e materiale storico sono conservati nell'Evidence Appendix.

Gap residui: cinematica manuale fine, predizione quantitativa domestica di fermentazione/forno e calibrazioni sperimentali; restano backlog specialistico.

# 31. Risultati validati della verticale Pizza

## 31.1 La pizza deve essere modellata tramite profili di stile

Il motore non deve avere una sola “ricetta pizza” con varianti.

Deve usare profili distinti almeno per:

```text
napoletana_stg_eu
verace_napoletana_avpn
napoletana_contemporanea
teglia_romana_classica
teglia_romana_contemporanea
pala_romana
tonda_romana_matterello
originale_pinsa
pinsa_style
pan_pizza_padellino
```

Ogni profilo deve dichiarare anche il proprio status:

```text
legal_specification
private_association_standard
private_certification_profile
professional_style_family
generic_style_family
technical_family
```

## 31.2 STG e AVPN non sono lo stesso profilo

`Pizza Napoletana STG` e `Verace Pizza Napoletana AVPN` devono rimanere separati.

Differiscono, tra le altre cose, per:
- pesi panetto;
- tempi e workflow fermentativi;
- range di formulazione;
- requisiti di forno;
- condizioni di conformità.

Il motore deve distinguere:

```yaml
compliance:
  target_style:
  standard:
    none | eu_stg | avpn
  achievable:
    true | false | partial
  adaptation_label:
    authentic_compliant
    style_compatible
    style_inspired
```

## 31.3 “Contemporanea” non è un disciplinare unico

Termini come:
- contemporanea;
- canotto;
- moderna;
- alta idratazione;

devono essere trattati come famiglie professionali o target tecnici, non come standard normativi unici.

Il motore deve evitare di inventare:
- una singola idratazione;
- un solo W;
- una sola biga;
- un solo cornicione;
- un unico metodo di fermentazione.

## 31.4 Idratazione, W e durata non hanno relazioni deterministiche

Eliminare dal motore qualsiasi relazione rigida del tipo:

```text
W → ore
W → idratazione
più acqua → più alveoli
più acqua → pizza migliore
```

L'idratazione deve essere proposta come:

```text
style-compatible starting window
+ flour compatibility
+ process
+ skill/equipment
```

## 31.5 Le pieghe non sono una fase obbligatoria della pizza

STG e AVPN non richiedono le pieghe come identità dello stile.

Il rinforzo deve quindi essere condizionale:

```text
bulk phase
+ structure insufficient
+ fermentation not advanced
+ dough not overheated
→ reinforcement may help
```

Non:

```text
pizza
→ sempre 2 o 3 pieghe
```

## 31.6 “4 lembi → capovolgi” non è una legge universale

Questa sequenza può restare come protocollo specifico di rinforzo.

Non deve essere una regola globale.

Ogni tecnica deve possedere una propria gestione di:
- facce;
- forza;
- deformazione;
- orientamento;
- stop condition.

## 31.7 Il degasaggio è style-specific

La regola “non degassare mai” va rimossa.

Esempi opposti:

### Napoletana
Il gesto ridistribuisce gas dal centro alla periferia e preserva il bordo.

### Tonda romana
Il matterello/compressione contribuisce deliberatamente a un disco molto sottile e a una struttura più fine.

Il motore deve quindi avere:

```yaml
degassing_target:
  low
  medium
  high
```

## 31.8 Formatura e rinforzo restano separati

La decisione precedente di PizzaMaker è confermata:

```text
reinforcement != shaping
```

Il panetto deve essere modellato tramite goal:

```yaml
pizza_ball_goal:
  continuous_outer_surface: true
  structural_integrity: true
  tearing: avoid
  unnecessary_degassing: avoid
  target_tension: style_dependent
  closure: stable
```

Il gesto specifico può cambiare per stile.

## 31.9 Pirlatura non universale

La pirlatura non deve essere una checkbox obbligatoria.

Serve invece:

```text
target_surface_tension
```

La tensione corretta è:
- sufficiente a mantenere forma;
- compatibile con il tempo restante;
- compatibile con la stesura;
- non eccessiva.

## 31.10 Il peso deve dipendere dalla geometria

Per teglia:
```text
g/cm²
```

Per pizza tonda:
```text
ball_weight ↔ target_diameter
```

Per pala:
```text
mass + area + target thickness + geometry
```

Non usare un unico modello di peso per tutta la pizza.

---

# 32. Profili romani e preset associativi

## 32.1 Teglia romana associativa

I valori della ricerca verticale consentono di memorizzare preset associativi, non leggi fisiche.

Esempi:
- teglia classica 60×40 con 900–950 g ≈ **0,375–0,396 g/cm²**;
- teglia contemporanea 60×40 con 1.200 g ≈ **0,50 g/cm²**.

Il calcolo area × fattore è deterministico.
La scelta del fattore è style-specific ed empirica.

## 32.2 Tonda romana associativa

Il profilo associativo analizzato indica circa:
- 33 cm;
- 170–190 g;
- idratazione attorno al 55%;
- fermentazione/appretto dei panetti in freddo;
- stesura col matterello;
- cottura circa 320–350 °C.

Questi dati dimostrano che la tonda romana richiede un profilo tecnico distinto dalla Napoletana.

## 32.3 Pala romana

La pala richiede:
- geometria allungata;
- preservazione elevata della struttura cellulare;
- trasferimento su pala/refrattario;
- stesura differente rispetto a teglia e tonda.

## 32.4 Pinsa

Separare obbligatoriamente:

```text
originale_pinsa
```

da:

```text
pinsa_style
```

Il protocollo privato dell'Originale Pinsa può includere:
- mix specifico;
- processo specifico;
- idratazione specifica;
- range temporali specifici.

Questi dati non definiscono automaticamente ogni prodotto commercialmente chiamato “pinsa”.

---

# 33. Fermentation Model Pizza

La ricerca conferma che non è difendibile una sola formula:

```text
lievito × ore × °C
```

Il modello deve includere almeno:

```yaml
fermentation_model:
  yeast:
    type:
    brand_or_activity: optional
    dose:
    conversion_source:

  dough:
    flour_profile:
    hydration:
    salt:
    sugars:
    fats:
    preferment:
    acidity:

  thermal_state:
    final_dough_temp:
    ambient_temp: optional_measured
    fridge_temp: optional_measured
    phase_temperature_history:

  process:
    bulk_duration:
    ball_duration:
    refrigeration:
    transitions:

  output:
    estimated_readiness_window:
    confidence:
    checkpoints:
```

## 33.1 Temperatura ambiente

`22 °C` può restare solo come riferimento UX.

Non deve essere interpretato come misura reale.

Se la temperatura non è disponibile:
- ampliare la finestra;
- ridurre `confidence`.

## 33.2 Strategia del freddo

Il frigo è style-specific.

Possibili strategie:

```text
cold_bulk
cold_balls
mixed
no_cold_phase
```

Nessuna può diventare default globale.

## 33.3 Conversione fresco/secco

Il rapporto pratico circa 3:1 può restare come default documentato/overrideable.

Non deve essere una costante biochimica universale.

---

# 34. Readiness, staglio e appretto

## 34.1 Readiness prima del cronometro

Il modello corretto è:

```text
time window = prediction
state = verification
```

I tempi restano utili, ma non decidono da soli.

## 34.2 Checkpoint del panetto

```yaml
ball_readiness:
  shape_retention:
  lateral_spread:
  surface_condition:
  gas_presence:
  extensibility:
  spring_back:
  tearing:
  dough_temperature:
```

La UX deve tradurre questi campi in domande semplici.

## 34.3 AVPN e mozzatura

AVPN descrive lo staglio/formatura tradizionale tramite tecnica assimilata alla mozzatura.

Non codifica una moderna sequenza universale di:
- cucitura;
- capovolgimento;
- numero di rotazioni;
- pirlatura.

Una guida alternativa per principianti può esistere, ma deve essere etichettata come:
**metodo pratico compatibile con il target**, non come tecnica AVPN.

---

# 35. Stretching Profile Pizza

## 35.1 Napoletana

Profilo:

```yaml
method: neapolitan_fingertip
rim_strategy: build_by_gas_redistribution
degassing_level: medium_center_low_rim
gas_direction: center_to_periphery
```

Gesto:

```text
proofed ball
→ fingertip pressure
→ center-to-periphery gas redistribution
→ rotation
→ lift/stretch
→ target diameter
→ thin center + preserved rim
```

Matterello e pressa non appartengono al profilo conforme.

## 35.2 Tonda romana

Profilo:

```yaml
method: roman_rolling_pin
rim_strategy: suppress
degassing_level: high
target: very_thin_crisp
```

Obiettivo:
- spessore molto uniforme;
- limitazione delle grandi celle;
- disco sottile;
- croccantezza.

## 35.3 Teglia e pala

Profilo:

```yaml
method: tray_press | peel_lengthening
degassing_level: low_to_medium
rim_strategy: style_specific
```

Principi:
- distribuzione progressiva;
- forza locale limitata;
- evitare trascinamenti;
- evitare rilavorazioni ripetute;
- evitare zone sottili e deboli.

Il livello quantitativo ottimale di pressione resta da calibrare.

---

# 36. Oven Profile Pizza

Il campo `ovenMaxTemp` non è sufficiente.

Modello:

```yaml
OVEN_PROFILE:
  type:
  max_setpoint:
  measured_max: optional

  support:
    material:
    thickness:
    position:

  top_heat:
  bottom_heat:
  convection:
  grill:

  preheat:
  recovery:

  optional_measurements:
    support_surface_temp:
    dome_or_top_temp:
```

## 36.1 Principio termico

La cottura deriva dall'interazione tra:
- conduzione;
- irraggiamento;
- convezione;
- massa termica;
- posizione;
- carico;
- acqua del topping.

Il setpoint è solo uno degli input.

## 36.2 Adattamento domestico

Il motore deve distinguere:

```text
authentic_compliant
style_compatible
style_inspired
```

Esempio:
un forno domestico 250 °C può produrre una pizza ispirata alla Napoletana, ma non deve essere dichiarata STG conforme.

## 36.3 Topping come carico idrico/termico

Il motore dovrebbe memorizzare:

```yaml
topping:
  water_load:
    low | medium | high
  total_mass:
  cheese_type:
  sauce_amount:
  added_pre_bake:
  added_mid_bake:
  added_post_bake:
```

La regola “mozzarella sempre dopo X minuti” non deve essere universale.

## 36.4 Endpoint di cottura

```yaml
bake_endpoints:
  bottom:
    pale | set | browned | scorched
  rim:
    expansion:
    browning:
    structural_set:
  center:
    set:
    moisture:
  topping:
    water_release:
    melting:
    browning:
  style_specific:
    crispness:
    foldability:
```

Il timer resta una previsione, non l'unico endpoint.

---

# 37. Calculation Engine Pizza

| Calcolo | Classe |
|---|---|
| Baker's percentages | A |
| Scaling ingredienti | A |
| Area rettangolo/cerchio | A |
| Massa da area × fattore | A matematico una volta scelto il fattore |
| Scelta del fattore g/cm² | B/C |
| Peso panetto da profilo ufficiale | B/C |
| Idratazione compatibile | C |
| Dose lievito | C/D |
| Readiness | D |
| Tempo cottura automatico | C/D |
| Compliance stile | A/C secondo requisito e input |

La precisione matematica non deve nascondere l'incertezza del parametro scelto.

---

# 38. Diagnostic Engine Pizza

Il modello deve continuare a usare:

```text
STYLE
+ PHASE
+ STATE
+ TEMPERATURE
+ TIME_REMAINING
+ EQUIPMENT
```

Ogni diagnosi deve produrre:

```text
CAUSES RANKED
→ OBSERVATIONS
→ ACTION NOW
→ DO NOT
→ RECHECK
→ RECOVERABILITY
→ NEXT TIME
```

Aggiungere:

```yaml
recoverability:
  high
  medium
  low
  none
```

## 38.1 Esempi di logica

### Panetto tenace
Possibili cause:
- troppo giovane;
- troppo freddo;
- formatura eccessiva;
- farina/processo molto elastici.

Azione:
- riposo;
- tempering;
- rivalutazione.

Non:
- forzare lo stretching.

### Panetto molto spread/collassante
Possibili cause:
- fermentazione avanzata;
- struttura degradata;
- temperatura alta.

Azione:
- anticipare lavorazione/cottura se ancora gestibile;
- adattare target.

Non:
- applicare automaticamente un rinforzo tardivo.

### Tonda romana con grandi bolle
Possibile causa:
- degasaggio/stesura insufficienti per il target.

Non:
- preservare ogni bolla per principio.

### Teglia con fondo pallido
Possibili cause:
- bottom heat insufficiente;
- supporto/posizione;
- topping troppo umido.

Azione:
- correggere il profilo termico.

Non:
- aggiungere minuti indiscriminatamente fino a seccare il prodotto.

---

# 39. Data model Pizza aggiornato

## STYLE

```yaml
STYLE:
  id:
  family:
  display_name:

  status:
    legal_specification
    private_standard
    professional_family
    generic_style

  source_profile:
  compliance_supported:

  target:
    geometry:
    crumb:
    crust:
    foldability:
    crispness:
    rim_expansion:

  formulation:
    flour_constraints:
    hydration_window:
    salt_window:
    oil_window:
    sugar_policy:
    yeast_options:
    preferment_options:

  process:
    mixing_profile:
    bulk_profile:
    reinforcement_policy:
    division_profile:
    ball_profile:
    cold_process_policy:
    final_proof_profile:
    stretching_profile:

  baking:
    oven_profile:
    support_profile:
    endpoint_profile:
```

## FLOUR_PROFILE

```yaml
FLOUR_PROFILE:
  brand_product: optional
  type:
  extraction:
  protein:
  W:
  P_L:
  absorption:
  falling_number:
  wholegrain_fraction:
  other_cereals:
  known_profile_id:
```

## PIZZA_BALL_PROFILE

```yaml
PIZZA_BALL_PROFILE:
  weight_rule:
    fixed
    range
    diameter_mapping
    area_factor

  shaping_method:
  target_surface_tension:
  degassing_target:
  seam_policy:
  proof_container:
  target_spread:
  exit_conditions:
```

## STRETCHING_PROFILE

```yaml
STRETCHING_PROFILE:
  method:
    neapolitan_fingertip
    roman_rolling_pin
    tray_press
    peel_lengthening
    custom

  rim_strategy:
    preserve
    build_by_gas_redistribution
    suppress

  degassing_level:
    low
    medium
    high

  gas_direction:
  final_geometry:
  stop_conditions:
```

---

# 40. KEEP / CHANGE / REMOVE aggiornato

## KEEP

- rinforzo separato da formatura;
- stato reale > timer rigido;
- temperatura ambiente opzionale;
- niente geolocalizzazione/meteo obbligatorio;
- lievito fresco/secco esplicito;
- olio esplicito;
- miele/malto non automatici;
- `ovenMaxTemp` come input base;
- diagnostica per fase.

## CHANGE

- `4 lembi → capovolgi` → tecnica opzionale;
- `cucitura sotto → capovolgi → pirlatura minima` → metodo pratico, non legge universale;
- `frigo in massa` → strategia style-specific;
- `22 °C` → riferimento UI, non misura;
- `fresco/secco 3:1` → default documentato e overrideable;
- `ovenMaxTemp` → primo campo di `OVEN_PROFILE`;
- `idratazione consigliata` → finestra compatibile con stile/farina/skill/equipment.

## REMOVE

Eliminare come regole globali:

```text
sempre 2/3 pieghe
sempre capovolgere
mai degassare
più idratazione = migliore
W = ore
72 ore = migliore
72 ore = più digeribile
Manitoba obbligatoria
pirlatura più forte = migliore
un solo profilo STG/AVPN
250 °C = descrizione del forno
forno 250 °C = Napoletana STG autentica
```

---

# 41. Gap residui della verticale Pizza

La ricerca è già sufficiente per progettare:

- tassonomia;
- profili distinti STG/AVPN/Romani/Pinsa;
- data model;
- UX;
- distinction compliance/adaptation;
- struttura del fermentation engine;
- oven profile;
- diagnostica di primo livello.

Non è ancora sufficientemente solida per hardcodificare:

1. cinematica dettagliata della formatura manuale stile per stile;
2. una singola specifica della Napoletana contemporanea/canotto;
3. predizione quantitativa domestica del lievito;
4. conversione precisa capacità-forno → tempo;
5. pressione ottimale di stesura teglia/pala.

Questi elementi devono restare:
- parametrizzati;
- sperimentali;
- oppure oggetto di micro-ricerche dedicate.

---

# 42. Esperimenti PizzaMaker prioritari

| Esperimento | Scopo |
|---|---|
| Ball shaping tensione minima/media/alta | calibrare `target_surface_tension` |
| Cold bulk vs cold balls | confrontare handling e readiness |
| 0/1/2 rinforzi | impedire rinforzi automatici |
| Pressione stesura teglia | calibrare gas preservation |
| Mano vs matterello tonda romana | quantificare close/flat crumb |
| Pressione bordo Napoletana | calibrare cornicione |
| Yeast × 3 temperature | costruire dataset fermentativo |
| Frigo reale 3/5/7 °C | calibrare thermal history |
| Teglia 0,38/0,45/0,50 g/cm² | preset domestici |
| Stone vs steel | oven profile |
| Rack/grill | bilanciamento top/bottom |
| Topping water load | modello cottura |

Ogni esperimento deve registrare:
- formula;
- farina;
- temperature;
- tempi;
- massa;
- volume;
- spread;
- fotografie standardizzate;
- peso pre/post bake;
- sezione;
- fondo/top.

---

# 43. Decisione dopo la verticale Pizza

La verticale Pizza è abbastanza matura per entrare nella knowledge base e per guidare l'architettura universale.

Non serve un'altra ricerca generale sulla pizza. Le micro-ricerche residue restano backlog specialistico.

**Stato storico:** la verticale successiva raccomandata era Pane + Focacce; nella v1.6 quella verticale è stata completata con una vera Deep Research e integrata nella sezione 44.

---

# 44. Verticale Pane + Focacce — integrazione Deep Research

Questa sezione sostituisce la precedente integrazione provvisoria derivata da `PizzaMaker_Ricerca_Verticale_Pane_Focacce_v1.0.md`.

La nuova base è il rapporto **“PizzaMaker — Ricerca verticale Pane + Focacce”**, prodotto con vera Deep Research. Il draft precedente resta utile come storico progettuale, ma non è più fonte di verità scientifica.

## 44.1 Decisione scientifica

La verticale è sufficientemente robusta per sostituire la bozza nei domini:
- cereali e farine;
- sistemi strutturali;
- fermentazione diretta, prefermenti e sourdough;
- mixing, riposi e rinforzi;
- divisione, preforma, shaping e proof;
- scoring;
- vapore;
- cottura, raffreddamento e staling;
- focacce;
- conformità e denominazioni protette;
- motore diagnostico;
- calculation engine;
- data model e UX.

Non giustifica invece una formula universale di fermentazione né la cinematica fine di tutti i gesti manuali.

## 44.2 Sistemi strutturali

Il pane non può avere un solo “motore glutine”. Il dominio deve distinguere almeno:

```text
WHEAT_GLUTEN_DOMINANT
WHOLEGRAIN_BRAN_PERTURBED
RYE_AX_STARCH_DOMINANT
DURUM_GLUTEN_PARTICLE_SYSTEM
MIXED_GRAIN_SYSTEM
```

### `WHEAT_GLUTEN_DOMINANT`
Driver principali:
- rete glutine-amido;
- fase liquida;
- incorporazione e ritenzione del gas;
- estensibilità/elasticità;
- tensione superficiale dove pertinente.

### `WHOLEGRAIN_BRAN_PERTURBED`
La crusca non è un semplice correttore d'acqua. Contano:
- cultivar;
- percentuale;
- granulometria;
- trattamento;
- velocità di idratazione;
- interazione con rete proteica e amido.

### `RYE_AX_STARCH_DOMINANT`
Con segale elevata cambiano i checkpoint. Diventano centrali:
- arabinoxilani;
- amido;
- attività enzimatica;
- acidità;
- viscosità/adesività;
- stabilizzazione in cottura.

`windowpane`, forte tensionamento e criteri da frumento non devono essere trasferiti automaticamente.

### `DURUM_GLUTEN_PARTICLE_SYSTEM`
Per grano duro e semola contano almeno:
- qualità proteica;
- granulometria;
- assorbimento;
- estensibilità;
- mixing;
- fermentazione;
- comportamento del prodotto specifico.

W/P-L e regole del tenero non vanno usati come proxy automatici.

## 44.3 Flour, grain e bran profile

`FLOUR_PROFILE` non è un singolo numero di forza.

```yaml
FLOUR_PROFILE:
  cereal:
  extraction_or_type:
  protein:
  W:
  P_L:
  farinograph_absorption:
  stability:
  falling_number:
  damaged_starch:
  ash:
  particle_size:
  known_brand_product:
  measurement_method:
  confidence:
```

Campi sconosciuti restano sconosciuti. Non derivare automaticamente W dalle proteine e non trasformare W in ore di fermentazione.

Per l'integrale aggiungere:

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

La correzione d'acqua resta `Calc-C` finché non è calibrata sulla farina reale.

## 44.4 Fermentation model

Il modello non deve essere:

```text
lievito + temperatura + ore → pronto
```

ma almeno:

```text
GAS_PRODUCTION
× GAS_RETENTION
× STRUCTURAL_TOLERANCE
× THERMAL_HISTORY
× FERMENTATION_SYSTEM
→ OBSERVED_EXPANSION
```

Produzione di CO₂, espansione visibile e readiness sono grandezze diverse.

## 44.5 Yeast Profile e frigorifero

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

Il frigorifero non è un interruttore. Il motore deve conservare la storia termica:

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

La previsione domestica quantitativa resta `Calc-C` salvo calibrazione/sensori.

## 44.6 Prefermenti

Biga, poolish, pâte fermentée, sponge e altri prefermenti sono famiglie operative, non costanti universali.

```yaml
PREFERMENT_PROFILE:
  family:
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

Non hardcodificare formule del tipo:

```text
biga = sempre X% acqua e Y ore
poolish = sempre Z ore
```

## 44.7 Sourdough / licoli

Il lievito madre non è un ingrediente con coefficiente di conversione universale.

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

Regole:
- pH e TTA non sono sinonimi;
- attività, acidità e popolazione microbica possono cambiare nel tempo;
- nessuna equivalenza universale `grammi sourdough ↔ grammi lievito commerciale`;
- farina e acqua contenute nello starter sono invece contabilizzabili deterministically se composizione e peso sono noti;
- claim sanitari generici come “più digeribile per tutti” non vanno mostrati come fatti.

## 44.8 Mixing, riposi e rinforzi

Il mixing deve usare energia, temperatura e stato osservato, non minuti universali.

Ogni tecnica va descritta come:

```text
WHY
→ PHYSICAL CHANGE
→ WHEN USE
→ WHEN NOT USE
→ OBSERVABLE STOP CONDITION
```

Distinguere:
- riposo di idratazione;
- autolisi;
- fermentolisi;
- rest durante mixing;
- bulk;
- bench rest;
- proof.

Le pieghe sono rinforzi condizionali, non fase obbligatoria. `stretch-and-fold`, `coil fold`, `letter fold`, laminazione e altre tecniche vanno selezionate in base a struttura, stato e target.

## 44.9 Divisione, preforma e shaping

Separare sempre:

```text
DIVISION
→ optional PRESHAPE
→ optional BENCH REST
→ FINAL SHAPING
→ PROOF
```

La preforma è utile solo quando contribuisce al risultato; può essere inutile o dannosa in altri sistemi.

### Boule / bâtard
Obiettivo:
- organizzare la massa;
- costruire tensione superficiale sufficiente;
- mantenere integrità;
- controllare cucitura e gas in funzione del target.

### Baguette
Una baguette tecnica non è un “filone lungo”. Il profilo deve contenere:
- preforma;
- rilassamento;
- allungamento;
- sealing;
- tensione;
- proof;
- scoring;
- response in forno.

La cinematica precisa delle mani resta da validare visualmente.

### Ciabatta
Non è definita dalla sola idratazione. Il profilo deve gestire:
- impasto gas-rich e fragile;
- divisione;
- manipolazione ridotta;
- supporto ampio in trasferimento;
- limitazione delle pressioni localizzate.

### Pan bread
Il contenitore cambia il problema geometrico. Sono pertinenti:
- degasaggio controllato;
- moulding;
- pan fill;
- proof height;
- uniformità della mollica.

## 44.10 Bread Proof State

Eliminare `raddoppio = pronto` come regola universale.

```yaml
BREAD_PROOF_STATE:
  volume:
  lateral_spread:
  gas_activity:
  surface_tension:
  structural_stability:
  elasticity:
  relaxation:
  surface_condition:
  dough_temperature:
  touch_response:
  pH_optional:
  TTA_optional:
  scoring_compatibility:
  confidence:
```

Poke test, durata e volume possono essere segnali, non verdetti isolati.

## 44.11 Scoring

Lo scoring è un oggetto di processo:

```yaml
SCORING_PROFILE:
  required:
  geometry:
  proof_state:
  surface_tension:
  cut_direction:
  cut_count:
  angle:
  depth:
  overlap:
  expected_expansion_direction:
  evidence_level:
  visual_verification_status:
```

L'angolo o la profondità non devono diventare numeri universali. Devono essere style/product-specific e, per i gesti fini, sottoposti a micro-ricerca visuale.

## 44.12 Steam Profile

Il vapore è una storia di processo, non “aggiungi X mL”.

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

Effetti da modellare:
- condensazione;
- gelatinizzazione superficiale;
- gloss;
- colore;
- meccanica della crosta;
- espansione.

Sicurezza: non prescrivere versamento d'acqua su vetro, resistenze o parti del forno non previste dal costruttore.

## 44.13 Bread Baking Profile

La temperatura interna è un segnale utile, non un endpoint universale.

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

Il motore deve ragionare per storia termica e interazione tra conduzione, convezione, irraggiamento, evaporazione, gelatinizzazione e denaturazione.

## 44.14 Raffreddamento, staling e storage

Separare:

```text
COOL_ENOUGH_TO_CUT
COOL_ENOUGH_TO_PACKAGE
TEXTURAL_SHELF_LIFE
SENSORY_SHELF_LIFE
MICROBIOLOGICAL_SHELF_LIFE
```

Il raffreddamento è una fase attiva: migrazione dell'acqua, evaporazione e condensazione continuano dopo il bake.

La shelf life microbiologica non è derivabile dalla sola ricetta.

## 44.15 Tassonomia Focacce

`FOCACCIA` non è una singola tecnica. Distinguere almeno:

```text
PAN_LEAVENED_FOCACCIA
THIN_OILED_FLATBREAD
FILLED_THIN_SHEET
REGIONAL_PROTECTED_FOCACCIA
HIGH_HYDRATION_PAN_FOCACCIA
POTATO_CONTAINING_FOCACCIA
```

Questo impedisce di trasferire automaticamente dimpling, salamoia, proof in teglia o “open crumb” a ogni focaccia.

## 44.16 Focaccia di Recco col formaggio IGP

La specifica UE aggiornata nel 2025 impone una separazione ontologica netta:
- farina di frumento tenero;
- acqua naturale;
- EVOO;
- sale fino;
- formaggio fresco a pasta molle;
- lievito non elencato tra le materie prime prescritte;
- prodotto molto sottile, con altezza inferiore a 1 cm ai bordi;
- superficie e fondo con caratteristiche specifiche;
- requisiti geografici e di conformità propri.

Il prodotto va modellato come `FILLED_THIN_SHEET`, non come focaccia alveolata fermentata.

L'app deve distinguere:

```text
Focaccia di Recco col formaggio IGP
```

da:

```text
focaccia tipo Recco / ispirata alla Recco
```

quando i requisiti legali non sono soddisfatti.

## 44.17 Genovese, Barese, Romana, Schiacciata

### Genovese
È documentata una tradizione professionale/regionale, ma la ricerca non ha recuperato un testo tecnico primario completo e corrente sufficiente a hardcodificare:
- idratazione ufficiale;
- rapporto ufficiale di salamoia;
- spessore ufficiale;
- esatta cinematica del dimpling.

Questi valori restano `null`/configurabili finché la fonte primaria non è acquisita.

### Barese
Supportare varianti documentate. Patata, semola, pomodoro, olive e altri elementi non vanno trasformati in obblighi legali universali senza fonte primaria appropriata.

### “Focaccia romana”
Trattarla come nome ambiguo. La UI deve chiedere il risultato desiderato, ad esempio:
- sottile/croccante;
- alta/soffice;
- oleosa;
- alveolata;
- da farcire.

### Schiacciata
Anche `schiacciata` può richiedere disambiguazione regionale/tecnica invece di un singolo preset “autentico”.

## 44.18 Dimpling, salamoia e teglia

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

La forza in newton, profondità esatta e pattern delle dita non sono sufficientemente supportati per essere universalizzati.

La salamoia è un trattamento superficiale opzionale:

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

L'impasto che non arriva agli angoli non va automaticamente forzato. Il motore deve distinguere almeno:
- ritorno elastico/relaxation insufficiente;
- scarsa estensibilità;
- struttura degradata;
- proof troppo avanzato;
- attività insufficiente.

## 44.19 Compliance Profile

La conformità diventa una dimensione separata dal risultato sensoriale.

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
  source_id:
  source_url_optional:
  source_version:
  source_date:
  verified_on:
  review_due:
  supersedes_optional:
  compliance_possible_for_user:
```

Esempi da mantenere separati:
- Pane Toscano DOP;
- Pane di Altamura DOP;
- Pane di Matera IGP;
- Coppia Ferrarese IGP;
- Pane Casareccio di Genzano IGP quando il testo corrente è verificato;
- Focaccia di Recco col formaggio IGP.

Un prodotto domestico fuori area può essere “ispirato a”, ma non va presentato come conforme alla denominazione protetta.

**Baseline verificata 2026-10-18:** risultano registrati nelle fonti UE Pane di Altamura DOP, Pane di Matera IGP, Pane Toscano DOP, Pane Casareccio di Genzano IGP, Coppia Ferrarese IGP e Focaccia di Recco col formaggio IGP. Per hardcodificare vincoli tecnici occorre comunque collegare la specifica/documento unico corrente, non soltanto la registrazione del nome.

Per Focaccia di Recco col formaggio IGP il `SOURCE_RECORD` canonico deve puntare almeno alla comunicazione UE `C/2025/473` (`PGI-IT-0944-AM01`), verificata il 2026-10-18.

## 44.20 Calculation Engine Pane + Focacce

| Variabile | Classe | Decisione |
|---|---|---|
| baker's percentages | Calc-A | deterministico |
| scaling quantità | Calc-A | deterministico |
| farina/acqua starter | Calc-A | se composizione nota |
| flour blend | Calc-A | mass balance |
| prefermented flour % | Calc-A | deterministico |
| dough yield | Calc-A | deterministico |
| carico g/cm² dato un target | Calc-A | geometria |
| DDT/water temp | Calc-B output | formula Calc-A + friction factor calibrato |
| friction factor | Calc-B se calibrato; altrimenti Calc-C | macchina specifica |
| assorbimento da W/proteine | non-A | non derivare automaticamente |
| correzione acqua integrale | Calc-C | farina/crusca specifica; stato verificato con osservazioni |
| correzione acqua semola | Calc-C | granulometria/farina; stato verificato con osservazioni |
| dose lievito → orario | Calc-C | modello probabilistico |
| cold-retard rate | Calc-C | storia termica + lievito |
| equivalenza sourdough/lievito | non implementare | nessun coefficiente universale |
| maturità starter | Calc-D | osservazioni + misure |
| proof readiness | Calc-D | stato multivariato |
| numero pieghe | Calc-D | decisione osservazionale; evidenza separata Ev-F/G |
| scoring readiness | Calc-D | proof + tensione |
| bake time | Calc-B se calibrato; altrimenti Calc-C | forno/stile |
| shelf life testurale | Calc-B se calibrata; altrimenti Calc-C | dati necessari |
| shelf life microbiologica | non derivabile | validazione specifica |

## 44.21 Diagnostic Engine Pane + Focacce

Schema:

```text
PRODUCT
+ GRAIN SYSTEM
+ FORMULATION
+ FERMENTATION SYSTEM
+ PHASE
+ OBSERVED STATE
+ TEMPERATURE
+ TIME REMAINING
+ EQUIPMENT
→ CAUSES RANKED
→ DISCRIMINATING OBSERVATIONS
→ ACTION NOW
→ DO NOT
→ RECHECK
→ RECOVERABILITY
→ NEXT TIME
```

Esempi di discriminazione:

| Sintomo | Cause da distinguere | Azione prudente |
|---|---|---|
| molto appiccicoso | acqua, segale, integrale, sviluppo insufficiente, degradazione | non aggiungere farina automaticamente |
| rigido | poca acqua effettiva, crusca, semola, bassa T, tenacità | riposo/rivalutazione prima di correggere |
| non cresce | lievito, temperatura, starter, gas retention | distinguere produzione da ritenzione |
| cresce e collassa | over-proof, struttura, proteolisi | valutare recuperabilità e fase successiva |
| si allarga | debolezza o proof avanzato | non diagnosticare dal diametro solo |
| torna indietro | elasticità/relaxation | riposo se compatibile con lo stato |
| si strappa | estensibilità bassa o degradazione | distinguere il tipo di rottura |
| taglio non apre | proof, pelle, tensione, scoring, forno | non accusare automaticamente la lama |
| esplode lateralmente | guida espansione/proof/crosta precoce | correggere sistema |
| mollica gommosa | bake history, acqua, amido, cooling | non usare core temp come unica causa |
| focaccia non si estende | relaxation/farina/T | pausa e rivalutazione |
| focaccia collassa | proof/struttura/manipolazione | ridurre manipolazione, stimare recuperabilità |

## 44.22 Data model consolidato

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

`BAGUETTE`, `CIABATTA`, `PANE_TOSCANO_DOP`, ecc. sono configurazioni/profili, non classi hardcoded separate salvo proprietà realmente uniche.

## 44.23 UX Pane + Focacce

Modalità principiante:

```text
Cosa vuoi preparare?
→ Pane / Focaccia
→ Quale famiglia?
→ Che risultato vuoi?
→ Che farina hai?
→ Quanto tempo hai?
→ Che forno/supporto hai?
```

Non chiedere W, TTA o Falling Number come requisito iniziale.

Modalità avanzata può aprire:
- W/P-L;
- proteine;
- assorbimento;
- Falling Number;
- ceneri;
- particle size;
- preferment;
- starter pH/TTA;
- DDT;
- friction factor;
- thermal history;
- steam;
- support temperature.

## 44.24 Specifiche visuali e stato di evidenza

Il motore può già definire `WHY`, contatto, direzione della forza, target e stop condition, ma deve mantenere `visual_verification_status: REQUIRED` per:
- baguette final shape;
- baguette scoring;
- boule/bâtard shaping;
- ciabatta transfer;
- pan bread moulding;
- dimpling stile-specifico;
- focacce regionali.

Questo è un vincolo di qualità, non una lacuna da nascondere.

## 44.25 Food safety

- Farina cruda: non assaggiare impasto crudo.
- Vapore: non prescrivere pratiche non compatibili col manuale del forno.
- Cooling/packaging: non confondere texture con sicurezza microbiologica.
- Conservazione: non promettere giorni di sicurezza derivandoli dalla sola ricetta.

## 44.26 Assumption audit Pane + Focacce

| Affermazione | Esito |
|---|---|
| W = ore di fermentazione | REJECTED |
| W più alto = pane migliore | REJECTED |
| Integrale = bianco + acqua | REJECTED |
| Crusca più fine = sempre meglio | REJECTED |
| Segale = frumento debole | REJECTED |
| Duro = tenero più forte | REJECTED |
| Sourdough sempre più digeribile | UNSUPPORTED come claim generale |
| Più acido = migliore | REJECTED |
| Più lievito = stesso pane più veloce | REJECTED |
| Più acqua = più alveoli | REJECTED come causalità unica |
| Più pieghe = più forza | UNSUPPORTED universalmente |
| Autolisi obbligatoria | UNSUPPORTED |
| Windowpane universale | REJECTED |
| Mai degassare | REJECTED |
| Più tensione = shaping migliore | REJECTED |
| Raddoppio = pronto | REJECTED |
| Poke test infallibile | UNSUPPORTED |
| Scoring sempre necessario | REJECTED |
| Più vapore = meglio | REJECTED |
| Core temperature unica = cotto | REJECTED |
| Tutte le focacce usano salamoia | REJECTED |
| Tutte le focacce sono lievitate | REJECTED |
| Lunga fermentazione = migliore | REJECTED come assoluto |

## 44.27 Esperimenti di calibrazione prioritari

| Esperimento | Variabile | Misure | Obiettivo |
|---|---|---|---|
| Integrale | granulometria/preidratazione | acqua, sviluppo, volume, crumb | `BRAN_PROFILE` |
| Segale | quota × acidificazione | pH/TTA, viscosità, volume, gummy crumb | transizione strutturale |
| Semola | granulometria × acqua | sviluppo, estensibilità, volume | calibrare duro |
| Lievito | dose × temperatura | tempo, volume, gas retention | fermentation model |
| Frigo | massa × recipiente × T | curva T interna | `THERMAL_HISTORY` |
| Sourdough | inoculo × maturità | pH/TTA/volume/time | confidence model |
| Mixing | energia × T finale | estensione/volume | stop conditions |
| Pieghe | 0/1/2/... | handling/volume/crumb | decisione osservazionale |
| Proof | stati differenti | oven spring/scoring/volume | `BREAD_PROOF_STATE` |
| Steam | profili sicuri | gloss/crust/expansion | `STEAM_PROFILE` |
| Forno | supporto × setpoint × posizione | support T/bake loss/colore | `OVEN_PROFILE` |
| Focaccia | g/cm² × proof | altezza/crumb/fondo | pan-family calibration |
| Dimpling | momento × intensità | collasso/pattern/crumb | gesto state-dependent |
| Salamoia | quantità/area | superficie/fondo/texture | stile-specifico |

Foto standardizzate, temperatura impasto/ambiente, pesi pre/post bake e repliche sono obbligatori se i dati devono diventare calibrazione del motore.

## 44.28 Gap residui

Non serve un'altra mega-Deep-Research generale su Pane + Focacce.

Restano:
1. micro-ricerca visuale ad alta priorità;
2. fonti regionali primarie per Genovese/Barese;
3. calibrazione quantitativa PizzaMaker;
4. verticale gluten-free separata solo se entrerà nel perimetro.

## 44.29 Decisione di progetto

La verticale Pane + Focacce è sufficientemente matura per sostituire la bozza precedente e per far evolvere il Manuale verso v2.0.

La v1.7 è il consolidamento auditato pre-v2.0: non esiste più una lacuna scientifica verticale generale bloccante per **Pizza + Pane/Focacce + Buns/Enriched**.

Prima della v2.0 restano soprattutto:
- Visual Gesture Research Pack;
- audit di coerenza/deduplicazione finale;
- calibrazioni sperimentali;
- versionamento delle fonti normative regionali.

---

# 45. Verticale Buns + Impasti arricchiti — integrazione Deep Research

Questa sezione sostituisce l'integrazione provvisoria precedente, che derivava dal draft `PizzaMaker_Ricerca_Verticale_Buns_Impasti_Arricchiti_v1.0.md`.

La nuova base è il rapporto **“PizzaMaker — Ricerca verticale Deep Research su Buns e Impasti Arricchiti”**. Il draft resta utile come storico progettuale, ma non è più la fonte primaria per questa verticale.

## 45.1 Decisione architetturale

La conclusione centrale è confermata, ma con maggiore rigore: un enriched dough non è correttamente modellabile come “pane normale + latte/uova/burro/zucchero”.

Il dominio deve separare:

```text
COMPOSIZIONE
+
FUNZIONE TECNOLOGICA
+
STATO DEL PROCESSO
```

La massa d'acqua contenuta negli ingredienti è un dato compositivo calcolabile quando la composizione è nota; il suo effetto reologico non è automaticamente equivalente all'acqua aggiunta. Di conseguenza `hydration` resta utile ma non sufficiente.

## 45.2 Registro compositivo e profilo funzionale

Sostituire l'idea troppo semplice di `LIQUID_CONTRIBUTION` come pseudo-idratazione con due livelli:

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

PizzaMaker può calcolare in modo deterministico i contributi compositivi noti, ma non deve trasformarli automaticamente in una singola `effective_hydration` universale.

## 45.3 Tassonomia prodotto

Il nome commerciale non deve coincidere automaticamente con formula, standard legale o target tecnico.

Profili minimi consigliati:

```text
soft_roll
sandwich_bun_round
sandwich_bun_elongated
rich_enriched_bread
soft_bun_with_potato_profile
soft_pan_bread
pullman_pan_bread
pain_de_mie_profile
soft_sandwich_bread
```

Mappature principali:

```text
milk bun            -> soft_roll + dairy_profile
hamburger bun       -> sandwich_bun_round
hot dog bun         -> sandwich_bun_elongated
brioche bun         -> sandwich_bun_round + high enrichment
rich brioche        -> rich_enriched_bread
potato bun          -> soft_bun + potato_profile
Shokupan            -> soft_pan_bread + pan geometry
Japanese milk bread -> source-tagged commercial/technical profile
Pullman             -> pan geometry/process profile
pain de mie         -> French pan-bread profile
dinner roll         -> soft_roll
```

Non assumere `Shokupan = Tangzhong obbligatorio`, `brioche bun = brioche ricca resa tonda`, `potato bun = potato flour bun` o `milk bun = percentuale fissa di latte`.

## 45.4 Target strutturali

I target interni PizzaMaker restano validi come ontologia progettuale, non come standard scientifici universali:

```text
soft_fine_uniform
soft_medium_uniform
elastic_soft
compressible_bun
feathery_shreddable
rich_tender
potato_moist
```

```yaml
SOFT_BREAD_TARGET:
  crumb_target:
  crust_target:
  compressibility:
  resilience:
  sliceability:
  tear_resistance:
  topping_resistance:
  moisture_retention:
  next_day_softness:
  target_geometry:
```

Il miglior hamburger bun non coincide con la massima morbidezza possibile: deve anche tollerare taglio, farcitura, compressione e umidità.

## 45.5 Farina

Non esiste un valore universale di W, proteine o “Manitoba” valido per burger bun, brioche o Shokupan.

```yaml
FLOUR_PROFILE:
  protein_pct_optional:
  W_optional:
  P_L_optional:
  damaged_starch_optional:
  absorption_optional:
  flour_type:
  blend_components_optional:
  source:
  confidence:
```

Rimuovere le regole assolute `W alto = più burro`, `brioche richiede sempre farina forte`, `burger bun richiede Manitoba`, `Shokupan richiede sempre farina molto forte`.

## 45.6 Zucchero e fermentazione osmotica

Lo zucchero ha effetti simultanei su substrato fermentativo, pressione osmotica, water activity, reologia, gelatinizzazione, browning, texture e shelf life.

Più zucchero non significa necessariamente fermentazione più rapida.

Il motore può calcolare `added_sugar_bakers_pct` e `total_known_sugars_g`, ma non deve produrre senza calibrazione `osmotic_penalty` o `proof_time_multiplier`.

Non esiste una soglia scientifica universale oltre la quale “serve” automaticamente lievito osmotollerante: la scelta deve dipendere dal profilo reale del lievito e, quando disponibile, dalla guidance del produttore.

## 45.7 Yeast Profile

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

Ceppi e prodotti commerciali possono comportarsi diversamente; la conversione fresco/secco non è una costante biologica assoluta e `più lievito = stesso risultato più velocemente` non è una legge generale.

## 45.8 Grassi e stato fisico

`butter != oil`.

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

Stato fisico e natura della fase lipidica possono modificare gas cells e reologia. Non generalizzare però il comportamento di shortening industriale a ogni brioche.

La strategia “sviluppo iniziale → burro progressivo” è professionalmente valida in molti impasti ricchi, ma non universale: l'ordine di aggiunta appartiene a `MIXING_PROFILE`.

## 45.9 Dairy Profile

```yaml
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

Latte, whey, latte in polvere e panna non sono equivalenti e possono produrre effetti differenti su reologia, browning, volume, mollica e fermentazione.

## 45.10 Egg Profile

```yaml
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

Uovo intero, tuorlo, albume e lecitina non sono equivalenti. Non convertirli in una semplice correzione d'idratazione.

## 45.11 Tangzhong, Yudane, scald e amidi pregelatinizzati

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

Regole: `Tangzhong 5%` non è una legge universale; Tangzhong e Yudane non sono sinonimi perfetti; più amido gelatinizzato non implica automaticamente maggiore volume; benefici su softness/moisture/staling possono coesistere con minore gas retention o volume in alcuni sistemi.

## 45.12 Potato Profile

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

Prima di correggere l'acqua bisogna conoscere la forma dell'ingrediente. Non esiste un coefficiente acqua-patata universale.

## 45.13 Mixing State

I minuti di impastamento non sono trasferibili tra mano, planetaria, spirale e sistemi industriali.

```text
START STATE
→ incorporation
→ structure development
→ enrichment incorporation
→ final development
→ TARGET STATE
```

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

Il `windowpane` è un'osservazione utile, non un endpoint universale.

## 45.14 FERMENTATION_MODEL_ENRICHED

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

La temperatura ambiente resta un override opzionale e non va inferita da data, geolocalizzazione o meteo.

La dose di lievito può essere stimata euristicamente con confidence; la previsione enriched non è ancora abbastanza robusta per un modello deterministico generale. Il cold retard è uno strumento di processo, non un upgrade automatico di qualità.

## 45.15 Divisione, rounding, bench rest e moulding

```text
DIVIDE
→ ROUND / PRESHAPE
→ RELAX
→ FINAL MOULD / SHAPE
```

Le fasi devono restare separate perché hanno scopi fisici differenti, ma non sono obbligatorie per ogni small roll.

## 45.16 Burger bun shaping

```yaml
BUN_SHAPING_PROFILE:
  family: sandwich_bun_round
  preshape:
  intermediate_rest:
  degassing_target:
  flattening:
  target_surface_tension:
  target_diameter:
  target_height:
  pan_or_sheet:
```

La geometria può richiedere redistribuzione deliberata del gas: `non degassare mai` è una regola errata. La cinematica manuale precisa resta da validare con micro-ricerca visuale.

## 45.17 Hot-dog bun shaping

```yaml
HOT_DOG_MOULD_PROFILE:
  preshape:
  relaxation:
  elongation_method:
  target_length:
  target_width:
  seam_orientation:
  end_profile:
  recoil_check:
```

L'industria usa operazioni specifiche di moulding per la geometria allungata; il gesto domestico non va presentato come univoco finché non viene completata la micro-ricerca visuale.

## 45.18 Brioche shaping

La gestione dipende da stato della fase grassa, temperatura dell'impasto, grado di arricchimento, adesività, surface tension e geometria. Una brioche che inizia a smear/ungere non va trattata automaticamente come semplice “mancanza di farina”.

## 45.19 Shokupan / soft pan bread moulding

La sequenza contemporanea `divide → round → bench rest → sheet/fold/roll → pan placement` può essere supportata, ma non deve essere presentata come definizione normativa universale di `食パン`.

Numero di pezzi, coil count e geometria finale appartengono a `PAN_PROFILE` / `SHAPING_PROFILE`.

## 45.20 Enriched proof state

```yaml
ENRICHED_PROOF_STATE:
  volume_change:
  height:
  diameter:
  lateral_spread:
  gas_distribution:
  touch_response:
  skin_condition:
  fat_state:
  dough_temperature_optional:
  pan_reference_height_optional:
  confidence:
```

Il proof non deve usare soltanto `raddoppio` come endpoint universale.

## 45.21 Surface finish

```yaml
SURFACE_FINISH_PROFILE:
  wash:
    none
    whole_egg
    yolk
    white
    milk
    cream
    water
    starch_based
    custom
  seed_topping:
  post_bake_fat:
  target_gloss:
  target_browning:
  target_crust_softness:
  adhesion_target:
```

Egg wash non è obbligatorio: la scelta dipende da target di colore, gloss, softness, adesione dei semi e formulazione.

## 45.22 Enriched Baking Profile

```yaml
ENRICHED_BAKING_PROFILE:
  piece_mass:
  geometry:
  formula_sugar:
  dairy_load:
  egg_load:
  fat_load:
  surface_finish:
  oven_setpoint:
  convection:
  top_heat:
  pan_or_sheet:
  support_position:
  bake_loss_optional:
  color_target:
  crumb_set_target:
```

Zucchero, latticini, uova e wash possono accelerare il browning. Non usare una temperatura interna unica, un tempo universale o il colore esterno come unico endpoint.

## 45.23 Cooling e packaging

```yaml
COOLING_STATE:
  rack_or_pan:
  surface_dryness:
  residual_heat:
  condensation_risk:
  crumb_set:
  package_ready:
```

Confezionare troppo caldo può favorire condensa e modificare texture e rischio microbiologico.

## 45.24 Shelf life: separazione obbligatoria

```yaml
TEXTURAL_SHELF_LIFE:
  softness_target:
  firmness_change:
  moisture_migration:
  retrogradation_risk:
  storage_temperature:
  packaging:
  freezing_profile_optional:

MICROBIOLOGICAL_SHELF_LIFE:
  validated_duration_optional:
  product_aw_optional:
  pH_optional:
  preservatives_optional:
  packaging_atmosphere_optional:
  post_bake_contamination_control:
  storage_temperature:
  validation_required: true
```

PizzaMaker non deve promettere una shelf life microbiologica sicura senza dati e validazione specifici. Shelf life sensoriale e microbiologica sono oggetti diversi.

## 45.25 Diagnostic Engine enriched

Input:

```text
PRODUCT + PHASE + ENRICHMENT + STATE + TEMPERATURE + TIME REMAINING + EQUIPMENT
```

Output:

```text
CAUSES RANKED → DISCRIMINATING OBSERVATIONS → ACTION NOW → DO NOT → RECHECK → RECOVERABILITY → NEXT TIME
```

Coprire almeno: greasy, sticky, won't develop, overheated, butter leaking, tearing, too firm, fermentation very slow/fast, low volume, collapse, recoil, seam opens, bun too tall/flat, hot-dog shortening, brioche smearing, proof spread/skin/weakness, uneven buns, dark outside/raw inside, pale, dry, gummy, side collapse, wrinkled crust e poor volume.

## 45.26 Calculation Engine enriched

Distinguere la **classe di calcolabilità** dalla **classe di evidenza**.

Deterministico: baker percentages, ingredient scaling, known composition ledger, total dough mass, known water/fat/sugar/protein grams.

Empirico/calibrabile: yeast dose, osmotolerant correction, proof-time prediction, target diameter from mass, bake time, cooling-to-pack window.

Osservazionale/state-based: proof readiness, mixing endpoint, shaping readiness, package-ready state.

Non prevedibile in modo affidabile senza dati specifici: microbiological shelf life, universal next-day softness score, exact osmotic penalty, exact potato water correction, universal starch-gel optimum.

## 45.27 Data model enriched consolidato

```text
ENRICHMENT_PROFILE
COMPOSITION_LEDGER
FUNCTIONAL_EFFECT_PROFILE
DAIRY_PROFILE
EGG_PROFILE
FAT_PROFILE
YEAST_PROFILE
STARCH_GEL_PROFILE
POTATO_PROFILE
SOFT_BREAD_TARGET
BUN_SHAPING_PROFILE
HOT_DOG_MOULD_PROFILE
SURFACE_FINISH_PROFILE
TEXTURAL_SHELF_LIFE
MICROBIOLOGICAL_SHELF_LIFE
ENRICHED_BAKING_PROFILE
ENRICHED_PROOF_STATE
MIXING_STATE
FERMENTATION_CONTEXT
COOLING_STATE
```

## 45.28 Evidence status dei gesti visuali

La Deep Research supporta bene divisione, rounding, intermediate proof e moulding come fasi separate, la geometria industriale burger/hot-dog e la gestione della temperatura negli impasti ricchi.

È meno forte sulla cinematica manuale precisa di flattening hamburger bun, elongation hot-dog bun, numero/ordine preciso dei roll Shokupan e alcune varianti di brioche. Questi elementi vanno marcati come micro-ricerca visuale, non trasformati in gesti “scientificamente provati”.

## 45.29 Audit del draft v1.0

### CONFIRMED

Enriched dough come dominio distinto; latte ≠ acqua; burro ≠ olio; egg components distinti; potato form esplicita; starch-gel profile; shaping/proof/baking/shelf-life come profili dedicati; separazione target prodotto/formula; diagnostica state-based.

### MODIFIED

`LIQUID_CONTRIBUTION` → `COMPOSITION_LEDGER` + `FUNCTIONAL_EFFECT_PROFILE`; ruolo dei cristalli di grasso valido ma non generalizzabile a ogni burro/brioche; osmotolerant yeast non soglia universale; conversioni lievito product-specific quando possibile; Tangzhong/Yudane con meccanismo confermato ma terminologia meno standardizzata; ordine del burro condizionale; Shokupan moulding come metodo supportato ma non definizione autentica obbligatoria.

### REJECTED

`più zucchero = lievita più`; scaling semplice `più lievito = stesso risultato in meno tempo`; coefficiente universale acqua-patata; optimum universale Tangzhong/Yudane; endpoint proof = raddoppio.

### UNSUPPORTED / NON CHIUSO

Cinematica manuale precisa dei bun come unica tecnica corretta; previsione quantitativa universale della fermentazione enriched; universalizzazione dei tempi di impastamento; shelf life microbiologica senza validazione; singolo W universale per famiglia prodotto.

### NEW FINDING

Separazione composizione/funzione tecnologica; status normativo/commerciale distinto dalla tassonomia tecnica; due shelf-life models; ruolo della contaminazione post-bake e del packaging; forte dipendenza da ceppo/prodotto commerciale del lievito; maggiore cautela su starch-gel e volume.

## 45.30 Gap residui

Implementabile ora: tassonomia, data model enriched, composition ledger, ingredient profiles, proof/mixing states, surface finish, baking profile, diagnostic framework, UX progressive disclosure, evidence/confidence registry.

Richiede altra ricerca mirata: parametri quantitativi per specifici profili commerciali, alcune relazioni formula→geometry, eventuali standard nazionali non consolidati.

Richiede micro-ricerca visuale: burger flattening, hot-dog elongation manuale, brioche variants, Shokupan moulding dettagliato, pull-apart/dinner roll gesture.

Richiede esperimenti PizzaMaker: lievito×zucchero×temperatura, butter state×mixing, starch gel×softness/volume, potato form×acqua×volume, bun mass×diameter×height, bake profile×color/core, cooling/packaging×texture.

Non prevedibile bene senza misure/sensori: actual dough temperature, refrigerator thermal history, exact proof trajectory, real oven heat transfer.

Richiede validazione microbiologica: shelf life sicura, packaging-atmosphere claims, durata a temperatura ambiente per prodotti specifici.

## 45.31 Decisione di progetto dopo la Deep Research

La verticale Buns + Enriched è abbastanza solida per essere integrata nel dominio universale, ma non va dichiarata “completamente chiusa”.

Le aree mature sono sufficienti per ontology/domain model, process state machine, calculation registry con confidence, diagnostic engine, evidence registry, UX principiante/avanzata e backlog sperimentale.

La verticale Pane + Focacce ha ricevuto lo stesso trattamento Deep Research ed è consolidata nella v1.7.

Il passaggio successivo è quindi il **Manuale Universale v2.0 consolidato**, preceduto soltanto da audit di coerenza/deduplicazione e dal Visual Gesture Research Pack. Il consolidamento dovrà: separare universal core e product-specific profiles; definire la state machine universale; chiudere calculation registry A/B/C/D; chiudere diagnostic registry; collegare ogni regola al livello di evidenza; mantenere un backlog esplicito di micro-ricerche, misure ed esperimenti.

---

# 46. Rapporto Deep Research — Buns + Impasti arricchiti

Il rapporto integrale è stato spostato in `PizzaMaker_Evidence_Appendix_v1.0.md` per separare la **specifica canonica** dalla provenance.

La sezione 45 resta la sintesi normativa da usare per il prodotto.

---

# 47. Rapporto Deep Research — Pane + Focacce

Il rapporto integrale è stato spostato in `PizzaMaker_Evidence_Appendix_v1.0.md`.

La sezione 44 resta la sintesi normativa da usare per il prodotto.

**Gap di provenance P1:** il testo del rapporto disponibile dichiara un corpus di circa sessanta fonti, ma non contiene la bibliografia completa prevista dal mandato. La chiusura del `SOURCE_REGISTRY` Pane + Focacce resta un gate pre-v2.0.

---

# 48. Gate di consolidamento verso v2.0 — stato audit v1.7

La v1.7 chiude l'audit strutturale della knowledge base. Non serve una nuova mega-ricerca verticale generale per Pizza + Pane/Focacce + Buns/Enriched.

| Gate | Stato | Decisione |
|---|---|---|
| Deduplicazione canonica | **PASS** | report/mandati esternalizzati; modello dati ed evidence taxonomy unificati |
| Separazione Calc/Evidence | **PASS** | `Calc-A…D` e `Ev-A…H` indipendenti |
| Compliance baseline | **PASS con refresh periodico** | profili UE principali verificati; source/version/date obbligatori |
| Calibration Registry | **PASS struttura / OPEN dati** | schema pronto; valori sperimentali da raccogliere |
| Source Registry Pane + Focacce | **OPEN — P1 provenance** | il rapporto disponibile non contiene la bibliografia completa promessa |
| Visual Gesture Research Pack | **OPEN — P1 UX/istruzioni** | chiudere i gesti con `visual_verification_status: REQUIRED` prima di renderli normativi/animati |

## 48.1 Implementabile adesso
- ontologia e profili prodotto;
- state machine universale;
- calculation registry con classi/limiti;
- diagnostic engine con confidence;
- evidence/compliance/calibration registry;
- UX con progressive disclosure;
- profili forno, vapore, cooling e storage;
- verticali Pizza, Pane/Focacce e Enriched nelle parti non dipendenti da gesture fini.

## 48.2 Non definitivo finché i gate restano aperti
- nessuna gesture `REQUIRED` va presentata come tecnica unica corretta;
- Pane + Focacce non deve vantare una bibliografia completamente tracciata finché il `SOURCE_REGISTRY` non è chiuso;
- i parametri sperimentali PizzaMaker restano versionati e con uncertainty/confidence.

## 48.3 Decisione release documentale
**v1.7 è la base canonica pre-v2.0.**

La v2.0 potrà essere dichiarata consolidata quando:
1. il `SOURCE_REGISTRY` Pane + Focacce sarà chiuso o il rapporto originale completo sarà recuperato;
2. il Visual Gesture Research Pack avrà chiuso i gesti P1 oppure li avrà esplicitamente esclusi dallo scope v2.0.

La calibrazione sperimentale può proseguire dopo v2.0 purché ogni parametro resti versionato e con confidence esplicita.

