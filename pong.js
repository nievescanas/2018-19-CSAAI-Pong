
function main()
{
  console.log("Pong: Main: Start!")
  console.log("Player 1 : W / S")
  console.log("Player 2 : 8 / 5")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");


  var y_1 = 100;
  var x_1 = 50;

  var y_2 = 300;
  var x_2 = 550;
  var r_ancho = 10;
  var r_largo =40;
  var comenzar = false;

  window.onkeydown = (e) => {
    e.preventDefault();
    if(e.key == 'w'){
      if (y_1 > escenario.limite){
        y_1 -= 10;
      }
    } else if(e.key == 's'){
      if(y_1 < canvas.height){
        y_1 += 10;
      }
    }
    if(e.key == '8'){
      if (y_2 > escenario.limite){
        y_2 -= 10;
      }
    } else if(e.key == '5'){
      if (y_2 < canvas.height){
        y_2 += 10;
      }
    }
  }

  var inicio = {
    frase: "START",
    i:2,

    init: function(ctx) {
      this.ctx = ctx
      },
    draw: function(){

      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(10,10, 580, 10);
      this.ctx.fillRect(10,380, 580, 10);

      this.ctx.fillRect(170,100, 10, 100);
      this.ctx.fillRect(170,100, 50, 10);
      this.ctx.fillRect(220,100, 10, 60);
      this.ctx.fillRect(190,150, 40, 10);

      this.ctx.fillRect(240,100, 10, 60);
      this.ctx.fillRect(240,100, 50, 10);
      this.ctx.fillRect(280,100, 10, 60);
      this.ctx.fillRect(240,150, 50, 10);

      this.ctx.fillRect(300,100, 10, 60);
      this.ctx.fillRect(300,100, 50, 10);
      this.ctx.fillRect(350,100, 10, 60);

      this.ctx.fillRect(370,100, 10, 60);
      this.ctx.fillRect(370,100, 50, 10);
      this.ctx.fillRect(370,150, 30, 10);
      this.ctx.fillRect(420,100, 10, 100);
      this.ctx.fillRect(380,190, 40, 10);
    },
  }

  var end = {
    init: function(ctx) {
      this.ctx = ctx
      },
    draw: function(p1,p2){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(10,10, 580, 10);
      this.ctx.beginPath();
      this.ctx.font = "60px Impact"
      this.ctx.fillStyle = 'white'
      this.ctx.fillText("GAME OVER", 120, 100)
      this.ctx.font = "20px Impact"
      this.ctx.fillText("PLAYER 1", 120, 200)
      this.ctx.fillText(p1, 160, 240)
      this.ctx.fillText("PLAYER 2", 380, 200)
      this.ctx.fillText(p2, 420, 240)
    },
  }

  var escenario = {
    i : 0,
    limite : 70,
    init: function(ctx) {
      this.ctx = ctx
      },
    draw: function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, this.limite, 600, 5)
      while (this.i<canvas.height){
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(300, this.i, 1, 10)
        this.i += 20;
      }
      this.i = 0;
    },
  }

  var puntuacion = {
    num1 : 0,
    num2 : 0,
    max : 2,

    init: function(ctx) {
      this.ctx = ctx
    },
    draw: function () {
      this.ctx.beginPath();
      this.ctx.font = "80px Arial"
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(this.num1, 210, 60)
      this.ctx.fillText(this.num2, 350, 60)
    },
    reset: function() {
      this.num1 = 0;
      this.num2 = 0;
    }
  }

  var raquetas = {
    init: function(ctx) {
      this.ctx = ctx;
    },

    draw: function () {
      this.ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.fillRect(x_1,y_1, r_ancho, r_largo)
      ctx.fillRect(x_2,y_2, r_ancho, r_largo)
    },

  }

  var bola = {
    //-- Posición inicial de la pelota
    x_ini: 300,
    y_ini: 200,

    //-- Dimensiones de la Bola
    ballRadius: 5,

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
      this.ctx.arc(this.x,this.y,this.ballRadius,0,(Math.PI/180)*360,true);
      this.ctx.fill();
    },

    //-- Update
    update: function () {
      if (y_1 <= this.y && y_1 + r_largo >= this.y ){
        if(this.x + this.vx < x_1 - r_ancho + this.ballRadius){
          this.vx = -this.vx;
        }
      }
      if (y_2 <= this.y && y_2 + r_largo >= this.y){
          if (this.x + this.vx > x_2-this.ballRadius){
            this.vx = -this.vx;
          }
      }
      if(this.y + this.vy > canvas.height-this.ballRadius || this.y + this.vy < escenario.limite+this.ballRadius) {
        this.vy = -this.vy;
      }
      this.x += this.vx;
      this.y += this.vy;
    },

    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Inicializar
  inicio.init(ctx)
  inicio.draw()

  escenario.init(ctx)
  puntuacion.init(ctx)
  raquetas.init(ctx)
  bola.init(ctx)
  end.init(ctx)


  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;
  var timer1 = null;

  //-- Boton de salcar
  var start = document.getElementById('start')

  //-- Función de retrollamda del botón de sacar.
  //-- ¡Que comience la animación!

  start.onclick = () => {
    //-- Inicializar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    escenario.draw(ctx)
    puntuacion.draw(ctx)
    raquetas.draw(ctx)
    bola.draw(ctx)

      //if(comenzar){
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

            //-- Dibuar la bola, raquetas, puntuación y escenario
            bola.draw();
            raquetas.draw()
            puntuacion.draw()
            escenario.draw()

            //-- Si la bola llega a la parte derecha del canvas:
            //-- Terminar
            if (bola.x > canvas.width || bola.x < 0-bola.ballRadius) {
              if (bola.x > canvas.width){
                puntuacion.num1 += 1;
              }else{
                puntuacion.num2 += 1;
              }

              //-- Eliminar el timer
              clearInterval(timer)
              timer = null;

              //-- Bola a su posicion inicial
              bola.reset();
              if (puntuacion.num1<=puntuacion.max && puntuacion.num2<=puntuacion.max){
                //-- Dibujar la bola en pos. inicial
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bola.draw();
                raquetas.draw()
                puntuacion.draw()
                escenario.draw()
              }else{
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                end.draw(puntuacion.num1,puntuacion.num2)
                puntuacion.reset()
              }
            }
          },20); //-- timer
        }
      //}

  } //-- Fin onclick
}
