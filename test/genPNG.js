const FONT_PATH = '.' + '/ipaexg.ttf';
const FONT_NAME = "IPAEXG";
const FONT_COLOR = "#333333aa";

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 100,
    height: 100,
    chartCallback: (ChartJS) => {
        // ChartJS.defaults.global.defaultFontFamily = FONT_NAME;
        ChartJS.defaults.global.defaultFontColor = FONT_COLOR;
    }
});

// chartJSNodeCanvas.registerFont(FONT_PATH, { family: FONT_NAME });

async function makeChart(width, height, type, params, mimetype) {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({
        width: width,
        height: height,
        chartCallback: (ChartJS) => {
            // ChartJS.defaults.global.defaultFontFamily = FONT_NAME;
            ChartJS.defaults.global.defaultFontColor = FONT_COLOR;
        }
    });
    // chartJSNodeCanvas.registerFont(FONT_PATH, { family: FONT_NAME });

    var configuration;
    switch (type) {
        case 'doughnut': {
            configuration = make_chart_doughnut(params.value, params.legend, params.title, params.range);
            break;
        }
        case 'gauge': {
            configuration = make_chart_gauge(params.value, params.legend, params.title, params.range);
            break;
        }
        case 'line': {
            configuration = make_chart_line(params.datum, params.labels, params.legends, params.title, params.range);
            break;
        }
        case 'pie': {
            configuration = make_chart_pie(params.datum, params.legends, params.title);
            break;
        }
        case 'stackbar': {
            configuration = make_chart_stackbar(params.datum, params.labels, params.legends, params.title, params.range);
            break;
        }
        case 'bar': {
            configuration = make_chart_bar(params.datum, params.labels, params.title, params.range);
            break;
        }
        default: {
            throw 'unknown type';
        }
    }

    return chartJSNodeCanvas.renderToBuffer(configuration, mimetype);
}

const params = {
    "datum": [
        [880, 740, 900, 520, 930],
        [380, 440, 500, 220, 630]
    ],
    "labels": ["Jan", "Feb", "Mar", "Apr", "May"],
    "legends": ["printer num", "pc num"],
    "range": { "min": 0, "max": 1000 },
    "title": "title"
}

const format = 'image/png'

makeChart(100, 100, 'line', params, format)