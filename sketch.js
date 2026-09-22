const Stage_C_V = { // I was originally into the idea of a context variable, but seeing now that I clearly didn't understand what that man was talkinga bout, might as well have just created classes, though, Ousterhoust said it simply mitigates stuff, so honestly fairs.
    Stage_Width: window.innerWidth - 100,
    Stage_Height: window.innerHeight - 100,
    getPos(){

        const [x1,x2,y1,y2] = 
        [
            -this.Stage_Width, //needs to e >>
            this.Stage_Width, // needs to be <<
            -this.Stage_Height,// needs to be >>
            this.Stage_Height, // needs to be <<
        ]

        const coords = [[x1, x2], [y1, y2]]

        return coords
    }
}


const Pong_C_V = {
    Pong_x : 0,
    Pong_y: window.innerHeight / 2 ,
    Pong_z: -(Stage_C_V.Stage_Height),
    Pong_Width: 600,
    Pong_Height: 20,
    Pong_Depth: 400,
    Pong_Speed: 40,
    Pong_XDirection: "None",
    Pong_ZDirection: "None",
    getPos(){
        const [x1, x2, y1, y2, z1, z2] = [
            this.Pong_x - this.Pong_Width / 2,
            this.Pong_x + this.Pong_Width / 2 ,
            this.Pong_y - this.Pong_Height / 2,
            this.Pong_y + this.Pong_Height / 2,
            this.Pong_z - this.Pong_Depth / 2,
            this.Pong_z + this.Pong_Depth / 2
        ]

        const coords = [[x1, x2], [y1, y2], [z1, z2]]
        return coords
    }
}

const ghostPong_C_V = {
    gPong_x : 0,
    gPong_y: window.innerHeight / 2 ,
    gPong_z: -(Stage_C_V.Stage_Height),
    gPong_Width: 300,
    gPong_Height: 10,
    gPong_Depth: 200,
    gPong_YOffset: 200,
    track(entity){
        const parent = entity.getXyz()

        this.gPong_x = parent.x
        this.gPong_y = window.innerHeight / 2,
        this.gPong_z = parent.z

    }
}

const Ping_C_V= {
    Ping_radius: 45,
    Ping_x: 0,
    Ping_y: window.innerHeight / 8,
    Ping_z: -500,
    Ping_Speed: 2,
    UpOrDown: "Up",
    LeftOrRight: "Left",
    InOrOut: "In",
    Game_Started: false, // Game start belongs here because on a game reset, this is the only thing I plan to affect
    getPos(){
        const [x1,x2,y1,y2,z1,z2] = [
            this.Ping_x - this.Ping_radius,
            this.Ping_x + this.Ping_radius,
            this.Ping_y - this.Ping_radius,
            this.Ping_y + this.Ping_radius,
            this.Ping_z - this.Ping_radius,
            this.Ping_z + this.Ping_radius        
        ] // returns a box for position

        const coords = [[x1, x2], [y1, y2], [z1, z2]]

        return coords
    },
    getXyz(){
        return {x: this.Ping_x, y: this.Ping_y, z: this.Ping_z}
    },
    getSpeed(){
        return this.Ping_Speed;
    },
    move(){ 
            if (this.Game_Started == true){
                switch (this.UpOrDown.toLowerCase()){

                case "up":
                    this.Ping_y += this.Ping_Speed
                    break;
                case "down":
                    this.Ping_y -= this.Ping_Speed
                    break;
                    default:

            } 

            switch (this.LeftOrRight.toLowerCase()){

                case "right":
                    this.Ping_x += this.Ping_Speed
                    break;
                case "left":
                    this.Ping_x -= this.Ping_Speed
                    break;
                    default:

            }
            switch (this.InOrOut.toLowerCase()){

                case "in":
                    this.Ping_z += this.Ping_Speed
                    break;
                case "out":
                    this.Ping_z -= this.Ping_Speed
                    break;
                    default:

            }


        }
    }
}

document.addEventListener('keydown', (event) => {
        // console.log(`${event.key}`)

    switch (event.key){
        case 'ArrowRight':
        if(Pong_C_V.Pong_x > Stage_C_V.Stage_Width + Pong_C_V.Pong_Width){
            Pong_C_V.Pong_x = -(Stage_C_V.Stage_Width+Pong_C_V.Pong_Width)
        }
        Pong_C_V.Pong_x += Pong_C_V.Pong_Speed

        Pong_C_V.Pong_XDirection = "Right"

        break;

        case 'ArrowLeft':
        if(Pong_C_V.Pong_x < -(Stage_C_V.Stage_Width + Pong_C_V.Pong_Width)){
            Pong_C_V.Pong_x = Stage_C_V.Stage_Width + Pong_C_V.Pong_Width
        }
        Pong_C_V.Pong_x -= Pong_C_V.Pong_Speed
        Pong_C_V.Pong_XDirection = "Left"

        break;

        case 'ArrowDown':

        if(Pong_C_V.Pong_z > 1200){
            Pong_C_V.Pong_z = -7210
        }
        Pong_C_V.Pong_z += Pong_C_V.Pong_Speed 
        Pong_C_V.Pong_ZDirection = "Out"


        break
        case 'ArrowUp':

        if(Pong_C_V.Pong_z < -7300){
            Pong_C_V.Pong_z = 1200
        }
        Pong_C_V.Pong_z -= Pong_C_V.Pong_Speed
        Pong_C_V.Pong_ZDirection = "In"

        break

        case 'z':
        Pong_C_V.Pong_y -= Pong_C_V.Pong_Speed
            break;
    case 'x':
        Pong_C_V.Pong_y += Pong_C_V.Pong_Speed
        break;



        case " ":
            if (Ping_C_V.Game_Started == false){
                Ping_C_V.Game_Started = true;
                console.log(Ping_C_V.Game_Started)
            }
        break;
        default:

    }
});



function collision(entity1, entity2){
    const [e1x, e1y, e1z] = entity1.getPos();
    const [e2x, e2y, e2z] = entity2.getPos();


    const overlapX = e1x[0] <= e2x[1] && e1x[1] >= e2x[0];
    const overlapY = e1y[0] <= e2y[1] && e1y[1] >= e2y[0];
    const overlapZ = e1z[0] <= e2z[1] && e1z[1] >= e2z[0];

    if (overlapX && overlapY && overlapZ) {
        // console.log("They Collided.");
        return true;
    }

}

function TwoDcollision(entity1, entity2){
    const [e1x, e1y] = entity1.getPos();
    const [e2x, e2y, e2z] = entity2.getPos();

    
            
    const touchX = e1x[0] > e2x[0] || e1x[1] < e2x[1]
    const touchY = e1y[0] > e2y[0] || e1y[1] < e2y[1]
    
    if (touchX || touchY){

        // console.log(e1x, e2x)
        return true
    }

    return false
    }


function draw_pong(x, y, z,width,height,depth, color){

    push()
    fill(color)
    translate(x, y , z)
    box(width, height, depth)
    pop();

}

function draw_gPong(x, y, z,width,height,depth){
    
    const pColor = color(50,50,50)
    pColor.setAlpha(2)
    push()
    fill(pColor)
    translate(x, y , z)
    box(width, height, depth)
    pop();

}
function draw_ping(x,y,z,radius){

    push();
    translate(x,y,z)
    fill("yellow")
    sphere(radius, 10, 4)
    pop();
}


function setup() {
    createCanvas(Stage_C_V.Stage_Width, Stage_C_V.Stage_Height, WEBGL);

}

function windowResized(event){

    Stage_C_V.Stage_Width =   window.innerWidth - 100,
    Stage_C_V.Stage_Height = window.innerHeight - 100

    resizeCanvas(Stage_C_V.Stage_Width ,Stage_C_V.Stage_Height)
    console.log(Ping_C_V)
}


function draw() {

    background(220);

    if(collision(Ping_C_V, Pong_C_V)){
        switch(Ping_C_V.LeftOrRight.toLowerCase()){
            case 'left':
                if (Pong_C_V.Pong_XDirection == "Left"){
                Ping_C_V.LeftOrRight = 'Left'
                break;
                }
                Ping_C_V.LeftOrRight = 'Right'
                break;
            case 'right':
                 if (Pong_C_V.Pong_XDirection == "Right"){
                Ping_C_V.LeftOrRight = 'Right'
                break;
                }
                Ping_C_V.LeftOrRight = 'Left'
                break;
        }
        switch(Ping_C_V.UpOrDown.toLowerCase()){
            case 'up':
                Ping_C_V.UpOrDown = 'down'
                break;
            case 'down':
                Ping_C_V.UpOrDown = 'up'
                break;
        }
        switch(Ping_C_V.InOrOut.toLowerCase()){
            case 'out':
                if (Pong_C_V.Pong_ZDirection == "Out"){
                Ping_C_V.InOrOut = 'Out'
                break;
                }

            
                Ping_C_V.InOrOut = 'in'
                break;
            case 'in':
                if (Pong_C_V.Pong_ZDirection == "In"){
                Ping_C_V.InOrOut = 'In'
                break;
                }
                Ping_C_V.InOrOut = 'out'
                break;
        }
    }
    

    if(TwoDcollision(Stage_C_V, Ping_C_V )){

        console.log("2d Collide")
        switch(Ping_C_V.LeftOrRight.toLowerCase()){
            case 'left':
                Ping_C_V.LeftOrRight = 'Right'
                break;
            case 'right':
                Ping_C_V.LeftOrRight = 'Left'
                break;
        }
        switch(Ping_C_V.UpOrDown.toLowerCase()){
            case 'up':
                Ping_C_V.UpOrDown = 'Down'
                break;
            case 'down':
                Ping_C_V.UpOrDown = 'Up'
                break;
        }
    }

    draw_pong(Pong_C_V.Pong_x, Pong_C_V.Pong_y, Pong_C_V.Pong_z,Pong_C_V.Pong_Width,Pong_C_V.Pong_Height,Pong_C_V.Pong_Depth, "white")
    draw_gPong(ghostPong_C_V.gPong_x, ghostPong_C_V.gPong_y, ghostPong_C_V.gPong_z,ghostPong_C_V.gPong_Width,ghostPong_C_V.gPong_Height,ghostPong_C_V.gPong_Depth)
    draw_ping(Ping_C_V.Ping_x, Ping_C_V.Ping_y ,Ping_C_V.Ping_z, Ping_C_V.Ping_radius)
    ghostPong_C_V.track(Ping_C_V)
    Ping_C_V.move()

    console.log(Pong_C_V.Pong_XDirection, Pong_C_V.Pong_ZDirection)


}

/*
Problems Identified:

- Slight inconsistencies in Conceptual Models/Interfaces. It was actually quite funny that the idea of creating my own getters and setters only came just about after I had written almost all the functions. I also like to point out how funny it is that The Design of Everyday Things actually helps my thinking.
- Following on that second point: I'm sort of struggling to created a unified interface, maybe I am wrong but I shouldn't have to create TwoDcollision() to do the collision between the ball and the boundaries.

*/

