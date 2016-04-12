/**
 * Created by huang on 16-4-11.
 */

/**
 *  模态对话框。
 *  $.PITHY.Modal.xxx()
 *
 *  Modal.info
 *  Modal.success
 *  Modal.error
 *  Modal.confirm
 *
 *
 *  API
 *
 *  参数  [Obj]                     说明                         类型                         默认值
 *
 *  title                          标题                       String                        无
 *  content                        内容                       String
 */
$.PITHY.Modal = {
    info: function (o) {
        this._render(o, "info");
    },
    success: function(o) {
        this._render(o, "success");
    },
    _render: function (o, type) {
        var defaultSetting = {title: "", content: "", icon: type};
        var obj = $.extend({}, defaultSetting, o);
        var _renderHtml = "<div>$${content}</div><i class='icon iconfont'>&#xe604;</i>"

        var renderHtml = juicer(_renderHtml, obj);

        $("body").append(renderHtml);

    }
}