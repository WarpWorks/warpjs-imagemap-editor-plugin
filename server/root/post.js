const debug = require('debug')('W2:plugin:imagemap-editor:server/root/post');
const Promise = require('bluebird');
const RoutesInfo = require('@quoin/expressjs-routes-info');
const warpjsUtils = require('@warp-works/warpjs-utils');

const constants = require('./../../lib/constants');
const createImageResource = require('./create-image-resource');

module.exports = (req, res) => {
    debug("req.body=", req.body);
    const {domain, type, id} = req.params;

    const warpCore = req.app.get(constants.appKeys.warpCore);
    const entity = warpCore.getDomainByName(domain).getEntityByName(type);
    const pluginConfig = req.app.get(constants.appKeys.pluginConfig);

    const Persistence = require(pluginConfig.persistence.module);
    const persistence = new Persistence(pluginConfig.persistence.host, domain);

    return Promise.resolve()
        .then(() => warpjsUtils.createResource(req, {
            domain,
            type,
            id,
            docLevel: req.body.warpjsDocLevel
        }))
        .then((resource) => Promise.resolve()

            // For the css
            .then(() => resource.link('css', `${RoutesInfo.expand('W2:plugin:imagemap-editor:assets', {})}/${constants.assets.css}`))

            .then(() => entity.getInstance(persistence, id))
            .then((instance) => Promise.resolve()
                .then(() => debug("instance=", instance))
                .then(() => warpjsUtils.docLevel.getData(persistence, entity, instance, req.body.warpjsDocLevel))
                .then((docLevelData) => createImageResource(persistence, docLevelData.model, docLevelData.instance, req.body.warpjsDocLevel))
                .then((imageResource) => resource.embed('images', imageResource))
            )
            .then(() => warpjsUtils.sendHal(req, res, resource, RoutesInfo))
        )
        .catch((err) => {
            console.error("server/root/post: err:", err);
            throw err;
        })
        .finally(() => persistence.close())
    ;
};
