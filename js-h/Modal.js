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
    success: function (o) {
        this._render(o, "success");
    },
    error: function (o) {
        this._render(o, "error");
    },
    _render: function (o, type) {
        var _self = this;
        _self._remove();
        var _iconMap = {
            "info": "<i class='Pithy-Modal-icon icon iconfont'>&#xe637;</i>",
            "success": "<i class='Pithy-Modal-icon icon iconfont'>&#xe62f;</i>",
            "error": "<i class='Pithy-Modal-icon icon iconfont'>&#xe631;</i>",
            "confirm": "<i class='Pithy-Modal-icon icon iconfont'>&#xe637;</i>"
        };
        var _defaultSetting = {title: "", content: "", icon: _iconMap[type]};
        var _setting = $.extend({}, _defaultSetting, o);
        var _renderHtml = "<div class='Pithy-modal'><div class='Pithy-modal-header'><span class='Pithy-modal-title'>$${title}</span><span class='Pithy-modal-close'><i class='icon iconfont'>&#xe62d;</i></span><div class='Pithy-modal-title'></div></div><div class='Pithy-modal-content'>$${icon}$${content}</div><div class='Pithy-modal-footer'></div></div>";

        _self.$renderHtml = $(juicer(_renderHtml, _setting));
        _self.$renderHtml.find('.Pithy-modal-close').click(function () {
            _self._remove();
        });
        $("body").append(_self.$renderHtml);

        var _left = ($(window).width() / 2) - (_self.$renderHtml.outerWidth() / 2);
        var _top = ($(window).height() / 2) - (_self.$renderHtml.outerHeight() / 2) - 100;
        _self.$renderHtml.css({
            left: _left + 'px',
            top: _top + 'px'
        });

    },
    _remove: function () {
        if (this.$renderHtml && this.$renderHtml.length > 0) {
            this.$renderHtml.remove();
        }
    }
}