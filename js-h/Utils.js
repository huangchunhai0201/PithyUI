/**
 * Created by huang on 16-4-18.
 */
$.Utils = {
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