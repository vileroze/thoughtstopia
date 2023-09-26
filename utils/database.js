import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_thoughts',
            useNewUrlParser: true,
            useUnifiedTopology:true
        });

        isConnected = true;
        
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error);
    }
}