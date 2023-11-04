import clipboardy from 'clipboardy';
import notifier from 'node-notifier';
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: "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",
});



async function consulta(pregunta) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {"role": "system", "content": `Responderas estas preguntas de 
      este examen de derecho de forma
      rapida, breve y consisa,
      Eligiendo con tu logica y conocimiento unas de las respuestas
       y si no hay respuestas solo dame la respuesta  correcta. 
      Tu mision es pasar este examen con el mayor puntaje posible
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
}
var previousClipboardData = clipboardy.readSync();
function checkClipboard() {
    const currentClipboardData = clipboardy.readSync();
    if (currentClipboardData !== previousClipboardData) {
        console.log("texto copiad:", currentClipboardData);
          // Puedes mostrar una notificación
        consulta(currentClipboardData)
        previousClipboardData = currentClipboardData;
    };
}


// Verifica el portapapeles cada segundo
setInterval(checkClipboard, 500);

console.log('La aplicación está en ejecución en segundo plano... Copia las preguntas y el sistema te enviara una respuesta por notificacion. :)');



