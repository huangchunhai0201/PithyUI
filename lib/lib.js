(function () {
    var modules = [
        "jquery/jquery-1.12.3.js",
        "juicer/juicer.js"
    ];
    if (modules.length > 0) {
        var libItems = [];
        for (var i = 0; i < modules.length; i++) {
            libItems.push("<script src='/PithyUI/lib/" + modules[i] + "'></script>");
        }
        document.write(libItems.join("\n"));
    }
})();