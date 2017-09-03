/**
 * Created by Mohamed Eliyas on 19-08-2017.
 */


var util = {
    extend: function (self, objects) {
        Object.assign.apply(null, arguments);
    },

    warning: function (message) {
        console.info(message);
    }
};
