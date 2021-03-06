
function crearCu(generadorPdf, temporizador) {

    return {

        invocar: async function (tempData, dao) {

            const programarEvento = temporizador(tempData.frecuencia);
            
            programarEvento(tempData.tempRules, async function () {
                    const data = await dao.getCampanas()
                    const columnas = Object.keys(data[0]);
                    const template = generadorPdf.crearTemplate('Casual');
                    const content = generadorPdf.crearContent(template, columnas, data);
                    const doc = generadorPdf.crearDoc('Mi tabla', 'Yo', 'Tabla de personas', content);
                    await generadorPdf.guardarDoc('PdfCU4', './CU/assets', doc);
                });
        }
    }
}

module.exports = { crearCu }
