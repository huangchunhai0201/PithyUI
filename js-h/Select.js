/**
 * Created by huang on 2016/6/14.
 */

/**
 * Select选择器
 */
(function ($) {
    $.PITHY.Select = Select;
    Select.renders = {
        'default': '<div class="pithy-select ${clazz}" style="${style}"><div class="select-label" style="">value</div><span class="select-icon"><i class="icon iconfont">&#xe603;</i></span><ul class="select-body"><li>value1</li><li>value2</li><li>value3</li></ul></div>'
    };

    var EXTEND = $.PITHY.Control;
    $.PITHY.createAgent.select = function(info, groupInfo) {
        return new Select(info, groupInfo);
    };
    function Select() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        // if (this._info.enumInfo) {
        //     this._enum  = new $.PITHY.EnumAgent(this._info.enumInfo);
        //     this._enum.loadData();
        // } else {
        //     this._enum = $.PITHY.enums[this._info.enumName || this._info.name];
        // }
    }

    Select.prototype = {
        getRender: function(render) {
            return Select.renders[render];
        },
        workEnum: function(enumInfo) {
            // this._jControl.empty();
            // if (this._info.defaultOption) {
            //     for (var k in this._info.defaultOption) {
            //         var option = '<div></div>';
            //     }
            // }
        },
        initControl: function() {
            var self = this;
            var jSelectLabel = this._jControl.find('.select-label');
            this._jSelectBody = this._jControl.find('.select-body');
            jSelectLabel.click(function() {
                self._jSelectBody.toggle();
                self._changSelectIcon();
            });
            this._jSelectBody.find('li').click(function() {
                self._jSelectBody.toggle();
                jSelectLabel.text($(this).text());
                self._changSelectIcon();
            });
        },
        _changSelectIcon: function() {//todo:未能动态改变图标
            var jIcon = this._jSelectBody.find('.select-body .icon');
            if (this._jSelectBody.is(':hidden')) {
                jIcon.text('&#xe603;');
            } else {
                jIcon.text('&#xe602;');
            }
        }
    };
    if (EXTEND) {
        $.PITHY.utils.inherits(Select, EXTEND);
    }
})(jQuery);
