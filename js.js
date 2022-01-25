const d = document;

const colorA = 'aqua',
  colorB = 'lightcoral';

const time = 30;
const bigCircle = 
  d.getElementsByClassName('big-circle')[0];
const smallCircle = 
  d.getElementsByClassName('small-circle')[0];

let bigGradientCurrentDegree = 0;
let smallGradientCurrentDegree = 180;

let mousePos = [];

function normalizeDegree(degree){
  return degree % 360;
}

function moveBigGradient(degrees){
  let totalDegree = normalizeDegree(bigGradientCurrentDegree + degrees)
  bigCircle.style.background = `linear-gradient(${totalDegree}deg, ${colorA}, ${colorB})`
  bigGradientCurrentDegree = totalDegree;
}

function moveSmallGradient(degrees){
  let totalDegree = normalizeDegree(smallGradientCurrentDegree - degrees)
  smallCircle.style.background = `linear-gradient(${totalDegree}deg, ${colorA}, ${colorB})`
  smallGradientCurrentDegree = totalDegree;
}
/* 
setInterval(() => moveSmallGradient(5), 15);
setInterval(() => moveBigGradient(5), 40) */

bigCircle.addEventListener('mousemove', handleMouseMove)

function handleMouseMove(e){
  bigCircle.removeEventListener('mousemove', handleMouseMove)

  if(!mousePos[0]){
    setTimeout(() => {
      mousePos.push({x: e.clientX, y: e.clientY})
      bigCircle.addEventListener('mousemove', handleMouseMove)
    }, time)
    return;
  }
  else{
    setTimeout(() => {
      mousePos.push({x: e.clientX, y: e.clientY});
      bigCircle.addEventListener('mousemove', handleMouseMove);
      let speed = getMouseSpeed(mousePos[0], mousePos[1]);

      smoothTransition(Math.floor(speed*20), moveBigGradient)
      smoothTransition(Math.floor(speed*20), moveSmallGradient)

      mousePos = [];
    }, time)
  }
}

function getMouseSpeed(initial, final){
  let xSpeed = Math.abs(initial.x - final.x) / time;
  let ySpeed = Math.abs(initial.y - final.y) / time;
  let totalSpeed = xSpeed + ySpeed;
  if(totalSpeed > 15) totalSpeed = 15;
  return totalSpeed;
}

function smoothTransition(deg, f){
  let i = 0;
  let interval = setInterval(() => {f(deg/20); i++; if(i==20) clearInterval(interval)}, time);
}