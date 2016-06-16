/**
 * Created by huang on 2016/6/13.
 */

/**
 * Input输入框
 *
 *  API
 *
 *  参数  [Obj]                               说明                                 类型                         默认值
 *
 *  defaultValue                          设置初始默认值                           String                        无
 *  disabled                         是否禁用状态，默认为 false                     String                        无
 *  addonBefore                      带标签的 input，设置前置标签                    boolean                       true   [待完成]
 *  addonAfter                       带标签的 input，设置后置标签                    boolean                       true   [待完成]
 *  buttonAfter                       带按钮 input，设置后置标签                    boolean                       true   [待完成]
 */
(function ($) {
    $.PITHY.Input = Input;
    Input.renders = {
        'default': '<input class="form-control ${clazz}" style="${style}" placeholder="${placeholder}"/>',
        'addonBefore':  '<div class="input-group">' +
                        '   <span class="input-group-addon">${addonBefore}</span>' +
                        '   <input class="form-control ${clazz}" style="${style}"/>' +
                        '</div>',
        'addonAfter': '<div class="input-group">' +
                      '     <input class="form-control ${clazz}" style="${style}"/>' +
                      '     <span class="input-group-addon">${addonAfter}</span>' +
                      '</div>',
        'addonBeforeAndAfter':  '<div class="input-group">' +
                                '     <span class="input-group-addon">${addonBefore}</span>' +
                                '     <input class="form-control ${clazz}" style="${style}"/>' +        
                                '     <span class="input-group-addon">${addonAfter}</span>' +
                                '</div>',
        'withButton':   '<div class="input-group" style="width:100%;">' +
                        '	<input class="form-control  ${clazz}" style="${style}" id="${_id}" placeholder=" ${placeholder}"  title="">' +
                        '    <span class="input-group-btn"><button class="btn btn-default" type="button">${buttonAfter}</button> </span>' +
                        '</div>'
    };
    var EXTEND = $.PITHY.Control;

    $.PITHY.createAgent.input = function (info, groupInfo) {
        return new Input(info, groupInfo);
    };
    function Input() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
    }

    Input.fields = {
        'type': 'input',
        'render': 'default',
        'inputType': '',
        'placeholder': '',
        'title': '',
        'outer': '20%',
        'inner': '90%',
        'labelWidth': '90px',
        'align': 'center',
        'wrap': 'labelIcon'
    }
    Input.prototype = {
        getRender: function (render) {
            return Input.renders[render];
        },
        beforeBuild: function () {
            if (this._info.addonBefore) {
                this._info.render = 'addonBefore';
            }
            if (this._info.addonAfter) {
                this._info.render = 'addonAfter';
            }
            if (this._info.addonBefore && this._info.addonAfter) {
                this._info.render = 'addonBeforeAndAfter';
            }
            if (this._info.buttonAfter) {
                this._info.render = 'withButton';
            }
        },
        initControl: function () {
            var self = this;
            if (this._info.click) {
                var jButton = this._jWrap.find('button');
                if (jButton.length > 0) {
                    jButton.click(function(event) {
                        self._info.click.call(self, self._info, self._groupInfo,event.target);
                    });
                }
            }
        },
        disable: function () {
            this._info.disabled = true;
            this._jControl.attr('disable', true);
        },
        enable: function () {
            this._info.disabled = false;
            this._jControl.removeAttr('disable');
        },
        reset: function () {
            var defaultValue = this._info.defaultValue;
            if (!defaultValue) {
                defaultValue = '';
            }
            this._jControl.val(defaultValue);
        }
    };

    if (EXTEND) {
        $.PITHY.utils.inherits(Input, EXTEND);
    }


})(jQuery);