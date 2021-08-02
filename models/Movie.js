import mongoose from "mongoose";
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Por favor ingrese título"],
  },
  plot: {
    type: String,
    required: [true, "Por favor ingrese descripción"],
  },
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
