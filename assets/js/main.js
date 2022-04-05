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
    const cellNumbers = addCellNumber('.cell', 'span');

    // creo la funzionalità che colora di blu i quadrati al click

    
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
function addCellNumber(query_selector, tagName) {
    const cells = document.querySelectorAll(query_selector);
    let j = 1;
    for(let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const spanElement = document.createElement(tagName);
        spanElement.append(j);
        cell.append(spanElement);
        j++;
        cell.addEventListener('click', function() {
            cell.classList.add('bg_blu_click');
        });
    }
}

