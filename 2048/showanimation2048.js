function showNumberWidthAnimation(i,j,randNumber){
	var numberCell=$("#number-cell-"+i+"-"+j);

	numberCell.css("background-color",getNumberBackGroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);

	numberCell.animate({
		width:cellSideLength+"px",
		height:cellSideLength+"px",
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},200);
}
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}