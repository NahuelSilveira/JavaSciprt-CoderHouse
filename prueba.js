
// Alerta Bienvenida

alert("Bienvenido a la trivia sobre Los Simpson. Vamos a ver qué tan fan sos!");


// Loop para repetir la trivia
let repetir = true;
while (repetir) {

    const aceptarTerminos = confirm("Aceptas los terminos y condiciones para empezar la trivia?");

    if (aceptarTerminos) {
        const nombreUsuario = prompt("Por favor, ingresa tu nombre:");

        alert("Hola " + nombreUsuario + ", empecemos con la trivia");

        // array con las preguntas
        const preguntas = [
            {
                pregunta: "Donde trabaja Homero?",
                opciones: ["Krusty Burger", "Central Nuclear", "El chino de la vuelta", "La tienda de comics"],
                respuestaCorrecta: "Central Nuclear"
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

        function mostrarTrivia() {
            let puntos = 0;

            for (let i = 0; i < preguntas.length; i++) {
                const respuestaUsuario = prompt(preguntas[i].pregunta + "\n" + preguntas[i].opciones.join("\n"));

                if (respuestaUsuario === preguntas[i].respuestaCorrecta) {
                    alert("Respuesta Correcta!");
                    puntos++;
                } else {
                    alert("Respuesta incorrecta, La respuesta correcta es: " + preguntas[i].respuestaCorrecta);
                }
            }

            alert("Has terminado el cuestionario. Obtuviste " + puntos + " puntos de 5 posibles");
        }


        mostrarTrivia();

        repetir = confirm("Queres repetir la trivia?");
    } else {
        alert("No puedes contirnuar sin aceptar los terminos y condiciones");
        repetir = false;
    }
}


alert("Gracias por jugar. Nos vemos");


