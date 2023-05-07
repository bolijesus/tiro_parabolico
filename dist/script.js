var velocidadInicial_X;
var velocidadInicial_Y;
var tiempoSubida;
var tiempoTotal;
var x;
var y;
var tiempo;
var beginmove;
var g = 9.8;
var xmax;
var ymax;
var posTop;

function resolve() {
    clearInterval(beginmove);
    var vi = document.getElementById("vi").value;
    var theta = document.getElementById("theta").value;
    let hr = document.getElementsByTagName('hr'); 
    var area = document.getElementById("area");
    g = document.getElementById("gravedad").value;
    theta = theta * (Math.PI / 180);

    var imgs = area.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
        area.removeChild(imgs[i]);
    }
    
    //vix,viy
    velocidadInicial_X = vi * Math.cos(theta).toFixed(3);
    velocidadInicial_Y = vi * Math.sin(theta).toFixed(3);

    //ts,tt
    tiempoSubida = (velocidadInicial_Y / g).toFixed(3);
    tiempoTotal = (tiempoSubida * 2).toFixed(3);

    //ymax,xmax
    xmax = (velocidadInicial_X * tiempoTotal).toFixed(3);
    ymax = ((Math.pow(velocidadInicial_Y, 2) / 2) * g).toFixed(3);
    
    for (tiempo = 0; tiempo <= tiempoTotal; tiempo += 0.5) {
        x = velocidadInicial_X * tiempo;
        y = 400 - (velocidadInicial_Y * tiempo - (g * Math.pow(tiempo, 2)) / 2);
        var ball = document.createElement("img");
        var vy = Math.abs(velocidadInicial_Y - g * tiempo);
        var v = Math.sqrt(Math.pow(velocidadInicial_X, 2) + Math.pow(vy, 2));
        ball.src = 'https://static.vecteezy.com/system/resources/previews/016/314/339/non_2x/red-circle-red-dot-icon-free-png.png';
        ball.style.width = 48 + "px";
        ball.style.position = "absolute";
        ball.style.top = (hr[0].offsetTop-447+y) + "px";
        ball.style.left = x + "px";
        ball.title = `velx:${velocidadInicial_X},vely:${vy},vel:${v}`;

        area.appendChild(ball);
    }
    img.style.left = xmax + "px";
    img.style.top = "400px";
}

function startmove() {
    clearInterval(beginmove);
    
    var info = document.getElementById('info')
    var vi = document.getElementById("vi").value;
    var theta = document.getElementById("theta").value;
    g = document.getElementById("gravedad").value;
    var area = document.getElementById("area");
    theta = theta * (Math.PI / 180);

    //vix,viy
    velocidadInicial_X = vi * Math.cos(theta).toFixed(3);
    velocidadInicial_Y = vi * Math.sin(theta).toFixed(3);

    //ts,tt
    tiempoSubida = (velocidadInicial_Y / g).toFixed(3);
    tiempoTotal = (tiempoSubida * 2).toFixed(3);
    //ymax,xmax
    xmax = (velocidadInicial_X * tiempoTotal).toFixed(3);
    ymax = ((Math.pow(velocidadInicial_Y, 2) / 2) * g).toFixed(3);
    tiempo = 0;

    beginmove = setInterval(move, 10);
    info.className = 'card1'
    var imgs = area.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
        area.removeChild(imgs[i]);
    }
    
    info.innerHTML =
        `
    Vi = ${vi}<br>
    Theta = ${theta.toFixed(3)} rad<br>
    Vix = ${velocidadInicial_X}<br>
    Viy = ${velocidadInicial_Y}<br>
    Ts = ${tiempoSubida}<br>
    Tt = ${tiempoTotal}<br>
    Xmax = ${xmax}<br>
    Ymax = ${ymax}<br>
    `
}
function move() {    
    
    let hr = document.getElementsByTagName('hr');

    var ball = document.getElementById("ball");
    var puntos = document.getElementById('puntos')

    if (tiempo <= tiempoTotal) {

        x = velocidadInicial_X * tiempo;
        y = 400 - (velocidadInicial_Y * tiempo - (g * Math.pow(tiempo, 2)) / 2);
        ball.style.left = x + "px";
        ball.style.top = (hr[0].offsetTop - 447+y) + "px";

    }
    tiempo += 0.1;   
}

function positiontop() {

    posTop = Math.round(Math.random() * (315))
    if (posTop > 315) {
        posTop = 315
    }
    if (posTop < 50) {
        posTop = 50
    }
    console.log(posTop)
}