var board=new Array();
var hasconflict=new Array();
var score=0;

$(document).ready(function(){

	prepareForMobile();

	//加载完毕就开始一盘游戏
	newgame();
});

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}

	$("#grid-container").css("width",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("height",gridContainerWidth-2*cellSpace);
	$("#grid-container").css("padding",cellSpace);
	$("#grid-container").css("border-radius",gridContainerWidth*0.02);

	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.02*cellSideLength);

}
function newgame(){

	//初始化棋盘格
	init();

	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){

	//给每个格子定位，放在固定的位置
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j) );
			gridCell.css("left",getPosLeft(i,j) );
		}

	//将二维数组的值都变为0,即初始化数据为0
	for(var i=0;i<4;i++){
	board[i]=new Array();
	hasconflict[i]=new Array();
	for(var j=0;j<4;j++)
		board[i][j]=0;
	    hasconflict[i][j]=false;
    }

    //将数据显示在格子里
    score=0;
    updateBoardView();
}

function updateBoardView(){

	//将之前的数据清空
	$(".number-cell").remove();

	//创建4*4的数据的div
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var theNumberCell=$("#number-cell-"+i+"-"+j);

			//若格子的数字为0则不显示
			if(board[i][j]==0){
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
			}
			else if(board[i][j]>=1024){
				theNumberCell.css("width",cellSideLength+"px");
				theNumberCell.css("height",cellSideLength+"px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackGroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			    theNumberCell.css("fontSize","40px");
			}
			else{
				theNumberCell.css("width",cellSideLength+"px");
				theNumberCell.css("height",cellSideLength+"px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberBackGroundColor(board[i][j]));
				theNumberCell.css("color",getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
		hasconflict[i][j]=false;
		}
		$(".number-cell").css("line-height",cellSideLength+"px");
		$(".number-cell").css("font-size",0.6*cellSideLength+"px");

}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
		//随机一个位置
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));

		//随机找50次
		var times=0;
		while(times<50){
			if(board[randx][randy]==0)
				break;
			var randx=parseInt(Math.floor(Math.random()*4));
		    var randy=parseInt(Math.floor(Math.random()*4));
		    times++;
		}
		//随机找50次还没有找到就人工生成一个位置
		while(times==50){
			for(var i=0;i<4;i++)
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}

		//随机一个数字
		var randNumber=Math.random()<0.5?2:4;

		//在随机位置显示随机数字
		board[randx][randy]=randNumber;
		showNumberWidthAnimation(randx,randy,randNumber);

		//updatescore
		updatescore(score);
        setTimeout("updateBoardView()", 200);
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
	    event.preventDefault();
		    if(canMove("left",false,board)){
		    	setTimeout("moveLeft()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		    break;
		case 39://right
	    event.preventDefault();
		    if(canMove("right",false,board)){
		    	setTimeout("moveRight()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		    break;
		case 38://up
	    event.preventDefault();
		    if(canMove(false,"up",board)){
		    	setTimeout("moveUp()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		    break;
		case 40://down
	    event.preventDefault();
		    if(canMove(false,"down",board)){
		    	setTimeout("moveDown()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		    break;
		default://default
		    break; 
	}
});

function moveLeft(){

	for(var i=0;i<4;i++)
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){//当前位置有数字

				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal(i,k,false,j,board)){//该位置是空的
					//move
					showMoveAnimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
					continue;
				    }
				    if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,false,j,board) &&hasconflict[i][k]==false){
					//move
					//add
					showMoveAnimation(i,j,i,k);
					board[i][k]+=board[i][j];
					board[i][j]=0;
					score+=board[i][k];
					hasconflict[i][k]=true;
					continue;
				    }
				}
			}
		}
	setTimeout("updateBoardView()",200);
	return true;
}


function moveRight(){
	for(var i=0;i<4;i++)
		for(var j=2;j>-1;j--){
			if(board[i][j]!=0){//当前位置有数字
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,false,k,board)){//该位置是空的
					//move
					showMoveAnimation(i,j,i,k);
					board[i][k]=board[i][j];
					board[i][j]=0;
					continue;
				    }
				    if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,false,k,board)&&hasconflict[i][k]==false){
					//move
					//add
					showMoveAnimation(i,j,i,k);
					board[i][k]+=board[i][j];
					board[i][j]=0;
					score+=board[i][k];
					hasconflict[i][k]=true;
					continue;
				    }
				}
			}
		}
	setTimeout("updateBoardView()",200);

	return true;
}

function moveUp(){

	for(var i=1;i<4;i++)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){//当前位置有数字

				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockHorizontal(k,j,i,false,board)){//该位置是空的
					//move
					showMoveAnimation(i,j,k,j);
					board[k][j]=board[i][j];
					board[i][j]=0;
					continue;
				    }
				    if(board[k][j]==board[i][j] && noBlockHorizontal(k,j,i,false,board)&&hasconflict[k][j]==false){
					//move
					//add
					showMoveAnimation(i,j,k,j);
					board[k][j]+=board[i][j];
					board[i][j]=0;
					score+=board[i][j];
					hasconflict[k][j]=true;
					continue;
				    }
				}
			}
		}
	setTimeout("updateBoardView()",200);

	return true;
}

function moveDown(){

	for(var i=2;i>-1;i--)
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){//当前位置有数字

				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockHorizontal(i,j,k,false,board)){//该位置是空的
					//move
					showMoveAnimation(i,j,k,j);
					board[k][j]=board[i][j];
					board[i][j]=0;
					continue;
				    }
				    if(board[k][j]==board[i][j] && noBlockHorizontal(i,j,k,false,board)&&hasconflict[i][k]==false){
					//move
					//add
					showMoveAnimation(i,j,k,j);
					board[k][j]+=board[i][j];
					board[i][j]=0;
					score+=board[i][j];
					hasconflict[i][k]=true;
					continue;
				    }
				}
			}
		}
	setTimeout("updateBoardView()",200);

	return true;
}

document.addEventListener("touchstart",function(event){
	startx=event.touches[0].pageX;
	starty=event.touches[0].pageY;
});


document.addEventListener("touchmove",function(event){
	event.preventDefault();	
});


document.addEventListener("touchend",function(event){
	endx=event.changedTouches[0].pageX;
	endy=event.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if(Math.abs(deltax)<0.3*documentWidth && Math.abs(deltay)<0.3*documentWidth){
		return;
	}

	//x方向上滑动
	if(Math.abs(deltax)>=Math.abs(deltay)){

		if(deltax>0){
		    //move right
		    if(canMove("right",false,board)){
		    	setTimeout("moveRight()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		}

		else{
			//move left
			if(canMove("left",false,board)){
		    	setTimeout("moveLeft()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		}

	}

	//y方向上滑动
	else{

		if(deltay>0){
			//move down
			if(canMove(false,"down",board)){
		    	setTimeout("moveDown()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		}

		else{
			//move up
			if(canMove(false,"Up",board)){
		    	setTimeout("moveUp()",200);
		    	setTimeout("generateOneNumber()",200);
		    }
		    	isgameover();
		}

	}
});


function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}
 function gameover(){
 	alert("game over!");
 }

function updatescore(score){
	$("#score").text(score);
}