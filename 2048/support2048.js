documentWidth=window.screen.availWidth;
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

function getPosTop(i,j){
	return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace+j*(cellSpace+cellSideLength);
}

function getNumberBackGroundColor(number){
	switch(number){
		case 2:return "#eee4de";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}
 function getNumberColor(number){
 	if(number<=4){
 		return "#776e65";
 	}
 	return "white";
 }

 function nospace(board){
 	for(var i=0;i<4;i++){
 		for(var j=0;j<4;j++){
 			if(board[i][j]==0)
 				return false;
 		}
 	}
 	return true;
 }

 function canMove(x,y,board){
 	if(x=="left"){
 		x=-1;
 		l=1;//左移时第一列不用考虑
 		r=4;//考虑1,2,3
 	}
 	else if(x=="right"){
 		x=1;
 		l=0;//右移时第4列不用考虑
 		r=3;//考虑0,1,2
 	}
 	else{
 		x=0;
 		l=0;
 		r=4;
 	}
 	if(y=="up"){
 		y=-1;
 		t=1;
 		d=4;
 	}
 	else if(y=="down"){
 		y=1;
 		t=0;
 		d=3;
 	}
 	else{
 		y=0;
 		t=0;
 		d=4;
 	}
 	for(var i=t;i<d;i++)
 		for(var j=l;j<r;j++)
 			if(board[i][j]!=0){
 				if(board[i+y][j+x]==0 || board[i+y][j+x]==board[i][j]){
 					return true;
 				}
 			}
 	return false;
 }

 function noBlockHorizontal(row1,col1,row2,col2,board){

 	//水平方向是否没有障碍
 	if(row2==false){
 	    for(var i=col1+1;i<col2;i++){
 		    if(board[row1][i]!=0){
 			    return false;
 		    }
 	    }
 	    return true;
    }

    //垂直方向是否没有障碍
    else if(col2==false){
    	for(var i=row1+1;i<row2;i++){
 		    if(board[i][col1]!=0){
 			    return false;
 		    }
 	    }
 	    return true;
    }
 }
function nomove(board){
	if(canMove("left",false,board)||canMove("right",false,board)||
	canMove(false,"up",board)||canMove(false,"down",board)){
		return false;
	}
	return true;
}