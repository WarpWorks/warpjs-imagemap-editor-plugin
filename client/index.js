const Promise = require('bluebird');
const warpjsUtils = require('@warp-works/warpjs-utils');

const bodyTemplate = require('./modal-body.hbs');
const constants = require('./../lib/constants');
const errorTemplate = require('./error.hbs');
const template = require('./template.hbs');

const MODAL_SELECTOR = `[data-warpjs-modal="${constants.modalName}"]`;

(($) => $(document).ready(() => {
    $(document).on('click', `[data-warpjs-plugin-identifier="${constants.basename}"]`, function(e) {
        const url = $(this).data('warpjsPluginRootUrl');

        return Promise.resolve()
            .then(() => $(MODAL_SELECTOR))
            .then((modal) => {
                if (!modal.length) {
                    $(document.body).append($(template({ modalName: constants.modalName })));
                }
            })
            .then(() => $(MODAL_SELECTOR).modal('show'))
            .then(() => warpjsUtils.proxy.post($, url, $(this).data()))
            .then((result) => Promise.resolve()
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
                .then((content) => $('.modal-body', MODAL_SELECTOR).html(content))

                .catch((err) => $('.modal-body', MODAL_SELECTOR).html(errorTemplate(err)))
            )
            .catch((err) => console.error("error=", err))
            .then(() => $(MODAL_SELECTOR))
            .then((modal) => {
            })
        ;
    });
}))(jQuery);
