/* Contenitore dove verranno inseriti i quadrati */
const container = document.querySelector('.container-grid');
console.log(container);
const btn = document.getElementById('play-btn');


btn.addEventListener('click', function(){
    run(container);
});

/**
 * 
 * @param {basta passargli il container che contarrà i quadrati } container 
 * @returns 
 */
function run(container){
    const diffLevels = [100,81,49];
    let bombsArray = [];
    const selectDiff = parseInt(document.getElementById('difficulty').value);
    console.log(selectDiff);
    let numSquares = diffLevels[selectDiff - 1 ];
    console.log(numSquares);

    fillContainer(container, numSquares, bombsArray);
    
    createBombs(bombsArray, numSquares);
    
    return 0;
}


/**
 * 
 * @param {il contenitore da riempire di quadrati} cont 
 * @param {il numero di quadrati da creare} num 
 * @param {array contenente i numeri dei quadrati 'bomba'} bArray
 
 */
function fillContainer(cont, num, bArray){
    cont.innerHTML = '';
    for(let i = 1; i <= num; i++){
        const square = createSquare(cont, num);
        square.innerHTML= `${i}`;
        square.addEventListener('click',clickReact);
    }

    function clickReact(event){
        this.classList.add('clicked');
        const sqrNum = parseInt(event.target.innerText);
        if(bArray.includes(sqrNum)) explode(cont,bArray);
    }
    
    return 0;
}


/**
 * 
 * @param {container dove inserire il quadrato} cont 
 * @param {numero di quadrati} num 
 * @returns ritorna il quadrato che ha creato
 */
function createSquare(cont, num){
    const sqrt = Math.sqrt(num);
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = 'calc(100% / '+ sqrt + ')';
    square.style.height = 'calc(100% / '+ sqrt + ')'; 
    cont.append(square);
    
    return square;

}


/**
 * 
 * @param {array che contiene i numeri dei quadrati bomba} bArray 
 * @param {numero totale di quatrati} nSqr 
 */
function createBombs(bArray, nSqr){
    const BOMBS_NUMB = 16;
    while(bArray.length < BOMBS_NUMB){
        const sqr = numRand(1,nSqr); 
        console.log(sqr);
        if(!bArray.includes(sqr)) bArray.push(sqr);
    }
    console.log(bArray);
}


function explode(cont, bArray){
    const numbOfChildren = cont.children.length;
    for(let i = 0; i< numbOfChildren; i++){
        const square = cont.children[i];
        
        square.classList.add('clicked');
        if(bArray.includes(parseInt(square.innerHTML))){
            square.style.background = 'red';
            console.log(square);
        } 
    }
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