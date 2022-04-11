

const x_select = document.getElementById("xsel");
const y_select = document.getElementById("ysel");
const start_btn = document.getElementById("newGame");
const all_grids = document.querySelectorAll(".grid");
const turn = document.getElementById('player');

let yourPlayer;
let botPlayer;

// Selection player X OR O
x_select.onclick = () => {
    y_select.classList.remove("active");
    // Set Your and Bot Player
    yourPlayer = x_select.innerText;
    botPlayer = yourPlayer == "X" ? "O" : "X";
    // Set Classa
    x_select.classList.add("active");
}
y_select.onclick = () => {
    x_select.classList.remove("active");
    // Set Your and Bot Player
    yourPlayer = y_select.innerText;
    botPlayer = yourPlayer == "O" ? "X" : "O";
    // Set Classa
    y_select.classList.add("active");
}

const selection_content = document.querySelector(".selection");
const inside_content = document.querySelector(".inside-game");

start_btn.addEventListener("click", (ev) => {
    // hide and show content
    if ( yourPlayer !== undefined ) {
        selection_content.style.display = "none";
        inside_content.style.display = "block";
    }
})

// Game Roles

const main_game = document.getElementById("main-game");
let isPlayed = false;
let your_win = false;
let bot_win = false;
let isTies = false;
let scoreRep = 0;

let isAva_x = true;
let isAva_o = false;

main_game.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("grid")) {
        if ( isAva_x && !bot_win && !isTies) {
            // console.log("can play")
            if ( ev.target.innerText == '' ) {
                ev.target.innerText = yourPlayer;
                ev.target.style.color = '#30c5c1';
                // set opttions
                isAva_x = false;
                isAva_o = true;
                isPlayed = false;
                // run Functions
                check_your_win();
                check_ties();
                // Bot Functions
                if ( !your_win && !isTies ) {
                    setTimeout(() => {
                        bot();
                    if ( isAva_x ) {
                        turn.innerText = `X Turn`;
                    } else {
                        turn.innerText = `O Turn`;
                }
                    }, 1000);
                }
                // console.log("bot",bot_win, isTies);
            }
            if ( bot_win || your_win || isTies ) {
                scoreRep++;
                updateScore();
            }

            if ( isAva_x ) {
                turn.innerText = `X Turn`;
            } else {
                turn.innerText = `O Turn`;
            }
        }
    }
})

// Scores
const score_x = document.querySelector(".xScore span");
const score_o = document.querySelector(".oScore span");
const score_t = document.querySelector(".ties span");
let score_xn = 0;
let score_on = 0;
let score_tn = 0;

// Restart Game
const resBtn = document.getElementById("restart");

resBtn.addEventListener("click", (ev) => {
    all_grids.forEach(e => e.innerText = '');
    bot_win = false;
    your_win = false;
    isTies = false;
    isPlayed = false;
    isAva_x = true;
    isAva_o = false;
})


function updateScore() {
    if ( scoreRep == 1 ) {
        if ( your_win )
        yourPlayer == 'X' ? score_xn++ : score_on++;

        if ( bot_win )
        botPlayer == 'X' ? score_xn++ : score_on++;

        if ( isTies )
        score_tn++;
        // Set New Values
        score_x.innerText = score_xn;
        score_o.innerText = score_on;
        score_t.innerText = score_tn;
        scoreRep = 0;
    }
}


function bot() {
    if ( isAva_o ) {
        // console.log(bot_win);
        if ( !isPlayed ) { check_bot_win_col()}
        if ( !isPlayed ) { check_bot_win_row()}
        if ( !isPlayed ) { check_bot_win_DR()}

            if ( !isPlayed ) {check_bot_lose_col()}
            if ( !isPlayed ) {check_bot_lose_row()}
            if ( !isPlayed ) {check_bot_lose_DR()}

            if ( !isPlayed ) {check_bot_col()}
            if ( !isPlayed ) {check_bot_row()}
            if ( !isPlayed ) {check_bot_DR()}

            if ( !isPlayed ) {bot_random()}

            isAva_x = true;
            isAva_o = false;
    }
}



let colArr = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
let rowArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
let drArr = [[0, 4, 8], [2, 4, 6]];


// Functions to check if bot can win with 1 step or not

/* 
#########################################################    
  Functions to check if bot can win with 1 step or not
#########################################################
*/


function check_bot_win_col() {
    if ( !bot_win ) {
        botWin(colArr);
    }
}


function check_bot_win_row() {
    if ( !bot_win ) {
        botWin(rowArr);
    }
}

function check_bot_win_DR() {
    if ( !bot_win ) {
        botWin(drArr);
    }
}

function botWin( arr ) {
    for ( let i = 0; i < arr.length; i++ ) {
        let step = 0;
        for ( let j = 0; j < arr[i].length; j++ ) {
            if ( all_grids[arr[i][j]].innerText == botPlayer ) {
                step++;
            }
            if ( all_grids[arr[i][j]].innerText == yourPlayer ) {
                step--;
            }
        }
        // Make Disistion
        if ( step === 2 ) {
            for ( k = 0; k < arr[i].length; k++ ) {
                all_grids[arr[i][k]].innerText = botPlayer;
                all_grids[arr[i][k]].style.color = '#f1b137';
            }
            bot_win = true;
            isPlayed = true;
            if ( bot_win )
            break;
        }
    }
}

/* 
#########################################################    
functions check if realPlayer Will win with 1 step or not
#########################################################
*/

function check_bot_lose_col() {
    if ( !bot_win ) {
        // check Columns
        botLose(colArr)
    }
}

function check_bot_lose_row() {
    if ( !bot_win ) {
        // check Rows
        botLose(rowArr)
    }
}

function check_bot_lose_DR() {
    if ( !bot_win ) {
        // check Dr
        botLose(drArr)
    }
}

function botLose(arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        let step = 0;
        for ( let j = 0; j < arr[i].length; j++ ) {
            if ( all_grids[arr[i][j]].innerText == yourPlayer ) {
                step++;
            }
            if ( all_grids[arr[i][j]].innerText == botPlayer ) {
                step--;
            }
        }
        // Make Disistion
        if ( step === 2 ) {
            for ( k = 0; k < arr[i].length; k++ ) {
                if ( all_grids[arr[i][k]].innerText == '' ) {
                    all_grids[arr[i][k]].innerText = botPlayer;
                    all_grids[arr[i][k]].style.color = '#f1b137';
                }
            }
            isPlayed = true;
            break;
        }
    }
}

/* 
#########################################################    
   functions check if Bot can win with 2 steps or not
#########################################################
*/

function check_bot_col() {
    if ( !bot_win ) {
        // check columns
        botCheck(colArr)
    }
}

function check_bot_row() {
    if ( !bot_win ) {
        // check Rows
        botCheck(rowArr)
    }
}

function check_bot_DR() {
    if ( !bot_win ) {
        botLose(drArr)
    }
}

function botCheck(arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        let step = 0;
        for ( let j = 0; j < arr[i].length; j++ ) {
            if ( all_grids[arr[i][j]].innerText == botPlayer ) {
                step++;
            }
            if ( all_grids[arr[i][j]].innerText == yourPlayer ) {
                step--;
            }
        }
        // Make Disistion
        if ( step === 1 ) {
            for ( k = 0; k < arr[i].length; k++ ) {
                if ( all_grids[arr[i][k]].innerText == '' ) {
                    all_grids[arr[i][k]].innerText = botPlayer;
                    all_grids[arr[i][k]].style.color = '#f1b137';
                    isPlayed = true;
                    break;
                }
            }
            break;
        }
    }
}

/* 
#########################################################    
           function Bot Pick Random Place
#########################################################
*/

function bot_random() {
    let ins = 0;
    all_grids.forEach(e => {
        e.innerText == '' ? ins++ : '';
    })
    if ( ins > 0 ) {
        let randomNum;
        let rep = true;
        while ( rep ) {
            randomNum = Math.floor(Math.random()*all_grids.length);
            console.log("random",randomNum)
            if ( all_grids[randomNum].innerText == '' ) {
                rep = false;
            }
        }
        all_grids[randomNum].innerText = botPlayer;
        all_grids[randomNum].style.color = '#f1b137';
        isPlayed = true;
    }
}

/* 
#########################################################    
           functions Check If bot or player win
#########################################################
*/

function check_your_win() {
    check_your_win_col();
    check_your_win_row();
    check_your_win_Dr();
    return your_win;
}

function check_your_win_col() {
    // check columns
    playerWin(colArr)
}
function check_your_win_row() {
    // check columns
    playerWin(rowArr)
}
function check_your_win_Dr() {
    // check columns
    playerWin(drArr)
}

function playerWin(arr) {
    for ( let i = 0; i < arr.length; i++ ) {
        let step = 0;
        for ( let j = 0; j < arr[i].length; j++ ) {
            if ( all_grids[arr[i][j]].innerText == yourPlayer ) {
                step++;
            }
            if ( all_grids[arr[i][j]].innerText == botPlayer ) {
                step--;
            }
        }
        // Make Disistion
        if ( step === 3 ) {
            your_win = true;
            break;
        }
    }
}

/* 
#########################################################    
           functions Check If Ties or not
#########################################################
*/

function check_ties() {
    let ins = 0;
    all_grids.forEach(e => {
        e.innerText == '' ? ins++ : '';
    })
    if ( ins === 0 && !your_win && !bot_win)
        isTies = true;
}