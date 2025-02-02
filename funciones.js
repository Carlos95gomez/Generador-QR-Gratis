function openModal() {
    document.getElementById("acercaDe").style.display = "block";
  }
  
  // Cerrar al hacer clic en la X
  document.querySelector(".close").onclick = function() {
    document.getElementById("acercaDe").style.display = "none";
  }

// Función principal para generar el código QR
function generarQR() {
    const url = document.getElementById('url').value;
    const colorQR = document.getElementById('colorQR').value;
    const colorFondo = document.getElementById('colorFondo').value;
    const nivelError = document.getElementById('nivelError').value;
    const contenedorQR = document.getElementById('contenedor-qr');

    if (!url) {
        alert('Por favor ingresa una URL');
        return;
    }

    // Limpiar QR anterior
    const divCodigoQR = document.getElementById('codigoQR');
    divCodigoQR.innerHTML = '';

    // Generar nuevo QR
    new QRCode(divCodigoQR, {
        text: url,
        width: 256,
        height: 256,
        colorDark: colorQR,
        colorLight: colorFondo,
        correctLevel: QRCode.CorrectLevel[nivelError]
    });

    // Mostrar el contenedor después de generar el QR
    setTimeout(() => {
        contenedorQR.style.display = 'flex';
    }, 100);
}


// Función para descargar el QR
function descargarQR() {
    const divQR = document.getElementById('codigoQR');
    const imagen = divQR.querySelector('img');
    const url = document.getElementById('url').value;
    const iconoSVG = divQR.querySelector('.contenedor-icono svg'); // Cambio aquí para obtener el SVG
    const colorQR = document.getElementById('colorQR').value; // Obtener el color del QR
    
    if (!imagen) {
        alert('Primero genera un código QR');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const padding = 40;
    canvas.width = imagen.width + (padding * 2);
    canvas.height = imagen.height + (padding * 2);
    
    // Dibujar fondo blanco
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Función para dibujar rectángulo con bordes redondeados
    function roundRect(x, y, w, h, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + w - radius, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
        ctx.lineTo(x + w, y + h - radius);
        ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
        ctx.lineTo(x + radius, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }

    // Dibujar QR con bordes redondeados
    ctx.save();
    roundRect(padding, padding, imagen.width, imagen.height, 10);
    ctx.clip();
    ctx.drawImage(imagen, padding, padding);
    ctx.restore();

    // Si no hay icono, descargar directamente
    const enlace = document.createElement('a');
    const nombreArchivo = url.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30);
    enlace.download = `qr-${nombreArchivo}.png`;
    enlace.href = canvas.toDataURL('image/png');
    enlace.click();
    
}

// Función para imprimir el QR
function imprimirQR() {
    const divQR = document.getElementById('codigoQR');
    if (!divQR.querySelector('img')) {
        alert('Primero genera un código QR');
        return;
    }
    window.print();
}