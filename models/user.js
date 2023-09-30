import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        unique: [true, 'Username already exists'],
        required: [true, 'Username reuqired'],
    },
    password: {
        type: String,
        required: [true, 'password reuqired']
    },
    image: {
        type: String,
    }
});

//check if user already creates, if not create
const User = models.User || model('User', UserSchema);

export default User;