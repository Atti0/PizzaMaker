# PizzaMaker / Teglia Coach — Specifica funzionale v2

Data: 2026-09-27  
Stato: specifica prodotto prima del redesign  
Repository: `Atti0/PizzaMaker`

## 1. Obiettivo del prodotto

Teglia Coach deve diventare un assistente pratico per pizza in teglia domestica, non un semplice calcolatore di percentuali.

L'utente deve riuscire a:

1. decidere che tipo di pizza in teglia vuole ottenere;
2. pesare gli ingredienti corretti per la sua teglia;
3. sapere quando fare ogni passaggio;
4. correggere l'impasto quando qualcosa va storto;
5. cuocere nel forno di casa evitando fondo pallido, parte superiore bagnata o pizza troppo alta.

La promessa del prodotto non è “ricetta perfetta universale”, ma:

> Ti guida con dosi, tempi e correzioni pratiche per fare una pizza in teglia riuscita nel tuo forno di casa.

## 2. Principi di dominio pizza

### 2.1 Famiglie di risultato

Il prodotto deve distinguere in modo comprensibile le principali famiglie della pizza romana in teglia:

- **Romana classica**: bassa, croccante, più asciutta.
- **Romana contemporanea**: più alveolata, circa 1 cm, ben cotta sotto, croccante sopra, soffice dentro.
- **Extra croccante domestica**: pensata per forno di casa, carico impasto più basso e cottura più aggressiva sotto.
- **Più soffice / focacciosa**: carico impasto più alto, meno orientata alla croccantezza.

Nel codice i valori tecnici possono restare in g/cm², ma l'interfaccia deve parlare prima in linguaggio utente.

### 2.2 Linee guida tecniche consolidate

- Alta idratazione e lunga lievitazione sono caratteristiche ricorrenti nella teglia romana moderna.
- L'obiettivo sensoriale non è solo “morbida”, ma equilibrio: croccante fuori/sotto, soffice dentro.
- La quantità di impasto per cm² è una leva fondamentale per evitare pizze troppo alte o troppo sottili.
- Nel forno domestico, la cottura va guidata più della formula: preriscaldo reale, ripiano basso, condimenti asciutti, mozzarella solo alla fine.
- L'app deve dire chiaramente che farina, temperatura ambiente, frigo, forno e manualità possono cambiare il risultato.

## 3. Utenti principali

### Utente A — Domestico pratico

Sa cucinare ma non ragiona in percentuali panificatorie. Vuole sapere cosa pesare e cosa fare.

Priorità:
- pochi campi;
- default sensati;
- istruzioni brevi;
- output leggibile da telefono mentre cucina.

### Utente B — Appassionato in crescita

Conosce idratazione, sale, farina forte, frigo, pieghe. Vuole controllo.

Priorità:
- opzioni avanzate;
- percentuali modificabili;
- diagnosi dettagliata;
- salvataggio preferenze.

### Utente C — In crisi durante la preparazione

Ha già impastato e qualcosa non torna.

Priorità:
- “cosa faccio ora?”;
- diagnosi rapida;
- meno teoria;
- azione immediata.

## 4. Architettura funzionale v2

La home deve diventare task-based, non una pagina con tutti i campi subito.

### Home proposta

Titolo: **PizzaMaker**  
Sottotitolo: **Teglia Coach**

Azioni principali:

1. **Calcola un nuovo impasto**
2. **Ho già un impasto**
3. **Guida stesura e cottura**
4. **Risolvi un problema**

A fondo pagina:
- Privacy;
- Salva/Reset preferenze;
- eventuale link “Modalità avanzata”.

## 5. Flusso 1 — Calcola un nuovo impasto

### 5.1 Step 1: Teglia

Campi:
- larghezza teglia;
- altezza teglia;
- numero teglie.

Default:
- 37 × 26 cm;
- 1 teglia.

Feedback immediato:
- area teglia;
- peso impasto stimato per teglia.

### 5.2 Step 2: Risultato desiderato

Opzioni utente:

| Label UI | Valore tecnico iniziale |
|---|---:|
| Extra croccante | 0,48 g/cm² |
| Romana classica | 0,50 g/cm² |
| Bassa-media equilibrata | 0,54 g/cm² |
| Romana contemporanea | 0,58 g/cm² |
| Più soffice | 0,65 g/cm² |

Il valore tecnico può restare visibile in piccolo solo in modalità avanzata.

### 5.3 Step 3: Quando vuoi cuocere

Campi:
- inizio impasto;
- inizio cottura.

Output automatico:
- durata totale;
- metodo: in giornata, intermedio, giorno dopo/frigo, lunga maturazione;
- lievito fresco consigliato.

Non reintrodurre la scelta manuale “in giornata / 24h”.

### 5.4 Step 4: Farina

Modalità base:

- farina comune da supermercato;
- farina per pizza/focaccia;
- farina forte/lunga lievitazione;
- tipo 1/2/integrale o mix speciale.

Modalità avanzata:

- tipo farina: 00 / 0 / 1 / 2 / integrale;
- proteine per 100 g;
- presenza di lievito madre secco o farine speciali;
- idratazione manuale.

Regola UX:
- l'app non deve chiedere “assorbimento stimato”.
- l'app deve dire: “parti da questa acqua, tienine 5–10 g da parte e aggiungila solo se serve”.

### 5.5 Step 5: Sale

Modalità base:
- standard;
- condimento sapido;
- lunga lievitazione/caldo.

Modalità avanzata:
- percentuale sale personalizzata.

Default consigliato:
- 2,3% standard;
- 2,0–2,2% per lardo, salumi, acciughe, capperi, formaggi molto sapidi;
- 2,4–2,5% per impasti lunghi/caldo/struttura.

### 5.6 Output finale

L'output deve essere diviso in 3 blocchi grandi:

#### Cosa pesare

- farina;
- acqua;
- sale;
- olio;
- lievito fresco;
- eventuale miele solo se utile.

#### Cosa fare adesso

Esempio:

- Mescola farina, lievito e quasi tutta l'acqua.
- Copri e riposa 20 minuti.
- Alle 14:20 aggiungi sale e olio.

#### Prossimo step

Mostrare il prossimo step con orario grande.

Esempio:

> Prossimo step: 14:20 — sale + olio.

## 6. Flusso 2 — Ho già un impasto

Questo deve diventare un flusso centrale, non una sezione secondaria.

Input:

1. Dove si trova l'impasto?
   - in frigo;
   - a temperatura ambiente;
   - già in teglia.

2. Com'è?
   - poco cresciuto;
   - gonfio e stabile;
   - triplicato ma bello;
   - collassante;
   - rigido;
   - molle/appiccicoso;
   - si strappa.

3. Quanto manca alla cottura?
   - meno di 1 ora;
   - 1–3 ore;
   - 3–6 ore;
   - più di 6 ore.

Output:
- azione immediata;
- cosa non fare;
- tempo di attesa consigliato;
- eventuale piano di salvataggio.

Esempi di regole:

- Triplicato ma bello + 1–3 ore: niente pieghe, stesura delicata, riposo in teglia accorciato.
- Collassante + meno di 1 ora: stendi quasi subito, riposo breve, cuoci.
- Collassante + più di 6 ore: piega di salvataggio morbida e frigo.
- Rigido: copri, aspetta, non forzare la stesura.
- Si strappa dopo olio: stop, copri, riposo; non fare pieghe aggressive.

## 7. Flusso 3 — Guida stesura e cottura

### 7.1 Stesura

Contenuti minimi:

- semola sul banco;
- lato liscio sopra;
- polpastrelli dal centro verso l'esterno;
- non schiacciare il bordo in modo aggressivo;
- se si ritira, pausa 5–10 minuti;
- completare in teglia senza strappare.

Asset visivo utile:
- immagine/mini-sequenza “centro → bordi → trasferimento”.

### 7.2 Cottura margherita

Regole:

- pomodoro denso;
- non eccedere con liquidi;
- prima fase con solo pomodoro o base leggera;
- mozzarella scolata e messa alla fine;
- ventilato/grill solo come rifinitura breve se serve.

### 7.3 Cottura bianca patate/lardo

Regole:

- patate sottilissime;
- asciugatura importante;
- condimento patate prima della cottura;
- lardo fuori forno o ultimi secondi;
- se patate spesse, pretrattamento/sbollentatura o taglio più sottile.

## 8. Flusso 4 — Risolvi un problema

Problemi da supportare in v2:

1. pizza troppo alta;
2. pizza troppo bassa/dura;
3. fondo pallido;
4. fondo bruciato;
5. sopra bagnata;
6. mozzarella acquosa;
7. patate crude;
8. alveolatura assente;
9. impasto appiccicoso ingestibile;
10. impasto collassato;
11. impasto che si ritira;
12. impasto che si strappa.

Per ogni problema servono:

- cause probabili;
- cosa fare ora;
- cosa cambiare la prossima volta.

## 9. Keep / Change / Remove

### Keep

- calcolo da teglia e numero teglie;
- data/ora impasto e cottura;
- sale modificabile;
- idratazione automatica + manuale;
- localStorage solo per preferenze tecniche;
- privacy informativa;
- app statica senza backend.

### Change

- prima schermata da form tecnico a home task-based;
- risultato da tabella unica a blocchi “pesare / fare ora / prossimo step”;
- diagnosi da tab secondaria a flusso “Ho già un impasto”;
- stile pizza da g/cm² a nomi comprensibili;
- cottura più granulare per tipo pizza;
- modalità avanzata per percentuali e proteine.

### Remove or hide

- dati tecnici visibili subito;
- spiegazioni lunghe nella schermata principale;
- opzioni che richiedono conoscenze non realistiche;
- qualunque funzione social/login/cloud in questa fase;
- video pesanti prima di avere immagini utili.

## 10. Piano media: immagini e video

### Fase A — immagini prima dei video

Produrre prima immagini statiche esplicative, perché sono più leggere, più facili da integrare, più adatte a GitHub Pages e più controllabili.

Asset prioritari:

1. impasto grezzo dopo mescola iniziale;
2. impasto dopo primo riposo;
3. piega leggera in ciotola;
4. stesura con polpastrelli dal centro;
5. trasferimento in teglia;
6. margherita in due fasi;
7. patate/lardo: disposizione corretta;
8. confronto fondo pallido vs fondo cotto;
9. impasto troppo rigido vs giusto;
10. impasto collassato.

### Fase B — video solo se utili

Massimo 3 micro-video, 6–10 secondi, senza audio obbligatorio:

1. piega leggera;
2. stesura;
3. uscita forno + griglia.

Non integrare video lunghi o decorativi.

## 11. Requisiti UI

- Mobile-first.
- Pulsanti grandi, usabili con mani sporche/infarinate.
- Informazioni tecniche in secondo livello.
- Step immediato sempre visibile quando l'utente ha calcolato la ricetta.
- Contrasto alto e leggibilità su cucina/luci forti.
- Nessun testo meta tipo “versione migliorata”, “generato con AI”, “HTML”.
- Microcopy da prodotto reale.

## 12. Requisiti accessibilità e sicurezza

- Navigazione tastiera completa.
- Focus visibile.
- Dialog privacy chiudibile e comprensibile.
- Nessun dato personale richiesto.
- Nessun token o segreto nel repository.
- Nessuna chiamata esterna.
- localStorage solo per preferenze tecniche.
- Evitare `innerHTML` con testo utente.
- CSP mantenuta o rafforzata.

## 13. Criteri di accettazione v2

### Calcola nuovo impasto

- L'utente può ottenere dosi complete con massimo 5 decisioni in modalità base.
- L'output mostra cosa pesare, cosa fare ora e prossimo step.
- Le date errate producono errore chiaro.
- Numeri estremi non rompono l'app.

### Ho già un impasto

- L'utente riceve una raccomandazione pratica in meno di 3 input.
- La risposta include cosa fare e cosa non fare.
- Copre impasto avanti, collassante, rigido, molle e strappato.

### Cottura

- Margherita e patate/lardo hanno istruzioni distinte.
- La guida considera forno domestico, mozzarella/pomodoro/patate e fondo.

### Media

- Le immagini aiutano un gesto o un errore reale.
- Nessuna immagine decorativa che rallenta il compito principale.

## 14. Roadmap consigliata

### Sprint 1 — Redesign funzionale senza media

- Home task-based.
- Modalità base/avanzata.
- Output ristrutturato.
- Diagnosi trasformata in flusso “Ho già un impasto”.

### Sprint 2 — Contenuti diagnostici

- Problemi post-cottura.
- Cause / cosa fare ora / prossima volta.
- Miglioramento microcopy.

### Sprint 3 — Immagini

- Generazione asset statici.
- Compressione e integrazione.
- Verifica mobile e peso pagina.

### Sprint 4 — Video brevi solo se servono

- 2–3 clip max.
- Lazy loading.
- fallback immagine.

## 15. Fonti e riferimenti consultati

- Associazione Pizza Romana — distinzione pizza in teglia classica/tradizionale e contemporanea/moderna: https://associazionepizzaromana.com/
- Bonci — sito ufficiale, filosofia materie prime e prodotto “La Mia Teglia”: https://bonci.it/ e https://bonci.it/products/la-mia-teglia
- Tellia — pizza in teglia romana, alta idratazione, lunga lievitazione, croccante/morbida: https://www.tellia.it/
- Quelli di Bonci — raccolta di guide e tutorial: https://www.quellidibonci.com/

## 16. Decisione prodotto

La v2 non deve aggiungere complessità: deve cambiare gerarchia.

Prima guidiamo meglio. Poi aggiungiamo immagini. Solo dopo valutiamo video o funzioni più avanzate.
