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
        }

    };
    if (EXTEND) {
        console.log('test');
        $.PITHY.utils.inherits(Select, EXTEND);
    }
})(jQuery);
