# PizzaMaker / Teglia Coach

Calcolatore pratico per pizza in teglia fatta in casa.

## Cosa fa

- Calcola il peso impasto in base alla teglia e al numero di teglie.
- Stima idratazione, sale, olio e lievito, con scelta tra fresco e secco istantaneo.
- Usa data e ora di inizio impasto e inizio cottura per generare una timeline.
- Include indicazioni pratiche per stesura, condimento e cottura nel forno domestico, adattate alla temperatura massima dichiarata.

## Pubblicazione con GitHub Pages

1. Apri la repository su GitHub.
2. Vai su **Settings → Pages**.
3. In **Build and deployment**, scegli **Deploy from a branch**.
4. Seleziona branch **main** e cartella **/root**.
5. Salva.

Il sito sarà disponibile all'indirizzo:

`https://atti0.github.io/PizzaMaker/`


## Note sul modello di calcolo

PizzaMaker distingue tra valori inseriti dall'utente, default modificabili ed euristiche. Olio, miele/malto, tipo di lievito, temperatura ambiente, frigorifero e forno non sono trattati come costanti universali.

Le assunzioni ancora aperte e il backlog di validazione sono documentati in `docs/assumption-audit.md`.
