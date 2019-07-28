documentWidth = window.screen.availWidth*0.9;
documentHeight =window.screen.availHeight;
boxWidth = documentWidth*0.92;
side = documentWidth*0.04;
cellWidth = documentWidth*0.18;


function getTop(h, l) {
    return side+h*(side+cellWidth);
}

function getLeft(h, l) {
    return side+l*(side+cellWidth);
}

function noMorePlace() {
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            if(board[r][c]===0){
                return false;
            }
        }
    }
    return true;
}

function textColor(textNumber){
    switch(textNumber){
        case 0:return "#4AA0DD";
        case 2:
        case 4:
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:return "white";
    }
}

function text(textNumber) {
    switch(textNumber){
        case 0:return null;
        case 2:return "菜鸟";
        case 4:return "码农";
        case 8:return "IT民工";
        case 16:return "程序猿";
        case 32:return "程序媛";
        case 64:return "IT工程师";
        case 128:return "开发者";
        case 256:return "架构师";
        case 512:return "技术总监";
        case 1024:return "首席技术官";
        case 2048:return "计算机科学家";
    }
}

function textBackgroundColor(textNumber) {
    switch(textNumber){
        case 0:return "#4AA0DD";
        case 2:return "#a1aab0";
        case 4:return "#88929b";
        case 8:return "#6d7a85";
        case 16:return "#667480";
        case 32:return "#5b6977";
        case 64:return "#485767";
        case 128:return "#143d65";
        case 256:return "#143d65";
        case 512:return "#143d65";
        case 1024:return "#3b4c5c";
        case 2048:return "#2d3f51";
    }
}
function textSize(textNumber) {
    switch(textNumber){
        case 0:return 0;
        case 2:
        case 4:return cellWidth/3;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:return cellWidth/4;
        case 512:
        case 1024:
        case 2048:return cellWidth/5;
    }
}

function canMoveUp() {
    for(var r=1;r<4;r++)
        for(var c=0;c<4;c++)
                if(board[r][c]!==0)
                    if(board[r-1][c]===0||board[r-1][c]===board[r][c])
                        return true;
    return false;
}
function canMoveLeft() {
    for(var c=1;c<4;c++)
        for(var r=0;r<4;r++)
            if(board[r][c]!==0)
                if(board[r][c-1]===0||board[r][c-1]===board[r][c])
                    return true;
    return false;
}
function canMoveRight() {
    for(var c=0;c<3;c++)
        for(var r=0;r<4;r++)
            if(board[r][c]!==0)
                if(board[r][c+1]===0||board[r][c+1]===board[r][c])
                    return true;
    return false;
}
function canMoveDown() {
    for(var r=2;r>=0;r--)
        for(var c=0;c<4;c++)
            if(board[r+1][c]===0||board[r+1][c]===board[r][c])
                return true;
    return false;
}

function ifGameOver() {
    if(noMorePlace()){
        setTimeout(function () {
            if(!canMoveDown()&&!canMoveUp()&&!canMoveLeft()&&!canMoveRight()){
                if(score===520||score===201314) {
                    alert("520 TO YOU,TOO");
                    score=201314;
                    $("#score").text(score);
                }
            else
                {
                    alert("Game over");
                }
            }
        },100);
    }
    else {
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            if(board[r][c]===2048){
                    alert("恭喜你头秃啦");
                }
            }
        }
    }
}

function noTraverseUp(hang, lie, k,board) {
    for(k++;k<hang;k++){
        if(board[k][lie]!==0)return false;
    }
    return true;
}
function noTraverseLeft(hang, lie, k,board) {
    for(k++;k<lie;k++){
        if(board[hang][k]!==0)return false;
    }
    return true;
}
function noTraverseRight(hang, lie, k,board) {
    for(k--;k>lie;k--){
        if(board[hang][k]!==0)return false;
    }
    return true;
}
function noTraverseDown(hang, lie, k,board) {
    for(k--;k>hang;k--)
        if(board[k][lie])
            return false;
    return true;
}