const constants = require('./../lib/constants');

(($) => $(document).ready(() => {
    $(document).on('click', `[data-warpjs-plugin-identifier="${constants.basename}"]`, function(e) {
        console.log("yay, clicked...");
    });
}))(jQuery);
