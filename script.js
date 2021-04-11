//------ global varibles ----------------------------------------------------------------------------------
var tileMap01 = {
    width: 19,
    height: 16,
  
    mapGrid: 
    [
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],[" "],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],["W"],["B"],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],["W"],["W"],["W"],[" "],[" "],["B"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],["W"],[" "],[" "],["B"],[" "],["B"],[" "],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ ["W"],["W"],["W"],[" "],["W"],[" "],["W"],["W"],[" "],["W"],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"], ],
      [ ["W"],[" "],[" "],[" "],["W"],[" "],["W"],["W"],[" "],["W"],["W"],["W"],["W"],["W"],[" "],[" "],["G"],["G"],["W"], ],
      [ ["W"],[" "],["B"],[" "],[" "],["B"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],["G"],["G"],["W"], ],
      [ ["W"],["W"],["W"],["W"],["W"],[" "],["W"],["W"],["W"],[" "],["W"],["P"],["W"],["W"],[" "],[" "],["G"],["G"],["W"], ],
      [ [" "],[" "],[" "],[" "],["W"],[" "],[" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"],["W"],["W"],["W"], ],
      [ [" "],[" "],[" "],[" "],["W"],["W"],["W"],["W"],["W"],["W"],["W"],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
      [ [" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "],[" "], ],
    ],
  };
  
  const myBoard = document.getElementById("board");
  var finalPointArray = [];
  var playerId = "";
  
  //------ functions ----------------------------------------------------------------------------------------
  
  function initBoard() {
    var elementCoordinate = "";
  
      for (let gameAreaHeight = 0; gameAreaHeight < tileMap01.height; gameAreaHeight++) {
          for (let gameAreaWidth = 0; gameAreaWidth < tileMap01.width; gameAreaWidth++) {
  
              elementCoordinate = gameAreaWidth + "-" + gameAreaHeight;
  
            if(tileMap01.mapGrid[gameAreaHeight][gameAreaWidth][0] === "P"){
              makeBoxOnBoard("orange", elementCoordinate);
              playerId = elementCoordinate;
            }
            else if (tileMap01.mapGrid[gameAreaHeight][gameAreaWidth][0] === "G"){
              makeBoxOnBoard("green", elementCoordinate);
              finalPointArray.push(elementCoordinate);         
            }
            else if (tileMap01.mapGrid[gameAreaHeight][gameAreaWidth][0] === "W") {
              makeBoxOnBoard("blue", elementCoordinate);
            }
            else if (tileMap01.mapGrid[gameAreaHeight][gameAreaWidth][0] === "B"){
              makeBoxOnBoard("darkred", elementCoordinate);
            }
            else {
              makeBoxOnBoard("lightgray", elementCoordinate);
            }
          }
      }
  }
  
  function makeBoxOnBoard(elementColor, elementCoordinate) {
    var newBox = document.createElement("div");
    newBox.id = elementCoordinate;
    newBox.style.backgroundColor = elementColor;
    newBox.classList.add("box"); 
    document.addEventListener("keydown", executePlayerInput);
    myBoard.appendChild(newBox);
  }
  
  function moveRight(){
    move(1, 2, 0, 0);
  }
  
  function moveLeft(){
    move(-1, -2, 0, 0);
  }
  
  function moveUp(){
    move(0, 0, -1, -2);
  }
  
  function moveDown(){
    move(0, 0, 1, 2);
  }
  
  function move(offset_1, offset_2, offset_3, offset_4){
    var playerElement = null;
    var playerIdString = "";
    var playerIdArray = null;
    var xCoordinate_1 = 0;     // x coordinate of first element to the left/right/top/bottom of playerElement (derived from playerElement x coordinate)
    var xCoordinate_2 = 0;     // x coordinate of second element to the left/right/top/bottom of playerElement (derived from playerElement x coordinate)
    var yCoordinate_1 = 0;     // y coordinate of first element to the left/right/top/bottom of playerElement (derived from playerElement x coordinate)
    var yCoordinate_2 = 0;     // y coordinate of first element to the left/right/top/bottom of playerElement (derived from playerElement x coordinate)
  
    var firstElementId = "";   // id of first element to the left/right/top/bottom of playerElement (derived from playerElement id)
    var secondElementId = "";  // id of second element to the left/right/top/bottom of playerElement (derived from playerElement id)
  
    var firstElement;          //first element to the left/right/top/bottom of playerElement
    var secondElement;         //first element to the left/right/top/bottom of playerElement
    
    playerElement = document.getElementById(playerId);
    playerIdString = playerId.split("-");
    playerIdArray = Array.from(playerIdString);
   
    xCoordinate_1 = Number(playerIdArray[0]) + offset_1;
    xCoordinate_2 = Number(playerIdArray[0]) + offset_2; 
    yCoordinate_1 = Number(playerIdArray[1]) + offset_3;
    yCoordinate_2 = Number(playerIdArray[1]) + offset_4;
   
    firstElementId = xCoordinate_1 + "-" + yCoordinate_1;    // reconstruct firstElement coordinate/id
    secondElementId = xCoordinate_2 + "-" + yCoordinate_2;   // reconstruct secondElement coordinate/id
    firstElement = document.getElementById(firstElementId);
    secondElement = document.getElementById(secondElementId);
    
    if(firstElement.style.backgroundColor === "lightgray" || firstElement.style.backgroundColor === "green"){
      firstElement.style.backgroundColor = playerElement.style.backgroundColor;
      playerElement.style.backgroundColor = "lightgray";
  
     playerId = firstElementId;
    }
    else if(firstElement.style.backgroundColor === "darkred" && secondElement.style.backgroundColor !== "darkred" && secondElement.style.backgroundColor !== "blue"){
      secondElement.style.backgroundColor = firstElement.style.backgroundColor;
      firstElement.style.backgroundColor = playerElement.style.backgroundColor;
      playerElement.style.backgroundColor = "lightgray";
  
    playerId = firstElementId;
    }
  
    refreshGreenAreaAndPlayer();
    checkProgress();
  }
  
  function refreshGreenAreaAndPlayer(){
    for (let i = 0; i < finalPointArray.length; i++) {
      if(document.getElementById(finalPointArray[i]).style.backgroundColor !== "darkred"){
         document.getElementById(finalPointArray[i]).style.backgroundColor = "green";
      }
    }
    document.getElementById(playerId).style.backgroundColor = "orange";
  }
  
  function checkProgress(){
    var totalPoint = 0;
    for (let i = 0; i < finalPointArray.length; i++) {
      if(document.getElementById(finalPointArray[i]).style.backgroundColor === "darkred"){
         totalPoint++;
      }
    }
    
    if(totalPoint == finalPointArray.length){
      alert("Congratulations! You won!");
    }
  }
  
  function executePlayerInput(event){
     if(event.keyCode === 37){
      moveLeft();
     }
     else if(event.keyCode === 38){
      moveUp();
     }
     else if(event.keyCode === 39){
      moveRight();
     }
     else if(event.keyCode === 40){
      moveDown();
     }
    }
  
  //------ run code lines -----------------------------------------------------------------------------------
  
  document.getElementsByTagName("body")[0].style.backgroundColor = "#466d6d";
  initBoard();