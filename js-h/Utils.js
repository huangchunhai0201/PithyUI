/**
 * Created by huang on 16-4-18.
 */
(function ($) {
    function Temp() {
    }

    $.utils = {
        inherits: function (subClass, superClass) {
            Temp.prototype = superClass.prototype;
            var sub = subClass.prototype;
            var temp = new Temp();
            Temp.prototype = null;
            for (var prop in sub) {
                temp[prop] = sub[prop];
            }
            subClass.prototype = temp;
            temp.construtor = subClass;
        },
        ajaxGet: function (url, callback) {
            $.ajax({
                url: url,
                cache: false,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    callback(data);
                }
            });
        }
    }
})(jQuery);
