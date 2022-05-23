const User = require('../models/user');
User.upsert({
    username: 'okura',
    rate: 1500
});
User.upsert({
    username: 'shugo',
    rate: 1500
});