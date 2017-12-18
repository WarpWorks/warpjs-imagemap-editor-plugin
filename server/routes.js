const RoutesInfo = require('@quoin/expressjs-routes-info');

module.exports = (baseUrl) => {
    const routesInfo = new RoutesInfo('/', baseUrl);

    return routesInfo;
};
