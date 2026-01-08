const mongoose = require('mongoose');
const connectDB = async () => {
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connnection Succes')
    }
    catch(error){
        console.log('Connection Failed',error);
        process.exit(1);
    }
}
module.exports = connectDB;
