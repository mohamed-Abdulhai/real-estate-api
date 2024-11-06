import mongoose from "mongoose"

export const dbConnect =  async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB)
        if(conn){
            console.log(conn.connection.host, "Connected to MongoDB")
        }
    } catch (error) {
        console.log(error.message, "Failed to connect to MongoDB");
        
    }
}