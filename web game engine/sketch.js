//const CircularJSON = require('circular-json');

let camRotation = {
  x: 0,
  y: 0
};

let camPosition = {
  x: 0,
  z: 0,
  y: 0
};

let camZoom = 1;

let objects = {
  parts: [{
    size: { width: 1000, height: 1, depth: 1000 }, // Define width, height and depth for the rectangular prism
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    type: 'box', // Define the type of object
    tags: [],
    tagButtons: [],
    texture: null,
    image: null,
    visable: true
  }],
}

let test

let selectedPart = null;

let inputWidth, inputHeight, inputDepth;
let inputDiv;

function preload() {
  placeholder = loadModel('placeholder.obj')
  errorTexture = loadImage('error.png')
  console.log(test)
  frameRate(30);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Create inputs and button
  inputWidth = createInput();
  inputHeight = createInput();
  inputDepth = createInput();
  inputX = createInput();
  inputY = createInput();
  inputZ = createInput();
  inputRotX = createInput();
  inputRotY = createInput();
  inputRotZ = createInput();
  inputAddTag = createInput();
  addTagButton = createButton('Add Tag');

  inputWidth.position(10, 40);
  inputHeight.position(80, 40);
  inputDepth.position(150, 40);
  inputX.position(10, 10);
  inputY.position(80, 10);
  inputZ.position(150, 10);
  inputRotX.position(10, 70);
  inputRotY.position(80, 70);
  inputRotZ.position(150, 70);
  inputAddTag.position(10, 100);
  addTagButton.position(120, 100);

  inputWidth.size(50, 20);
  inputHeight.size(50, 20);
  inputDepth.size(50, 20);
  inputX.size(50, 20);
  inputY.size(50, 20);
  inputZ.size(50, 20);
  inputRotX.size(50, 20);
  inputRotY.size(50, 20);
  inputRotZ.size(50, 20);
  inputAddTag.size(90, 20);
  addTagButton.size(87.5, 25);

  // Hide them initially
  inputWidth.hide();
  inputHeight.hide();
  inputDepth.hide();
  inputX.hide();
  inputY.hide();
  inputZ.hide();
  inputRotX.hide();
  inputRotY.hide();
  inputRotZ.hide();
  inputAddTag.hide();
  addTagButton.hide();

  inputWidth.attribute('type', 'number');
  inputHeight.attribute('type', 'number');
  inputDepth.attribute('type', 'number');
  inputX.attribute('type', 'number');
  inputY.attribute('type', 'number');
  inputZ.attribute('type', 'number');
  inputRotX.attribute('type', 'number');
  inputRotY.attribute('type', 'number');
  inputRotZ.attribute('type', 'number');

  inputDiv = createDiv('');
  inputDiv.style('background', '#ccc'); // Set the background color to light gray
  inputDiv.style('padding', '10px'); // Add some padding
  inputDiv.style('position', 'absolute'); // Position it absolutely
  inputDiv.style('top', '10px'); // Position it 10px from the top of the window
  inputDiv.style('left', '10px'); // Position it 10px from the left of the window
  inputDiv.hide(); // Hide it initially
  inputDiv.size(200, 130);

  inputWidth.parent(inputDiv);
  inputHeight.parent(inputDiv);
  inputDepth.parent(inputDiv);
  inputX.parent(inputDiv);
  inputY.parent(inputDiv);
  inputZ.parent(inputDiv);
  inputRotX.parent(inputDiv);
  inputRotY.parent(inputDiv);
  inputRotZ.parent(inputDiv)
  inputAddTag.parent(inputDiv);
  addTagButton.parent(inputDiv);
}

function draw() {
  background(50, 55, 100);

  rotateX(camRotation.x);
  rotateZ(camRotation.y);

  //push(); // Save the current drawing style and transformation
  //rotateX(PI / 2); // Rotate the sphere 90 degrees downward so the texture is facing the correct way
  //noStroke(); // Don't draw an outline
  //texture(skybox); // Apply the skybox texture
  //sphere(1000); // Draw a large sphere
  //pop(); // Restore the previous drawing style and transformation

  camZoom = constrain(camZoom, 0.35, 5);
  scale(camZoom)

  if (debugMode) {
    push(); // Save the current drawing style and transformation
    strokeWeight(4*camZoom); // Increase the stroke weight for better visibility

    // Draw X-axis (red line)
    stroke(255, 0, 0);
    line(0, 0, 0, 20, 0, 0); // Increase the line length

    // Draw Y-axis (green line)
    stroke(0, 255, 0);
    line(0, 0, 0, 0, 20, 0); // Increase the line length

    // Draw Z-axis (blue line)
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, 20); // Increase the line length

    pop(); // Restore the previous drawing style and transformation
  }

  //box(10)
  translate(camPosition.x, camPosition.z, camPosition.y)
  drawObjects()

  let movementSpeed = 5;

  if(!keyIsDown(16)){
    if (keyIsDown(83)) { // S key
      camPosition.x -= movementSpeed * sin(camRotation.y);
      camPosition.z -= movementSpeed * cos(camRotation.y);
    }
    if (keyIsDown(87)) { // W key
      camPosition.x += movementSpeed * sin(camRotation.y);
      camPosition.z += movementSpeed * cos(camRotation.y);
    }
    if (keyIsDown(65)) { // A key
      camPosition.x += movementSpeed * cos(camRotation.y);
      camPosition.z -= movementSpeed * sin(camRotation.y);
    }
    if (keyIsDown(68)) { // D key
      camPosition.x -= movementSpeed * cos(camRotation.y);
      camPosition.z += movementSpeed * sin(camRotation.y);
    }
    if (keyIsDown(81)) { // Q key
      camPosition.y -= movementSpeed;
    }
    if (keyIsDown(69)) { // E key
      camPosition.y += movementSpeed;
    }
  } else {
    if (keyIsDown(83)) { // S key
      if(!keyIsDown(17)){
        holdkey++
      }
    }
    if (keyIsDown(87)) { // W key
      holdkey++
    }
    if (keyIsDown(65)) { // A key
      holdkey++
    }
    if (keyIsDown(68)) { // D key
      holdkey++
    }
    if (keyIsDown(81)) { // Q key
      holdkey++
    }
    if (keyIsDown(69)) { // E key
      holdkey++
    }
    if(holdkey >= 5){
      holdkey = 0
    }
    if(holdkey <= 0) {
      if (keyIsDown(83)) { // S key
        if(!keyIsDown(17)){
          camPosition.x -= movementSpeed * sin(camRotation.y);
          camPosition.z -= movementSpeed * cos(camRotation.y);
        }
      }
      if (keyIsDown(87)) { // W key
        camPosition.x += movementSpeed * sin(camRotation.y);
        camPosition.z += movementSpeed * cos(camRotation.y);
      }
      if (keyIsDown(65)) { // A key
        camPosition.x += movementSpeed * cos(camRotation.y);
        camPosition.z -= movementSpeed * sin(camRotation.y);
      }
      if (keyIsDown(68)) { // D key
        camPosition.x -= movementSpeed * cos(camRotation.y);
        camPosition.z += movementSpeed * sin(camRotation.y);
      }
      if (keyIsDown(81)) { // Q key
        camPosition.y -= movementSpeed;
      }
      if (keyIsDown(69)) { // E key
        camPosition.y += movementSpeed;
      }
    }
  }

  reset = true

  if (keyIsPressed === true && selectedPart !== null) {
    if (document.activeElement.tagName !== 'INPUT') {
      let part = objects.parts[selectedPart]; // Define the box object
      inputWidth.value(part.size.width);
      inputHeight.value(part.size.height);
      inputDepth.value(part.size.depth);
      inputX.value(camPosition.x);
      inputY.value(camPosition.y);
      inputZ.value(camPosition.z);
      inputRotX.value(part.rotation.x);
      inputRotY.value(part.rotation.y);
      inputRotZ.value(part.rotation.z);
      inputAddTag.value('');
      addTagButton.mousePressed(() => {
        if(inputAddTag.value()){
          let newTag = inputAddTag.value();
          if (!part.tags.includes(newTag)) {
            part.tags.push(newTag);
            let tag = createButton(newTag);
            tag.size(200, 27.5);
            tag.position(10, 100 + part.tags.length * 30);
            tag.parent(inputDiv);
            inputAddTag.value('');
            inputDiv.size(200, 130 + part.tags.length * 30);
            tagButtons.push(tag);
            part.tagButtons.push(tag);
          }
        }
      });
    }
  }

  updateSelectedPart()

  if (selectedPart !== null) {
    let part = objects.parts[selectedPart]; // Define the box object
    part.position.x = camPosition.x
    part.position.z = camPosition.z
    part.position.y = camPosition.y

    if (!keyIsDown(SHIFT)) { 
      if (keyIsDown(46)) { // del key
        objects.parts.splice(selectedPart, 1);
        selectedPart = null
      }
      if (keyIsDown(90)) { // z key
        part.size.width -= 20;
        part.size.height -= 20;
        part.size.depth -= 20;
      }
      if (keyIsDown(88)) { // x key
        part.size.width += 20;
        part.size.height += 20;
        part.size.depth += 20;
      }
      if (keyIsDown(82)) { // r key
        part.rotation.z -= 20;
      }
      if (keyIsDown(70)) { // f key
        part.rotation.z += 20;
      }
      if (keyIsDown(67)) { // c key
        if(!keyIsDown(17)){
          part.rotation.y -= 20;
        }
      }
      if (keyIsDown(86)) { // v key
        if(!keyIsDown(17)){
          part.rotation.y += 20;
        }
      }
      //if (keyIsDown(84)) { // t key
      //  if(!keyIsDown(17)){
      //    part.size.width -= 10;
      //  }
      //}
      //if (keyIsDown(71)) { // g key
      //  part.size.width += 10;
      //}
      if (keyIsDown(84)) { // t key
        if(!keyIsDown(17)){
        part.size.width -= 10;
        }
      }
      if (keyIsDown(71)) { // g key
        part.size.width += 10;
      }
      if (keyIsDown(89)) { // y key
        part.size.height -= 10;
      }
      if (keyIsDown(72)) { // h key
        part.size.height += 10;
      }
      if (keyIsDown(85)) { // u key
        part.size.depth -= 10;
      }
      if (keyIsDown(74)) { // j key
        part.size.depth += 10;
      }
    } else {
      if (keyIsDown(46)) { // del key
        objects.parts.splice(selectedPart, 1);
        selectedPart = null
      }
      if (keyIsDown(82)) { // r key
        part.rotation.z -= 1;
      }
      if (keyIsDown(70)) { // f key
        part.rotation.z += 1;
      }
      if (keyIsDown(67)) { // c key
        if(!keyIsDown(17)){
          part.rotation.y -= 1;
        }
      }
      if (keyIsDown(90)) { // z key
        part.size.width -= 1;
        part.size.height -= 1;
        part.size.depth -= 1;
      }
      if (keyIsDown(88)) { // x key
        part.size.width += 1;
        part.size.height += 1;
        part.size.depth += 1;
      }
      if (keyIsDown(84)) { // t key
        if(!keyIsDown(17)){
          part.size.width -= 1;
        }
      }
      if (keyIsDown(71)) { // g key
        part.size.width += 1;
      }
      if (keyIsDown(89)) { // y key
        part.size.height -= 1;
      }
      if (keyIsDown(72)) { // h key
        part.size.height += 1;
      }
      if (keyIsDown(85)) { // u key
        part.size.depth -= 1;
      }
      if (keyIsDown(74)) { // j key
        part.size.depth += 1;
      }
    }
  }
}

let tagButtons = []

function updateSelectedPart() {
  if (selectedPart !== null) {
    if (!objects || !objects.parts) {
      console.error('objects or objects.parts is undefined');
      return;
    }

    if (selectedPart < 0 || selectedPart >= objects.parts.length) {
      console.error('selectedPart is not a valid index in objects.parts');
      return;
    }

    let part = objects.parts[selectedPart];

    if (!part || !part.size) {
      console.error('part or part.size is undefined');
      return;
    }

    for(let i = 0; i < part.tagButtons.length; i++){
      if(part.tagButtons[i]._pixelsState){
        part.tagButtons[i].show();
        part.tagButtons[i].position(10, 100 + (i + 1) * 30);
        part.tagButtons[i].mousePressed(() => {
          part.tags.splice(i, 1);
          part.tagButtons[i].remove();
          part.tagButtons.splice(i, 1);
          inputDiv.size(200, 130 + part.tags.length * 30);
        });
      }
    }

    if(inputWidth.value() < 0){
      inputWidth.value(Math.abs(inputWidth.value()));
    }
    if(inputHeight.value() < 0){
      inputHeight.value(Math.abs(inputHeight.value()));
    }
    if(inputDepth.value() < 0){
      inputDepth.value(Math.abs(inputDepth.value()));
    }
    if(inputWidth.value() == ""){
      inputWidth.value(0);
    }
    if(inputHeight.value() == ""){
      inputHeight.value(0);
    }
    if(inputDepth.value() == ""){
      inputDepth.value(0);
    }
    if(inputX.value() == ""){
      inputX.value(0);
    }
    if(inputY.value() == ""){
      inputY.value(0);
    }
    if(inputZ.value() == ""){
      inputZ.value(0);
    }
    if(inputRotX.value() == ""){
      inputRotX.value(0);
    }
    if(inputRotY.value() == ""){
      inputRotY.value(0);
    }
    if(inputRotZ.value() == ""){
      inputRotZ.value(0);
    }


    inputDiv.size(200, 130 + part.tags.length * 30);

    // Update part size and position from input values
    part.size.width = parseFloat(inputWidth.value());
    part.size.height = parseFloat(inputHeight.value());
    part.size.depth = parseFloat(inputDepth.value());
    camPosition.x = parseFloat(inputX.value());
    camPosition.y = parseFloat(inputY.value());
    camPosition.z = parseFloat(inputZ.value());
    part.position.x = parseFloat(inputX.value());
    part.position.y = parseFloat(inputY.value());
    part.position.z = parseFloat(inputZ.value());
    part.rotation.x = parseFloat(inputRotX.value());
    part.rotation.y = parseFloat(inputRotY.value());
    part.rotation.z = parseFloat(inputRotZ.value());
  } else {
    inputWidth.hide();
    inputHeight.hide();
    inputDepth.hide();
    inputX.hide();
    inputY.hide();
    inputZ.hide();
    inputRotZ.hide();
    inputRotY.hide();
    inputRotX.hide();
    inputDiv.hide();
    inputAddTag.hide();
    addTagButton.hide();
  }
}

let holdkey = 0
let mouseXOffset = 0;
let mouseYOffset = 0;

function mouseDragged() {
  if (mouseButton === RIGHT) {
    let sensitivity = 0.0010;
    camRotation.y += (pmouseX - mouseX) * sensitivity;
    camRotation.x += (pmouseY - mouseY) * sensitivity;
    mouseXOffset = pmouseX - mouseX;
    mouseYOffset = pmouseY - mouseY;
    cursor('grab');
  }
  fullscreen(true);
}

function drawObjects() {
  ambientLight(255);

  push(); // Save the current drawing style and transformation
  for (let object in objects) {
    if (object === 'plane') {
      translate(-objects[object][1], -objects[object][2], -objects[object][3]); // Move the plane to the position defined in the objects variable
      plane(objects[object][0]); // Draw a plane with the size defined in the objects variable
    }
    if (object === 'parts') {
      for (let partObject of objects.parts) {
        if (partObject.type === 'light'){
          push()
          noStroke()
          ambientLight(255);
          fill(partObject.rotation.x, partObject.rotation.z, partObject.rotation.y)
          translate(-partObject.position.x, -partObject.position.z, -partObject.position.y); // Move the box to its position
          sphere(20);
          pop()
          pointLight(partObject.rotation.x, partObject.rotation.z, partObject.rotation.y, -partObject.position.x, -partObject.position.z, -partObject.position.y)
        }
      }
      fill(255)
      for (let partObject of objects.parts) {
        if(!partObject.visable){
          noFill()
          stroke("lime")
        } else {
          fill(255)
        }
          if(partObject.type === 'box'){
            push(); // Save the current drawing style and transformation for each box
            if(partObject.texture !== null && partObject.visable){
              texture(partObject.texture)
            }
            if(partObject == objects.parts[selectedPart]){
              stroke(100, 200, 200)
              strokeWeight(5*camZoom)
            }else{
              if(partObject.texture === null){
                stroke(0)
                strokeWeight(camZoom)
              } else {
                if(partObject.visable){
                  noStroke()
                } else {
                  stroke("lime")
                }
              }
            } 
            specularMaterial(250);
            shininess(0);
            translate(-partObject.position.x, -partObject.position.z, -partObject.position.y); // Move the box to its position
            rotateX(partObject.rotation.x/180); // Rotate the box on the X-axis
            rotateY(partObject.rotation.y/180); // Rotate the box on the Y-axis
            rotateZ(partObject.rotation.z/180); // Rotate the box on the Z-axis
            box(Math.abs(partObject.size.width), Math.abs(partObject.size.depth), Math.abs(partObject.size.height)); // Draw the box with its size
            pop(); // Restore the previous drawing style and transformation for each box
          } else if (partObject.type === 'model'){
            push(); // Save the current drawing style and transformation for each box
              if(partObject.visable){
                noStroke()
              } else {
                stroke("lime")
              }
              //strokeWeight(camZoom)
            shininess(0);
            if(partObject.texture == null){
              if(partObject.visable){
                normalMaterial()
              }
            }else{
              if(partObject.visable){
                texture(partObject.texture)
              }
            }
            translate(-partObject.position.x, -partObject.position.z, -partObject.position.y); // Move the box to its position
            rotateX(partObject.rotation.x/180); // Rotate the box on the X-axis
            rotateY(partObject.rotation.y/180); // Rotate the box on the Y-axis
            rotateZ(partObject.rotation.z/180); // Rotate the box on the Y-axis
            scale(Math.abs(partObject.size.width)/100, Math.abs(partObject.size.depth)/100, Math.abs(partObject.size.height)/100)
            if(partObject.model !== null){
              model(partObject.model); // Draw the box with its size
            } else {
              partObject = null
            }
            pop(); // Restore the previous drawing style and transformation for each box
          } else {
            //console.error('partObject.type is not defined');
          }
        }
    }
    // Add more conditions here for other types of objects
  }
  pop(); // Restore the previous drawing style and transformation
}

function mouseClicked() {
  fullscreen(true);
}

function mouseReleased(){
  mouseXOffset = 0;
  mouseYOffset = 0;
  cursor();
}

let tagButtonsIndex = []

function keyPressed(){
  fullscreen(true);
  if (keyCode === 112) { // F1 key
    return false; // Prevent default F1 key behavior
  }
  if (keyIsDown(80)) { // P key
    if (document.activeElement.tagName !== 'INPUT') {
      objects.parts.push({
        size: { width: 50, height: 50, depth: 50 }, // Define width, height and depth for the rectangular prism
        rotation: { x: 0, y: 0, z: 0},
        position: {...camPosition},
        type: 'box', // Define the type of object
        tags: [],
        tagButtons: [],
        texture: null,
        image: null,
        visable: true
      }); // Add a new box with size 50 at the current camera position
    }
  }
  if(keyIsDown(32)){
    if (selectedPart == null) {
      let closestPart = null;
      let closestDistance = Infinity;
      for (let i = 0; i < objects.parts.length; i++) {
        let part = objects.parts[i];
        let distance = dist(camPosition.x, camPosition.y, camPosition.z, part.position.x, part.position.y, part.position.z);
        if (distance < closestDistance) {
          closestPart = i;
          closestDistance = distance;
        }
      }
      let part = objects.parts[closestPart]; 
      if(part.type === 'box'){
        if(part.position.y-part.size.height/2-(150/part.size.height) <= camPosition.y 
        && part.position.y+part.size.height/2+(150/part.size.height) >= camPosition.y
        && part.position.z-part.size.width/2-(150/part.size.width) <= camPosition.z
        && part.position.z+part.size.width/2+(150/part.size.width) >= camPosition.z
        && part.position.x-part.size.depth/2-(150/part.size.depth) <= camPosition.x
        && part.position.x+part.size.depth/2+(150/part.size.depth) >= camPosition.x){
          camPosition.y = part.position.y
          camPosition.x = part.position.x
          camPosition.z = part.position.z
          selectedPart = closestPart;
        } else {
          selectedPart = null
        }
      } else if(part.type === 'model'){
        if(closestDistance <= (part.size.width * 100 + 1) + (part.size.height * 100 + 1) + (part.size.depth * 100 + 1)){
          camPosition.y = part.position.y
          camPosition.x = part.position.x
          camPosition.z = part.position.z
          selectedPart = closestPart;
        } else {
          selectedPart = null
        }
      } else if(part.type === 'light'){
        if(closestDistance <= 55){
          camPosition.y = part.position.y
          camPosition.x = part.position.x
          camPosition.z = part.position.z
          selectedPart = closestPart;
        } else {
          selectedPart = null
        }
      }
    } else {
      selectedPart = null
    }
  }
  if(keyIsDown(9)){ // tab key
    if (selectedPart !== null) {
      let part = objects.parts[selectedPart];
      // Set input values to part size

      for(let i = 0; i < tagButtons.length; i++){
        tagButtons[i].hide();
      }

      inputWidth.value(part.size.width);
      inputHeight.value(part.size.height);
      inputDepth.value(part.size.depth);
      inputX.value(part.position.x);
      inputY.value(part.position.y);
      inputZ.value(part.position.z);
      inputRotX.value(part.rotation.x);
      inputRotY.value(part.rotation.y);
      inputRotZ.value(part.rotation.z);
      inputAddTag.value('');
      // Toggle visibility of inputs and button
      if (inputWidth.elt.style.display === 'none') {
        inputWidth.show();
        inputHeight.show();
        inputDepth.show();
        inputX.show();
        inputY.show();
        inputZ.show();
        inputRotZ.show();
        inputRotY.show();
        inputRotX.show();
        inputDiv.show();
        inputAddTag.show();
        addTagButton.show();
        for(let i = 0; i < tagButtons.length; i++){
          if(selectedPart == tagButtonsIndex[i]){
            tagButtons[i].show();
          }
        }
      } else {
        inputWidth.hide();
        inputHeight.hide();
        inputDepth.hide();
        inputX.hide();
        inputY.hide();
        inputZ.hide();
        inputRotZ.hide();
        inputRotY.hide();
        inputRotX.hide();
        inputDiv.hide();
        inputAddTag.hide();
        addTagButton.hide();
      }
    }
    if (document.activeElement.tagName === 'INPUT') {
      return;
    }
  }
  if (key === 'i' && selectedPart !== null) {
    objects.parts[selectedPart].visable = !objects.parts[selectedPart].visable
  }
  if (key === 'c' && keyIsDown(17) && selectedPart !== null) {
    // Copy the selected part to the clipboard
    let json = objects.parts[selectedPart];
    json.texture = null
    clipboard = JSON.parse(JSON.stringify(json));
    if(objects.parts[selectedPart].image !== null){
      objects.parts[selectedPart].texture = createImg(objects.parts[selectedPart].image, ''); 
      objects.parts[selectedPart].texture.hide();
    }
  } else if (key === 'v' && keyIsDown(17) && clipboard !== null) {
    // Paste the clipboard part into the parts array
    pasted = JSON.parse(JSON.stringify(clipboard));
    console.log(pasted)
    if(selectedPart !== null){
      pasted.position.x += 50;
      pasted.position.y += 50;
      pasted.position.z += 50;
    } else {
      pasted.position.x = camPosition.x;
      pasted.position.y = camPosition.y;
      pasted.position.z = camPosition.z;
    }
    if(pasted.image !== null){
      pasted.texture = createImg(pasted.image, ''); 
      pasted.texture.hide();
    }
    objects.parts.push(pasted);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.addEventListener('contextmenu', event => event.preventDefault());

function mouseWheel(event) {
  camZoom -= event.delta * 0.001; // change this value to zoom faster or slower
  camZoom = constrain(camZoom, 0.01, PI); // constrain FOV between these values
}

window.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
  }
  if (e.key === 'm') {
    if (document.activeElement.tagName !== 'INPUT') {
      let fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.obj';
      fileInput.onchange = function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {
          let dataUrl = e.target.result;
          console.log(e.target.result);
          console.log(dataUrl);
  
          loadModel(dataUrl, model => {
            objects.parts.push({
              size: { width: 100, height: 100, depth: 100 }, // Define width, height and depth for the rectangular prism
              rotation: { x: 0, y: 0, z: 0 },
              position: {...camPosition},
              type: 'model', // Define the type of object
              tags: [],
              tagButtons: [],
              texture: null,
              image: null,
              model: model,
              visable: true
            });
          }, err => {
            console.error(err);
            alert(err);
          }, ".obj")
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  }
  if (e.key === 's' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    for(let i = 0; i < objects.parts.length; i++){
      objects.parts[i].texture = null;
    }
    for(let i = 0; i < objects.parts.length; i++){
      for(let j = 0; j < objects.parts[i].tagButtons.length; j++){
        if (objects.parts[i].tagButtons[j].elt) {
          objects.parts[i].tagButtons[j] = {
            x: objects.parts[i].tagButtons[j].x, 
            y: objects.parts[i].tagButtons[j].y, 
            width: objects.parts[i].tagButtons[j].width, 
            height: objects.parts[i].tagButtons[j].height, 
            name: objects.parts[i].tagButtons[j].elt.innerText
          }
        }
      }
    }
    console.log(objects);
    // Create a new object to save, excluding the texture
    let dataStr
    try {
      dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(objects));
    } catch(err){
      console.error(err)
      alert(err)
      for(let i = 0; i < objects.parts.length; i++){
        if(objects.parts[i].image !== null){
          objects.parts[i].texture = createImg(objects.parts[i].image, ''); 
          objects.parts[i].texture.hide();
        }
      }
    }
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "save.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    for(let i = 0; i < objects.parts.length; i++){
      if(objects.parts[i].image !== null){
        objects.parts[i].texture = createImg(objects.parts[i].image, ''); 
        objects.parts[i].texture.hide();
      }
    }
    for(let i = 0; i < objects.parts.length; i++){
      if(objects.parts[i].tagButtons.length > 0){
        for(let j = 0; j < objects.parts[i].tagButtons.length; j++){
          if(!(typeof objects.parts[i].tagButtons[i] === "_class")){
            let tag = createButton(objects.parts[i].tagButtons[j].name);
            tag.size(objects.parts[i].tagButtons[j].width, objects.parts[i].tagButtons[j].height);
            tag.position(objects.parts[i].tagButtons[j].x, objects.parts[i].tagButtons[j].x);
            tag.parent(inputDiv);
            objects.parts[i].tagButtons[j] = tag;
            //console.log(objects.parts[i].tagButtons[j])
          }
        }
      }
    }
    //console.log(objects);
  }
  if (e.key === 'o' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    // Load the selected file
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = function() {
      let file = this.files[0];
      console.log('Selected file: ' + file.name);
      console.log('File size: ' + file.size + ' bytes');
      // Create a new FileReader object
      let reader = new FileReader();
      // Setup the onload event for the FileReader object
      reader.onload = function(event) {
        // The file's text will be printed here
        console.log(event.target.result);
        objects = JSON.parse(event.target.result);
        for(let i = 0; i < objects.parts.length; i++){
          if(objects.parts[i].image !== null){
            objects.parts[i].texture = createImg(objects.parts[i].image, ''); 
            objects.parts[i].texture.hide();
          }
        }
        for(let i = 0; i < objects.parts.length; i++){
          if(objects.parts[i].tagButtons.length > 0){
            for(let j = 0; j < objects.parts[i].tagButtons.length; j++){
              if(!(typeof objects.parts[i].tagButtons[i] === "_class")){
                let tag = createButton(objects.parts[i].tagButtons[j].name);
                tag.size(objects.parts[i].tagButtons[j].width, objects.parts[i].tagButtons[j].height);
                tag.position(objects.parts[i].tagButtons[j].x, objects.parts[i].tagButtons[j].x);
                tag.parent(inputDiv);
                objects.parts[i].tagButtons[j] = tag;
                //console.log(objects.parts[i].tagButtons[j])
              }
            }
          }
        }
      };
      // Read the file as text
      reader.readAsText(file);
    };
    fileInput.click();
  }
  if (e.key === 't' && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    // Your save function here
  }
});

function handleFile(file) {
  // Load the selected file
  console.log('Selected file: ' + file.name);
  console.log('File size: ' + file.size + ' bytes');
  console.log(file)
}

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 't' && selectedPart !== null) {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.png, .jpg, .jpeg';
    fileInput.onchange = function() {
      let file = this.files[0];
      let reader = new FileReader();
      reader.onload = function(event) {
        console.log(event.target.result);
        let part = objects.parts[selectedPart];
        part.image = event.target.result;
        part.texture = createImg(event.target.result, ''); 
        part.texture.hide();
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  }
});

window.addEventListener('keydown', function(e) {
  if (e.ctrlKey) {
    e.preventDefault();
    return false;
  }
});