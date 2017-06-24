/*
    Created on : Aug 31, 2015
    Author     : yeozkaya@gmail.com
*/
;
(function ($) {

    var options = {
        geojsonServiceAddress: "http://yourGeoJsonSearchAddress",
        placeholderMessage: "O que você deseja encontrar?",
        searchButtonTitle: "Buscar",
        clearButtonTitle: "Limpar",
        foundRecordsMessage: "Resultados encontrados",
        limit: 10,
        notFoundMessage: "Nada foi encontrado",
        notFoundHint: "Veja se sua busca está correta e tente novamente",
        drawColor: "green",
        pointGeometryZoomLevel: -1, //Set zoom level for point geometries -1 means use leaflet default.
        pagingActive: true
    };

    var activeResult = -1;
    var resultCount = 0;
    var lastSearch = "";
    var searchLayer;
    var focusLayer;
    var searchLayerType; // 0 --> One geometry, 1--> Multiple
    var features = [];
    var featureCollection = [];
    var offset = 0;
    var collapseOnBlur = true;

    $.fn.GeoJsonAutocomplete = function (userDefinedOptions) {

        var keys = Object.keys(userDefinedOptions);

        for (var i = 0; i < keys.length; i++) {
            options[keys[i]] = userDefinedOptions[keys[i]];
        }


        $(this).each(function () {
            var element = $(this);
            console.log()
            element.addClass("searchContainer");
            element.append('<input id="searchBox" class="searchBox" placeholder="' + options.placeholderMessage + '"/>');
            element.append('<input id="searchButton" class="searchButton" type="submit" value="" title="' + options.searchButtonTitle + '"/>');
            element.append('<span class="divider"></span>');
            element.append('<input id="clearButton" class="clearButton" type="submit"  value="" title="' + options.clearButtonTitle + '">');

            element.find("#searchBox")[0].value = "";
            element.find("#searchBox").delayKeyup(function (event) {
                switch (event.keyCode) {
                    case 13: // enter
                        searchButtonClick(element);
                        break;
                    case 38: // up arrow
                        prevResult(element);
                        break;
                    case 40: // down arrow
                        nextResult(element);
                        break;
                    case 37: //left arrow, Do Nothing
                    case 39: //right arrow, Do Nothing
                        break;
                    default:
                        if (element.find("#searchBox")[0].value.length > 0) {
                            offset = 0;
                            getValuesAsGeoJson(false, element);
                        }
                        else {
                            clearButtonClick(element);
                        }
                        break;
                }
            }, 300);

            element.find("#searchBox").focus(function () {
                if (element.find("#resultsDiv")[0] !== undefined) {
                    element.find("#resultsDiv")[0].style.visibility = "visible";
                }
            });

            element.find("#searchBox").blur(function () {
                if (element.find("#resultsDiv")[0] !== undefined) {
                    if (collapseOnBlur) {
                        element.find("#resultsDiv")[0].style.visibility = "collapse";
                    }
                    else {
                        collapseOnBlur = true;

                        window.setTimeout(function ()
                        {
                            element.find("#searchBox").focus();
                        }, 0);
                    }
                }

            });

            element.find("#searchButton").click(function () {
                searchButtonClick(element);
            });

            element.find("#clearButton").click(function () {
                clearButtonClick(element);
            });
        });
    };

    $.fn.delayKeyup = function (callback, ms) {
        var timer = 0;
        $(this).keyup(function (event) {

            if (event.keyCode !== 13 && event.keyCode !== 38 && event.keyCode !== 40) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback(event);
                }, ms);
            }
            else {
                callback(event);
            }
        });
        return $(this);
    };

    function getValuesAsGeoJson(withPaging, element) {

        activeResult = -1;
        features = [];
        featureCollection = [];
        var limitToSend = options.limit;
        if (withPaging) {
            limitToSend++;
        }
        lastSearch = element.find("#searchBox")[0].value;

        if (lastSearch === "") {
            return;
        }

        var data = {
            search: lastSearch,
            limit: limitToSend
        };

        if(options.pagingActive){
            data.offset = offset;
        }

        $.ajax({
            url: options.geojsonServiceAddress,
            type: 'GET',
            data: data,
            dataType: 'json',
            success: function (json) {

                if (json.type === "Feature") {
                    resultCount = 1;
                    features[0] = json;
                    featureCollection = json;
                }
                else {
                    resultCount = json.features.length;
                    features = json.features;

                    if (limitToSend === resultCount)
                        featureCollection = json.features.slice(0, json.features.length - 1);
                    else
                        featureCollection = json.features;
                }
                createDropDown(withPaging, element);
                searchLayerType = (withPaging ? 1 : 0);
            },
            error: function () {
                processNoRecordsFoundOrError(element);
            }
        });

    }

    function createDropDown(withPaging, element) {
        var parent = element.find("#searchBox").parent();

        element.find("#resultsDiv").remove();
        parent.append("<div id='resultsDiv' class='result'><ul id='resultList' class='list'></ul><div>");

        element.find("#resultsDiv")[0].style.position = element.find("#searchBox")[0].style.position;
        element.find("#resultsDiv")[0].style.left = (parseInt(element.find("#searchBox")[0].style.left) - 10) + "px";
        element.find("#resultsDiv")[0].style.bottom = element.find("#searchBox")[0].style.bottom;
        element.find("#resultsDiv")[0].style.right = element.find("#searchBox")[0].style.right;
        element.find("#resultsDiv")[0].style.top = (parseInt(element.find("#searchBox")[0].style.top) + 25) + "px";
        element.find("#resultsDiv")[0].style.zIndex = element.find("#searchBox")[0].style.zIndex;

        var loopCount = features.length;
        var hasMorePages = false;
        if (withPaging && features.length === options.limit + 1) { //Has more pages
            loopCount--;
            hasMorePages = true;
            resultCount--;
        }

        for (var i = 0; i < loopCount; i++) {
            console.log(features);
            var html = "<li id='listElement" + i + "' class='listResult' data-latitude='"+ features[i].properties.latitude +"' data-longitude='"+ features[i].properties.longitude +"'>";
            //html += "<span id='listElementContent" + i + "' class='content'><img src='./image/" + features[i].properties.image + "' class='iconStyle' align='middle'>";
            html += "<font size='2' color='#333' class='title'>" + features[i].properties.title + "</font><font size='1' color='#8c8c8c'> " + features[i].properties.description + "<font></span></li>";

            element.find("#resultList").append(html);

            element.find("#listElement" + i).mouseenter(function () {
                listElementMouseEnter(this, element);
            });

            element.find("#listElement" + i).mouseleave(function () {
                listElementMouseLeave(this, element);
            });

            element.find("#listElement" + i).mousedown(function () {
                listElementMouseDown(this, element);
            });
        }

        if (withPaging) {
            var prevPic = "prev.png";
            var nextPic = "next.png";
            var prevDisabled = "";
            var nextDisabled = "";

            if (offset === 0) {
                prevPic = "prev_dis.png";
                prevDisabled = "disabled";
            }

            if (!hasMorePages) {
                nextPic = "next_dis.png";
                nextDisabled = "disabled";
            }

            var htmlPaging = "<div align='right' class='pagingDiv'>" + (offset + 1) + " - " + (offset + loopCount) + " " + options.foundRecordsMessage + " ";
            htmlPaging += "<input id='pagingPrev' type='image' src='../dist/image/" + prevPic + "' width='16' height='16' class='pagingArrow' " + prevDisabled + ">";
            htmlPaging += "<input id='pagingNext' type='image' src='../dist/image/" + nextPic + "' width='16' height='16' class='pagingArrow' " + nextDisabled + "></div>";
            element.find("#resultsDiv").append(htmlPaging);

            element.find("#pagingPrev").mousedown(function () {
                prevPaging(element);
            });

            element.find("#pagingNext").mousedown(function () {
                nextPaging(element);
            });

            drawGeoJsonList(element);
        }
    }

    function listElementMouseEnter(listElement, element) {

        var index = parseInt(listElement.id.substr(11));

        if (index !== activeResult) {
            element.find('#listElement' + index).toggleClass('mouseover');
        }
    }

    function listElementMouseLeave(listElement, element) {
        var index = parseInt(listElement.id.substr(11));

        if (index !== activeResult) {
            element.find('#listElement' + index).removeClass('mouseover');
        }
    }

    function listElementMouseDown(listElement, element) {
        var index = parseInt(listElement.id.substr(11));

        if (index !== activeResult) {
            if (activeResult !== -1) {
                element.find('#listElement' + activeResult).removeClass('active');
            }

            element.find('#listElement' + index).removeClass('mouseover');
            element.find('#listElement' + index).addClass('active');

            activeResult = index;
            fillSearchBox(element);

            if (searchLayerType === 0) {
                drawGeoJson(activeResult);
            }
            else {
                focusGeoJson(activeResult);
            }
        }
    }


    function drawGeoJsonList() {
        if (searchLayer !== undefined) {
            map.removeLayer(searchLayer);
            searchLayer = undefined;
        }

        searchLayer = L.geoJson(featureCollection, {
            style: function (feature) {
                return {color: "#008000"};
            },
            pointToLayer: function (feature, latlng) {
                return new L.CircleMarker(latlng, {radius: 5, fillOpacity: 0.85});
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.popupContent);
            }
        });

        map.addLayer(searchLayer);

        map.fitBounds(searchLayer.getBounds());
    }

    function focusGeoJson(index) {

        if (features[index].geometry.type === "Point" && options.pointGeometryZoomLevel !== -1) {
            map.setView([features[index].geometry.coordinates[1], features[index].geometry.coordinates[0]], options.pointGeometryZoomLevel);
        }
        else {
            map.fitBounds(getBoundsOfGeoJsonObject(features[index].geometry));
        }
        drawGeoJsonOnFocusLayer(index);
    }

    function getBoundsOfGeoJsonObject(geometry) {

        var geojsonObject = L.geoJson(geometry, {
            onEachFeature: function (feature, layer) {
            }
        });

        return geojsonObject.getBounds();
    }

    function drawGeoJson(index) {

        if (searchLayer !== undefined) {
            map.removeLayer(searchLayer);
            searchLayer = undefined;
        }

        if (index === -1)
            return;

        var drawStyle = {
            color: options.drawColor,
            weight: 5,
            opacity: 0.65,
            fill: false
        };

        searchLayer = L.geoJson(features[index].geometry, {
            style: drawStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(features[index].properties.popupContent);
            }
        });

        map.addLayer(searchLayer);

        if (features[index].geometry.type === "Point" && options.pointGeometryZoomLevel !== -1) {
            map.setView([features[index].geometry.coordinates[1], features[index].geometry.coordinates[0]], options.pointGeometryZoomLevel);
        }
        else {
            map.fitBounds(searchLayer.getBounds());
        }
    }

    function drawGeoJsonOnFocusLayer(index) {

        if (focusLayer !== undefined) {
            map.removeLayer(focusLayer);
            focusLayer = undefined;
        }

        if (index === -1)
            return;

        var drawStyle = {
            color: options.color,
            weight: 5,
            opacity: 0.65,
            fill: false
        };

        focusLayer = L.geoJson(features[index].geometry, {
            style: drawStyle,
            onEachFeature: function (feature, layer) {
                layer.bindPopup(features[index].properties.popupContent);
            }
        });

        map.addLayer(focusLayer);

    }



    function fillSearchBox(element) {
        if (activeResult === -1) {
            element.find("#searchBox")[0].value = lastSearch;
        }
        else {
            element.find("#searchBox")[0].value = features[activeResult].properties.title;
        }
    }

    function nextResult(element) {

        if (resultCount > 0) {
            if (activeResult !== -1) {
                element.find('#listElement' + activeResult).toggleClass('active');
            }

            if (activeResult < resultCount - 1) {
                element.find('#listElement' + (activeResult + 1)).toggleClass('active');
                activeResult++;
            }
            else {
                activeResult = -1;
            }

            fillSearchBox(element);

            if (activeResult !== -1) {
                if (searchLayerType === 0) {
                    drawGeoJson(activeResult);
                }
                else {
                    focusGeoJson(activeResult);
                }
            }

        }
    }

    function prevResult(element) {
        if (resultCount > 0) {
            if (activeResult !== -1) {
                element.find('#listElement' + activeResult).toggleClass('active');
            }

            if (activeResult === -1) {
                element.find('#listElement' + (resultCount - 1)).toggleClass('active');
                activeResult = resultCount - 1;
            }
            else if (activeResult === 0) {
                activeResult--;
            }
            else {
                element.find('#listElement' + (activeResult - 1)).toggleClass('active');
                activeResult--;
            }

            fillSearchBox(element);

            if (activeResult !== -1) {
                if (searchLayerType === 0) {
                    drawGeoJson(activeResult);
                }
                else {
                    focusGeoJson(activeResult);
                }
            }
        }
    }

    function clearButtonClick(element) {
        element.find("#searchBox")[0].value = "";
        lastSearch = "";
        resultCount = 0;
        features = [];
        activeResult = -1;
        element.find("#resultsDiv").remove();
        if (searchLayer !== undefined) {
            map.removeLayer(searchLayer);
            searchLayer = undefined;
        }
        if (focusLayer !== undefined) {
            map.removeLayer(focusLayer);
            focusLayer = undefined;
        }
    }

    function searchButtonClick(element) {
        getValuesAsGeoJson(options.pagingActive, element);

    }

    function processNoRecordsFoundOrError(element) {
        resultCount = 0;
        features = [];
        activeResult = -1;
        element.find("#resultsDiv").remove();
        if (searchLayer !== undefined) {
            map.removeLayer(searchLayer);
            searchLayer = undefined;
        }

        var parent = element.find("#searchBox").parent();
        element.find("#resultsDiv").remove();
        parent.append("<div id='resultsDiv' class='result'><i>" + lastSearch + " " + options.notFoundMessage + " <p><small>" + options.notFoundHint + "</small></i><div>");
    }

    function prevPaging(element) {
        element.find("#searchBox")[0].value = lastSearch;
        offset = offset - options.limit;
        getValuesAsGeoJson(true, element);
        collapseOnBlur = false;
        activeResult = -1;
    }

    function nextPaging(element) {
        element.find("#searchBox")[0].value = lastSearch;
        offset = offset + options.limit;
        getValuesAsGeoJson(true, element);
        collapseOnBlur = false;
        activeResult = -1;
    }
})(jQuery);
