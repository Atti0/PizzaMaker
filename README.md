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

PizzaMaker distingue tra valori inseriti dall'utente, default modificabili ed euristiche. Per la temperatura ambiente usa 22 °C come riferimento neutro e offre una correzione manuale facoltativa; non usa posizione, meteo o data per stimare la stanza.

Le assunzioni ancora aperte e il backlog di validazione sono documentati in `docs/assumption-audit.md`.
