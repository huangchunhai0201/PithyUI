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
 *  message                        内容                       String                        无
 *  maskClose                      是否关闭蒙层                boolean                       true   [待完成]
 *  move                           是否可以移动                boolean                       true   [待完成]
 */
(function ($) {
    Modal.renders = {
        "default": '<div class="pithy-modal ${clazz}" style="position: fixed;z-index: 99999;margin: 0;padding: 0;${style}">' +
        '   <div class="pithy-modal-content">' +
        '       <div class="pithy-modal-header">' +
        '           <i class="pithy-modal-statusCommon pithy-modal-${status} icon iconfont">$${statusIcon}</i>' +
        '           <span class="modalTitle">' +
        '               <div style="display: inline-block;">${title}</div>' +
        '           </span>' +
        '           <div class="modalClose">' +
        '               <i class="modalCloseIcon icon iconfont">&#xe62d;</i>' +
        '           </div>' +
        '       </div>' +
        '       <div class="pithy-modal-body">' +
        '           <div  class="modalContent" style="display: inline-block;">${message}</div>' +
        '       </div>' +
        '       <div class="pithy-modal-footer">' +
        '           <div class="btn pithy-btn-ok"><span>确 定</span></div>' +
        '       </div>' +
        '   </div>' +
        '</div>',
        "info": "",
        "success": "",
        "error": "",
        "confirm": '<div class="pithy-modal ${clazz}" style="position: fixed;z-index: 99999;margin: 0;padding: 0;${style}">' +
        '   <div class="pithy-modal-content">' +
        '       <div class="pithy-modal-header">' +
        '           <i class="pithy-modal-statusCommon pithy-modal-${status} icon iconfont">$${statusIcon}</i>' +
        '           <span class="modalTitle">' +
        '               <div style="display: inline-block;">${title}</div>' +
        '           </span>' +
        '           <div class="modalClose">' +
        '               <i class="modalCloseIcon icon iconfont">&#xe62d;</i>' +
        '           </div>' +
        '       </div>' +
        '       <div class="pithy-modal-body">' +
        '           <div  class="modalContent" style="display: inline-block;">${message}</div>' +
        '       </div>' +
        '       <div class="pithy-modal-footer">' +
        '           <div class="btn pithy-btn-cancle"><span>取 消</span></div>' +
        '           <div class="btn pithy-btn-ok"><span>确 定</span></div>' +
        '       </div>' +
        '   </div>' +
        '</div>',
        "overlay": '<div class="pithy-modal-overlay"></div>'
    };
    var overlayRender = '<div class="pithy-modal-overlay"></div>';
    var EXTEND = null;

    function Modal() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._reset();
    }

    Modal.prototype = {
        info: function (info) {
            this._reset();
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '&#xe637;';
            this._info.status = 'info';
            this._open('default');
        },
        success: function (info) {
            this._reset();
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '&#xe62f;';
            this._info.status = 'success';
            this._open('default');
        },
        error: function (info) {
            this._reset();
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '&#xe631;';
            this._info.status = 'error';
            this._open('default');
        },
        confirm: function (info) {
            this._reset();
            this._info = $.extend(this._info, info);
            this._info.statusIcon = '&#xe647;';
            this._info.status = 'confirm';
            this._open('confirm');
        },
        getRender: function (render) {
            return Modal.renders[render];
        },
        buildRender: function (render) {
            if (!render) {
                render = 'default';
            }
            var html = this.getRender(render);
            return juicer(html, this._info);
        },
        _open: function (render) {
            var self = this;
            this._close();
            this._openOverlay();

            if (this._info.message) {
                this._info._message = this._info.message.replace(/\n/g, '<br />');
            }
            this._jWrap = $(this.buildRender(render));

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

            var jCloseButton = this._jWrap.find('.modalCloseIcon');
            // var jCloseButton = this._jWrap.find('.modalClose');
            jCloseButton.click(function () {
                self._close();
            });

            var jOKButton = this._jWrap.find('.pithy-btn-ok');
            jOKButton.click(function () {
                self._close();
                if (self._info.onOk) {
                    self._info.onOk();
                }
            });
            var jCancleButton = this._jWrap.find('.pithy-btn-cancle');
            jCancleButton.click(function () {
                self._close();
                if (self._info.onCancle) {
                    self._info.onCancle();
                }
            });

            var jPopHeader = this._jWrap.find('.pithy-modal-header');
            jPopHeader.mousedown(function () {
                if (event.button === 2) {//只能左键，屏蔽右键的拖动
                    return;
                }
                if (event.stopPropagation) {
                    event.preventDefault();
                }
                var pressX = event.pageX;
                var pressY = event.pageY;
                var posX = parseInt(self._jWrap.css("left"), 10);
                var posY = parseInt(self._jWrap.css("top"), 10);

                var draggingDiv = function (event) {
                    if (event.stopPropagation) {
                        event.preventDefault();
                    }
                    self._jWrap.css("left", posX + event.pageX - pressX);
                    self._jWrap.css("top", posY + event.pageY - pressY);
                };
                var droppedDiv = function (event) {
                    if (event.stopPropagation) {
                        event.preventDefault();
                    }
                    $(document).unbind('mousemove').unbind("mouseup");
                };
                $(document).bind('mousemove', draggingDiv).bind("mouseup", droppedDiv);
            });

        },
        _close: function () {
            if (this._jWrap) {
                this._jWrap.remove();
            }
            this._closeOverlay();
        },
        _openOverlay: function () {
            if (!this._jOverlay) {
                this._jOverlay = $(this.getRender('overlay'));
            }
            $('body').append(this._jOverlay);
            this._jOverlay.css({
                position: 'absolute',
                'z-index': 99998,
                top: 0,
                left: 0,
                width: '100%',
                // height: $(document).height(),
                height: '100%',//用上面会出现比如调试框关闭时出现空白区域，不能全部覆盖。
                'background-color': 'rgba(55, 55, 55, .6)'
                // background: this._info.overlayColor,
                // opacity: this._info.overlayOpacity
            });
        },
        _closeOverlay: function () {
            if (this._jOverlay) {
                this._jOverlay.remove();
            }
        },
        _reset: function () {
            this._info = {
                title: 'OK',
                status: 'success',
                message: '',
                onOk: null,
                onCancle: null,
                style: '',
                verticalOffset: -200,
                horizontalOffset: 0,
                overlayColor: 'black',
                overlayOpacity: .2
            };
        }
    };
    if (EXTEND) {
        $.utils.inherits(Modal, EXTEND);
    }
    $.PITHY.Modal = new Modal();
})(jQuery);
