const authenticationEnsurer = require('./authentication-ensurer');
const express = require("express");
const router = express.Router();
const multer = require("multer");
const pythonShell = require('python-shell');
const fs = require('fs');
const Profile = require('../models/profile');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        console.log(file.originalname, 'filename')
        console.log(req.user, 'username')
        cb(null, file.originalname)
    }
});

const uploader = multer({ storage });

router.post("/", uploader.single('image'), (req, res, next) => {
    res.render('profile', { user: req.user });
});

router.get('/', authenticationEnsurer, (req, res, next) => {
    User.findOne({
        where: {
            username: req.user.username
        }
    }).then((user) => {
        res.render('profile', { user: req.user });
    });
});

module.exports = router;

// const userId = 349827

// // //jsonデータ作成
// var json = [
//     { "userId": userId, "yyyyMMdd": 20151201, "rate": 1500 },
//     { "userId": userId, "yyyyMMdd": 20260101, "rate": 1000 },
//     { "userId": userId, "yyyyMMdd": 20200301, "rate": 1200 },
//     { "userId": userId, "yyyyMMdd": 20220801, "rate": 1600 },
// ]
// const createFile = (pathName, source) => {
//     const toJSON = JSON.stringify(source);
//     fs.writeFile(pathName, toJSON, (err) => {
//         if (err) rej(err);
//         if (!err) {
//             pythonShell.run('genChart.py', null, function (err) {
//                 if (err) throw err;
//             });
//         };
//     });
// };

// createFile('newObj.json', json);

