const pipedrive = require('pipedrive');
const axios = require('axios');
const { create } = require('xmlbuilder2');
const services = require('../services');
const models = require('../database/mongo/models');

const defaultClient = pipedrive.ApiClient.instance;
let apiToken = defaultClient.authentications.api_key;
apiToken.apiKey = process.env.PIPEDRIVE_API_KEY;
const blingApiKey = process.env.BLING_API_KEY;

exports.list = async (req, res, callback) => {
    try {
        const result = await models.negocios.find();

        res.json(result);
    } catch (e) {
        callback({
            errorMsg: typeof e === 'string' ? e : 'Falha ao recuperar negócios!',
            error: e,
        }, typeof e === 'string' ? 400 : 500);
    }
};

exports.integratePipedriveAndBling = async (req, res, callback) => {
    try {
        const api = new pipedrive.DealsApi();
        const deals = await api.getDeals();
        const { data } = deals;
        let total_value = 0;

        const negociosWithStatusWon = data.filter((el) => el.status === 'won');
        if (!negociosWithStatusWon.length) throw 'Não existe negocios com status Ganho!';

        negociosWithStatusWon.forEach(async (el) => {
            total_value += el.value;
            const resultPedido = await services.negocios.createPedidoBlingByNegociosWithStatusWon(el, blingApiKey);
            if (resultPedido.erros) throw resultPedido.erros[0].erro.msg;
        });

        const result = await models.negocios.create({ date: negociosWithStatusWon[0].won_time , total_value });

        res.send('Integração Pipedrive e Bling realizada com sucesso!');
    } catch (e) {
        console.log(e);
        callback({
            errorMsg: typeof e === 'string' ? e : 'Falha ao integrar o Pipedrive com o Bling!',
            error: e,
        }, typeof e === 'string' ? 400 : 500);
    }
}