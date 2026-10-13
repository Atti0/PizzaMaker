# PizzaMaker — Specifica visuali tecnici realistici

Stato: pronto per produzione asset, non ancora generati.

## Principi comuni

- Un solo gesto per immagine. Niente poster o collage generati.
- Nessun testo, freccia o numero dentro l'immagine: overlay e microcopy restano in HTML/CSS.
- Stessa scena per ogni sequenza: contenitore, impasto, piano, mani, luce, lente e altezza camera invariati.
- Impasto pizza in teglia ad alta idratazione realistico: superficie umida ma non lucida artificialmente, bolle irregolari, elasticità plausibile.
- Continuità fisica obbligatoria: forma, quantità e texture devono sembrare lo stesso impasto tra un frame e il successivo.
- Inquadratura verticale 4:5 o 3:4, soggetto centrale e margine libero per eventuali overlay UI.
- Mani adulte naturali, anatomia corretta, niente gioielli, unghie corte.
- Se un frame non mostra chiaramente il punto di contatto o la direzione del gesto, va scartato.
- Le immagini diagnostiche devono mostrare comportamenti osservabili; per stati dinamici difficili da comunicare con una foto, preferire una micro-sequenza o un video breve.

## Sequenza A — Struttura / piega di rinforzo

### A1 — Entra dal bordo
Obiettivo: rendere impossibile confondere bordo e centro.

Prompt:
> Fotografia culinaria ultra-realistica verticale, stessa scena di una sequenza didattica per pizza in teglia. Contenitore rettangolare trasparente visto a tre quarti dall'alto, impasto ad alta idratazione morbido e continuo. La mano entra ESCLUSIVAMENTE dal bordo sinistro del contenitore: le dita scivolano lateralmente sotto un lembo periferico largo dell'impasto. Il centro della massa resta completamente appoggiato sul fondo del contenitore. La mano non pizzica, non afferra e non solleva il centro. Il punto di ingresso della mano deve essere chiaramente visibile contro la parete laterale del contenitore. Nessun testo, freccia, icona o grafica.

Criterio di scarto: la mano sembra prendere una porzione centrale, forma una maniglia sottile o pizzica l'impasto.

### A2 — Solleva fino alla prima resistenza
Prompt:
> Stessa identica scena e stesso impasto del frame precedente. La mano solleva verso l'alto LO STESSO lembo periferico partito dal bordo sinistro. Il lembo forma una fascia larga e continua, ancora spessa; non una colonna centrale. Il centro della massa resta appoggiato nel contenitore. L'allungamento è moderato, senza trasparenze, assottigliamento eccessivo o lacerazioni. Deve essere visibile il collegamento geometrico tra il bordo da cui nasce il lembo e la mano che lo sostiene da sotto.

### A3 — Ripiega verso il centro
Prompt:
> Stessa scena. Il lembo largo sollevato dal bordo sinistro viene accompagnato sopra il centro della massa. La mano lo sostiene da sotto e lo lascia appoggiare delicatamente; non lo schiaccia. Il resto dell'impasto rimane nel contenitore e conserva volume. Nessuna pirlatura, torsione o rotolamento.

### A4 — Fine dei quattro lembi
Prompt:
> Stessa scena. Dopo quattro ripiegamenti sui lati, le sovrapposizioni sono visibili nella parte superiore centrale. L'impasto è un po' più raccolto ma non perfettamente sferico e non appare pirlato. Deve essere chiaramente lo stesso impasto del primo frame.

### A5 — Capovolgi la massa una volta
Prompt:
> Stessa scena e stesso impasto. Due mani sostengono la massa da lati e parte inferiore e la ribaltano come un blocco unico, senza torcerla e senza tirarla. La zona con le quattro sovrapposizioni finisce sotto; la faccia continua diventa la superficie superiore. Il capovolgimento avviene una sola volta al termine del ciclo, non dopo ogni lembo.

Criterio di scarto: il modello gira solo un lembo, torce la massa, esegue una pirlatura oppure lascia chiaramente la cucitura principale sopra.

### A6 — Errore: trazione eccessiva
Prompt:
> Stessa scena. Un lembo viene tirato troppo: diventa localmente sottile e semitrasparente, con una piccola zona che inizia a lacerarsi. La massa principale resta nel contenitore. L'immagine deve mostrare chiaramente l'errore senza trasformare l'intero impasto in una rete estrema.

## Sequenza F — Staglio e formatura

Questa sequenza è distinta dalle pieghe di rinforzo. Obiettivo: ottenere una sola cucitura sotto e una superficie continua, moderatamente tesa, senza degasare inutilmente.

### F1 — Taglio netto
Prompt:
> Fotografia culinaria ultra-realistica verticale. Massa di impasto per pizza in teglia ad alta idratazione sul banco. Un tarocco metallico tenuto quasi verticale separa una porzione con un singolo taglio netto. Nessuna mano tira due metà in direzioni opposte. La struttura interna rimane visibilmente viva e non schiacciata.

### F2 — Orienta la faccia continua
Prompt:
> Stessa porzione. La faccia più integra e continua è appoggiata al banco; superfici appena tagliate restano sui lati o rivolte verso l'alto. Le mani non comprimono il centro. Deve essere chiaro quale faccia diventerà la superficie esterna finale.

### F3 — Raccogli i bordi in una sola cucitura
Prompt:
> Stessa porzione. Le mani portano 4–6 zone periferiche larghe verso un unico punto centrale superiore. Ogni lembo è corto e largo; non viene stirato fino a diventare sottile. Il centro non viene schiacciato. Si crea una sola zona di cucitura.

### F4 — Capovolgi
Prompt:
> Stessa porzione. Le mani sostengono il pezzo da lati e fondo e lo ribaltano una sola volta. La cucitura centrale passa chiaramente sotto e la faccia continua diventa la parte superiore. Nessuna torsione.

### F5 — Tensionamento minimo
Prompt:
> Panetto con cucitura sotto su banco quasi privo di farina. Due mani a coppa accompagnano un piccolo trascinamento verso il corpo con lieve rotazione, sfruttando l'attrito del banco. La superficie superiore diventa più liscia e moderatamente tesa, ma resta morbida. Nessuna palla lucida, durissima o eccessivamente compressa.

### F6 — Punto di stop
Prompt:
> Stesso panetto dopo pochissimi movimenti di tensionamento. Superficie continua e liscia, forma raccolta ma non perfettamente sferica, nessuna lacerazione, nessuna zona trasparente. La massa conserva volume. Deve sembrare pronta per un periodo di appretto, non per ulteriori manipolazioni.

### F7 — Errore: pirlatura eccessiva
Prompt:
> Stesso panetto, ma la superficie è tirata eccessivamente: una zona mostra assottigliamento o inizio di lacerazione e il panetto appare troppo rigido. Nessuna caricatura estrema. Deve comunicare chiaramente che continuare a trascinare sarebbe un errore.

## Sequenza B — Stesura

### B1 — Uscita dal contenitore
Prompt:
> Fotografia ultra-realistica verticale. Contenitore trasparente inclinato lentamente sopra un banco con un velo sottile di semola rimacinata. Una mano sostiene il contenitore, l'altra usa un tarocco per liberare delicatamente i bordi. La massa scende in blocco per gravità. Nessuna mano tira un singolo punto dell'impasto.

### B2 — Pressioni progressive
Prompt:
> Stesso impasto sul banco, forma rettangolare morbida e spessa. Due mani con dita aperte e quasi parallele premono progressivamente con i polpastrelli su una fascia ampia del centro, senza trascinare. Il centro conserva spessore e gas; non viene reso piatto o trasparente. I bordi non diventano un cornicione napoletano artificiale.

### B3 — Avvicinamento alla misura
Prompt:
> Stessa scena. L'impasto è più largo ma ancora poco più piccolo della teglia di riferimento. Le mani allargano con piccoli spostamenti simmetrici e superficie ampia delle dita. Nessun bordo viene tirato come una corda.

### B4 — Trasferimento sostenuto
Prompt:
> Stessa massa. Entrambe le mani entrano sotto l'impasto e ne distribuiscono il peso su palmi, dorso delle mani e parte degli avambracci. L'impasto è sostenuto su una superficie ampia; nessuna presa a pinza sui bordi. La gravità produce solo una lieve estensione naturale.

### B5 — Adagia in teglia
Prompt:
> Teglia rettangolare leggermente unta. Le mani adagiano prima la parte centrale dell'impasto, poi accompagnano la massa verso bordi e angoli. Nessun trascinamento aggressivo e nessuna pressione che espella tutto il gas.

### B6 — Errore: centro troppo sottile
Prompt:
> Stessa teglia. Il centro dell'impasto è stato pressato troppo e appare eccessivamente sottile e quasi trasparente, mentre alcune zone esterne sono più spesse. Deve essere evidente una distribuzione errata dello spessore.

## Sequenza C — Cottura

Per la cottura i visuali devono essere principalmente diagnostici, non decorativi.

### C1 — Fondo pallido
Prompt:
> Fotografia macro realistica di un angolo di pizza in teglia sollevato con una spatola metallica. Il fondo è asciutto solo in parte, molto chiaro e quasi privo di doratura. Nessuna bruciatura. La teglia è ancora visibile sotto.

### C2 — Fondo pronto
Prompt:
> Stessa pizza e stessa inquadratura. Angolo sollevato con spatola. Fondo asciutto, uniforme, con prime zone dorate nocciola ma senza aree scure. Deve sembrare strutturato e croccante, non secco o bruciato.

### C3 — Fondo troppo scuro
Prompt:
> Stessa pizza e stessa inquadratura. Fondo già molto colorito con alcune zone marrone scuro, ancora prima che la superficie sia completata. Nessun carbone nero dominante: deve comunicare che è il momento di proteggere la base e spostare il calore sopra.

### C4 — Superficie pronta
Prompt:
> Margherita in teglia appena finita. Mozzarella completamente fusa senza pozze d'acqua, pomodoro concentrato, bordo ben cotto. Aspetto realistico domestico, non pizza da pubblicità perfetta.

### C5 — Riposo su griglia
Prompt:
> Pizza rettangolare appena tolta dalla teglia e appoggiata su una griglia metallica, con spazio d'aria visibile sotto la base. Nessun piatto o tagliere aderente sotto. Vapore leggero e naturale, cucina domestica realistica.

## Regola di produzione

Generare e validare un frame alla volta. Per ogni immagine verificare:
1. correttezza tecnica del gesto;
2. origine e destinazione del movimento;
3. stato fisico dell'impasto;
4. anatomia e contatto delle mani;
5. continuità con il frame precedente;
6. utilità reale su uno schermo mobile.

Solo dopo l'approvazione dei frame statici valutare micro-video di 4–8 secondi per: piega completa con capovolgimento finale, staglio/formatura, comportamento elastico/teso, trasferimento in teglia e controllo del fondo.
