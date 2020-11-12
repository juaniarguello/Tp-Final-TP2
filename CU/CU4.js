function crearCu(generadorPdf, dao) {
    return {
        invocar: async function (scheduleDao, setTemporizador) {
            // aca va toda la logica del CU

            const data = await dao.getCampanas()

            const columnas = Object.keys(data[0]);

            scheduleDao(setTemporizador, async function () {
                const template = generadorPdf.crearTemplate('Casual');
                const content = generadorPdf.crearContent(template, columnas, data);
                const doc = generadorPdf.crearDoc('Mi tabla', 'Yo', 'Tabla de personas', content);
                await generadorPdf.guardarDoc('PdfCU4', './CU/assets', doc);
            });
        }
    }
}

module.exports = { crearCu }
