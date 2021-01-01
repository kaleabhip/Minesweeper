let difficultyOptions = {
    'easy': {
        'size': 10,
        'mines': 12,
    },
    'medium': {
        'size': 15,
        'mines': 30,
    },
    'hard': {
        'size': 20,
        'mines': 55,
    },
};

let newBtn = document.getElementById("new");
let gWindow = document.getElementById("gameWindow");


// Create New Game
let difficultySetting, gameSize, noOfMines, gameGrid, minelist, mineTable, mineMap;

let x;

function checkTile(i, j){
    var bid = "gbtn" + i.toString() + j.toString();
    console.log("Looking for "+bid);
    var el = document.getElementById(bid);

    if (el){
        parent = el.parentElement;
        parent.removeChild(el);
        txt = document.createTextNode(mineMap[i][j]);
        parent.appendChild(txt);

        if (mineMap[i][j] == 0){
            checkTile(i-1, j-1);
            checkTile(i-1, j);
            checkTile(i-1, j+1);
            checkTile(i, j-1);
            checkTile(i, j+1);
            checkTile(i+1, j-1);
            checkTile(i+1, j);
            checkTile(i+1, j+1);
        }
    }
}

function revealTile(e){
    var caller = e.toElement;
    var i = Number(caller.getAttribute("xPos"));
    var j = Number(caller.getAttribute("yPos"));
    var parent = caller.parentElement;
    
    if (mineMap[i][j] == "*"){
        var btnArr = Array.from(document.getElementsByClassName("gameBtn"));
        btnArr.forEach(function(el){
            el.setAttribute("disabled", true);
        });
        // console.log('Hit Mine at '+ i + ", " + j +'!!');
    } else {
        console.log(mineMap[i][j])
        if (mineMap[i][j] == 0){
            checkTile(i-1, j-1);
            checkTile(i-1, j);
            checkTile(i-1, j+1);
            checkTile(i, j-1);
            checkTile(i, j+1);
            checkTile(i+1, j-1);
            checkTile(i+1, j);
            checkTile(i+1, j+1);
        }
        parent.removeChild(caller);
        txt = document.createTextNode(mineMap[i][j]);
        parent.appendChild(txt);
    }
}

function rightClicked(e){
    e.preventDefault();
    var caller = e.toElement;
    var i = Number(caller.getAttribute("xPos"));
    var j = Number(caller.getAttribute("yPos"));
    var parent = caller.parentElement;


    parent.removeChild(caller);
    ic = document.createElement("i");
    ic.setAttribute("class", "fa");
    ic.setAttribute("class", "fas");
    ic.setAttribute("class", "fa-pennant");
    ic.setAttribute("xPos", i);
    ic.setAttribute("yPos", j);
    ic.addEventListener("unrightclick");
    parent.appendChild(ic);

    return false;
}

function drawGameGrid(gameSize, mineMap, gWindow) {
    table = document.createElement("table");
    table.setAttribute("class", "GameGrid");
    table.setAttribute("id", "GameGrid");
    for (i = 0; i < gameSize; i++) {
        tr = document.createElement("tr");
        for (j = 0; j < gameSize; j++) {
            td = document.createElement("td");
            btn = document.createElement("button");
            btn.setAttribute("class","uk-button");
            btn.setAttribute("class","uk-button-default");
            btn.setAttribute("class","gameBtn");
            btn.setAttribute("xPos", i);
            btn.setAttribute("yPos", j);
            var idVal = "gbtn" + i.toString() + j.toString();
            btn.setAttribute("id", idVal);
            btn.onclick = revealTile;
            btn.addEventListener('contextmenu', rightClicked, false);
            // txt = document.createTextNode(mineMap[i][j]);
            td.appendChild(btn);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    };

    gWindow.appendChild(table);
}

createNewGame = function () {
    gWindow.innerHTML = "";

    difficultySetting = document.getElementById("difficulty").value;
    gameSize = difficultyOptions[difficultySetting]["size"];
    noOfMines = difficultyOptions[difficultySetting]["mines"];

    gameGrid = new Array(gameSize);
    for (let i = 0; i < gameSize; i++) {
        gameGrid[i] = new Array(gameSize);
        for (j = 0; j < gameSize; j++) {
            gameGrid[i][j] = 0;
        }
    };
    
    minelist = new Array();
    while (minelist.length < noOfMines) {
        let newMine = [Math.floor(gameSize * Math.random()), Math.floor(gameSize * Math.random())];
        if (minelist.containsArray(newMine) == false) {
            minelist.push(newMine);
        }
    }

    mineTable = new Array(gameSize);
    function createMineTable(gameSize, mineTable, minelist) {
        for (let i = 0; i < gameSize; i++) {
            mineTable[i] = new Array(gameSize);
            for (j = 0; j < gameSize; j++) {
                mineTable[i][j] = "-";
            }
        };
        for (i = 0; i < minelist.length; i++) {
            xcord = minelist[i][0];
            ycord = minelist[i][1];

            mineTable[xcord][ycord] = "*";
        }
    }
    createMineTable(gameSize, mineTable, minelist);

    mineMap = mineTable;
    for (let i = 0; i<gameSize ; i++){
        for(let j = 0; j<gameSize ; j++){
            if (mineMap[i][j] != "*"){
                mineMap[i][j] = 0;
            }
        }
    }
    for (let i = 0; i<gameSize ; i++){
        for(let j = 0; j<gameSize ; j++){
            if (mineMap[i][j] == "*"){
                if (i == 0 && j == 0){
                    if (mineMap[i+1][j] != '*' )mineMap[i+1][j] += 1;
                    if (mineMap[i][j+1] != '*' )mineMap[i][j+1] += 1;
                    if (mineMap[i+1][j+1] != '*' )mineMap[i+1][j+1] += 1;
                } else if(i == 0 && j == gameSize - 1){
                    if (mineMap[i][j-1] != '*' )mineMap[i][j-1] += 1;
                    if (mineMap[i+1][j-1] != '*' )mineMap[i+1][j-1] += 1;
                    if (mineMap[i+1][j] != '*' )mineMap[i+1][j] += 1;
                } else if(i == gameSize - 1 && j == 0){
                    if (mineMap[i-1][j] != '*' )mineMap[i-1][j] += 1;
                    if (mineMap[i-1][j+1] != '*' )mineMap[i-1][j+1] += 1;
                    if (mineMap[i][j+1] != '*' )mineMap[i][j+1] += 1;
                } else if(i == gameSize - 1 && j == gameSize - 1){
                    if (mineMap[i-1][j-1] != '*' )mineMap[i-1][j-1] += 1;
                    if (mineMap[i][j-1] != '*' )mineMap[i][j-1] += 1;
                    if (mineMap[i-1][j] != '*' )mineMap[i-1][j] += 1;
                } else if(i == 0){
                    if (mineMap[i][j-1] != '*' )mineMap[i][j-1] += 1;
                    if (mineMap[i+1][j-1] != '*' )mineMap[i+1][j-1] += 1;
                    if (mineMap[i+1][j] != '*' )mineMap[i+1][j] += 1;
                    if (mineMap[i][j+1] != '*' )mineMap[i][j+1] += 1;
                    if (mineMap[i+1][j+1] != '*' )mineMap[i+1][j+1] += 1;
                } else if(j == 0){
                    if (mineMap[i-1][j] != '*' )mineMap[i-1][j] += 1;
                    if (mineMap[i+1][j] != '*' )mineMap[i+1][j] += 1;
                    if (mineMap[i-1][j+1] != '*' )mineMap[i-1][j+1] += 1;
                    if (mineMap[i][j+1] != '*' )mineMap[i][j+1] += 1;
                    if (mineMap[i+1][j+1] != '*' )mineMap[i+1][j+1] += 1;
                } else if(i == gameSize - 1){
                    if (mineMap[i-1][j-1] != '*' )mineMap[i-1][j-1] += 1;
                    if (mineMap[i][j-1] != '*' )mineMap[i][j-1] += 1;
                    if (mineMap[i-1][j] != '*' )mineMap[i-1][j] += 1;
                    if (mineMap[i-1][j+1] != '*' )mineMap[i-1][j+1] += 1;
                    if (mineMap[i][j+1] != '*' )mineMap[i][j+1] += 1;
                } else if(j == gameSize - 1){
                    if (mineMap[i-1][j-1] != '*' )mineMap[i-1][j-1] += 1;
                    if (mineMap[i][j-1] != '*' )mineMap[i][j-1] += 1;
                    if (mineMap[i+1][j-1] != '*' )mineMap[i+1][j-1] += 1;
                    if (mineMap[i-1][j] != '*' )mineMap[i-1][j] += 1;
                    if (mineMap[i+1][j] != '*' )mineMap[i+1][j] += 1;
                } else{
                    if (mineMap[i-1][j-1] != "*") mineMap[i-1][j-1] += 1;
                    if (mineMap[i][j-1] != "*") mineMap[i][j-1] += 1;
                    if (mineMap[i+1][j-1] != "*") mineMap[i+1][j-1] += 1;
                    if (mineMap[i-1][j] != "*") mineMap[i-1][j] += 1;
                    if (mineMap[i+1][j] != "*") mineMap[i+1][j] += 1;
                    if (mineMap[i-1][j+1] != "*") mineMap[i-1][j+1] += 1;
                    if (mineMap[i][j+1] != "*") mineMap[i][j+1] += 1;
                    if (mineMap[i+1][j+1] != "*") mineMap[i+1][j+1] += 1;
                }
            }
        }
    }

    // function drawMineGrid(gameSize, mineMap, gWindow) {
    //     table = document.createElement("table");
    //     table.setAttribute("class", "GameGrid");
    //     for (i = 0; i < gameSize; i++) {
    //         tr = document.createElement("tr");
    //         for (j = 0; j < gameSize; j++) {
    //             td = document.createElement("td");
    //             txt = document.createTextNode(mineMap[i][j]);
    //             td.appendChild(txt);
    //             tr.appendChild(td);
    //         }
    //         table.appendChild(tr);
    //     };
    //     gWindow.appendChild(table);
    // }

    // drawMineGrid(gameSize, mineMap, gWindow);


    


    drawGameGrid(gameSize, mineMap, gWindow);
};

newBtn.addEventListener('click', createNewGame);

createNewGame();