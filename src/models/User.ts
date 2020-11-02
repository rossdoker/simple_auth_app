import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isRoot: boolean;
    registrationDate: Date;
    avatar: string | null;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 80,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 80,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },
    isRoot: {
        type: Boolean,
        required: false,
        default: false,
    },
    registrationDate: {
        type: Date,
        required: false,
        default: Date.now,
    },
    avatar: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: null,
    }
});

export default mongoose.model<IUser>('User', userSchema);