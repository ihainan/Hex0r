var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var HEX = '0123456789ABCDEF';

function splitWithComma(input) {
    if (input === "") {
        return [];
    }
    return input.split(/(?<!\\),/);
}

function splitWithColon(input) {
    if (input === "") {
        return [];
    }
    return input.split(/(?<!\\):/);
}

function markup_hex0rwindow(div) {
    var step = parseInt($(div).data('row-width'));
    var wordSize = parseInt($(div).data('word-size'));
    var rowBreak = parseInt($(div).data('row-break'));
    var caption = $(div).data('caption');
    var highlightsStr = splitWithComma($(div).data('highlights'));
    var trim = $(div).data('trim').toString() == "true";;
    var base64 = $(div).data('base64').toString() == "true";
    var showLineNums = $(div).data('show-line-nums').toString() == "true";
    var rawData = div.text();

    if (trim == true) {
        rawData = remove_whitespace(rawData);
    }

    var byteArray
    if (base64 == true) {
        byteArray = base64ToByteArray(rawData);
    } else {
        byteArray = new TextEncoder().encode(rawData);
    }
    // console.log(byteArray);
    var lineData;
    var highlights = [];
    for (var hi = 0; hi < highlightsStr.length; hi++) {
        var splits = splitWithColon(highlightsStr[hi])
        highlights.push(Array(
            Math.floor(splits[0]),
            Math.floor(splits[1]),
            splits[2],
            splits[3].replace(/\\,/g, ',').replace(/\\:/g, ':'))
        )
    }

    // console.log(highlights);
    div.text("");
    div.append("<table></table>");

    var offset = 0;

    function applyHighlights(index) {
        for (var idx = 0; idx < highlights.length; idx++) {
            if ((index >= highlights[idx][0]) && (index <= highlights[idx][1])) {
                $("table tr td:last", div).addClass("hex0rwindow_highlight_hover");
                $("table tr td:last", div).attr("data-bg-color", highlights[idx][2]); // Store highlight color
                $("table tr td:last", div).attr("data-highlight-range", highlights[idx][0] + ":" + highlights[idx][1]); // Store highlight range
                $("table tr td:last", div).attr("title", highlights[idx][3]);
                runlen += 1;
            } else {
                $("table tr td:last", div).addClass("hex0rwindow_code");
            }
        }
    }


    function applyHighlightsForVisual(index) {
        for (var idx = 0; idx < highlights.length; idx++) {
            if ((index >= highlights[idx][0]) && (index <= highlights[idx][1])) {
                $("table tr td:last", div).addClass("hex0rwindow_highlight_hover_visual");
                $("table tr td:last", div).attr("data-bg-color", highlights[idx][2]); // Store highlight color
                $("table tr td:last", div).attr("data-highlight-range", highlights[idx][0] + ":" + highlights[idx][1]); // Store highlight range
                $("table tr td:last", div).attr("title", highlights[idx][3]);
                runlen += 1;
            }
        }
    }

    if (caption) {
        $("table", div).append("<caption>" + caption + "</caption>");
    }

    var numIndex = 0;
    var numIndexVisual = 0;
    while (byteArray.length > 0) {
        lineData = byteArray.slice(0, step);
        byteArray = byteArray.slice(step);

        $("table", div).addClass("hex0rwindow_table");
        $("table", div).append("<tr></tr>").addClass("hex0rwindow");

        if (showLineNums == true) {
            $("table tr:last", div).append("<td>" + dec_to_hex8(offset) + " </td>");
            $("table tr td:last", div).addClass("hex0rwindow_offset");
        }
        var runlen = 0;
        for (var idxData = 0; idxData < lineData.length; idxData += wordSize) {
            var num = "";

            for (var idxWs = 0; idxWs < wordSize; idxWs++) {
                num += dec2_to_hex(lineData[idxData + idxWs]);
            }
            if (idxData == rowBreak - 1) {
                $("table tr:last", div).append("<td>" + num + "&nbsp;&nbsp;&nbsp</td>");
                applyHighlights(offset + idxData);
            } else {
                $("table tr:last", div).append("<td>" + num + "</td>");
                applyHighlights(offset + idxData);
            }
            $("table tr td:last", div).attr("number", numIndex);
            numIndex += 1;
        }

        if (lineData.length < step) {
            $("table tr td:last", div).attr("colspan", Math.floor((step - lineData.length) / wordSize) + 1);
        }

        for (var i = 0; i < lineData.length; i++) {
            var cc = lineData[i];

            if ((cc >= 32) && (cc <= 126)) {
                $("table tr:last", div).append("<td>" + String.fromCharCode(lineData[i]) + "</td>");
            } else {
                $("table tr:last", div).append("<td>.</td>");
            }

            if (i == 0) {
                $("table tr td:last", div).addClass("hex0rwindow_visual_first");
            } else {
                $("table tr td:last", div).addClass("hex0rwindow_visual_others");
            }

            $("table tr td:last", div).attr("number", numIndexVisual);
            numIndexVisual += 1;
            applyHighlightsForVisual(offset + i);
        }

        offset += step;
    }
}

function dec2_to_hex(dec) {
    if (dec < 0)
        dec = 0;

    if (dec > 255)
        dec = 255;

    return HEX.charAt(Math.floor(dec / 16)) + HEX.charAt(dec % 16);
}

function dec_to_hex8(dec) {
    var str = "";

    for (var i = 3; i >= 0; i--) {
        str += dec2_to_hex((dec >> (i * 8)) & 255);
    }

    return str;
}

function remove_whitespace(str) {
    return str.replace(/\n/g, "")
        .replace(/\t/g, "")
        .replace(/ /g, "")
        .replace(/\r/g, "");
}

function base64_decode(encoded) {
    var decoded = "";

    for (var i = 0; i < encoded.length; i += 4) {
        var ch0 = encoded.charAt(i + 0);
        var ch1 = encoded.charAt(i + 1);
        var ch2 = encoded.charAt(i + 2);
        var ch3 = encoded.charAt(i + 3);

        var index0 = BASE64_CHARS.indexOf(ch0);
        var index1 = BASE64_CHARS.indexOf(ch1);
        var index2 = BASE64_CHARS.indexOf(ch2);
        var index3 = BASE64_CHARS.indexOf(ch3);

        decoded += String.fromCharCode((index0 << 2) | (index1 >> 4));
        decoded += String.fromCharCode(((index1 & 15) << 4) | (index2 >> 2));
        decoded += String.fromCharCode(((index2 & 3) << 6) | index3);
    }

    return decoded;
}

function base64ToByteArray(base64) {
    // 移除任何可能的非法字符
    base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '');

    // 填充 Base64 字符串，使其长度为 4 的倍数
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    try {
        var binaryString = atob(base64);
        var byteArray = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }
        return byteArray;
    } catch (e) {
        console.error('Failed to decode Base64 string:', e);
        return null;
    }
}

$(document).ready(function () {
    $(document).on('mouseenter', '.hex0rwindow_highlight_hover', function () {
        var bgColor = $(this).attr("data-bg-color");
        var range = $(this).attr("data-highlight-range").split(":");
        highlightRange(parseInt(range[0]), parseInt(range[1]), bgColor);
    });

    $(document).on('mouseleave', '.hex0rwindow_highlight_hover', function () {
        var range = $(this).attr("data-highlight-range").split(":");
        unhighlightRange(parseInt(range[0]), parseInt(range[1]));
    });

    $(document).on('mouseenter', '.hex0rwindow_highlight_hover_visual', function () {
        var bgColor = $(this).attr("data-bg-color");
        var range = $(this).attr("data-highlight-range").split(":");
        highlightRange(parseInt(range[0]), parseInt(range[1]), bgColor);
    });

    $(document).on('mouseleave', '.hex0rwindow_highlight_hover_visual', function () {
        var range = $(this).attr("data-highlight-range").split(":");
        unhighlightRange(parseInt(range[0]), parseInt(range[1]));
    });

    $("div.hex0rwindow").each(function (index) {
        markup_hex0rwindow($(this), index);
    });
});


function highlightRange(start, end, color) {
    $(".hex0rwindow_highlight_hover").each(function () {
        var index = $(this).attr("number");
        if (index >= start && index <= end) {
            $(this).css("background-color", color);
        }
    });

    $(".hex0rwindow_highlight_hover_visual").each(function () {
        var index = $(this).attr("number");
        if (index >= start && index <= end) {
            $(this).css("background-color", color);
        }
    });
}

function unhighlightRange(start, end) {
    $(".hex0rwindow_highlight_hover").each(function () {
        var index = $(this).attr("number");
        if (index >= start && index <= end) {
            $(this).css("background-color", "");
        }
    });

    $(".hex0rwindow_highlight_hover_visual").each(function () {
        var index = $(this).attr("number");
        if (index >= start && index <= end) {
            $(this).css("background-color", "");
        }
    });
}
