
const { default: mongoose } = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
          "mongodb+srv://crud-db:crud@cluster.0jygorg.mongodb.net/?appName=Cluster",
        );
        console.log("mongodb connected");
        
    } catch (error) {
        console.log(error);
    }
    
}
module.exports=connectDB