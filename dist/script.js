var velocidadInicialX;
var velocidadInicialY;
var tiempoSubida;
var tiempoTotal;
var posicionHorizontal;
var posicionVertical;
var tiempoTranscurrido;
var intervaloMovimiento;
var gravedad = 9.8;
var distanciaHorizontalMaxima;
var alturaMaxima;
var posTop;

function resolve() {
    var velocidadInicial = document.getElementById("vi").value;
    var anguloLanzamiento = document.getElementById("theta").value;
    let hr = document.getElementsByTagName('hr'); 
    var area = document.getElementById("area");
    gravedad = document.getElementById("gravedad").value;
    anguloLanzamiento = anguloLanzamiento * (Math.PI / 180);

    var imgs = area.querySelectorAll("img");
    for (var i = 0; i < imgs.length; i++) {
        area.removeChild(imgs[i]);
    }

    // Cálculo de las componentes de la velocidad inicial en X y Y
    velocidadInicialX = velocidadInicial * Math.cos(anguloLanzamiento).toFixed(3);
    velocidadInicialY = velocidadInicial * Math.sin(anguloLanzamiento).toFixed(3);

    // Cálculo del tiempo de subida y tiempo total de vuelo
    tiempoSubida = (velocidadInicialY / gravedad).toFixed(3);
    tiempoTotal = (tiempoSubida * 2).toFixed(3);

    // Cálculo de la distancia horizontal máxima y altura máxima
    distanciaHorizontalMaxima = (velocidadInicialX * tiempoTotal).toFixed(3);
    alturaMaxima = ((Math.pow(velocidadInicialY, 2) / 2) * gravedad).toFixed(3);
    
    // Generar las imágenes de la pelota para cada instante de tiempo
    for (tiempoTranscurrido = 0; tiempoTranscurrido <= tiempoTotal; tiempoTranscurrido += 0.5) {
        posicionHorizontal = velocidadInicialX * tiempoTranscurrido;
        posicionVertical = 400 - (velocidadInicialY * tiempoTranscurrido - (gravedad * Math.pow(tiempoTranscurrido, 2)) / 2);
        var pelota = document.createElement("img");
        var velocidadY = Math.abs(velocidadInicialY - gravedad * tiempoTranscurrido);
        var velocidad = Math.sqrt(Math.pow(velocidadInicialX, 2) + Math.pow(velocidadY, 2));
        pelota.src = 'https://static.vecteezy.com/system/resources/previews/016/314/339/non_2x/red-circle-red-dot-icon-free-png.png';
        pelota.style.width = 48 + "px";
        pelota.style.position = "absolute";
        posTop = hr[0].offsetTop - 447 + posicionVertical;
        pelota.style.top = posTop + "px";
        pelota.style.left = posicionHorizontal + "px";
        pelota.title = `velx:${velocidadInicialX},vely:${velocidadY},vel:${velocidad}`;

        area.appendChild(pelota);
    }    
}


function startmove() {    

    // Obtiene los valores de entrada del usuario
    var velocidadInicial = parseFloat(document.getElementById("vi").value);
    var anguloLanzamiento = parseFloat(document.getElementById("theta").value);
    gravedad = parseFloat(document.getElementById("gravedad").value);
    

    // Convierte el ángulo de lanzamiento de grados a radianes
    var anguloRadianes = anguloLanzamiento * (Math.PI / 180);

    // Calcula las componentes de la velocidad inicial en X y Y
    velocidadInicialX = (velocidadInicial * Math.cos(anguloRadianes)).toFixed(3);
    velocidadInicialY = (velocidadInicial * Math.sin(anguloRadianes)).toFixed(3);

    // Calcula el tiempo de subida y el tiempo total de vuelo
    tiempoSubida = (velocidadInicialY / gravedad).toFixed(3);
    tiempoTotal = (tiempoSubida * 2).toFixed(3);

    // Calcula la altura máxima alcanzada y la distancia horizontal máxima
    distanciaHorizontalMaxima = (velocidadInicialX * tiempoTotal).toFixed(3);
    alturaMaxima = ((Math.pow(velocidadInicialY, 2) / 2) * gravedad).toFixed(3);

    // Reinicia el tiempo transcurrido a cero
    tiempoTranscurrido = 0;

    // Crea el intervalo de tiempo para actualizar la posición de la pelota
    intervaloMovimiento = setInterval(move, 10);

    // Limpia cualquier imagen anterior
    var area = document.getElementById("area");
    var imagenes = area.querySelectorAll("img");
    for (var i = 0; i < imagenes.length; i++) {
        area.removeChild(imagenes[i]);
    }

    // Actualiza la información mostrada al usuario
    var info = document.getElementById("info");
    info.className = "card1";
    info.innerHTML = `
        Vi = ${velocidadInicial}<br>
        Theta = ${anguloLanzamiento.toFixed(3)} rad<br>
        Vix = ${velocidadInicialX}<br>
        Viy = ${velocidadInicialY}<br>
        Ts = ${tiempoSubida}<br>
        Tt = ${tiempoTotal}<br>
        Xmax = ${distanciaHorizontalMaxima}<br>
        Ymax = ${alturaMaxima}<br>
    `;
}

function move() {
    // Obtiene los elementos relevantes de la página
    var hr = document.getElementsByTagName("hr");
    var pelota = document.getElementById("ball");

    // Si todavía no se ha alcanzado el tiempo total de vuelo
    if (tiempoTranscurrido <= tiempoTotal) {
        // Calcula la posición de la pelota en el tiempo actual
        posicionHorizontal = velocidadInicialX * tiempoTranscurrido;
        posicionVertical = 400 - (velocidadInicialY * tiempoTranscurrido - (gravedad * Math.pow(tiempoTranscurrido, 2)) / 2);

        // Actualiza la posición de la pelota en la página
        pelota.style.left = posicionHorizontal + "px";
        pelota.style.top = (hr[0].offsetTop - 447 + posicionVertical) + "px";
        
    }else{
        resolve();
        clearInterval(intervaloMovimiento);
    }    

    // Incrementa el tiempo transcurrido
    tiempoTranscurrido += 0.1;
    
}

function positiontop() {

    posTop = Math.round(Math.random() * (315))
    if (posTop > 315) {
        posTop = 315
    }
    if (posTop < 50) {
        posTop = 50
    }
    
}