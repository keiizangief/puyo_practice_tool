const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cellsize = 32;
let roundwidth = 0;
let roundheight = 0;
let mapdispleft = 0;
let mapdisptop = 0;
let rounddata = [];
let roundnum = 1;
let tamadata = [];
let nexttama = 0;
let bottomidx = [];
let gamemode = 1;
let countdown = 0;
let startTime = 0;
let endTime = 0;
let elapsedTime = 0;
let successcount = 0;
let misscount = 0;
let highscore = 3600000;
let highscoreP = 3600000;

const colortable = [
  '#000000',
  '#0000FF',
  '#FF0000',
  '#FF00FF',
  '#00FF00',
  '#00FFFF',
  '#FFFF00',
  '#FFFFFF',
  '#C0C0C0',
  '#C0C0FF',
  '#FFC0C0',
  '#FFC0FF',
  '#C0FFC0',
  '#C0FFFF',
  '#FFFFC0',
  '#FFFFFF'
];

const roundSelectButton = {
  vector: [
  { x: 4, y: 15 },
  { x: 27, y: 4 },
  { x: 27, y: 27 },
  { x: 4, y: 16 }
  ],
  color: 'blue'
};

const perfectStar = {
  vector: [
  { x: 15, y: 1  },
  { x: 12, y: 8  },
  { x: 3, y: 8 },
  { x: 11, y: 16 },
  { x: 8, y: 28 },
  { x: 15, y: 21 },
  { x: 16, y: 21 },
  { x: 23, y: 28 },
  { x: 20, y: 16 },
  { x: 28, y: 8 },
  { x: 19, y: 8 },
  { x: 16, y: 1 }
  ],
  color: 'yellow'
};

class Round {
  constructor(data) {
    this.data = data;
    this.width = data[0].length;
    this.height = data.length;
  }
  
  getValue(x, y) {
    return this.data[y][x];
  }
}

class Tama {
  constructor(tamax, tamay, tamacolor) {
    this.x = tamax;
    this.y = tamay;
    this.color = tamacolor;
    this.disp = 1;
    this.mode = 1;
    this.distx = 0;
    this.disty = 0;
  }
}

const rounddata0 = [
  [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
  [6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5],
  [5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4],
  [4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3],
  [3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2],
  [2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1],
  [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
  [6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5],
  [5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4],
  [4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3],
  [3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2],
  [2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1]
];

const rounddata1 = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 2, 3, 4, 0, 0],
  [0, 1, 2, 3, 4, 0],
  [0, 1, 2, 3, 4, 0],
  [1, 1, 2, 3, 4, 0]
];

const rounddata2 = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 2, 3, 4, 0],
  [0, 1, 1, 2, 3, 0],
  [0, 1, 2, 3, 4, 0],
  [0, 1, 2, 3, 4, 4]
];

const rounddata3 = [
  [1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4],
  [1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4],
  [1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4]
];

const rounddata4 = [
  [1, 2, 3, 4, 1, 2],
  [1, 2, 3, 4, 1, 2],
  [1, 2, 3, 4, 1, 2],
  [3, 4, 1, 2, 3, 4],
  [3, 4, 1, 2, 3, 4],
  [3, 4, 1, 2, 3, 4]
];

const rounddata5 = [
  [2, 2, 3, 3, 4, 4],
  [2, 2, 3, 3, 4, 4],
  [1, 1, 2, 2, 3, 3],
  [1, 1, 2, 2, 3, 3],
  [4, 4, 1, 1, 2, 2],
  [4, 4, 1, 1, 2, 2]
];

const rounddata6 = [
  [1, 4, 2, 3, 4, 1],
  [1, 1, 4, 2, 3, 2],
  [2, 1, 4, 2, 3, 4],
  [1, 4, 2, 3, 4, 4],
  [2, 1, 3, 4, 3, 2],
  [1, 3, 4, 3, 3, 2],
  [2, 1, 3, 4, 1, 2],
  [2, 1, 3, 4, 3, 1],
  [2, 3, 4, 1, 2, 1],
  [1, 2, 3, 4, 1, 2],
  [1, 2, 3, 4, 1, 2],
  [1, 2, 3, 4, 1, 2]
];

const rounddata7 = [
  [4, 1, 3, 4, 1, 4],
  [1, 1, 2, 3, 4, 1],
  [1, 4, 4, 2, 3, 4],
  [4, 2, 2, 3, 4, 1],
  [1, 4, 1, 2, 3, 1],
  [3, 4, 1, 2, 3, 4],
  [4, 1, 2, 3, 4, 4],
  [3, 4, 1, 2, 3, 2],
  [3, 2, 3, 4, 1, 2],
  [3, 1, 2, 3, 4, 1],
  [1, 2, 3, 4, 1, 2],
  [1, 2, 3, 4, 1, 2]
];

const rounddata8 = [
  [3, 3, 3, 2, 1, 4],
  [1, 3, 2, 1, 3, 3],
  [3, 4, 2, 1, 3, 4],
  [4, 1, 3, 2, 1, 4],
  [2, 3, 2, 1, 3, 4],
  [1, 1, 3, 2, 1, 3],
  [2, 1, 3, 2, 1, 3],
  [2, 2, 4, 4, 2, 2],
  [3, 3, 3, 2, 3, 2],
  [1, 2, 4, 3, 1, 3],
  [1, 1, 2, 1, 1, 3],
  [2, 2, 4, 4, 4, 1]
];

const rounddata9 = [
  [3, 2, 1, 1, 3, 2],
  [2, 1, 1, 2, 3, 1],
  [2, 2, 4, 2, 2, 3],
  [3, 3, 3, 4, 3, 1],
  [2, 4, 4, 2, 1, 1],
  [3, 2, 1, 4, 3, 2],
  [2, 1, 4, 3, 2, 2],
  [2, 2, 1, 4, 3, 3],
  [3, 3, 1, 4, 2, 2],
  [3, 1, 4, 2, 3, 2],
  [2, 2, 1, 4, 4, 3],
  [2, 1, 1, 4, 3, 3]
];

rounddata[0] = new Round(rounddata0);
rounddata[1] = new Round(rounddata1);
rounddata[2] = new Round(rounddata2);
rounddata[3] = new Round(rounddata3);
rounddata[4] = new Round(rounddata4);
rounddata[5] = new Round(rounddata5);
rounddata[6] = new Round(rounddata6);
rounddata[7] = new Round(rounddata7);
rounddata[8] = new Round(rounddata8);
rounddata[9] = new Round(rounddata9);

const maxround = 9;

function mapinit() {
  roundwidth = rounddata[roundnum].width;
  roundheight = rounddata[roundnum].height;
  mapdispleft = 1 * cellsize;
  mapdisptop = (14 - roundheight) * cellsize;
  
  bottomidx = [];
  for (let x = 0; x < roundwidth; x++) {
    bottomidx[x] = roundheight - 1;
  }
  
  successcount = 0;
  misscount = 0;
  
  tamainit();
  
  // ハイスコア読込み 20241223
  highscore = getHighScore(roundnum);
  highscoreP = getHighScoreP(roundnum);
}

function tamainit() {
  tamadata = [];
  
  let mapidx = [];
  for (let x = 0; x < roundwidth; x++) {
    mapidx[x] = roundheight - 1;
  }
  for (let i = 0; i < (roundwidth * roundheight); i++) {
    let x = getRandomNonNegativeIndex(mapidx);
    let value = rounddata[roundnum].getValue(x, mapidx[x]);
    if (value != 0) {
      tamadata.push(new Tama((2 + roundwidth) * cellsize, 13 * cellsize, value));
    }
    mapidx[x]--;
  }

  nexttama = 0;
}

function getRandomNonNegativeIndex(arr) {
  while (true) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    if (arr[randomIndex] >= 0) {
      return randomIndex;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawCell();
  drawRound();
  drawTama();
  drawRoundSelect();
  drawStartButton();
  drawGiveupButton();
  drawTime();
  drawHighScore();
  
  if (successcount === tamadata.length) {
    drawClear();
  }

}

function drawCell() {
  ctx.strokeStyle = 'black';
  for (let i = 0; i < canvas.width; i = i + cellsize) {
    for (let j = 0; j < canvas.height; j = j + cellsize) {
      ctx.strokeRect(i, j, cellsize, cellsize);
    }
  }
}

function drawRound() {
  for (let y = 0; y < roundheight; y++) {
    for (let x = 0; x < roundwidth; x++) {
      const value = rounddata[roundnum].getValue(x, y) + 8;
      ctx.fillStyle = colortable[value];
      ctx.fillRect(mapdispleft + (x * cellsize), mapdisptop + (y * cellsize), cellsize, cellsize);
    }
  }
}

function drawTama() {
  for (let i = 0; i < tamadata.length; i++) {
    if (tamadata[i].disp === 1) {
      ctx.fillStyle = colortable[tamadata[i].color];
      ctx.fillRect(tamadata[i].x, tamadata[i].y, cellsize, cellsize);
      // 枠線描画
      ctx.lineWidth = 3;
      ctx.strokeStyle = colortable[15];
      ctx.strokeRect(tamadata[i].x, tamadata[i].y, cellsize , cellsize);
      ctx.lineWidth = 1;
    }
  }
}

function drawRoundSelect() {
  drawShape(roundSelectButton, 16 * cellsize, 2 * cellsize, cellsize, 0, 0);
  drawShape(roundSelectButton, 18 * cellsize, 2 * cellsize, cellsize, 0, 1);

  ctx.font = '16px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'blue';
  ctx.fillText(roundnum , 17 * cellsize + (cellsize / 2), 2 * cellsize + (cellsize / 2));
}

function drawStartButton() {
  switch (gamemode) {
    case 1:
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'red';
      ctx.fillText('Start!' , 17 * cellsize + (cellsize / 2), 4 * cellsize + (cellsize / 2));
      ctx.strokeStyle = 'red';
      ctx.strokeRect(16 * cellsize, 4 * cellsize, cellsize * 3, cellsize);
      break;
    case 2:
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'red';
      ctx.fillText(countdown, 17 * cellsize + (cellsize / 2), 4 * cellsize + (cellsize / 2));
      ctx.strokeStyle = 'red';
      ctx.strokeRect(16 * cellsize, 4 * cellsize, cellsize * 3, cellsize);
      break;
    case 3:
      ctx.font = '30px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'red';
      ctx.fillText('GO!', 17 * cellsize + (cellsize / 2), 4 * cellsize + (cellsize / 2));
      ctx.strokeStyle = 'red';
      ctx.strokeRect(16 * cellsize, 4 * cellsize, cellsize * 3, cellsize);
      break;
  }
}

function drawGiveupButton() {
  switch (gamemode) {
    case 3:
      ctx.font = '18px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'green';
      ctx.fillText('Give up', 17 * cellsize + (cellsize / 2), 5 * cellsize + (cellsize / 2));
      ctx.strokeStyle = 'green';
      ctx.strokeRect(16 * cellsize, 5 * cellsize, cellsize * 3, cellsize);
      break;
  }
}

function drawTime() {
  if (startTime === 0) {
    elapsedTime = 0;
  } else {
    if (endTime === 0) {
      elapsedTime = Date.now() - startTime;
    } else {
      elapsedTime = endTime - startTime;
    }
  }
  ctx.font = '30px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(millisecondsToTimeString(elapsedTime), 17 * cellsize + (cellsize / 2), 6 * cellsize + (cellsize / 2));
}

function drawHighScore() {
  ctx.font = '30px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText('HighScore', 17 * cellsize + (cellsize / 2), 12 * cellsize + (cellsize / 2));

  ctx.font = '26px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(millisecondsToTimeString(highscore), 17 * cellsize + (cellsize / 2), 13 * cellsize + (cellsize / 2));

  drawShape(perfectStar, 15 * cellsize, 14 * cellsize, cellsize, 0, 0);

  ctx.font = '26px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(millisecondsToTimeString(highscoreP), 17 * cellsize + (cellsize / 2), 14 * cellsize + (cellsize / 2));
}

function millisecondsToTimeString(milliseconds) {
  // ミリ秒を各単位に分割
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  // 各単位を2桁で表示するためのゼロパディング
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedCentiseconds = String(centiseconds).padStart(2, '0');

  // 各単位を連結
  return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
}

function drawClear() {
  ctx.font = '30px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'red';
  ctx.fillText('Clear!' , 17 * cellsize + (cellsize / 2), 8 * cellsize + (cellsize / 2));
  
  if (misscount === 0) {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'red';
    ctx.fillText('Perfect!' , 17 * cellsize + (cellsize / 2), 9 * cellsize + (cellsize / 2));
  }
  
  if (elapsedTime < highscore) {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'red';
    ctx.fillText('HigeScore!' , 17 * cellsize + (cellsize / 2), 10 * cellsize + (cellsize / 2));
    highscore = elapsedTime;
    // ハイスコア保存 20241223
    saveHighScore(roundnum, elapsedTime);
  } 

  if ((misscount === 0) && (elapsedTime < highscoreP)) {
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'red';
    ctx.fillText('HigeScore!' , 17 * cellsize + (cellsize / 2), 10 * cellsize + (cellsize / 2));
    highscoreP = elapsedTime;
    // ハイスコア保存 20241223
    saveHighScoreP(roundnum, elapsedTime);
  }
}

function saveHighScore(stage, score) {
  localStorage.setItem(`PuyoRen_001_stage${stage}HighScore`, score);
}

function saveHighScoreP(stage, score) {
  localStorage.setItem(`PuyoRen_001_stage${stage}HighScoreP`, score);
}

function getHighScore(stage) {
  return parseInt(localStorage.getItem(`PuyoRen_001_stage${stage}HighScore`)) || 3600000;
}

function getHighScoreP(stage) {
  return parseInt(localStorage.getItem(`PuyoRen_001_stage${stage}HighScoreP`)) || 3600000;
}

function countStart() {
  countdown = 4;

  function calcCount() {
    countdown--;
    
    if (countdown === 0) {
      // カウントダウン終了時の処理
      startTime = Date.now();
      endTime = 0;
      elapsedTime = 0;
      gamemode = 3;
    } else {
      setTimeout(calcCount, 1000);
    }

  }

  calcCount(); // カウントダウン開始
}

function drawShape(shapeData, offsetX, offsetY, cellsizeS, rotateR, refrectF) {
  // Create a copy of shapeData to avoid overwriting the original
  const shapeDataCopy = JSON.parse(JSON.stringify(shapeData));
  const drawpath = [...shapeDataCopy.vector];

  if (refrectF === 1) {
    for (let i = 0; i < drawpath.length; i++) {
      drawpath[i].x = cellsizeS - drawpath[i].x - 1;
    }
  }

  switch (rotateR) {
    case 90:
      for (let i = 0; i < drawpath.length; i++) {
        let x = drawpath[i].x;
        let y = drawpath[i].y;
        drawpath[i].x = cellsizeS - y - 1;
        drawpath[i].y = x;
      }
      break;
    case 180:
      for (let i = 0; i < drawpath.length; i++) {
        drawpath[i].x = cellsizeS - drawpath[i].x - 1;
        drawpath[i].y = cellsizeS - drawpath[i].y - 1;
      }
      break;
    case 270:
      for (let i = 0; i < drawpath.length; i++) {
        let x = drawpath[i].x;
        let y = drawpath[i].y;
        drawpath[i].x = y;
        drawpath[i].y = cellsizeS - x - 1;
      }
      break;  
  }

  ctx.beginPath();
  ctx.moveTo(drawpath[0].x + offsetX, drawpath[0].y + offsetY);
  for (let i = 1; i < drawpath.length; i++) {
    ctx.lineTo(drawpath[i].x + offsetX, drawpath[i].y + offsetY);
  }
  ctx.closePath();
  ctx.fillStyle = shapeData.color;
  ctx.fill();
}

function tamamove() {
  for (let i = 0; i < tamadata.length; i++) {
    switch (tamadata[i].mode) {
      case 1:
        tamadata[i].y = tamadata[i].y - 4;
        if (i != nexttama) {
          let previdx = getPrevTamaIndex(i);
          if (tamadata[previdx].mode === 1) {
            if (tamadata[i].y < (tamadata[previdx].y + cellsize)) {
              tamadata[i].y = tamadata[i].y + 4;
            }
          }
        }
        if (tamadata[i].y < mapdisptop) {
          tamadata[i].y = mapdisptop;
        }
        break;
      case 2:
        tamadata[i].y = tamadata[i].y - 4;
        if (tamadata[i].y < (mapdisptop - cellsize)) {
          tamadata[i].y = (mapdisptop - cellsize);
          tamadata[i].mode = 3;
        }
        break;
      case 3:
        tamadata[i].x = tamadata[i].x - 4;
        if (tamadata[i].x < tamadata[i].distx) {
          tamadata[i].x = tamadata[i].distx;
          tamadata[i].mode = 4;
        }
        break;
      case 4:
        tamadata[i].y = tamadata[i].y + 4;
        if (tamadata[i].disty != 0) {
          if (tamadata[i].y > tamadata[i].disty) {
            tamadata[i].y = tamadata[i].disty;
            tamadata[i].mode = 7;
            successcount++;
            if (successcount === tamadata.length) {
              gameClear();
            }
          }
        } else {
          if (tamadata[i].y > (14 * cellsize)) {
            tamadata[i].y = (14 * cellsize);
            tamadata[i].mode = 5;
            misscount++;
          }
        }
        break;
      case 5:
        tamadata[i].x = tamadata[i].x + 4;
        if (tamadata[i].x > ((2 + roundwidth) * cellsize)) {
          tamadata[i].x = ((2 + roundwidth) * cellsize);
          tamadata[i].mode = 6;
        }
        break;
      case 6:
        tamadata[i].y = tamadata[i].y - 4;
        if (tamadata[i].y < (13 * cellsize)) {
          tamadata[i].y = (13 * cellsize);
          tamadata[i].mode = 1;
        }
        break;
    }
  }
}

function gameStart() {
  mapinit();
  draw();

  gamemode = 2;
  startTime = 0;
  countStart();
}

function gameClear() {
  endTime = Date.now();
  gamemode = 1;
}

function gameGiveup() {
  gamemode = 1;
}

function getNextTamaIndex(nowidx) {
  let nextIndex = nowidx;
  
  do {
    nextIndex = (nextIndex + 1) % tamadata.length;
  } while ((tamadata[nextIndex].disty != 0) && (nextIndex != nowidx));
  
  return nextIndex;
}

function getPrevTamaIndex(nowidx) {
  let prevIndex = nowidx;
  
  do {
    prevIndex = (prevIndex - 1 + tamadata.length) % tamadata.length;
  } while ((tamadata[prevIndex].disty != 0) && (prevIndex != nowidx));
  
  return prevIndex;
}

mapinit();
draw();

setInterval(function() {
  if ((gamemode === 2) || (gamemode === 3)) {
    tamamove();
    draw();
  }
}, 10);

// キャンバスをクリックした時のイベントリスナー
canvas.addEventListener('click', (event) => {
  // キャンバス要素の左上からの相対座標を取得
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const mapx = Math.floor(x / cellsize);
  const mapy = Math.floor(y / cellsize);

  switch (gamemode) {
    case 1:
      if ((mapx === 16) && (mapy === 2) && (roundnum > 0)) {
        roundnum--;
        startTime = 0;
        mapinit();
        draw();
      }
      if ((mapx === 18) && (mapy === 2) && (roundnum < maxround)) {
        roundnum++;
        startTime = 0;
        mapinit();
        draw();
      }

      if ((mapx >= 16) && (mapx <= 18) && (mapy === 4)) {
        gameStart();
      }
      break;
    case 2:
      break;
    case 3:
      if ((mapx >= 1) && (mapx <= roundwidth) && (mapy >= 0) && (mapy <= 14)) {
        let roundx = mapx - 1;
        if (bottomidx[roundx] != -1) {
          if (tamadata[nexttama].mode === 1) {
            tamadata[nexttama].distx = mapx * cellsize;
            tamadata[nexttama].mode = 2;
            if (tamadata[nexttama].color === rounddata[roundnum].getValue(roundx, bottomidx[roundx])) {
              tamadata[nexttama].disty = ((14 - roundheight + bottomidx[roundx]) * cellsize);
              bottomidx[roundx]--;
            }
            nexttama = getNextTamaIndex(nexttama);
          }
        }
      }
      if ((mapx >= 16) && (mapx <= 18) && (mapy === 5)) {
        gameGiveup();
      }
      break;
  }
});
