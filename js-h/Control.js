/**
 * Created by huang on 2016/6/13.
 */

(function ($) {
    $.PITHY.Control = Control;

    var EXTEND = null;

    function Control(info, groupInfo) {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._info = info;
        this._info._agent = this;
        this._groupInfo = groupInfo;
        if (this._info.name) {
            $.PITHY.addInfo(this._info.name, this._info);
        }
        if (this._info.id) {
            $.PITHY.addInfo(this._info.id, this._info);
        }
    }

    Control.prototype = {
        getRender: function (render) {

        },
        isGroup: function () {//判断是否是组合控件
        },
        buildRender: function (render) {
            if (!render) {
                render = 'default';
            }
            var html = this.getRender(render);
            if (!html) {
                if (render.startsWith('<')) {
                    html = render;
                } else {
                    html = this.getRender('default');
                }
            }
            return juicer(html, this._info);
        },
        build: function (jParentDiv) {
            this.beforeBuild();
            var self = this;
            if (!jParentDiv) {
                jParentDiv = $('.container');//默认的外边框需要根据分辨率来设置固定宽度 或者 100%
            }
            this._jParentDiv = jParentDiv;
            //jWrap两种情况 有：加载在jParentDiv上 无：jWrap=jParentDiv
            this._jWrap = $.PITHY.utils.buildWrap(this._info.wrap, this._info, this._jParentDiv);

            var render = this.buildRender(this._info.render);
            this._jControl = $(render);
            this._jWrap.append(this._jControl);
            this.initControl();
            this.reset();
            if (this._info.afterBuild) {
                this._info.afterBuild.call(self);
            }
        },
        beforeBuild: function () {
        },
        initControl: function () {
        },
        getInfo: function () {
        },
        clear: function () {
        },
        enable: function () {
        },
        disable: function () {
        },
        focus: function () {
            if (this._jControl) {
                this._jControl.focus();
            }
        },
        show: function () {//有无wrap情况不同
            if (this._jParentDiv === this._jWrap) {
                this._jControl.show();
            } else {
                this._jWrap.show();
            }
        },
        hide: function () {
            if (this._jParentDiv === this._jWrap) {
                this._jControl.show();
            } else {
                this._jWrap.show();
            }
        },
        isHide: function () {
            if (this._jParentDiv === this._jWrap) {
                return this._jControl.is(':hidden');
            } else {
                return this._jWrap.is(':hidden');
            }
        },
        showControl: function () {
            this._jControl.show();
        },
        hideControl: function () {
            this._jControl.hide();
        },
        reset: function () {

        }
    };
    if (EXTEND) {
        $.PITHY.inherits(Control, EXTEND);
    }
})(jQuery);
