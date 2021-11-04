/* Contenitore dove verranno inseriti i quadrati */
const container = document.querySelector('.container-grid');
console.log(container);
const btn = document.getElementById('play-btn');

//parametri globali delle difficoltà
const BOMBS_NUMB = 16;
const EASY_LEVEL = 100;
const MEDIUM_LEVEL = 81;
const HARD_LEVEL = 49;
const WIN_SCORE = 1;

btn.addEventListener('click', function(){
    run(container);
});

let bombsArray = [];
let clickedArray = [];

/**
 * 
 * @param {basta passargli il container che contarrà i quadrati } container 
 * @returns 
 */
function run(container){
    let wrapper = container.parentElement;
    wrapper.removeChild(wrapper.lastChild);
    bombsArray = [];
    clickedArray = [];
    const diffLevels = [EASY_LEVEL,MEDIUM_LEVEL,HARD_LEVEL];
    const selectDiff = parseInt(document.getElementById('difficulty').value);
    console.log(selectDiff);
    let numSquares = diffLevels[selectDiff - 1 ];
    console.log(numSquares);

    fillContainer(container, numSquares, bombsArray,clickedArray);
    
    createBombs(bombsArray, numSquares);
    
    return 0;
}


/**
 * 
 * @param {il contenitore da riempire di quadrati} container 
 * @param {il numero di quadrati da creare} numSquare 
 * @param {array contenente i numeri dei quadrati 'bomba'} bArray
 * @param {l'array che conterrà i quadrati clickati}cArray
 
 */
function fillContainer(container, numSquare){
    container.innerHTML = '';
    for(let i = 1; i <= numSquare; i++){
        const square = createSquare(container, numSquare);
        square.innerHTML= `${i}`;
        square.addEventListener('click',clickReact);
    }

    
}

function clickReact(event){
    this.classList.add('clicked');
    const sqrNum = parseInt(event.target.innerText);
    if(bombsArray.includes(sqrNum)) explode(container,bombsArray, clickedArray );
    clickedArray.push(parseInt(this.innerHTML));
    if(clickedArray.length === WIN_SCORE) explode(container,bombsArray, clickedArray );
}




/**
 * 
 * @param {containerainer dove inserire il quadrato} container 
 * @param {numero di quadrati} numSquare 
 * @returns ritorna il quadrato che ha creato
 */
function createSquare(container, numSquare){
    const sqrt = Math.sqrt(numSquare);
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = 'calc(100% / '+ sqrt + ')';
    square.style.height = 'calc(100% / '+ sqrt + ')'; 
    container.append(square);
    
    return square;

}


/**
 * 
 * @param {array che contiene i numeri dei quadrati bomba} bArray 
 * @param {numero totale di quatrati} nSqr 
 */
function createBombs(bArray, nSqr){
    
    while(bArray.length < BOMBS_NUMB){
        const sqr = numRand(1,nSqr); 
        if(!bArray.includes(sqr)) bArray.push(sqr);
    }
    return 0;
}

/**
 * 
 * @param {il container dei quadrati} container 
 * @param {l'array delle bombe} bArray 
 * @param {l'array dei quadrati cliccati} cArray 
 * @returns 
 */
function explode(container, bArray, cArray){
    const numbOfChildren = container.children.length;
    for(let i = 0; i< numbOfChildren; i++){
        const square = container.children[i];
        
        if(bArray.includes(parseInt(square.innerHTML)) ){
            square.style.background = 'red';
            square.style.color ='white';
        } 
        square.removeEventListener('click',clickReact);
    }
    
    displayResult(cArray, container.parentElement);
    
    return 0;
}

function displayResult(cArray, wrapper){
    let result = document.createElement('h2');
        result.style.marginTop = '20px';

    if(cArray.length === WIN_SCORE){
        result.innerHTML = `
            Hai Vinto Bravo !!!
        `
    }else{
        console.log('displayResult');        
        result.innerHTML = `
            Peccato, hai perso :-( Hai azzeccato ${cArray.length} tentativi. Gioca ancora ...
        `
    }
    wrapper.appendChild(result);
}


/**
 * 
 * @param {numero ottenibile minimo} min 
 * @param {numero ottenibile massimo} max 
 * @returns ritorna un numero random compreso tra min e max inclusi
 */
function numRand(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}