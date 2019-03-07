
function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  window.onkeydown = (e) => {
    e.preventDefault();

    console.log(e.key);
    if(e.key == 'a'){
      console.log("Tecla");
    }
  }



  var i = 0;
  while (i<canvas.height){
    ctx.fillStyle = 'white';
    ctx.fillRect(300, i, 1, 10)
    i += 20;
  }

  var puntuacion = {
    Num1 : 0,
    Num2 : 0,

    init: function(ctx) {
      this.ctx = ctx
    },
    draw: function () {
      this.ctx.font = "25px Arial"
      this.ctx.fillStyle = 'yellow'
      this.ctx.fillText(this.Num1, 200, 40)
      this.ctx.fillText(this.Num2, 400, 40)
    },
  }

  var raquetas = {
    init: function(ctx) {
      this.ctx = ctx;
    },

    draw: function () {
      ctx.fillStyle = 'white';
      ctx.fillRect(550,100, 10, 40);
      //-- Raquetas
      ctx.fillStyle = 'white';
      ctx.fillRect(50,100, 10, 40)
    },
  }

  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 50,
    y_ini: 50,

    //-- Dimensiones de la Bola
    width: 5,
    height: 5,

    //-- Coornenadas
    x : 0,
    y : 0,

    //-- Velocidad
    vx : 4,
    vy : 1,

    //-- Contexto
    ctx: null,

    //-- Inicializar la bola
    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },

    //-- Dibujar
    draw: function () {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'white';
      this.ctx.arc(this.x,this.y,5,0,(Math.PI/180)*360,true);
      this.ctx.fill();
    },

    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },

    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Inicializar y pintar la puntuacion
  puntuacion.init(ctx)
  puntuacion.draw()

  //-- Inicializar y pintar raquetas
  raquetas.init(ctx)
  raquetas.draw()

  //-- Inicializar y pintar la bola
  bola.init(ctx)
  bola.draw()

  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;

  //-- Boton de salcar
  var sacar = document.getElementById('sacar')

  //-- Función de retrollamda del botón de sacar.
  //-- ¡Que comience la animación!
  sacar.onclick = () => {

    //-- Si la bola ya se está animando,
    //-- no hacer nada
    if (!timer) {

      //-- Lanzar el timer. Su funcion de retrollamada la definimos
      //-- en su primer parámetro
      timer = setInterval(()=>{

        //-- Esto se ejecuta cada 20ms

        //-- Actualizar la bola
        bola.update();

        //-- Borrar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //-- Dibuar la bola
        bola.draw();

        raquetas.draw()
        puntuacion.draw()

        //-- Si la bola llega a la parte derecha del canvas:
        //-- Terminar
        if (bola.x > canvas.width) {

          //-- Eliminar el timer
          clearInterval(timer)
          timer = null;

          //-- Bola a su posicion inicial
          bola.reset();

          //-- Dibujar la bola en pos. inicial
          bola.draw();
        }
      },20); //-- timer
    }
  } //-- Fin onclick
}
