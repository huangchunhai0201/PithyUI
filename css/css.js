(function () {
    var modules = [
        "bootstrap.css",
        "Pithy.css"
    ];
    if (modules.length > 0) {
        var cssItems = [];
        for (var i = 0; i < modules.length; i++) {
            cssItems.push("<link rel='stylesheet' href='/PithyUI/css/" + modules[i] + "'>");
        }
        document.write(cssItems.join("\n"));
    }
})();