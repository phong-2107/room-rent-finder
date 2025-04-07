const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load biến môi trường từ `.env`
dotenv.config();

const connectDB = async () => {
    try {
        let mongoURI = process.env.MONGO_URL;
        if (!mongoURI.includes("/boarding-house")) {
            mongoURI += "/boarding-house";
        }

        // Kết nối MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${mongoURI}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
