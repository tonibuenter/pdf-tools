import { PDFDocument, rgb } from 'pdf-lib';
import { test } from 'mocha';
import { readFileSync, writeFileSync } from 'fs';

test('my test', async () => {
  await modifyPdf();
});

async function modifyPdf() {
  const existingPdfBytes = readFileSync(__dirname + '/../local/onpage.pdf');
  console.debug(__dirname);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();
  console.debug(width, height);
  firstPage.drawLine({
    start: { x: 25, y: height - 75 },
    end: { x: 125, y: 175 },
    thickness: 2,
    color: rgb(0.75, 0.2, 0.2),
    opacity: 0.75
  });

  const pdfBytes = await pdfDoc.save();
  writeFileSync(__dirname + '/../local/line-out.pdf', pdfBytes);
}
