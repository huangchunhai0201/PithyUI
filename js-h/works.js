/**
 * Created by huang on 16-4-14.
 */
(function () {
    var modules = [
        "Modal.js",
        "Tree.js"
    ];
    if (modules.length > 0) {
        var scriptItems = [];
        for (var i = 0; i < modules.length; i++) {
            scriptItems.push("<script src='/PithyUI/js-h/" + modules[i] + "'></script>");
        }
        document.write(scriptItems.join("\n"));
    }
})();