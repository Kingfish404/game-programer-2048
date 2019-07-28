function textAnimate(hang,lie,number) {
    var numberCell =$('#number-cell-'+hang+'-'+lie);
    numberCell.css('color',textColor(number));
    numberCell.css('backgroundColor',textBackgroundColor(number));
    numberCell.css('height',cellWidth+'px');
    numberCell.css('width',cellWidth+'px');
    numberCell.css('line-height',cellWidth+'px');
    numberCell.animate({
        fontSize:textSize(number)+"px",
        top:getTop(hang,lie),
        left:getLeft(hang,lie)
    },0);
}

function moveNumberAnimate(hang,lie,vr,vc) {
    var numberCell =$('#number-cell-'+hang+'-'+lie);
    numberCell.css("zIndex","999");
    numberCell.animate({
        top:getTop(vr,vc),
        left:getLeft(vr,vc)
    },200);
    numberCell.css("zIndex","0");
}