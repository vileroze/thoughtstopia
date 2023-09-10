import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('already connected mongoose');
        return;
    }

    try {
        await mongoose.connect(proces.env.MONGODB_URI, {
            dbName: 'share_propmpt',
            useNewUrlParser: true,
            useNewTopology:true
        });

        isConnected = true;
        
        console.log('MongoDB connected');

    } catch (error) {
        console.log(error);
    }
}