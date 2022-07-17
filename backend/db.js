require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        // console.log(process.env.PORT)
       mongoose.connect(
            "mongodb+srv://MayaKhaled:Yooya2000@cluster0.omz6uuf.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser : true,
                useUnifiedTopology: true

            }
        );

        console.log("connection to MONGODB SUCCEEDED :D ");
    } catch (error) {
        console.log("connection to MONGODB Failed :( ");
        process.exit(1);
        
    }
};

module.exports = connectDB ;