import clipboardy from 'clipboardy';
import fs from 'fs';
import notifier from 'node-notifier';
import OpenAI from "openai";

async function main() {
  try {
    // Leer datos desde el archivo
    const data = fs.readFileSync('datos.json', 'utf-8');
    const datos = JSON.parse(data);

    const openai = new OpenAI({
      apiKey: datos.llave,
    });

    if (datos.identificacion == 3132) {
      async function consulta(pregunta) {
        try {
          const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
              {"role": "system", "content": `Responderas estas preguntas de 
                este examen de derecho de forma
                rapida, breve y consisa,
                Eligiendo con tu lógica y conocimiento unas de las respuestas
                y si no hay respuestas solo dame la respuesta  correcta. 
                Tu misión es pasar este examen con el mayor puntaje posible
                estamos en Bolivia`},
              {"role": "user","content": pregunta},
            ],
            temperature: 0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });

          notifier.notify({
            title: 'Morgan',
            message: response.choices[0].message.content
          });
          console.log("respuesta es: " + response.choices[0].message.content);
        } catch (error) {
          console.error("Error en la consulta:", error);
        }
      }

      var previousClipboardData = clipboardy.readSync();
      function checkClipboard() {
        const currentClipboardData = clipboardy.readSync();
        if (currentClipboardData !== previousClipboardData) {
          console.log("texto copiado:", currentClipboardData);
          // Puedes mostrar una notificación
          consulta(currentClipboardData)
          previousClipboardData = currentClipboardData;
        }
      }

      // Verifica el portapapeles cada segundo
      setInterval(checkClipboard, 500);

      console.log('La aplicación está en ejecución en segundo plano... Copia las preguntas y el sistema te enviará una respuesta por notificación.');
    } else {
      console.log('Aplicación en modo prueba');

      var previousClipboardData = clipboardy.readSync();
      function checkClipboard() {
        const currentClipboardData = clipboardy.readSync();
        if (currentClipboardData !== previousClipboardData) {
          console.log("texto copiado:", currentClipboardData);
          // Puedes mostrar una notificación
          previousClipboardData = currentClipboardData;

          notifier.notify({
            title: 'Morgan',
            message: 'Esta Sera La Respuesta'
          });
          console.log("Respuesta");
        }
      }

      // Verifica el portapapeles cada segundo
      setInterval(checkClipboard, 500);
    }
  } catch (error) {
    console.error("Error general:", error);
    // Puedes reiniciar el programa aquí, por ejemplo, llamando a la función main nuevamente
    main();
  }
}

// Llamada inicial a la función main
main();
