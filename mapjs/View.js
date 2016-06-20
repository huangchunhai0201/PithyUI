(function () {
    mapwork.View = View;

    var EXTEND = null;

    function View() {
        if (EXTEND) {
            EXTEND.apply(this, arguments);
        }
        this._models = {};
        this._viewGroups = {};

        this.init();
    }

    View.prototype = {
        init: function () {

        },
        addMarkers: function (map, data, model, showItem) {
            var self = this;
            if (data.length <= 0) {
                return false;
            }
            var markers = [];
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                item.id = i;
                item._map = map;
                item._model = model;
                item._showItem = showItem;
                var marker = self.addMarker(new AMap.LngLat(item.lon, item.lat), item);
                marker.setMap(map);//标注点信息
                marker.hide();
                markers.push(marker);
            }
            self._markers = markers;
        },
        mapMarkersShow: function () {
            if (this._markers.length <= 0) {
                return false;
            }
            for (var i = 0; i < this._markers.length; i++) {
                var marker = this._markers[i];
                marker.show();
            }
        },
        mapMarkersHide: function () {
            if (this._markers.length <= 0) {
                return false;
            }
            this.closeInfoWindow();
            for (var i = 0; i < this._markers.length; i++) {
                var marker = this._markers[i];
                marker.hide();
            }
        },
        addMarker: function (xy, o) {
            var self = this;
            var html = "<div class='map_tips' id='map_tips' style='position: relative;'>" +
                "<div class='tips_box'>" +
                "<div class='"+o['_model']['titleColor']+"' style='height: 40px; position: relative; overflow: hidden;'>" +
                "<div class='TL'></div>" +
                "<div class='TC'>" +
                "<div class='tips_title'>" +
                "<div class='tips_label' title='"+o[o['_model']['title']]+"'>"+o[o['_model']['title']]+"</div>" +
                "<div class='tips_close' id='tips_close'></div>" +
                "</div>" +
                "</div>" +
                "<div class='TR'></div>" +
                "</div>" +
                "<div class='tips_box'>" +
                "<div class='CL'></div>" +
                "<div class='CR'></div>" +
                "<div class='tips_container'>" +
                "<div class='tips_wrap' style='width: 250px; height: auto;'>" +
                "<table class='tipDetailTable'>" +
                "<tbody>";

                for (var i = 0; i < o._showItem.length; i++) {
                    var showItem = o._showItem[i];
                    html += "<tr class='trInfo'>" +
                    "<td class='labelTd' style='white-space:nowrap;text-align:left;'>"+showItem['label']+"</td>" +
                    "<td class='valueTd' style='white-space:nowrap;text-align:right;'>"+o[showItem['name']]+"</td>" +
                    "</tr>";
                }
                html += "</tbody>" +
                "</table>" +
                "</div>" +
                "</div>" +
                "<div style='height: 25px; position: relative;'>" +
                "<div class='BL'></div>" +
                "<div class='BC'><div class='BDirect'></div></div>" +
                "<div class='BR'></div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";

            var marker = new AMap.Marker({
                position: xy, //基点位置
                icon: o['_model']['icon'], //marker图标，直接传递地址url
                offset: {x: -8, y: -34}, //相对于基点的位置
                title: o[o['_model']['title']]
            });

            marker.isbound = true;
            marker.id = o.id;
            AMap.event.addListener(marker, "click", function (e) {
                var infoWindow =  self._infoWindow = new AMap.InfoWindow
                ({
                    content: html,
                    size: new AMap.Size(300, 0),
                    autoMove: true,  //设置自动调整信息窗口至视野范围
                    offset: new AMap.Pixel(o._model['offsetX'], o._model['offsetY']),
                    isCustom: true
                });
                infoWindow.open(o._map, marker.getPosition());
                $('#mapcc').on('click', '.tips_close', function () {
                    infoWindow.close();
                });
            });
            AMap.event.addListener(marker, "mouseover", function (e) {
                marker.setIcon(o['_model']['iconHover']);
                marker.setTitle(o[o['_model']['title']]);
            });
            AMap.event.addListener(marker, "mouseout", function (e) {
                marker.setIcon(o['_model']['icon']);
            });

            return marker;
        },
        closeInfoWindow: function() {
            this._infoWindow.close();
        }

    };

    if (EXTEND) {
        mapwork.utils.inherits(View, EXTEND);
    }
})();