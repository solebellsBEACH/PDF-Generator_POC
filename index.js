const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 3000;

const caladoModel = {
    port_after: 20.1,
    port_amidship: 12.1,
    port_forward: 13.1,
    starboard_after: 0.1,
    starboard_amidship: 10.1,
    starboard_forward: 4.1,
}

const caladoList =[
    caladoModel,
    caladoModel,
    caladoModel,
    caladoModel,
    caladoModel,
    caladoModel,
]

app.get('/generate-pdf', (req, res) => {
  // Crie um novo documento PDF
// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(res);

// Embed a font, set the font size, and render some text
doc.fontSize(14);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('./imagetest.jpg', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});

// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');

// Finalize PDF file
doc.end();
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado na porta ${port}`);
});
