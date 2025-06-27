import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true },
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
