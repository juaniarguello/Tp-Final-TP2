fonts = {

    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
    },
    Symbol: {
        normal: 'Symbol'
    },
    ZapfDingbats: {
        normal: 'ZapfDingbats'
    }
};
const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');
  
  
function crearModuloPdf() {
    let pdfDoc;

    const docDefinition = {
        info: {
            title: '',
            author: '',
            subject: '',
            creator: '',
            producer: '',
        },
        content: '',
        defaultStyle: {
            font: '',
            fontSize: null,
            bold: null
        },
        pageSize:'',
        pageOrientation: ''
      };

    const options = {
          // ...
        };

    return {
        /** 
        *@param {string} font: the font used on the document, can be Courier, Helvetica, Times, Symbol or ZapfDingbats
        *@param {number} fontSize: The size of the font
        *@param {boolean} isBold: wether to bolden the font
        *@param {string} pageSize: The size of the page, can be '4A0', '2A0', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10',
                                    'B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10',
                                    'C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10',
                                    'RA0', 'RA1', 'RA2', 'RA3', 'RA4',
                                    'SRA0', 'SRA1', 'SRA2', 'SRA3', 'SRA4',
                                    'EXECUTIVE', 'FOLIO', 'LEGAL', 'LETTER', 'TABLOID'
        *@param {string} pageOrientation: The orientation of the page. Can be landscape or portrait
        */ 
        crearTemplate: function(font, fontSize, isBold, pageSize, pageOrientation) {
            docDefinition.pageOrientation = pageOrientation;
            docDefinition.pageSize = pageSize;
            docDefinition.defaultStyle.font = font;
            docDefinition.defaultStyle.fontSize = fontSize;
            docDefinition.defaultStyle.bold = isBold;
            docDefinition.info.creator = 'Mi módulo de PDF';
            docDefinition.info.producer = 'También mi módulo de PDF';
        },

        /** 
        *@param {string} title: the title of the document
        *@param {string} author: The author of the document
        *@param {string} subject: The subject of the document
        *@param {string} content: The content of the file
        */ 
        crearDoc: function (title, author, subject, content){
            docDefinition.info.title = title;
            docDefinition.info.author = author;
            docDefinition.info.subject = subject;
            docDefinition.content = content;
            pdfDoc = printer.createPdfKitDocument(docDefinition, /* options */);
        }, 
        guardarDoc: async function(fileName, path){
            await pdfDoc.pipe(fs.createWriteStream(`${path}/${fileName}.pdf`)),
            pdfDoc.end()
        } 
    }
}

module.exports = { crearModuloPdf }
  