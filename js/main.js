import Level from './level.model';
import Player from './player.model';

let screen;
let ctx;

window.onload = start;


const screenWidth = 500;
const screenHeight = 500;
const FPS = 50;

const wallColor = '#000000';
const floorColor = '#666666';
const playerColor = '#0a3ead';
const playerWidth = 6;


let level;
let player;


const terrain = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
];


function start () {
    screen = document.getElementById('canvas');

    ctx = screen.getContext('2d');

    screen.width = screenWidth;
    screen.height = screenHeight;

    level = new Level({ screen, ctx, terrain, wallColor, floorColor });
    player = new Player({ ctx, level, x: 100, y: 100, playerColor, playerWidth });
    player.setupControls();


    setInterval(mainLoop, 1000/FPS);

}

function clearScreen () {
    screen.width = screen.width;
    screen.height = screen.height;
}

function mainLoop () {
    clearScreen();
    level.draw(); 
    player.draw();
    player.move();
}