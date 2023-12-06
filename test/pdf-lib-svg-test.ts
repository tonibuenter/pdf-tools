import { PDFDocument, rgb } from 'pdf-lib';
import { test } from 'mocha';
import { readFileSync, writeFileSync } from 'fs';

test('my test', async () => {
  await modifyPdf();
});
const inchToPt = (inches: number) => Math.round(inches * 72);
inchToPt(2);
async function modifyPdf() {
  const existingPdfBytes = readFileSync(__dirname + '/../local/onpage.pdf');
  console.debug(__dirname);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  console.debug(width, height);
  firstPage.drawSvgPath('m 0 20 l 10 0 l 0 10 l -10 0 l 0 -10', {
    x: 300,
    y: 800,
    color: rgb(1, 0, 0),
    borderColor: rgb(0, 0, 1),
    borderWidth: 1,
    opacity: 0,
    borderOpacity: 0.7
  });

  firstPage.drawSvgPath('M 100 110 l -10 0 l 0 -10 l  10 0 l 0  10', {
    x: 300,
    y: 800,
    color: rgb(1, 0, 0),
    borderColor: rgb(1, 0, 0),
    borderWidth: 1,
    opacity: 0,
    borderOpacity: 0.7
  });

  firstPage.resetPosition();

  const pdfBytes = await pdfDoc.save();
  writeFileSync(__dirname + '/../local/svg-out.pdf', pdfBytes);
}
