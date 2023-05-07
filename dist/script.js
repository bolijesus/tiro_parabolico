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

var posicionHueco;
var anchoHueco;


function trayectoria() {
    var velocidadInicial = parseFloat(document.getElementById("vi").value);
    var anguloLanzamiento = parseFloat(document.getElementById("theta").value);
    let hr = document.getElementsByTagName('hr'); 
    var area = document.getElementById("area");
    gravedad = parseFloat(document.getElementById("gravedad").value);
    var anguloRadianes = anguloLanzamiento * (Math.PI / 180);

    var imgs = area.querySelectorAll("img");

    for (var i = 0; i < imgs.length; i++) {
        area.removeChild(imgs[i]);
    }

    // Cálculo de las componentes de la velocidad inicial en X y Y
    velocidadInicialX = velocidadInicial * Math.cos(anguloRadianes).toFixed(2);
    velocidadInicialY = velocidadInicial * Math.sin(anguloRadianes).toFixed(2);

    // Cálculo del tiempo de subida y tiempo total de vuelo
    tiempoSubida = (velocidadInicialY / gravedad).toFixed(2);
    tiempoTotal = (tiempoSubida * 2).toFixed(2);

    // Cálculo de la distancia horizontal máxima y altura máxima
    distanciaHorizontalMaxima = ((Math.pow(velocidadInicial, 2) * Math.sin(2 * anguloRadianes)) / gravedad).toFixed(2);
    alturaMaxima = ((Math.pow(velocidadInicial, 2) * Math.pow(Math.sin(anguloRadianes), 2)) / (2 * gravedad)).toFixed(2);
    
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
        let posicionHuecoHTML = hr[0].offsetTop - 447 + posicionVertical;
        pelota.style.top = posicionHuecoHTML + "px";
        pelota.style.left = posicionHorizontal + "px";
        pelota.title = `velx:${velocidadInicialX},vely:${velocidadY},vel:${velocidad}`;

        area.appendChild(pelota);
    }    
    var info = document.getElementById("info");
    info.className = "card1";
    info.innerHTML = `
        Vi = ${velocidadInicial} m/s<br>
        Theta = ${anguloLanzamiento.toFixed(2)}°<br>
        Theta en Radianes = ${anguloRadianes.toFixed(2)} rad<br>
        Vix = ${velocidadInicialX} m/s<br>
        Viy = ${velocidadInicialY} m/s<br>
        Ts = ${tiempoSubida} s<br>
        Tt = ${tiempoTotal} s<br>
        Xmax = ${distanciaHorizontalMaxima} m<br>
        Ymax = ${alturaMaxima} m<br>
    `;
}


function iniciar() {    

    // Obtiene los valores de entrada del usuario
    var velocidadInicial = parseFloat(document.getElementById("vi").value);
    var anguloLanzamiento = parseFloat(document.getElementById("theta").value);
    gravedad = parseFloat(document.getElementById("gravedad").value);
    

    // Convierte el ángulo de lanzamiento de grados a radianes
    var anguloRadianes = anguloLanzamiento * (Math.PI / 180);

    // Calcula las componentes de la velocidad inicial en X y Y
    velocidadInicialX = (velocidadInicial * Math.cos(anguloRadianes)).toFixed(2);
    velocidadInicialY = (velocidadInicial * Math.sin(anguloRadianes)).toFixed(2);

    // Calcula el tiempo de subida y el tiempo total de vuelo
    tiempoSubida = (velocidadInicialY / gravedad).toFixed(2);
    tiempoTotal = (tiempoSubida * 2).toFixed(2);

    // Calcula la altura máxima alcanzada y la distancia horizontal máxima
    distanciaHorizontalMaxima = ((Math.pow(velocidadInicial, 2) * Math.sin(2 * anguloRadianes)) / gravedad).toFixed(2);
    alturaMaxima = ((Math.pow(velocidadInicial, 2) * Math.pow(Math.sin(anguloRadianes), 2)) / (2 * gravedad)).toFixed(2);

    // Reinicia el tiempo transcurrido a cero
    tiempoTranscurrido = 0;

    // Crea el intervalo de tiempo para actualizar la posición de la pelota
    intervaloMovimiento = setInterval(mover, 10);

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
        Vi = ${velocidadInicial} m/s<br>
        Theta = ${anguloLanzamiento.toFixed(2)}°<br>
        Theta en Radianes = ${anguloRadianes.toFixed(2)} rad<br>
        Vix = ${velocidadInicialX} m/s<br>
        Viy = ${velocidadInicialY} m/s<br>
        Ts = ${tiempoSubida} s<br>
        Tt = ${tiempoTotal} s<br>
        Xmax = ${distanciaHorizontalMaxima} m<br>
        Ymax = ${alturaMaxima} m<br>
    `;
    
}

function mover() {
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
        trayectoria();
        if ((posicionHorizontal+ anchoHueco) >= posicionHueco && posicionHorizontal <= posicionHueco) {
            alert('Ganaste')            
        }
        
    console.log(posicionHorizontal, posicionHueco, anchoHueco );
        clearInterval(intervaloMovimiento);
    }    

    // Incrementa el tiempo transcurrido
    tiempoTranscurrido += 0.1;
    
}

function positiontop() {
    var objetivo = document.getElementById('objetivo');
    var anchoPantalla = window.innerWidth;
    anchoHueco = objetivo.width;
    posicionHueco = Math.round(Math.random() * (anchoPantalla - 50)) + 50;

    if (posicionHueco > anchoPantalla) {
        posicionHueco = anchoPantalla-50
    }
    if (posicionHueco < 50) {
        posicionHueco = 50
    }
    objetivo.style.left = posicionHueco + 'px';
}
