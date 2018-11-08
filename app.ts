window.onload = () => {

  const boardSize = 200;
  const canvas = <HTMLCanvasElement>document.getElementById('canvas');
  canvas.width = canvas.height = boardSize*2;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0, 0, 0, 1)';
  
  let matrix = [];
  for(let i=0; i<boardSize+2; i++) matrix.push(getArray());
  matrix[0] = getEmptyArray();
  matrix[matrix.length-1] = getEmptyArray();

  function getEmptyArray() {
    let array = [];
    for(let i=0; i<boardSize+2; i++) array[i] = false;
    return array;
  }

  function getArray() {
    let array = []
    for(let i=0; i<boardSize+2; i++) array[i] = false; 
    for(let i=1; i<(boardSize/100)*3; i++) {
      array[Math.floor(Math.random()*(boardSize-1+1)+1)] = true;
    }
    return array;
  }
  
  function update() {
    for (let i=1; i<matrix.length-1; i++) {
      for (let j=1; j<matrix[0].length-1; j++) {
        let counter = 0;
        if (matrix[i+1][j])counter++;
        if (matrix[i+1][j-1])counter++;
        if (matrix[i+1][j+1])counter++;
        if (matrix[i][j-1])counter++;
        if (matrix[i][j+1])counter++;
        if (matrix[i-1][j])counter++;
        if (matrix[i-1][j-1])counter++;
        if (matrix[i-1][j+1])counter++;
        if(matrix[i][j]) {
          if(counter<2) {
            matrix[i][j]=false;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillRect(i*2,j*2,2,2);
          }
          if(counter>3) {
            matrix[i][j]=false;
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillRect(i*2,j*2,2,2);
          }
        }  
        else if(counter==3) {
          matrix[i][j]=true; 
          ctx.fillStyle = 'rgba(0, 0, 0, 1)';
          ctx.fillRect(i*2,j*2,2,2); 
        }        	
      }
    }
  }
  window.requestAnimationFrame(draw);
  function draw() {
    update();
    window.requestAnimationFrame(draw);
  }
};