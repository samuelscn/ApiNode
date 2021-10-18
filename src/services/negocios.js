const axios = require('axios');
const { create } = require('xmlbuilder2');

module.exports = {
    async createPedidoBlingByNegociosWithStatusWon(negociosWithStatusWon, apiKey) {
        const pedido = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('pedido')
                .ele('cliente')
                    .ele('nome').txt(`${negociosWithStatusWon.user_id.name}`).up()
                .up()
                .ele('volume')
                    .ele('servico').txt('servicoDeTeste').up()
                .up()
                .ele('itens')
                    .ele('item')
                        .ele('codigo').txt(`${negociosWithStatusWon.id}`).up()
                        .ele('descricao').txt('produto de teste').up()
                        .ele('qtde').txt('10').up()
                        .ele('vlr_unit').txt('1.68').up()
                    .up()
                .up()
                .ele('parcelas')
                    .ele('parcela')
                        .ele('vlr').txt('100').up()
                    .up()
                .up()
            .up();
        const resultPedido = await axios.post(`https://bling.com.br/Api/v2/pedido/json/?apikey=${apiKey}&xml=${pedido}`);
        return resultPedido.data.retorno;
    }
};