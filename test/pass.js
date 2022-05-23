const bcrypt = require('bcrypt');
var pwh = bcrypt.hash('shugo', 10).then((psh) => {
    var compared = bcrypt.compare('shugo', '$2b$10$qAKR/lk2Nby6HF2pKFBkMOC/E3UCHCFedJFbBq5Z11JwOiImv/J.i').then((compared) => {
        console.log(compared)
    })
})
