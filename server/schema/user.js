import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  profile: {
    name: { type: String },
    state: { type: String },
    GPA: { type: Number },
    preferredAmount: { type: Number },
    age:{type:Number},
    institution:{type:String}
  },
  isProfileComplete:{type:Boolean,default:false}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
