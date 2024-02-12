import mongoose from 'mongoose';

const authorSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  bio: { type: String},
  country: { type: String}
}, { versionKey: false });

const author = mongoose.model('authors', authorSchema);

export { author, authorSchema };
