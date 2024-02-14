let objects = { parts: [] }

function loadLevel(file){
  fetch(file)
  .then((response) => {
    response.json().then((data) => {
      console.log(data)
      objects = data;
      for(let i = 0; i < objects.parts.length; i++){
        if(objects.parts[i].image !== null){
          objects.parts[i].texture = createImg(objects.parts[i].image, ''); 
          objects.parts[i].texture.hide();
        }``
      }
    })
  })
  .catch((err) => {
    throw "unexpected error while loading level:\n"+err
  })
}

function isColliding(obj1, obj2) {
  return obj1.position.x - obj1.size.width / 2 < obj2.position.x + obj2.size.width / 2 &&
         obj1.position.x + obj1.size.width / 2 > obj2.position.x - obj2.size.width / 2 &&
         obj1.position.y - obj1.size.height / 2 < obj2.position.y + obj2.size.height / 2 &&
         obj1.position.y + obj1.size.height / 2 > obj2.position.y - obj2.size.height / 2 &&
         obj1.position.z - obj1.size.depth / 2 < obj2.position.z + obj2.size.depth / 2 &&
         obj1.position.z + obj1.size.depth / 2 > obj2.position.z - obj2.size.depth / 2;
}

function isCollidingWithTag(obj, tag) {
  for(let i = 0; i < objects.parts.length; i++){
    if(objects.parts[i].tags.includes(tag)){
      if(isColliding(obj, objects.parts[i])){
        return {colliding: true, colidedObject: objects.parts[i]}
      }
    }
  }
  return {colliding: false, colidedObject: null}
}

function createReferenceToObjectsWithTag(tag){
  let referenceObjects = [];
  objects.parts.forEach((part, i) => {
      if(part.tags.includes(tag)){
          referenceObjects.push(i);
      }
  });
  return referenceObjects;
}

function drawLevel() {
  ambientLight(255);

  push(); // Save the current drawing style and transformation
      for (let partObject of objects.parts) {
          if(partObject.type === 'box' || partObject.visable){
            push(); // Save the current drawing style and transformation for each box
            if(partObject.texture !== null){
              texture(partObject.texture)
            }
              if(partObject.texture === null){
                stroke(0)
                strokeWeight(1)
              } else {
                noStroke()
              }
            specularMaterial(250);
            shininess(0);
            translate(-partObject.position.x, -partObject.position.z, -partObject.position.y); // Move the box to its position
            rotateX(partObject.rotation.x/180); // Rotate the box on the X-axis
            rotateY(partObject.rotation.y/180); // Rotate the box on the Y-axis
            rotateZ(partObject.rotation.z/180); // Rotate the box on the Z-axis
            box(Math.abs(partObject.size.width), Math.abs(partObject.size.depth), Math.abs(partObject.size.height)); // Draw the box with its size
            pop(); // Restore the previous drawing style and transformation for each box
          } else if (partObject.type === 'model' || partObject.visable){
            push(); // Save the current drawing style and transformation for each box
            noStroke()
            //strokeWeight(camZoom)
            shininess(0);
            if(partObject.texture == null){
              normalMaterial()
            }else{
              texture(partObject.texture)
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
    // Add more conditions here for other types of objects
    pop(); // Restore the previous drawing style and transformation
}
