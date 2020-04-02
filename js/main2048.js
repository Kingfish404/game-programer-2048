var board = [];
var score = 0;
var moveCharge=[];
var startX = 0;
var startY =0;
var endX =0;
var endY=0;

$(document).ready(function () {
    prepareForMobile();
    newGame();
});

function prepareForMobile() {
    if(documentWidth>550){
        boxWidth=460;
        cellWidth=100;
        side=20;
    }
    $("#game").css("height",documentHeight*0.75);
    $("#box").css("width",boxWidth);
    $("#box").css("height",boxWidth);
    $("#box").css("padding",side);
    $("#box").css("border-radius",0.02*boxWidth);

    $(".cell").css("width",cellWidth);
    $(".cell").css("height",cellWidth);
    $(".cell").css("border-radius","5px");
}

function newGame() {
    //初始化棋盘布局
    init();
    //随机生成两个数字
    addOneNumber();
    addOneNumber();
}

function Keydown() {
    console.log(event.keyCode);
    switch (event.keyCode) {
        case 87:
        case 38:
            event.preventDefault();
            if(moveUp()){
                setTimeout(function () {
                    addOneNumber();
                    ifGameOver();
                },200);
        }
            break;
        case 65:
        case 37:
            event.preventDefault();
            if(moveLeft()){
                setTimeout(function () {
                    addOneNumber();
                    ifGameOver();
                },200);
        }
            break;
        case 68:
        case 39:
            event.preventDefault();
            if(moveRight()){
                setTimeout(function () {
                    addOneNumber();
                    ifGameOver();
                },200);
        }
            break;
        case 83:
        case 40:
            event.preventDefault();
            if(moveDown()){
            setTimeout(function () {
                addOneNumber();
                ifGameOver();
            },200);
        }
            break;
        default:
            break;
    }
}

document.addEventListener("touchstart",function (event) {
    startX=event.touches[0].pageX;
    startY=event.touches[0].pageY;
});
document.addEventListener("touchend",function (event) {
    endX=event.changedTouches[0].pageX;
    endY=event.changedTouches[0].pageY;

    var deltaX=endX-startX;
    var deltaY=endY-startY;
    if(Math.abs(deltaX)<cellWidth/2&&Math.abs(deltaY)<cellWidth/2)
        return ;

    if(Math.abs(deltaX)<Math.abs(deltaY)) {
        if(deltaY>0){
            if(moveDown()){
                setTimeout(function () {
                    addOneNumber();
                    ifGameOver();
                },200);
            }
        }
        else
            if(moveUp()){
            setTimeout(function () {
                addOneNumber();
                ifGameOver();
            },200);
        }
    }
    else if(Math.abs(deltaX)>Math.abs(deltaY)){
            if(deltaX>0){
                if(moveRight()){
                    setTimeout(function () {
                        addOneNumber();
                        ifGameOver();
                    },200);
                }
            }
            else
                if(moveLeft()){
                setTimeout(function () {
                    addOneNumber();
                    ifGameOver();
                },200);
            }
        }
});

function moveUp() {
    if(canMoveUp()){
        for(var r=1;r<4;r++)
            for(var c=0;c<4;c++)
                if(board[r][c]!==0)
                    for(var n=0;n<r;n++){
                        if(board[n][c]===0&&noTraverseUp(r,c,n,board)){
                            moveNumberAnimate(r,c,n,c);
                            board[n][c]=board[r][c];
                            board[r][c]=0;
                        }
                        else if(board[n][c]===board[r][c]&&noTraverseUp(r,c,n,board)&&moveCharge[n][c]){
                            moveNumberAnimate(r,c,n,c);
                            board[n][c]+=board[r][c];
                            board[r][c]=0;
                            moveCharge[n][c]=false;
                        }
                    }
        return true;
    }
        return false;
}
function moveLeft() {
    if(canMoveLeft()){
        for(var c=1;c<4;c++)
            for(var r=0;r<4;r++)
                if(board[r][c]!==0)
                    for(var n=0;n<c;n++){
                        if(board[r][n]===0&&noTraverseLeft(r,c,n,board)){
                            moveNumberAnimate(r,c,r,n);
                            board[r][n]=board[r][c];
                            board[r][c]=0;
                        }
                        else if(board[r][n]===board[r][c]&&noTraverseLeft(r,c,n,board)&&moveCharge[n][c]){
                            moveNumberAnimate(r,c,r,n);
                            board[r][n]+=board[r][c];
                            board[r][c]=0;
                            moveCharge[n][c]=false;
                        }
                    }
        return true;
    }
    return false;
}
function moveRight() {
    if(canMoveRight()){
        for(var c=2;c>=0;c--)
            for(var r=0;r<4;r++)
                if(board[r][c]!==0)
                    for(var n=3;n>c;n--)
                    {
                        if(board[r][n]===0&&noTraverseRight(r,c,n,board)){
                            moveNumberAnimate(r,c,r,n);
                            board[r][n]=board[r][c];
                            board[r][c]=0;
                        }
                        else if(board[r][n]===board[r][c]&&noTraverseRight(r,c,n,board)&&moveCharge[n][c]){
                            moveNumberAnimate(r,c,r,n);
                            board[r][n]+=board[r][c];
                            board[r][c]=0;
                            moveCharge[n][c]=false;
                        }
                    }
        return true;
    }
    return false;
}
function moveDown() {
    if(canMoveDown()){
        for(var r=2;r>=0;r--)
            for(var c=3;c>=0;c--)
                if(board[r][c]!==0)
                    for(var n=3;n>r;n--){
                        if(board[n][c]===0&&noTraverseDown(r,c,n,board)){
                            moveNumberAnimate(r,c,n,c);
                            board[n][c]=board[r][c];
                            board[r][c]=0;
                        }
                        else if(board[n][c]===board[r][c]&&noTraverseDown(r,c,n,board)&&moveCharge[n][c]){
                            moveNumberAnimate(r,c,n,c);
                            board[n][c]+=board[r][c];
                            board[r][c]=0;
                            moveCharge[n][c]=false;
                        }
                    }
        return true;
    }
    return false;
}

function init() {
    // 初始化游戏背景场景
    for(var r=0;r<4 ;r ++)
    {
        for(var c=0;c<4;c ++)
        {
            var box = document.getElementById("cell-"+r+"-"+c+"");
            box.style.top=getTop(r,c)+"px";
            box.style.left=getLeft(r,c)+"px";
        }
    }
    //  初始化游戏内容
    for(var r=0;r<4;r++) {
        board[r]=[];
        moveCharge[r]=[];
        for (var c = 0; c < 4; c++) {
            board[r][c] = 0 ;
            moveCharge[r][c]=true;
        }
    }
}

function addOneNumber() {
    if(noMorePlace()){
        return false;
    }
    var times=0;
    var randomX = Math.floor(Math.random()*4);
    var randomY = Math.floor(Math.random()*4);
    while (times<16) {
        if(board[randomX][randomY]===0)break;
        randomX = Math.floor(Math.random()*4);
        randomY = Math.floor(Math.random()*4);
        times++;
    }
    if(times===16){
        for(var r=0;r<4;r++)
            for (var c = 0; c < 4; c++) {
                if(board[r][c]===0){
                    randomX=r;
                    randomY=c;
                }
            }
    }
    board[randomX][randomY]=2;
    updateNumber();
}

function updateNumber() {
    $(".number-cell").remove();
    for(var r=0;r<4;r++) {
        for (var c = 0; c < 4; c++) {
            var divs=document.createElement("div");
            divs.id="number-cell-"+r+"-"+c+"";
            divs.className="number-cell";
            divs.style="height:0px;width:0px;top:"+(getTop(r,c)+cellWidth/2)+"px;left:"+(getLeft(r,c)+cellWidth/2)+"px";
            if(board[r][c]===0){divs.style.display="none";}
            document.getElementById("box").appendChild(divs);
        }
    }
    score = 0;
    for(var r=0;r<4;r++)
        for (var c = 0; c < 4; c++) {
            score+=board[r][c];
            var cell = document.getElementById("number-cell-" + r + "-" + c + "");
            cell.innerText = text(board[r][c]);
            textAnimate(r, c, board[r][c]);
            $("#score").text(score-4);
            moveCharge[r][c]=true;
            }
    }