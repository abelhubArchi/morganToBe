// esbuild.config.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['index.js'], // Ruta al archivo principal de tu aplicación
  bundle: true, // Empaquetar todo en un solo archivo
  outfile: './app/index.js', // Ruta de salida del archivo empaquetado
  format: 'mjs', // Formato CommonJS
  target: 'node12.22', // Versión de Node.js de destino
}).catch(() => process.exit(1));
