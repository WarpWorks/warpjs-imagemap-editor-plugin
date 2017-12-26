const Promise = require('bluebird');

const addImage = require('./add-image');
const bodyTemplate = require('./modal-body.hbs');
const errorTemplate = require('./error.hbs');

module.exports = ($, cache, result) => Promise.resolve()
    .then(() => console.log("result=", result))

    // Add the CSS if not already loaded.
    .then(() => {
        if (!$(`link[href="${result._links.css.href}"]`).length) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = result._links.css.href;
            document.head.appendChild(link);
        }
    })

    // Check if SVG is supported
    .then(() => {
        if (!(window && window.SVG && window.SVG.supported)) {
            throw new Error("Cannot open ImageEditor: This browser does not support SVG!");
        }
    })

    // Update modal-body
    .then(() => bodyTemplate({images: result._embedded.images}))
    .then((content) => $('.modal-body', cache.MODAL_SELECTOR).html(content))

    // Add image
    .then(() => addImage($, cache, result._embedded.images[0]))

    .catch((err) => $('.modal-body', cache.MODAL_SELECTOR).html(errorTemplate(err)))
;
