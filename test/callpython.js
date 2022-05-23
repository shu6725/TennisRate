//まずpython-shellモジュールを読み込む
var { PythonShell } = require('python-shell');

const userId = 349827

// //jsonデータ作成
var json = [
    { "userId": userId, "yyyyMMdd": 20151201, "rate": 1500 },
    { "userId": userId, "yyyyMMdd": 20260101, "rate": 1000 },
    { "userId": userId, "yyyyMMdd": 20200301, "rate": 1200 },
    { "userId": userId, "yyyyMMdd": 20220801, "rate": 1600 },
]

const fs = require('fs');
const createFile = (pathName, source) => {
    const toJSON = JSON.stringify(source);
    fs.writeFile(pathName, toJSON, (err) => {
        if (err) rej(err);
        if (!err) {
            PythonShell.run('genChart.py', null, function (err) {
                if (err) throw err;
            });
        };
    });
};

createFile('newObj.json', json);