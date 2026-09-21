const Stage_C_V = { // I was originally into the idea of a context variable, but seeing now, Might as well have just created classes, though, Ousterhoust said it simply mitigates stuff, so honestly fairs.
    Stage_Width: window.innerWidth - 100,
    Stage_Height: window.innerHeight - 100,
    getPos(){

        const [x1,x2,y1,y2,z1,z2] = 
        [
            -this.Stage_Width,
            this.Stage_Width,
            -this.Stage_Height,
            this.Stage_Width,
            -this.Stage_Width * 0.83,
            this.Stage_Width * 0.83,
        ]

        const coords = [[x1, x2], [y1, y2], [z1, z2]]

        return coords
    }
}


const Pong_C_V = {
    Pong_x : 0,
    Pong_y: window.innerHeight / 2 ,
    Pong_z: -(Stage_C_V.Stage_Height),
    Pong_Width: 300,
    Pong_Height: 10,
    Pong_Depth: 170,
    Pong_Speed: 40,
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

const Ping_C_V= {
    Ping_radius: 45,
    Ping_x: 0,
    Ping_y: window.innerHeight / 8,
    Ping_z: -500,
    Ping_Speed: 10,
    UpOrDown: "Up",
    LeftOrRight: "Left",
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
    move: (PingBall) => { 
        if (PingBall.Game_Started == true){
            switch (PingBall.LeftOrRight.toLowerCase()){

            case "right":
                PingBall.Ping_y -= PingBall.Ping_Speed
                break;
            case "left":
                PingBall.Ping_y += PingBall.Ping_Speed
                break;

        }
        }

    },
}


document.addEventListener('keydown', (event) => {
        // console.log(`${event.key}`)

    switch (event.key){
        case 'ArrowRight':
        if(Pong_C_V.Pong_x > Stage_C_V.Stage_Width + Pong_C_V.Pong_Width){
            Pong_C_V.Pong_x = -(Stage_C_V.Stage_Width+Pong_C_V.Pong_Width)
        }
        Pong_C_V.Pong_x += Pong_C_V.Pong_Speed

        break;

        case 'ArrowLeft':
        if(Pong_C_V.Pong_x < -(Stage_C_V.Stage_Width + Pong_C_V.Pong_Width)){
            Pong_C_V.Pong_x = Stage_C_V.Stage_Width + Pong_C_V.Pong_Width
        }
        Pong_C_V.Pong_x -= Pong_C_V.Pong_Speed

        break;

        case 'ArrowUp':

        if(Pong_C_V.Pong_z < -7300){
            Pong_C_V.Pong_z = 1200
        }
        Pong_C_V.Pong_z -= Pong_C_V.Pong_Speed

        break

        case 'ArrowDown':

        if(Pong_C_V.Pong_z > 1200){
            Pong_C_V.Pong_z = -7210
        }
        Pong_C_V.Pong_z += Pong_C_V.Pong_Speed 

        break

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
        console.log("They Collided.");
        return true;
    }

}

function setup() {
    createCanvas(Stage_C_V.Stage_Width, Stage_C_V.Stage_Height, WEBGL);

}



function draw_pong(x, y, z,width,height,depth){

    push()
    fill("white")
    translate(x, y , z)
    box(width,height, depth)
    pop();

}


function draw_ping(x,y,z,radius){

    push();
    translate(x,y,z)
    fill("yellow")
    sphere(radius, 10, 4)
    pop();
}


function draw() {

    background(220);

    draw_pong(Pong_C_V.Pong_x, Pong_C_V.Pong_y, Pong_C_V.Pong_z,Pong_C_V.Pong_Width,Pong_C_V.Pong_Height,Pong_C_V.Pong_Depth)
    draw_ping(Ping_C_V.Ping_x, Ping_C_V.Ping_y ,Ping_C_V.Ping_z, Ping_C_V.Ping_radius)
    Ping_C_V.move(Ping_C_V)

    if(collision(Ping_C_V, Pong_C_V)){
        
    }

}

function windowResized(event){

    Stage_C_V.Stage_Width =   window.innerWidth - 100,
    Stage_C_V.Stage_Height = window.innerHeight - 100

    resizeCanvas(Stage_C_V.Stage_Width ,Stage_C_V.Stage_Height)
}

