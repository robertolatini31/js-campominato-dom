// L'utente indica un livello di difficoltà in base al quale viene generata 
// una griglia di gioco quadrata,
//in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.



// collego btn play
const btnPlayElement = document.querySelector('.selectors>button');


// creo la funzione al click del btn play
btnPlayElement.addEventListener('click', function(){
    //svuoto cells se pieno
    document.querySelector('.cells').innerHTML = '';
    // collego livello di difficoltà inserito dall'utente
    const difficultyElement = document.querySelector('.selectors>select').value;
    // inizializzo la variabile in cui salvo l'intervallo
    let interval; 
    // inizializzo la variabile per dare poi aspect ratio
    let size;
    // selettore intervallo
    if(difficultyElement == 1) {
        interval = 100;
        size = 'size_10';
    } else if (difficultyElement == 2) {
        interval = 81;
        size = 'size_9';
    } else {
        interval = 49;
        size = 'size_7';
    }
    // chiamo la funzione che crea le cell e la salvo in una variabile
    const cellElements = creatorSquareCell(interval, '.container_small>.cells', 'div', 'cell', size);
    
    // chiamo la funzione che aggiunge i numeri alle cell
    const cellNumbers = addCellNumber('.cell');

    //creo una lista (data una lunghezza e range numeri min max included) di numeri non duplicati
    const bombs = noDuplicateNumbers(16, 1, interval);

    // creo la funzionalità che colora di blu i quadrati al click
    const points = addClickEvents('.cell', bombs);

    
    
});


// creo una funzione che genera tante cell quanto chiesto
function creatorSquareCell(amount, query_selector, tagName, className, classSize) {
    for (let i = 1; i <= amount; i++) { //implemento un ciclo per quante celle voglio fare
        const cell = document.createElement(tagName); // creo dei div celle
        cell.classList.add(className); // gli aggiungo la classe cell
        cell.classList.add(classSize); // gli aggiungo la classe cell
        document.querySelector(query_selector).append(cell); // metto la cell nel mio  html dentro cells  
    }
}

// creo una funzione che aggiunge i numeri alle cell
function addCellNumber(query_selector) {
    const cells = document.querySelectorAll(query_selector);
    let j = 1;
    for(let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.append(j);
        j++;
        // cell.addEventListener('click', function() {
        //     cell.classList.add('bg_blu_click');
        // });
    }
}


// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe :bomba:.

// prendo la funzione che genera numeri tra un max e un min
function randomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//console.log('ho generato il numero:' + randomNumbers(1, 100));   
// I numeri nella lista delle bombe non possono essere duplicati.

//creo una funzione che crei una lista (data una lunghezza e range numeri min max included) di numeri non duplicati
function noDuplicateNumbers(listLength, min, max) {
    let listNumbersArray = []; // inizializzo un array a cui assegno la lista di numeri
    //console.log('è l array inizializ' + listNumbersArray);
    while (listNumbersArray.length != listLength) { // ciclo finchè il mio array non è della lunghezza inserita
        // genero un numero random
        let NumberGenerated = randomNumbers(min, max);
        //console.log('numero gen:' + NumberGenerated);
         // se non c'è già
        let control = false; // inizializzo la variabile che controlla la presenza su false (non c'è quest'elemento nell array)
        //console.log(control);
        for(let i = 0; i < listNumbersArray.length; i++) { //imposto un ciclo che scorre l'array
            if (listNumbersArray[i] == NumberGenerated) { // controllo per ogni elemento dell array se quello generato è uguale 
                control = true; // se lo trova uguale attiva con true il controllo
                //console.log(control);
            }
        }
        // lo voglio mettere nell array 
        if (!control) { // se il controllo è rimasto false (non c'è già l'elemento generato nell'array)
            listNumbersArray.push(NumberGenerated); // metto l'elemtno generato nell'array
        }
        //console.log(listNumbersArray);
    }
    return listNumbersArray;
}


// In seguito l'utente clicca su una cella:

// facciouna funzione solo per il click
// creo una funzione che aggiunge i numeri alle cell
function addClickEvents(query_selector_cells, arrayBombs, interval) {
    let points = 0;
    const cells = document.querySelectorAll(query_selector_cells); // collego tutte le cell in un array cells
    for(let i = 0; i < cells.length; i++) { // ciclo che scorre tutte le cell
        const cell = cells[i]; // collego ogni cell delle cellls
        //console.log(cell);
        let control_red = false; // inizializzo una variabile di controllo su false (non è una bomba)
        for(let j = 0; j < arrayBombs.length; j++){ // creo ciclo che scorre l'array dell bombe
            // se il numero della cell è nell array coloro di rosso
            //console.log(arrayBombs[j]);
            if (cell.textContent == arrayBombs[j]) { 
                cell.addEventListener('click', function() { // aggiungo il rosso al click
                    cell.classList.add('bg_red_click');
                    endGame(arrayBombs, query_selector_cells, points, interval);
                });
                control_red = true; // metto su true il controllo (è una bomba)
                //console.log('controllo:' + control_red);
                
            }
        }
        if (!control_red) { // se non è una bomba
            cell.addEventListener('click', function() { // aggiungo il blu
            cell.classList.add('bg_blu_click');
            points++; // incremento i punti ogni click
            if(points + 16 == interval) // se i punti più le bombe sono tutta la tabella l'utente ha vinto
            {
                endGame(arrayBombs, query_selector_cells, points, interval);
            }
            console.log('punti:' + points);
            });
        }
        
    }
}


// se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba ----------OK

// la cella si colora di rosso -----OK
// e la partita termina, ___ OK
// altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

// creo una funzione per la fine della parita
function endGame(arrayBombs, query_selector_cells, points, interval) { 
    // faccio colorare tutta la tabella
    const cells = document.querySelectorAll(query_selector_cells); // collego tutte le cell in un array cells
    for(let i = 0; i < cells.length; i++) { // ciclo che scorre tutte le cell
        const cell = cells[i]; // collego ogni cell delle cellls
        //console.log(cell);
        let control_red = false; // inizializzo una variabile di controllo su false (non è una bomba)
        for(let j = 0; j < arrayBombs.length; j++){ // creo ciclo che scorre l'array dell bombe
            // se il numero della cell è nell array coloro di rosso
            //console.log(arrayBombs[j]);
            if (cell.textContent == arrayBombs[j]) { 
                cell.removeEventListener('click', function() { // aggiungo il rosso al click
                    cell.classList.add('bg_red_click'); // rimuovo il click
                });
                cell.classList.add('bg_red_click'); // coloro di rosso
            
                control_red = true; // metto su true il controllo (è una bomba)
                //console.log('controllo:' + control_red);
            }
        }
        if (!control_red) { // se non è una bomba
            cell.removeEventListener('click', function() { // rimuovo il click
            cell.classList.add('bg_blu_click');
            });
            cell.classList.add('bg_blu_click'); // coloro di blu
        }
    }
    
}