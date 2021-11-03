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
    const selectDiff = parseInt(document.getElementById('difficulty').value);
    console.log(selectDiff);
    let numSquares = diffLevels[selectDiff - 1 ];
    console.log(numSquares);
    fillContainer(container, numSquares);
    
    return 0;
}


/**
 * 
 * @param {il contenitore da riempire di quadrati} cont 
 * @param {il numero di quadrati da creare} num 
 
 */
function fillContainer(cont, num){
    cont.innerHTML = '';
    for(let i = 1; i <= num; i++){
        const square = createSquare(cont, i,num);
        
        square.addEventListener('click',function(){
            this.classList.add('clicked');
        })
    }
    
    return 0;
}


/**
 * 
 * @param {container dove inserire il quadrato} cont 
 * @param {indice del quadrato da creare} i 
 * @param {numero di quadrati} num 
 * @returns ritorna il quadrato che ha creato
 */
function createSquare(cont, i, num){
    const sqrt = Math.sqrt(num);
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = 'calc(100% / '+ sqrt + ')';
    square.style.height = 'calc(100% / '+ sqrt + ')'; 
    square.innerHTML= `${i}`;
    
    cont.append(square);
    
    return square;

}

