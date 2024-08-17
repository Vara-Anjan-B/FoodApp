import mongoose from "mongoose";

const mongourl = "mongodb+srv://bankivarun:Varshini%401@cluster0.mvjgv.mongodb.net/needFood?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongourl);
        console.log("Connected to Mongo Successfully!");
        const fetchedData = await mongoose.connection.db.collection("food_items");
        const data = await fetchedData.find({}).toArray();
        global.food_items = data
        const foodCategory = await mongoose.connection.collection("food_Catergory");
        const data2 = await foodCategory.find({}).toArray();
        global.food_items_cat = data2;
        } 
    catch (error) {
        console.error("Error connecting to Mongo:", error);
        }
};

export default connectToMongo;