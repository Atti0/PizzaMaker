# PizzaMaker — Audit delle assunzioni nascoste

Data: 2026-10-15

Obiettivo: evitare che valori impliciti o costanti tecniche vengano presentati come regole universali. Ogni parametro deve essere classificato come input utente, default modificabile, valore derivato, euristica dichiarata o decisione ancora da validare.

## 1. Correzioni applicate in questo audit

| Assunzione precedente | Problema | Decisione |
|---|---|---|
| Olio sempre 2,5% | Valore nascosto e non universalmente necessario | Diventa scelta esplicita: 0 / 2 / 2,5 / 3% / personalizzato |
| Miele 0,5% automatico negli impasti <=12 h | Ingrediente aggiunto senza decisione dell'utente | Nessuno di default; opzionale 0,5% o personalizzato |
| Nessuna temperatura ambiente | Fermentazione e appretto venivano interpretati solo con ore e luogo | Aggiunta come input opzionale e segnale diagnostico |
| Idratazione “consigliata” | La stima da proteine/tipo/W poteva sembrare prescrittiva | Rinominata “stima automatica / di partenza” |
| Dose lievito presentata come valore secco | Il modello dipende soprattutto dalle ore e non integra ancora tutte le temperature | Etichettata esplicitamente come stima |
| Timeline “Sale + olio” | Restava falsa se l'utente sceglieva 0% olio | Diventa “Sale + eventuale olio” |

## 2. Parametri correttamente espliciti

- Dimensioni interne della teglia e numero di teglie.
- Carico impasto / stile desiderato.
- Tipo e miscela farine, proteine, W opzionale, presenza di lievito madre nella farina.
- Idratazione manuale oppure stima automatica dichiarata.
- Sale.
- Tipo lievito: fresco o secco istantaneo.
- Metodo d'impasto.
- Temperatura finale impasto opzionale.
- Gestione del freddo: massa o panetti.
- Temperatura reale del frigorifero opzionale.
- Temperatura ambiente opzionale.
- Temperatura massima reale del forno.
- Materiale della teglia nella guida Cottura.

## 3. Euristiche che restano e NON devono essere lette come leggi

### Dose di lievito
La funzione attuale stima la percentuale a partire dalla durata totale. Tipo di lievito modifica la quantità con una conversione fresco/secco.

Limiti:
- non modella quantitativamente temperatura ambiente;
- non modella quantitativamente temperatura finale impasto;
- non modella quantitativamente temperatura frigorifero;
- non conosce attività reale del lievito, marca o data di apertura;
- non usa un modello fermentativo validato.

Decisione: mantenere come **stima iniziale**, non correggerla automaticamente con coefficienti inventati. Prima di renderla predittiva serve un modello validato o una campagna di prove.

### Idratazione automatica
Derivata da proteine, tipo farina, W opzionale e una piccola correzione per processo lungo.

Limiti:
- proteine e W non determinano da soli assorbimento e lavorabilità;
- granulometria, danno amido, additivi, fibre e specifiche del molino possono cambiare molto il comportamento;
- manualità e macchina influenzano l'idratazione realmente gestibile.

Decisione: mantenere come **stima di partenza** con possibilità di modifica.

### Timeline
Contiene orari di controllo e finestre operative.

Limiti:
- appretto, staglio e stesura dipendono da temperatura e stato reale;
- i tempi non devono prevalere su volume, tenuta, rilassamento e fermentazione osservata.

Decisione: usare wording “controlla / finestra” nei passaggi sensibili e non aggiungere falsa precisione.

### Temperatura finale impasto
La UI usa 22–24 °C come riferimento pratico.

Decisione: mantenerla come fascia orientativa, non come requisito universale.

### Temperatura frigorifero
Sopra circa 5 °C l'app avverte che il rallentamento può essere minore.

Decisione: warning qualitativo; nessun ricalcolo automatico di ore senza modello validato.

## 4. Costanti accettabili come default, non come verità

| Valore | Uso | Stato |
|---|---|---|
| 37 x 26 cm | Teglia iniziale | Default modificabile |
| 1 teglia | Primo uso | Default modificabile |
| 250 °C | Forno iniziale | Default modificabile |
| 2,3% sale | Profilo standard | Default modificabile |
| 2,5% olio | Profilo standard | Default modificabile |
| 0% miele/malto | Nuovo default | Default modificabile |
| 0,54 g/cm² | Pizza equilibrata | Scelta iniziale UI |
| 40–50 min preriscaldo | Guida forno | Euristica, controllare forno reale |
| 3–6 min seconda fase | Guida cottura | Finestra esplorativa |
| 15–30 min riposi tecnici | Guide | Finestra, stato reale prioritario |

## 5. Assunzioni ancora da rivedere

### P1 — Lievito e fermentazione
Serve decidere se costruire un modello più serio che consideri durata calda/fredda, temperature e processo bulk/panetti. Non modificare numericamente la dose finché non è validato.

### P1 — Orari della timeline
Alcune posizioni sono ancora generate con offset fissi (es. controllo, staglio, appretto). Devono restare finestre operative e andrebbero testate su processi reali da 8 h, 24 h e 48 h.

### P1 — Problemi post-cottura
Alcune regole storiche in `problemRules` sono troppo sintetiche. In particolare evitare consigli di “piega di salvataggio” su impasto collassato se fase e fermentazione non sono note.

### P2 — Quantità condimenti
Pomodoro, mozzarella e olio finale sono scalati per area con coefficienti pratici. Sono riferimenti, non quantità ottimali universali; tipo di pizza e gusto possono richiedere range diversi.

### P2 — Materiale teglia
Le categorie “leccarda / alluminio / ferro blu / antiaderente” sono utili ma non rappresentano spessore, colore, rivestimento e massa termica. Non dedurre tempi precisi solo dal materiale.

### P2 — Forno
La temperatura massima non descrive distribuzione del calore, potenza resistenze, modalità statico/ventilato, inerzia, posizione delle griglie o presenza di pietra/acciaio. La guida deve continuare a basarsi sul controllo del fondo.

### P2 — Farine con lievito madre secco / mix
Il flag attuale è troppo semplice per descrivere mix con starter, enzimi, malto o miglioratori. Non usarlo per calcoli fermentativi quantitativi senza dati specifici.

### P3 — Ambiente domestico
Umidità relativa, temperatura acqua e temperatura del banco possono influenzare il processo, ma aggiungerle oggi aumenterebbe attrito senza un modello che le sappia usare bene. Non chiedere dati inutili.

## 6. Regola di prodotto per nuovi parametri

Prima di aggiungere un campo chiedere:
1. cambia una decisione concreta dell'app?
2. l'utente conosce realisticamente il dato?
3. abbiamo una logica affidabile per usarlo?
4. se manca, esiste un default innocuo?
5. il risultato deve essere espresso come valore, range, warning o semplice controllo di stato?

Se il dato non cambia davvero il comportamento, non aggiungere il campo.

## 7. Prossimi test consigliati

- A/B 24 h: stessa ricetta con 18 / 22 / 27 °C ambiente, misurando volume e tempi reali.
- A/B frigorifero: 4 °C vs 7 °C, stessa massa e stesso contenitore.
- Bulk vs panetti prima del frigo, stessa ricetta e temperatura.
- Olio 0 / 2,5%, stesso carico e cottura.
- Preriscaldo 30 / 45 / 60 min con misurazione reale del comportamento del fondo.
- Confronto teglia alluminio vs ferro a pari forno e impasto.

Per ogni prova annotare temperatura impasto, ambiente, frigo, volume, tempi effettivi, estensibilità, foto della sezione e del fondo.
