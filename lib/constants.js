const packageJson = require('./../package.json');

const basename = packageJson.name.replace(/@/g, '').replace(/\//g, '-');

module.exports = {
    appKeys: {
        baseUrl: 'base-url',
        pluginConfig: 'warpjs-plugin-config',
        staticUrl: 'static-url',
        warpCore: 'warpjs-core'
    },
    basename,
    folders: {
        assets: 'assets'
    },
    assets: {
        css: `${basename}.min.css`,
        js: `${basename}.min.js`
    },
    routes: {
        assets: 'W2:plugin:imagemap-editor:assets',
        root: 'W2:plugin:imagemap-editor:root'
    },
    schema: {
        relationship: {
            for: {
                imagearea: 'Map'
            }
        }
    },
    modalName: 'imagemap-editor'
};
