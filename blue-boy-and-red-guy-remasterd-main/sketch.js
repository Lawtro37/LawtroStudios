const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world
var startAnimation = true, scene = 0, frameCount = 0
var player1, player1X, player1Y, player2X = 100, player2Y = 150, playerSpeed = 10
var player1done = false, player2done = false
var button1 = false, button2 = false, button2Object
var button1timer = 0, button2timer = 0;
var levelTimer = 0
var player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false
var lazer1

function preload() {
    bgimg = loadImage("assets/spalsh.gif");
    bg1 = loadImage("assets/rb-example-diag.gif");
    bg2 = loadImage("assets/bg2.png");
    blueBoyImg = loadImage("assets/boy.png");
    titleImg = loadImage("assets/title.png");
    buttonImg = loadImage("assets/button.png");
    player1Img = loadImage("assets/boy.png");
    player2Img = loadImage("assets/happy.png");
    lazerImg = loadImage("assets/lazer.gif");
    lazerImg2 = loadImage("assets/lazer2.gif")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    //Create the Bodies Here.
    opts =
    {
        restitution: 1,
        frictionAir: 0.1
    };

    flor =
    {
        isStatic: true
    };

    //create bodys
    ground = Bodies.rectangle(width / 2, height+40, width, 50, flor)
    World.add(world, ground)
    wall1 = Bodies.rectangle(width, height / 2, 50, height, flor)
    World.add(world, wall1)
    wall2 = Bodies.rectangle(0, height / 2, 50, height, flor)
    World.add(world, wall2)

    Engine.run(engine);

    // lazer1 = createSprite(width / 3, 0, 20, height)
    // lazer1.addImage(lazerImg2)

}

function draw() {
    if (scene == 0) {
        //start animation
        frameCount += 1;
        if (startAnimation == true) {
            background(bgimg);
        } else {
            background(bg1);
        }
        rectMode(CENTER);
        imageMode(CENTER);
        textAlign(CENTER);
        //menu
        if (frameCount == 150) {
            startAnimation = false;
            playbutton = createImg("assets/playButton.png", "playButton");
            playbutton.position(width / 2 - 250, height / 2 - 100);
            playbutton.size(500, 150);
            playbutton.mousePressed(play);
            if (windowWidth <= 500) {
                alert("your screen is not conpadible with this game this may make for a bad expereance")
                console.warn("your screen is not conpadible with this game this may make for a bad expereance")
            }
        }
        if (frameCount >= 150) {
            image(titleImg, windowWidth / 2, 150, windowWidth / 1.2, 350);
        }

    } else if (scene == 1) {
        background(bg1);
        textAlign(CENTER);
        textSize(100);
        fill(255);
        text("Levels", width / 2, 100);
    } else if (scene == 2) {
        imageMode(CENTER)
        rectMode(CENTER)
        background("black")

        image(bg2, width / 2, height / 2, width, height)
        rect(width / 2, height, width, 10)

        if(player1X >= width / 1.15 - 30 
        && player1X <= width / 1.15 + 30
        && player1Y >= height / 4 - 30
        && player1Y <= height / 4 + 30)
        {
            player1Point1 = true
        }else{
            if(!player1Point1)
            {
            fill("blue")
            ellipse(width / 1.15, height / 4, 25)
            }
        }

        if(player2.position.x >= width / 1.15 - 30 
        && player2.position.x <= width / 1.15 + 30
        && player2.position.y >= height - 60 - 30
        && player2.position.y <= height - 60 + 30)
        {
            player2Point1 = true
        }else{
            if(!player2Point1)
            {
            fill("red")
            rect(width / 1.15, height - 60, 25, 25)
            }
        }

        if (player1X <= width / 4 && player1Y <= height / 2) {
            fill("aqua")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player1done = true

        } else {
            fill("blue")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player2.position.x <= width / 4) {
            player2done = true
            fill("red")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
        } else {
            fill("brown")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player1done && player2done) {
            fill(200)
            image(bg2, width / 2, height / 2, width, height)
            if(levelTimer <= 40 && player1Point1 && player2Point1){
                swal(
                    {
                        title: `level complete!`,
                        text: "completed level: Y\ntime less than 20 sec: Y\nall points: Y",
                        imageUrl: "assets/3stars.png",
                        imageSize: "250x250",
                        confirmButtonText: "next",
                        confirmButtonColor: "lime"
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            remove1()
                            level2f()
                        }
                    }
                )
            }
            else if(levelTimer <= 20){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 20 sec: Y\nall points: N",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level2f()
                            }
                        }
                    )  
                }else if(player1Point1 && player2Point1){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 20 sec: N\nall points: Y",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level2f()
                            }
                        }
                    )  
                    }else{
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less: than 20 sec N\nall points: N",
                            imageUrl: "assets/1stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level2f()
                            }
                        }
                    ) 
                }
        }else{
            image(player1Img, player1X, player1Y, 50, 50)
            playerControler1()
            push()
            translate(player2.position.x, player2.position.y)
            rotate(player2.angle * 100)
            imageMode(CENTER)
            rectMode(CENTER)
            image(player2Img, 0, 0, 50, 50)
            playerControler2()
            pop()

            textAlign(CENTER)
            textSize(50)
    
            levelTimer += 1 / int(getFrameRate())
    
            fill(255)
            text(round(levelTimer), width/2, 50)
        }

    } else if (scene == 3) {

        imageMode(CENTER)
        rectMode(CENTER)
        background("black")

        image(bg2, width / 2, height / 2, width, height)
        rect(width / 2, height, width, 10)

        //drawSprites()

        if(player1X >= width / 1.05 - 30 
        && player1X <= width / 1.05 + 30
        && player1Y >= height / 4 - 30
        && player1Y <= height / 4 + 30)
        {
            player1Point1 = true
        }else{
            if(!player1Point1)
            {
            fill("blue")
            ellipse(width / 1.05, height / 4, 25)
            }
        }

        if(player2.position.x >= width / 1.05 - 30 
        && player2.position.x <= width / 1.05 + 30
        && player2.position.y >= height - 60 - 30
        && player2.position.y <= height - 60 + 30)
        {
            player2Point1 = true
        }else{
            if(!player2Point1)
            {
            fill("red")
            rect(width / 1.05, height - 60, 25, 25)
            }
        }

        if(!button2){
        fill(160)
        rect(width / 3, height, 50, height)
        }

        if(!button1){
        image(lazerImg2, width / 3, 0, 40, height)

        if(player1X <= width / 3)
        {
            remove1()
            level2f()
        }}



        image(lazerImg, width / 2, height / 2, width, height/25)

        if(player1X >= width / 1.15 - 100){
            button2 = true
        }
        if(!button2){
            fill("blue")
            rect(width / 1.15, height / 4, 200, 200)
        }else{
            fill("aqua")
            rect(width / 1.15, height / 4, 200, 200)
        }


        if (player1Y >= height / 2 - 20) {
            remove1()
            level2f()
        }

        if(player2.position.x >= width / 1.15 - 40 && player2.position.x <= width / 1.15 + 40){
            button1 = true;
        }

        if(!button1){
            fill("brown")
            rect(width / 1.15, height - 10, 80, 10)  
        }

        if(button1){
            fill("red")
            rect(width / 1.15, height - 10, 80, 10)
        }

        if (player1X <= width / 4 && player1Y <= height / 2) {
            fill("aqua")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player1done = true

        } else {
            fill("blue")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player1done = false
        }

        if (player2.position.x <= width / 4) {
            player2done = true
            fill("red")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
        } else {
            fill("brown")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player1done && player2done) {
            fill(200)
            image(bg2, width / 2, height / 2, width, height)
            if(levelTimer <= 40 && player1Point1 && player2Point1){
                swal(
                    {
                        title: `level complete!`,
                        text: "completed level: Y\ntime less than 40 sec: Y\nall points: Y",
                        imageUrl: "assets/3stars.png",
                        imageSize: "250x250",
                        confirmButtonText: "next",
                        confirmButtonColor: "lime"
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            remove1()
                            level3f()
                        }
                    }
                )
            }
            else if(levelTimer <= 40){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: Y\nall points: N",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                }else if(player1Point1 && player2Point1){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: N\nall points: Y",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                    }else{
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less: than 40 sec N\nall points: N",
                            imageUrl: "assets/1stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    ) 
                }
        }else{
            image(player1Img, player1X, player1Y, 50, 50)
            playerControler1()
            //rotate(player2.angle)
            push()
            translate(player2.position.x, player2.position.y)
            rotate(player2.angle * 100)
            imageMode(CENTER)
            rectMode(CENTER)
            image(player2Img, 0, 0, 50, 50)
            playerControler2()
            pop()
            playerControler2()

            textAlign(CENTER)
            textSize(50)
    
            levelTimer += 1 / int(getFrameRate())
    
            fill(255)
            text(round(levelTimer), width/2, 50)
        }

        if(button2){
            Matter.World.remove(world, wall3);
        }

    }
    if(scene == 4){
        imageMode(CENTER)
        rectMode(CENTER)
        background("black")

        image(bg2, width / 2, height / 2, width, height)
        rect(width / 2, height, width, 10)

        if(player1X >= width / 1.05 - 30 
        && player1X <= width / 1.05 + 30
        && player1Y >= height / 4 - 30
        && player1Y <= height / 4 + 30)
        {
            player1Point1 = true
        }else{
            if(!player1Point1)
            {
            fill("blue")
            ellipse(width / 1.05, height / 4, 25)
            }
        }

        if(player2.position.x >= width / 1.05 - 30 
        && player2.position.x <= width / 1.05 + 30
        && player2.position.y >= height - 60 - 30
        && player2.position.y <= height - 60 + 30)
        {
            player2Point1 = true
        }else{
            if(!player2Point1)
            {
            fill("red")
            rect(width / 1.05, height - 60, 25, 25)
            }
        }

        if(!button2){
        fill(160)
        rect(width / 3, height, 50, height)
        }

        if(!button1){
        image(lazerImg2, width / 3, 0, 40, height)

        if(player1X <= width / 3 && !player1done && !player2done)
        {
            remove1()
            level3f()
        }}

        rect(width / 2, height / 2, width, height/50)

        if(player1X >= width / 1.15 - 100){
            button2 = true
        }
        if(!button2){
            fill("blue")
            rect(width / 1.15, height / 4, 200, 200)
        }else{
            fill("aqua")
            rect(width / 1.15, height / 4, 200, 200)
            fill(160)
            ellipse(width / 1.15, height / 4, (200-button2timer)/3)
        }

        if(button2){
            button2timer += 1
        }
        if(button2timer >= 200)
        {
            button2timer = 0
            button2 = false;
            wall3 = Bodies.rectangle(width / 3-25, height - 50, 50, 5000, { isStatic: true })
            World.add(world, wall3)
        }

        if(button1){
            button1timer += 1
        }
        if(button1timer >= 200)
        {
            button1timer = 0
            button1 = false;
        }


        if (player1Y >= height / 2 - 20) {
            remove1()
            level3f()
        }

        if(player2.position.x >= width / 1.15 - 40 && player2.position.x <= width / 1.15 + 40){
            button1 = true;
        }

        if(!button1){
            fill("brown")
            rect(width / 1.15, height - 10, 80, 10)  
        }

        if(button1){
            fill("red")
            rect(width / 1.15, height - 10, 80, 10)
            fill(160)
            ellipse(width / 1.15, height - 10, (200-button1timer)/5)
        }

        if (player1X <= width / 4 && player1Y <= height / 2) {
            fill("aqua")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player1done = true

        } else {
            fill("blue")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player2.position.x <= width / 4) {
            player2done = true
            fill("red")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
        } else {
            fill("brown")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player1done && player2done) {
            fill(200)
            image(bg2, width / 2, height / 2, width, height)
            if(levelTimer <= 40 && player1Point1 && player2Point1){
                swal(
                    {
                        title: `level complete!`,
                        text: "completed level: Y\ntime less than 40 sec: Y\nall points: Y",
                        imageUrl: "assets/3stars.png",
                        imageSize: "250x250",
                        confirmButtonText: "next",
                        confirmButtonColor: "lime"
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            remove1()
                            level3f()
                        }
                    }
                )
            }
            else if(levelTimer <= 40){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: Y\nall points: N",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                }else if(player1Point1 && player2Point1){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: N\nall points: Y",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                    }else{
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less: than 40 sec N\nall points: N",
                            imageUrl: "assets/1stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    ) 
                }
        }else{
            image(player1Img, player1X, player1Y, 50, 50)
            playerControler1()
            //rotate(player2.angle)
            push()
            translate(player2.position.x, player2.position.y)
            rotate(player2.angle * 100)
            imageMode(CENTER)
            rectMode(CENTER)
            image(player2Img, 0, 0, 50, 50)
            playerControler2()
            pop()
            playerControler2()

            textAlign(CENTER)
            textSize(50)
    
            levelTimer += 1 / int(getFrameRate())
    
            fill(255)
            text(round(levelTimer), width/2, 50)
        }

        if(button2){
            Matter.World.remove(world, wall3);
        }
    }
    if(scene == 5){
        imageMode(CENTER)
        rectMode(CENTER)
        background("black")

        image(bg2, width / 2, height / 2, width, height)
        rect(width / 2, height, width, 10)

        if(player1X >= width / 1.05 - 30 
        && player1X <= width / 1.05 + 30
        && player1Y >= height / 4 - 30
        && player1Y <= height / 4 + 30)
        {
            player1Point1 = true
        }else{
            if(!player1Point1)
            {
            fill("blue")
            ellipse(width / 1.05, height / 4, 25)
            }
        }

        fill(160)
        rect(width / 4-175, height - 50, 500, 200)

        if(player2.position.x >= width / 1.05 - 30 
        && player2.position.x <= width / 1.05 + 30
        && player2.position.y >= height - 60 - 30
        && player2.position.y <= height - 60 + 30)
        {
            player2Point1 = true
        }else{
            if(!player2Point1)
            {
            fill("red")
            rect(width / 1.05, height - 60, 25, 25)
            }
        }

        if(!button2){
        fill(160)
        rect(width / 3, height, 50, height)
        }

        if(!button1){
        fill("red")
        rect(width / 3, 0, 20, height)

        if(player1X <= width / 3 && !player1done && !player2done)
        {
            remove1()
            level4f()
        }}

        fill("red")
        rect(width / 2, height / 2, width, height/50)

        if(player1X >= width / 1.15 - 100){
            button2 = true
        }
        if(!button2){
            fill("blue")
            rect(width / 1.15, height / 4, 200, 200)
        }else{
            fill("aqua")
            rect(width / 1.15, height / 4, 200, 200)
            fill(160)
            ellipse(width / 1.15, height / 4, (200-button2timer)/3)
        }

        if(button2){
            button2timer += 1
        }
        if(button2timer >= 200)
        {
            button2timer = 0
            button2 = false;
            wall3 = Bodies.rectangle(width / 3-25, height - 50, 50, 5000, { isStatic: true })
            World.add(world, wall3)
        }

        if(button1){
            button1timer += 1
        }
        if(button1timer >= 200)
        {
            button1timer = 0
            button1 = false;
        }


        if (player1Y >= height / 2 - 20) {
            remove1()
            level3f()
        }

        if(player2.position.x >= width / 1.15 - 40 && player2.position.x <= width / 1.15 + 40){
            button1 = true;
        }

        if(!button1){
            fill("brown")
            rect(width / 1.15, height - 10, 80, 10)  
        }

        if(button1){
            fill("red")
            rect(width / 1.15, height - 10, 80, 10)
            fill(160)
            ellipse(width / 1.15, height - 10, (200-button1timer)/5)
        }

        if (player1X <= width / 4 && player1Y <= height / 2) {
            fill("aqua")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player1done = true

        } else {
            fill("blue")
            rect(width / 7.5, 200, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player2.position.x <= width / 4) {
            player2done = true
            fill("red")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
        } else {
            fill("brown")
            rect(width / 7.5, height / 2 + (height / 2) / 2, width / 4.5, height / 2.2)
            player2done = false
        }

        if (player1done && player2done) {
            fill(200)
            image(bg2, width / 2, height / 2, width, height)
            if(levelTimer <= 40 && player1Point1 && player2Point1){
                swal(
                    {
                        title: `level complete!`,
                        text: "completed level: Y\ntime less than 40 sec: Y\nall points: Y",
                        imageUrl: "assets/3stars.png",
                        imageSize: "250x250",
                        confirmButtonText: "next",
                        confirmButtonColor: "lime"
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            remove1()
                            level3f()
                        }
                    }
                )
            }
            else if(levelTimer <= 40){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: Y\nall points: N",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                }else if(player1Point1 && player2Point1){
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less than 40 sec: N\nall points: Y",
                            imageUrl: "assets/2stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    )  
                    }else{
                    swal(
                        {
                            title: `level complete!`,
                            text: "completed level: Y\ntime less: than 40 sec N\nall points: N",
                            imageUrl: "assets/1stars.png",
                            imageSize: "250x250",
                            confirmButtonText: "next",
                            confirmButtonColor: "lime"
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                remove1()
                                level3f()
                            }
                        }
                    ) 
                }
        }else{
            image(player1Img, player1X, player1Y, 50, 50)
            playerControler1()
            //rotate(player2.angle)
            push()
            translate(player2.position.x, player2.position.y)
            rotate(player2.angle * 100)
            imageMode(CENTER)
            rectMode(CENTER)
            image(player2Img, 0, 0, 50, 50)
            playerControler2()
            pop()
            playerControler2()

            textAlign(CENTER)
            textSize(50)
    
            levelTimer += 1 / int(getFrameRate())
    
            fill(255)
            text(round(levelTimer), width/2, 50)
        }

        if(button2){
            Matter.World.remove(world, wall3);
        }
    }

    if(player1X >= width){
        player1X -= playerSpeed
    }
    if(player1Y <= 0){
        player1Y += playerSpeed
    }
    if(player1X <= 0){
        player1X -= playerSpeed
    }
    if(player1Y >= height){
        player1Y += playerSpeed
    }

}

function play() {
    scene = 1;
    playbutton.remove();

    level1 = createButton("1");
    level1.position(width / 2 - 450, 300);
    level1.size(100, 100);
    level1.mousePressed(level1f);

    level2 = createButton("2");
    level2.position(width / 2 - 250, 300);
    level2.size(100, 100);
    level2.mousePressed(level2f);

    level3 = createButton("3");
    level3.position(width / 2 - 50, 300);
    level3.size(100, 100);
    level3.mousePressed(level3f);

    level4 = createButton("4");
    level4.position(width / 2 + 150, 300);
    level4.size(100, 100);
    level4.mousePressed(play);

    level5 = createButton("5");
    level5.position(width / 2 + 350, 300);
    level5.size(100, 100);
    level5.mousePressed(play);

    level6 = createButton("6");
    level6.position(width / 2 - 450, 500);
    level6.size(100, 100);
    level6.mousePressed(play);

    level7 = createButton("7");
    level7.position(width / 2 - 250, 500);
    level7.size(100, 100);
    level7.mousePressed(play);

    level8 = createButton("8");
    level8.position(width / 2 - 50, 500);
    level8.size(100, 100);
    level8.mousePressed(play);

    level9 = createButton("9");
    level9.position(width / 2 + 150, 500);
    level9.size(100, 100);
    level9.mousePressed(play);

    level10 = createButton("10");
    level10.position(width / 2 + 350, 500);
    level10.size(100, 100);
    level10.mousePressed(play);
}

function level1f() {
    scene = 2
    levelTimer = 0 
    player1done = false
    player2done = false

    player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false

    level1.remove();
    level2.remove();
    level3.remove();
    level4.remove();
    level5.remove();
    level6.remove();
    level7.remove();
    level8.remove();
    level9.remove();
    level10.remove();

    player1X = width / 1.5;
    player1Y = height / 4;

    opts =
    {
        restitution: 0.1,
        friction: 0.3,
        frictionAir: 0.1
    };

    player2 = Bodies.circle(width / 1.5, height - 50, 50, opts)
    World.add(world, player2)
}

function level2f() {
    scene = 3
    button1 = false;
    button2 = false; 
    levelTimer = 0 
    player1done = false
    player2done = false

    player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false

    level1.remove();
    level2.remove();
    level3.remove();
    level4.remove();
    level5.remove();
    level6.remove();
    level7.remove();
    level8.remove();
    level9.remove();
    level10.remove();

    player1X = width / 1.5;
    player1Y = height / 4;

    opts =
    {
        restitution: 0.1,
        friction: 0.3,
        frictionAir: 0.1
    };

    player2 = Bodies.circle(width / 1.5, height / 2 + 250, 50, opts)
    World.add(world, player2)

    button2Object = Bodies.rectangle(width / 1.15, height+10, 80, 10, { isStatic: true })
    World.add(world, button2Object)

    wall3 = Bodies.rectangle(width / 3-25, height - 50, 50, 5000, { isStatic: true })
    World.add(world, wall3)
}

function level3f() {
    scene = 4
    button1 = false;
    button2 = false;
    levelTimer = 0 
    player1done = false
    player2done = false

    player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false

    level1.remove();
    level2.remove();
    level3.remove();
    level4.remove();
    level5.remove();
    level6.remove();
    level7.remove();
    level8.remove();
    level9.remove();
    level10.remove();

    player1X = width / 1.5;
    player1Y = height / 4;

    opts =
    {
        restitution: 0.1,
        friction: 0.3,
        frictionAir: 0.1
    };

    player2 = Bodies.circle(width / 1.5, height / 2 + 250, 50, opts)
    World.add(world, player2)

    button2Object = Bodies.rectangle(width / 1.15, height+10, 80, 10, { isStatic: true })
    World.add(world, button2Object)

    wall3 = Bodies.rectangle(width / 3-25, height - 50, 50, 5000, { isStatic: true })
    World.add(world, wall3)

    var wall4 = Bodies.rectangle(width / 4-25, height - 50, 200, 200, { isStatic: true })
    World.add(world, wall4)
}

function level4f() {
    scene = 5
    button1 = false;
    button2 = false;
    levelTimer = 0 
    player1done = false
    player2done = false

    player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false

    level1.remove();
    level2.remove();
    level3.remove();
    level4.remove();
    level5.remove();
    level6.remove();
    level7.remove();
    level8.remove();
    level9.remove();
    level10.remove();

    player1X = width / 1.5;
    player1Y = height / 4;

    opts =
    {
        restitution: 0.1,
        friction: 0.3,
        frictionAir: 0.1
    };

    player2 = Bodies.circle(width / 1.5, height / 2 + 250, 50, opts)
    World.add(world, player2)

    button2Object = Bodies.rectangle(width / 1.15, height+10, 80, 10, { isStatic: true })
    World.add(world, button2Object)

    wall3 = Bodies.rectangle(width / 3-25, height - 50, 50, 5000, { isStatic: true })
    World.add(world, wall3)
}

function remove1() {
    player1Point1 = false, player1Point2 = false, player2Point1 = false, player2Point2 = false
    Matter.World.remove(world, player2);
    //delete player2;
}

function playerControler1() {
    //arrow keys
    //if(keyIsDown(LEFT_ARROW)) {playerX -= playerSpeed};
    //if(keyIsDown(RIGHT_ARROW)) {playerX += playerSpeed};
    //if(keyIsDown(UP_ARROW)) {playerY -= playerSpeed};
    //if(keyIsDown(DOWN_ARROW)) {playerY += playerSpeed};

    // A S W D
    if (keyIsDown(87)) { player1Y -= playerSpeed };
    if (keyIsDown(83)) { player1Y += playerSpeed };
    if (keyIsDown(65)) { player1X -= playerSpeed };
    if (keyIsDown(68)) { player1X += playerSpeed };
}

function playerControler2() {
    //arrow keys
    if (keyIsDown(LEFT_ARROW)) { Matter.Body.applyForce(player2, { x: 0, y: 0 }, { x: -0.005, y: 0 }) };
    if (keyIsDown(RIGHT_ARROW)) { Matter.Body.applyForce(player2, { x: 0, y: 0 }, { x: 0.005, y: 0 }) };
    //if(keyIsDown(UP_ARROW)) {playerY -= playerSpeed};
    //if(keyIsDown(DOWN_ARROW)) {playerY += playerSpeed};

    // A S W D
    if (keyIsDown(74)) { Matter.Body.applyForce(player2, { x: 0, y: 0 }, { x: -0.005, y: 0 }) };
    if (keyIsDown(76)) { Matter.Body.applyForce(player2, { x: 0, y: 0 }, { x: 0.005, y: 0 }) };
    //if(keyIsDown(73)) {Matter.Body.applyForce(player1, {x:0, y:0}, {x:0, y:0.01})};//????????
}

