// All Variables and constants
let direction = { x: 0, y: 0 };
let Snakeeat = document.getElementById('foodeaten');
let GameOver = document.getElementById('Collide');
let SnakeMove = document.getElementById('Snakemove');
let lastPainttime = 0;
let speed = 8;
let SnakeArray = [
    { x: 12, y: 13 }
];
let food = { x: 5, y: 8 };
let score = 0;
let scorebox = document.getElementById('score1')
let hiscorevalue=0;
let hiscorebox = document.getElementById('hiscorebox1');
// console.log(SnakeArray);



// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPainttime) / 1000 < 1 / speed) {
        return;
    }
    lastPainttime = ctime;
    gameEngine();
}



function isCollide(Snake)
{
    
    // if it strikes in itself
    for(let i = 1;i<Snake.length;i++)
    {
        // console.log(SnakeArray.length);
        if((Snake[i].x === Snake[0].x) && (Snake[i].y === Snake[0].y))
        {
            return true;
        }
    }
    if(Snake[0].x >= 18 || Snake[0].x <=0 || Snake[0].y >= 18 || Snake[0].y <=0 )
    {
        return true;
    }
    
    if(Snake.length==1)
    {
        if(Snake[0].x >= 18 || Snake[0].x <=0 || Snake[0].y >= 18 || Snake[0].y <=0 )
        {
            return true;
        }
    }
    return false;
}


function toggle()
{
    let blur = document.getElementById('container')
    blur.classList.toggle('active');
    let popup = document.getElementById('popup');
    popup.style.display='block'
    // let btn2 = document.getElementById('btn2');
    // btn2.style.display='block';
    let showscore = document.getElementById('showscore');
    showscore.innerHTML="Your Score is : " + score;
    let showhighestscore = document.getElementById('showhighestscore');
    showhighestscore.innerHTML = "Your Highest Score is " + hiscorevalue;
}

function end()
{
    
    console.log("Game Over")
    cancelAnimationFrame(reqID);
    toggle();
    // popup.style.display='block';

}

function gameEngine() {
    // part 1 : updating snake array and food
    if (isCollide(SnakeArray)) {
        GameOver.play();
        console.log("HI");
        window.blur();
        end();
        GameOver=null;
        SnakeMove=null;
        return;
        
        // alert("Enter to Play Again")
        // Snakeeat.pause();
        // direction = { x: 0, y: 0 };
        // food={x:0,y:0};
        // SnakeArray=[{ x: 12, y: 13 }];
        
    
    }

    

    // if snake have eaten the food then increment the score and regenerate the food
    if (SnakeArray[0].x === food.x && SnakeArray[0].y === food.y) {
        
        Snakeeat.play();
        SnakeArray.unshift({ x: SnakeArray[0].x + direction.x , y: SnakeArray[0].y + direction.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score+=1;
        if(score>hiscorevalue)
        {
            hiscorevalue=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscorevalue));
            hiscorebox.innerHTML="Hi Score : " + hiscorevalue;
        }
        scorebox.innerHTML="Score : "+score;
        // hiscorebox.innerHTML=
    }


    // Moving Snake
    for (let i = SnakeArray.length-2; i >= 0; i--) {
        // SnakeArray[i].style.color='green';
        SnakeArray[i + 1] = {...SnakeArray[i]};
    }

    SnakeArray[0].x += direction.x;
    SnakeArray[0].y += direction.y;


    // score
    

    // part 2 : display snake and food
    // Display Snake



    // let board = document.getElementById('board');
    board.innerHTML = "";
    SnakeArray.forEach((e, index) => {
        SnakeElement = document.createElement('div');
        SnakeElement.style.gridRowStart = e.y;
        SnakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            SnakeElement.classList.add('head');
        }
        else {
            SnakeElement.classList.add('snake');
        }
        board.appendChild(SnakeElement);
    });

    // Display Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// function Startgame()
// {
//     let button = document.querySelector('#btn');
// let st = document.querySelector('.beforecontent');
// let root = document.querySelector(':root');
// button.style.display = 'none';
// st.style.display = 'none';

// root.style.setProperty("--grey", 'transparent');
//     gameEngine();
// }


// Main logic of function starts here

let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscorevalue=0;
    localStorage.setItem(hiscore,JSON.stringify(hiscorevalue));

}
else
{
    hiscorevalue=JSON.parse(hiscore);
    hiscorebox.innerHTML="Hi Score : " + hiscorevalue;
}



let reqID = window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 };
    // const playsnakemove =
     SnakeMove.play();
    // if (playsnakemove !== NULL) {
    //     playsnakemove.catch(() => { SnakeMove.play(); })
    // }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
});