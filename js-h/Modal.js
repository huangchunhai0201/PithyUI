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
 *  content                        内容                       String                        无
 *  maskClose                      是否关闭蒙层                boolean                       true   [待完成]
 *  move                           是否可以移动                boolean                       true   [待完成]
 */
(function ($) {
    Modal.renders = {
        "default": '<div class="pithy-modal ${clazz}" style="${style}">' +
        '   <div class="pithy-modal-panel">' +
        '       <div class="pithy-modal-title">' +
        '           <span class="modalTitle">' +
        '               <div style="display: inline-block;">${title}</div>' +
        '           </span>' +
        '           <div class="modalClose">' +
        '           </div>' +
        '       </div>' +
        '       <div class="pithy-modal-status icon iconfont">${statusIcon}</div>' +
        '       <div class="modalContent">${message}</div>' +
        '   </div>' +
        '</div>',
        "info": "",
        "success": "",
        "error": "",
        "confirm": "",
    };
    var overlayRender = '<div class="pithy-modal-overlay"></div>';
    var EXTEND = null;

    function Modal() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._info = {
            title: 'OK',
            status: 'success',
            message: '',
            callback: null,
            style: '',
            verticalOffset: -50,
            horizontalOffset: 0
        };
    }

    Modal.prototype = {
        info: function (info) {
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '&#xe637;';
            this._open('default');
        },
        success: function (info) {
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '';
            this._open('default');
        },
        error: function (info) {
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '';
            this._open('default');
        },
        confirm: function (info) {
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '';
            this._open('confirm');
        },
        getRender: function (render) {
            if (!render) {
                render = 'default';
            }
            var render = Modal.renders[render];
            return juicer(render, this._info);
        },
        _open: function (render) {
            this._close();
            this._openOverlay();

            if (this._info.message) {
                this._info._message = this._info.message.replace(/\n/g, '<br />');
            }
            this._jWrap = $(this.getRender(render));

            $('body').append(this._jWrap);

            var top = (($(window).height() / 2) - (this._jWrap.outerHeight() / 2)) + this._info.verticalOffset;
            var left = (($(window).width() / 2) - (this._jWrap.outerWidth() / 2)) + this._info.horizontalOffset;
            if (top < 0) top = 0;
            if (left < 0) left = 0;

            this._jWrap.css({
                minWidth: this._jWrap.outerWidth(),
                maxWidth: this._jWrap.outerWidth(),
                top: top + 'px',
                left: left + 'px'
            });

        },
        _close: function () {

        },
        _openOverlay: function () {

        }
    };
    if (EXTEND) {
        $.utils.inherits(Modal, EXTEND);
    }
    $.PITHY.Modal = new Modal();
})(jQuery);
