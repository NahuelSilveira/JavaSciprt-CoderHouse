document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const triviaBox = document.getElementById('triviaBox');
    const btnEmpezarTrivia = document.getElementById('btnEmpezarTrivia');
    const btnTablaPuntos = document.getElementById('btnTablaPuntos');
    const nombreInput = document.getElementById('nombreInput');
    const btnContinuar = document.createElement('button');

    let puntos = 0;
    let preguntaActual = 0;
    let respuestaSeleccionada = false; // Variable para controlar si se seleccionó una respuesta
    let mensajeMostrado = false; // Variable para controlar si el mensaje ya se mostró


    const preguntas = [
        {
            pregunta: "¿Cómo se llama el primer episodio de Los Simpson?",
            opciones: ["Simpsons Roasting on an Open Fire", "Bart the Genius", "Homer's Odyssey", "There's No Disgrace Like Home"],
            respuestaCorrecta: "Simpsons Roasting on an Open Fire"
        },
        {
            pregunta: "Cual es el nombre del bar que siempre va Homero?",
            opciones: ["El bar de Joe", "Cachaquisimo Bailable", "El bar de Moe", "El bar de Joe"],
            respuestaCorrecta: "El bar de Moe"
        },
        {
            pregunta: "Como se llama el director de la primaria de Springfield?",
            opciones: ["Apu Nahasapeemapetilon", "Waylon Smithers", "Armando Barreda", "Seymour Skinner"],
            respuestaCorrecta: "Seymour Skinner"
        },
        {
            pregunta: "Como se llama el gato de Los Simpson?",
            opciones: ["Bola de nieve", "Ayudante de Santa", "Chispita", "Lassie"],
            respuestaCorrecta: "Bola de nieve"
        },
        {
            pregunta: "Quien es Abe Simpson?",
            opciones: ["El hermano de Homero", "El tio de Homero", "El papa de Homero", "La mama de Homero"],
            respuestaCorrecta: "El papa de Homero"
        },
    ];

    btnEmpezarTrivia.addEventListener('click', function () {
        const nombre = nombreInput.value.trim();
        if (nombre !== '') {
            overlay.style.display = 'none';
            mostrarPregunta();
        } else {
            if (!mensajeMostrado) {
                Swal.fire('Por favor, ingresa tu nombre.');
                
            }
            triviaBox.removeChild(btnContinuar); // Eliminar el botón "Continuar" si está presente
        }
    });

    btnTablaPuntos.addEventListener('click', function () {
        overlay.style.display = 'flex';
        mostrarTablaPuntos();
    });

    function showMessage(message) {
        Swal.fire({
            text: message,
            icon: 'info',
            confirmButtonText: 'Continuar'
        }).then(() => {
            if (preguntaActual < preguntas.length) {
                mostrarPregunta();
            } else {
                terminarTrivia();
            }
        });
    }

    function mostrarPregunta() {
        triviaBox.innerHTML = '';
        nombreInput.style.display = 'none'; // Oculta el input de nombre
        btnEmpezarTrivia.style.display = 'none'; // Oculta el botón de Empezar Trivia
        btnTablaPuntos.style.display = 'none'; // Oculta el botón de Tabla de Puntos
        respuestaSeleccionada = false; // Restablece la capacidad de seleccionar respuestas
        const preguntaActualObj = preguntas[preguntaActual];

        // Obtener datos del primer episodio de Los Simpson desde la API
        fetch('https://api.sampleapis.com/simpsons/episodes/1')
            .then(response => response.json())
            .then(data => {
                const preguntaElemento = document.createElement('h3');
                preguntaElemento.textContent = preguntas[preguntaActual].pregunta;
                triviaBox.appendChild(preguntaElemento);

                preguntas[preguntaActual].opciones.forEach((opcion, index) => {
                    const opcionElemento = document.createElement('button');
                    opcionElemento.textContent = opcion;
                    opcionElemento.addEventListener('click', function () {
                        if (!respuestaSeleccionada) {
                            verificarRespuesta(opcion, data.name); // Comparar respuesta con nombre del episodio obtenido de la API
                            respuestaSeleccionada = true; // Marca que se seleccionó una respuesta
                        }
                    });
                    triviaBox.appendChild(opcionElemento);
                });
            })
            .catch(error => console.error('Error al obtener datos del episodio:', error));
    }

    function verificarRespuesta(respuesta) {
        const preguntaActualObj = preguntas[preguntaActual];
        if (respuesta === preguntaActualObj.respuestaCorrecta) {
            Swal.fire({
                text: '¡Respuesta correcta!',
                icon: 'success',
                confirmButtonText: 'Continuar'
            }).then(() => {
                puntos++;
                preguntaActual++;
                if (preguntaActual < preguntas.length) {
                    mostrarPregunta();
                } else {
                    terminarTrivia();
                }
            });
        } else {
            Swal.fire({
                text: 'Respuesta incorrecta. La respuesta correcta es: ' + preguntaActualObj.respuestaCorrecta,
                icon: 'error',
                confirmButtonText: 'Continuar'
            }).then(() => {
                preguntaActual++;
                if (preguntaActual < preguntas.length) {
                    mostrarPregunta();
                } else {
                    terminarTrivia();
                }
            });
        }
    }
    function terminarTrivia() {
        overlay.style.display = 'flex';
        triviaBox.innerHTML = '<h2>Has terminado la trivia. Obtuviste ' + puntos + ' puntos de 5 posibles.</h2>';

        // Calcula y actualiza la tabla de puntos
        actualizarTablaPuntos(nombreInput.value, puntos);

        const btnVolverAlInicio = document.createElement('button');
        btnVolverAlInicio.textContent = 'Volver al Inicio';
        btnVolverAlInicio.addEventListener('click', function () {
            overlay.style.display = 'none';
            puntos = 0;
            preguntaActual = 0;
            respuestaSeleccionada = false; // Reinicia la variable de respuesta seleccionada
            mostrarBotones(); // Muestra los botones Empezar Trivia y Tabla de Puntos
            nombreInput.style.display = 'block';
            nombreInput.value = '';
            triviaBox.innerHTML = '';
        });

        triviaBox.appendChild(btnVolverAlInicio);
    }

    function mostrarTablaPuntos() {
        overlay.style.display = 'flex';
        triviaBox.innerHTML = '<h2>Tabla de Puntos</h2>';

        const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
        const sortedPuntos = puntosGuardados.sort((a, b) => b.puntos - a.puntos);

        const tablaPuntos = document.createElement('div');
        sortedPuntos.forEach((jugador, index) => {
            const jugadorElemento = document.createElement('div');
            jugadorElemento.textContent = jugador.nombre + ': ' + jugador.puntos + ' puntos';
            tablaPuntos.appendChild(jugadorElemento);
        });

        triviaBox.appendChild(tablaPuntos);

        const btnVolverAlInicio = document.createElement('button');
        btnVolverAlInicio.textContent = 'Volver al Inicio';
        btnVolverAlInicio.addEventListener('click', function () {
            overlay.style.display = 'none';
            mostrarBotones(); // Muestra los botones Empezar Trivia y Tabla de Puntos
            nombreInput.style.display = 'block';
            nombreInput.value = '';
            triviaBox.innerHTML = '';
        });

        triviaBox.appendChild(btnVolverAlInicio);

        nombreInput.style.display = 'none';
        btnEmpezarTrivia.style.display = 'none';
        btnTablaPuntos.style.display = 'none';
    }

    function mostrarBotones() {
        btnEmpezarTrivia.style.display = 'block';
        btnTablaPuntos.style.display = 'block';
    }

    function actualizarTablaPuntos(nombre, puntaje) {
        const puntosGuardados = JSON.parse(localStorage.getItem('puntos')) || [];
        puntosGuardados.push({ nombre, puntos: puntaje });

        // Ordena los puntajes de forma descendente
        const sortedPuntos = puntosGuardados.sort((a, b) => b.puntos - a.puntos);

        // Mantiene solo los mejores 15 puntajes
        const top15Puntos = sortedPuntos.slice(0, 15);

        // Guarda los puntajes actualizados en el Local Storage
        localStorage.setItem('puntos', JSON.stringify(top15Puntos));
    }
});