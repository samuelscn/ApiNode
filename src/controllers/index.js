exports.execute = (req, res, func) => {
    func(req, res, (err, code, ret) => execCallback(res, err, code, ret, req));
};

function execCallback(res, err, code, ret, req) {
    let responseReturned = ret;
    if (err) {
        if (code >= 500) {
            responseReturned = { error: 'Erro do servidor interno!' };
        } else {
            responseReturned = { error: err };
        }
    }

    if (responseReturned && code !== 204) {
        res.status(code).send(responseReturned);
    } else {
        res.sendStatus(code);
    }
}