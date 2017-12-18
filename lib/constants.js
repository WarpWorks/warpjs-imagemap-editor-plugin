const packageJson = require('./../package.json');

const basename = packageJson.name.replace(/@/g, '').replace(/\//g, '-');

module.exports = {
    basename,
    folders: {
        assets: 'assets'
    },
    assets: {
        css: `${basename}.min.css`,
        js: `${basename}.min.js`
    },
    routes: {
        assets: 'W2:plugin:imagemap-editor:assets'
    }
};
