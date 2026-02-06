import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const PdfPrinterModule = require('pdfmake/src/printer.js');
const PdfPrinter = PdfPrinterModule.default ?? PdfPrinterModule;

const fonts = {
  Roboto: {
    normal: path.resolve('src/fonts/Roboto-Thin.ttf'),
    bold: path.resolve('src/fonts/Roboto-SemiBold.ttf'),
    medium: path.resolve('src/fonts/Roboto-Medium.ttf'),
    italics: path.resolve('src/fonts/Roboto-ExtraBoldItalic.ttf'),
    bolditalics: path.resolve('src/fonts/Roboto-ExtraBoldItalic.ttf'),
  },
};

const printer = new PdfPrinter(fonts);

interface TableBodyPayment {
  name: string;
  data: string;
  forma: string;
  value: string;
  reason: string;
}

interface TableCell {
  text: string;
  style?: string;
  alignment?: 'left' | 'right' | 'center';
}

export async function generateReportPayment(data: TableBodyPayment[]) {
  try {
    const total = data.reduce((acc, item) => acc + Number(item.value), 0);
    const tableBody: TableCell[][] = [
      [
        { text: 'Aluno', style: 'tableHeader' },
        { text: 'Data pag.', style: 'tableHeader' },
        { text: 'Forma', style: 'tableHeader' },
        { text: 'Razão', style: 'tableHeader' },
        { text: 'Valor', style: 'tableHeader' },
      ],
    ];

    data.forEach((payment) => {
      tableBody.push([{ text: payment.name, }, { text: payment.data }, { text: payment.forma }, { text: payment.reason }, { text: `R$${payment.value}`, alignment: 'right', style: 'tableData' }]);
    });

    const docDefinition = {
      header: {
        text: 'Relatório de Pagamentos',
        style: 'header',
        alignment: 'center',
        margin: [0, 30, 0, 30],
      },
      footer(currentPage: number, pageCount: number) {
        return {
          text: `${currentPage}/${pageCount}`,
          alignment: 'right',
          margin: [0, 0, 40, 20],
          fontSize: 9,
        };
      },
      content: [
        {
          table: {
            widths: ['*', 90, 80, '*', 70],
            body: tableBody,
          },
          layout: 'lightHorizontalLines',
        },
        {
          text: [{ text: `Total faturado -- R$ ${total.toFixed(2)} `, bold: true }],
          margin: [0, 10, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
        },
        tableData: {
          bold: true,
          fontWeight: 'medium',
          fontSize: 10,
        },
      },
      defaultStyle: {
        font: 'Roboto',
      },
    };

    return printer.createPdfKitDocument(docDefinition);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
