// check if page has loaded
document.addEventListener('DOMContentLoaded', () => {
    // const grid = document.querySelector('.grid');
    let width = 10;
    let height = 12;
    const container = document.querySelector('.container');
    const grid = document.createElement('div');
    grid.setAttribute('class', 'grid');
    grid.style.width = (40*width) + "px";
    grid.style.height = (40*height) + "px";
    container.appendChild(grid);
    
    let mineAmount = 15;
    let squares = [];
    let isGameOver = false;

    // create the board
    function createBoard(){
        // get shuffled game array with random mine locations
        const mineArray = Array(mineAmount).fill('mine');
        const emptyArray = Array(width*height - mineAmount).fill('valid');
        const gameArray = emptyArray.concat(mineArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        
        for(let i = 0; i < width*height; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            // normal click
            square.addEventListener('click', function(e){
                myClick(square);
            })
        }

        for(let i = 0; i < squares.length; i ++){
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);
            if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('mine')) total++;
            if (i > (width - 1) && !isRightEdge && squares[i + 1 - width].classList.contains('mine')) total++;
            if (i > width && squares[i - width].classList.contains('mine')) total++;
            if (i > (width + 1) && !isLeftEdge && squares[i - 1 - width].classList.contains('mine')) total++;
            if (i < (width * height - 1) && !isRightEdge && squares[i + 1].classList.contains('mine')) total++;
            if (i < (width * height - width) && !isLeftEdge && squares[i - 1 + width].classList.contains('mine')) total++;
            if (i < (width * height - (width + 1)) && !isRightEdge && squares[i + 1 + width].classList.contains('mine')) total++;
            if (i < (width * height - width) && squares[i + width].classList.contains('mine')) total++;
            squares[i].setAttribute('data', total);
            
            console.log(squares[i]);

        }
    }

    // dont forget to run the function
    createBoard();

    // click on square actions
    function myClick(square){
        let currentId = square.id;
        if (isGameOver) return;
        if (square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('mine')){
            gameOver(square);
            isGameOver = true;
            console.log('Game Over!');
        } else{
            let total = square.getAttribute('data');
            if (total != 0){
                square.classList.add('checked');
                square.innerHTML = total;
                return;
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked');
    }

    // check neighbour squares
    function checkSquare(square, currentId){
        // alert(currentId);
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            // West
            if(currentId > 0 && !isLeftEdge){
                const newId = squares[parseInt(currentId) -1].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // North East
            if(currentId > (width - 1) && !isRightEdge){
                const newId = squares[parseInt(currentId) +1 - width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // North
            if(currentId > width){
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // North West
            if(currentId > (width + 1) && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // East
            if(currentId < (width * height - 1) && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // South West
            if(currentId < (width * height - width) && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }
            // South East
            if(currentId < (width * height - (width + 1)) && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            }  
            // South
            if(currentId < (width * height - width)){
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                myClick(newSquare);
            } 
        });
    }

    function gameOver(square){
        square.style.background = "rgba(255, 0, 0, 1)";
    }
})