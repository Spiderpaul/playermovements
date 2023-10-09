import Player from './player.js';  //Importando clases
import InputHandler from './input.js';
import drawStatusText from './utils.js';

window.addEventListener('load', function(){  //Evento que detecta cuando se carga la página
    const loading = document.getElementById('loading'); //Importando el texto de carga y dándole estilos CSS
    loading.style.display = 'none';
    const canvas = document.getElementById('canvas1'); //Importando canvas, creando el contexto y agregando medidas de ancho y alto
    const ctx = canvas.getContext('2d'); 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height);  //Instancias u objetos de clases importadas.
    const input = new InputHandler();

    let lastTime = 0;
    function animate(timeStamp){       //Método que cíclico que permite las animaciones.
        //deltaTime para que todas las pc corran los frames a la misma velocidad, independientemente del procesador de la pc
        const deltaTime = timeStamp - lastTime; 
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);  //Para limpiar el lienzo (canvas) cada frame
        player.update(input.lastKey)   //Instancia del player con sus métodos update y draw, para animar y dibujar al personaje
        player.draw(ctx, deltaTime);
        drawStatusText(ctx, input, player);  //Instancia de la clase que dibuja el texto en pantalla
        requestAnimationFrame(animate);   //Llamado al propio método para hacer el loop
    }
    animate(0);  
});