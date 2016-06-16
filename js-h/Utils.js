/**
 * Created by huang on 16-4-18.
 */
(function ($) {
    function Temp() {
    }

    $.PITHY.utils = {
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
        },
        buildWrap: function (wrap, info, jParentDiv) {
            var jWrap;
            if (!wrap) {
                jWrap = $(jParentDiv);
                return jWrap;
            }
            if (wrap.startsWith('<') && wrap.endsWith('>')) {
                var html = wrap;
                if (info) {
                    html = juicer(html, info);
                }
                var jTheWrap = $(html);
                jParentDiv.append(jTheWrap);
            } else if ($.PITHY.wraps[wrap]) {
                var theWrap = $.PITHY.wraps[wrap];
                var html;
                if (info) {
                    html = juicer(html, info);
                }
                var hTheWrap = $(html);
                jParentDiv.append(jTheWrap);
            } else if (wrap.startsWith('.')) {
                jWrap = $('<div class="' + wrap.substring(1) + '"></div>');
                jParentDiv.append(jWrap);
            } else if (wrap.startsWith('#')) {
                jWrap = $('<div id="' + wrap.substring(1) + '"></div>');
                jParentDiv.append(jWrap);
            }
            if (!jWrap) {
                jWrap = jParentDiv;
            }
            return jWrap;
        }
    }
})(jQuery);
