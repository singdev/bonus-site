const mongoose = require('mongoose');

module.exports = () => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/bonus-site';
    mongoose.connect(mongoUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

    mongoose.connection.on('error', () => console.log("MongoDB Error !"));
    mongoose.connection.on('open', () => console.log("MongoDB OK !"));
}