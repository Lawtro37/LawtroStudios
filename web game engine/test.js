let camRotation = {
    x: 0,
    y: 0
  };
  
  let playerPosition = {
    x: 0,
    z: 0,
    y: -100,
    vx: 0,
    vy: 0,
    vz: 0
  };

let movementSpeed = 3
let maxFallVelocity = 25
let maxVelocety = 300
let touchingFloor = false

let playerBox = {
  size: {
      width: 50,
      height: 75,
      depth: 50
  },
  rotation: {
      x: 0,
      y: 0,
      z: 0
  },
  position: {
      x: 0,
      y: 0,
      z: 0
  },
  type: "box",
  tags: [
    "player"
  ],
  tagButtons: [],
  texture: null,
  image: null,
  visable: false
}

function preload() {
  loadLevel("./save.json")
  loadModel
}
  
function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL)
  placeholder = loadModel('placeholder.obj')
}
  
function draw() {
  background(50, 55, 100)
  playerBox.position.x = playerPosition.x
  playerBox.position.y = playerPosition.y
  playerBox.position.z = playerPosition.z
  playerBox.rotation.x = camRotation.x
  playerBox.rotation.y = camRotation.y
  if(isCollidingWithTag(playerBox, "floor").colliding){
    console.log("touching floor")
    playerPosition.vy = 0
  } else {
    playerPosition.y -= playerPosition.vy
    if(playerPosition.vy >= -maxFallVelocity){
        playerPosition.vy -= 0.5
    }
  }
  scale(3)
  rotateX(camRotation.x);
  rotateZ(camRotation.y);
  push()
  scale(0.5)
  model(placeholder)
  pop()
  translate(playerPosition.x, playerPosition.z, playerPosition.y)
  drawLevel()
  if (keyIsDown(83)) { // S key
    let newX = playerPosition.x - movementSpeed * sin(camRotation.y);
    playerBox.position.x = newX;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.x = newX;
    }
    let newZ = playerPosition.z - movementSpeed * cos(camRotation.y);
    playerBox.position.z = newZ;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.z = newZ;
    }
  }
  if (keyIsDown(87)) { // W key
    let newX = playerPosition.x + movementSpeed * sin(camRotation.y);
    playerBox.position.x = newX;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.x = newX;
    }
    let newZ = playerPosition.z + movementSpeed * cos(camRotation.y);
    playerBox.position.z = newZ;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.z = newZ;
    }
  }
  if (keyIsDown(65)) { // A key
    let newX = playerPosition.x + movementSpeed * cos(camRotation.y);
    playerBox.position.x = newX;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.x = newX;
    }
    let newZ = playerPosition.z - movementSpeed * sin(camRotation.y);
    playerBox.position.z = newZ;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.z = newZ;
    }
  }
  if (keyIsDown(68)) { // D key
    let newX = playerPosition.x - movementSpeed * cos(camRotation.y);
    playerBox.position.x = newX;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.x = newX;
    }
    let newZ = playerPosition.z + movementSpeed * sin(camRotation.y);
    playerBox.position.z = newZ;
    if(!isCollidingWithTag(playerBox, "wall").colliding){
      playerPosition.z = newZ;
    }
  }
  if (keyIsDown(32)) { // Space key
    if(isCollidingWithTag(playerBox, "floor").colliding){
      playerPosition.vy = 10;
      playerPosition.y -= 5
    }
  }
  if(isCollidingWithTag(playerBox, "roof").colliding && playerPosition.vy > 0){
    playerPosition.vy = -2.5
  }
}

function mouseDragged() {
    if (mouseButton === RIGHT) {
      let sensitivity = 0.0020;
      camRotation.y += (pmouseX - mouseX) * sensitivity;
      camRotation.x += (pmouseY - mouseY) * sensitivity;
      mouseXOffset = pmouseX - mouseX;
      mouseYOffset = pmouseY - mouseY;
      cursor('grab');
    }
    fullscreen(true);
  }

document.addEventListener('contextmenu', event => event.preventDefault());

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}