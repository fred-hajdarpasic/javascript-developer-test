const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = (urls) => {
    const promises = [];
    urls.forEach(url => {
        promises.push(httpGet(url));
    });
    return new Promise((resolve, reject) => {
        Promise.all(promises).then((results) => {
            const responses = [];
            results.forEach((response) => {
                const body = JSON.parse(response.body);
                if (response.status === 200) {
                    responses.push({ 'Arnie Quote': body.message })
                } else {
                    responses.push({ 'FAILURE': body.message })
                }
            });
            resolve(responses);
        });
    });
};

module.exports = {
    getArnieQuotes,
};
