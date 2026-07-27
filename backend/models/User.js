import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true,'Email is required'],
    lowercase:true,
    unique: true,
    match:[/^[A-Za-z0-9._%+-]+@kiit\.ac\.in$/,'Please give a valid email address'],
  },
  password: {
    type: String,
    required: [true,'Password is required'],
    minlength:[6,'Password must be at least 6 characters']
  },
  role:{
    type:String,
    enum:['Student','Admin'],
    default:'Student'
    
  }
});

export default mongoose.model('User', userSchema);