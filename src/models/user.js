import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { versionKey: false });

const user = mongoose.model('users', userSchema);

export { user, userSchema };
