/**
 * Created by hch on 2016/6/7.
 */
$.PITHY = {};
$.PITHY.createAgent = {};

$.PITHY.infos = {};
$.PITHY.addInfo = function (infoPath, info) {
    $.PITHY.infos[infoPath] = info;
}
String.prototype.startsWith = function (str) {
    if (str == null || str == '' || this.length < str.length) {
        return false;
    }
    return (this.substring(0, str.length) == str);
}
String.prototype.endsWith = function(str) {
    if (str == null || str == "" || this.length < str.length) {
        return false;
    }
    return (this.substring(this.length - str.length) == str);
}