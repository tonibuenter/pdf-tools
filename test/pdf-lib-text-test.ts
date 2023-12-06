import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { test } from 'mocha';
import { readFileSync, writeFileSync } from 'fs';
test('pdf-lib-text', async () => {
  await modifyPdf();
});

async function modifyPdf() {
  const existingPdfBytes = readFileSync(__dirname + '/../local/onpage.pdf');
  console.debug(__dirname);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  console.debug(width, height);
  firstPage.drawText('This text was added with JavaScript!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45)
  });

  const pdfBytes = await pdfDoc.save();
  writeFileSync(__dirname + '/../local/text-out.pdf', pdfBytes);
}
