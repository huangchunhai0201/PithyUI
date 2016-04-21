/**
 * Created by huang on 16-4-12.
 */

/**
 *  Tree 树形控件
 *  $().PITHY_Tree()
 *

 *
 *
 *  API
 *
 *  参数  [Obj]                     说明                         类型                         默认值                    备注
 *
 *  multiple                       是否支持多选                boolean                        false                    就相当于默认时单选
 *  treeData                       数据                       json                           无
 */
(function ($) {
    $.fn.extend({
        PITHY_Tree: function (o) {
            var self = this;
            $.Utils.ajaxGet("treeData.json", function (data) {
                if (data.retCode === 0) {
                    var treeData = data.result;
                    var $ul = $("<ul></ul>");
                    $(self).html($ul);
                    _a.call(self, $ul, treeData, 0);
                }
            });

            return this;
        }
    });
    function _a($ul, treeData, level) {
        //递归相当于定义了很多函数，函数的参数都是     不一样的。
        //本质上还是执行函数。而且是多个函数。除了根部的其他每个函数都是嵌套在其他函数中执行的，依赖于上个函数中的level参数。就是依赖于参数，这个参数一般都是上个函数中的。
        for (var i = 0; i < treeData.length; i++) {
            var item = treeData[i];
            var $li = $("<li>" + item.departName + "</li>");
            $ul.append($li);
            if (item.childList) {
                var $subUl = $("<ul></ul>");
                $li.append($subUl);
                _a($subUl, item.childList, (level + 1));
            }
        }
    }
})(jQuery);
