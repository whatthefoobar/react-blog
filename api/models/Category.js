import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// export default Model('Category', CategorySchema);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
