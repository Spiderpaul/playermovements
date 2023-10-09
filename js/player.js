//Importando métodos del archivo state.js
import {StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight} from './state.js'  

export default class Player{     //Clase player
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [new StandingLeft(this),new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)]; //Guardan los valores => [0,1], desde las instancias.
        this.currentState = this.states[1];    //Inicia viendo a la derecha
        this.image = document.getElementById('dogImage');  //Cargando la imagen desde HTML
        this.width = 200;     //Medidas del sprite (personaje)
        this.height = 181.83;
        this.x = this.gameWidth/2 - this.width/2;  //Esto permite posicionar al personaje en la mitad horizontal de la pantalla
        this.y = this.gameHeight - this.height;    //Permite posicionar en la base de la pantalla al personaje (vertical)
        this.vy = 0;  //Vertical Y
        this.weight = 1; //Gravedad
        this.frameX = 0;   //FrameX y FrameY, permiten moverse entre sprites en dog.png (Permite dar el efecto de animación)
        this.frameY = 0;
        this.maxFrame = 5;
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 200;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
    }
    draw(context, deltaTime){
        //Para recorrer los sprites horizontalmente en dog.png y dar sensación de movimiento (animación)
        if (this.frameTimer > this.frameInterval){
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        /*  El método drawImage permite dibujar dentro del canvas la imagen, recibiendo como parámetro this.image, 
            "sx" => permite ubicar el sprite en imagen dog.png en lo horizontal (para cambiar de posición del srpite),
            "sy" => permite ubicar el sprite en imagen dog.png en lo vertical,
            "sh" => Da el tamaño en horizontal del sprite (personaje),
            "sv" => Da el tamaño en vertical del sprite,
            this.x => permite posicionar el sprite horizontalmente(personaje en la pantalla),
            this.y => permite posicionar el sprite verticalmente en la pantalla,
            this.width => toma la medida en horizontal del canvas,
            this.height => toma la medida en vertical del canvas */
        context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input){
        /* El parametro input, viene desde la instancia "player" en el archivo script.js, que contiene el valor de la variable
        "lastKey" de la clase "InputHandler" del archivo input.js, que puede contener el texto => "PRESS left", "PRESS right", etc. 
        esto permitirá más adelante, definir si el player o personaje está viendo hacia la izquierda o derecha*/ 
        this.currentState.handleInput(input); 
        //Movimiento horizontal
        this.x += this.speed;
        //Condicional para poner tope al player, que no salga de la pantalla
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
        //Movimiento vertical
        this.y += this.vy;
        if (!this.onGround()){  //Condicional para regresar al player al suelo
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }
        if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
    }
    setState(state){
        this.currentState = this.states[state]; //Toma los valores [new StandingLeft(this),new StandingRight(this)] o [0,1]
        /*Instancia el método "enter", desde StandingLeft(this) o StandingLeft(this) en state.js, lo que permite cambiar de sprite
        y dar la impresion de voltear a la derecha o izquiera, por ejemplo */
        this.currentState.enter();
    }
    onGround(){
        //Retorna la posición en la que el player está en el suelo
        return this.y >= this.gameHeight - this.height
    }
}