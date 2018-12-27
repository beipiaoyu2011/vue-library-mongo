const mongoose = require('mongoose');
// const url = "mongodb://127.0.0.1:27017/test";
const url = "mongodb+srv://wz:master2011@cluster0-f5jim.mongodb.net/test?retryWrites=true";
const Schema = mongoose.Schema;
//设置schema 需要指定 collection 否则官方会自动名字加 ‘s’
const specifyCollection = {
    collection: 'user',
};
mongoose.connect(url, {
    useNewUrlParser: true
});

mongoose.connection.on('open', () => {
    console.log('连接数据库成功');
});

const userSchema = new Schema(
    {
        username: String,
        password: String
    },
    specifyCollection
);

exports.userModel = mongoose.model('user', userSchema);

