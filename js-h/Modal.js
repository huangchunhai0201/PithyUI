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
        var setting = $.extend({}, defaultSetting, o);
        var _renderHtml = "<div class='Pithy-modal'><div class='Pithy-modal-header'><span class='Pithy-modal-close'><i class='icon iconfont'>&#xe62d;</i></span><div class='Pithy-modal-title'></div></div><div class='Pithy-modal-content'><i class='Pithy-Modal-icon icon iconfont'>&#xe637;</i>$${content}</div><div class='Pithy-modal-footer'></div></div>";

        var $renderHtml = $(juicer(_renderHtml, setting));
        $("body").append($renderHtml);

        var left = ($(window).width() / 2) - ($renderHtml.outerWidth() / 2);
        var top = ($(window).height() / 2) - ($renderHtml.outerHeight() / 2) - 100;
        $renderHtml.css({
            left: left + 'px',
            top: top + 'px'
        });

    }
}