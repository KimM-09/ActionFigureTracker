import mongoose from "mongoose";

const figureSchema = new mongoose.Schema({
    collection: {type: String, required: true},
    series:{type: String, required: true},
    name: {type: String, required: true},
    number: {type: String, required: true},
    exclusive: {type: String, required: true},
    chase: {type: String, required: true},
    condition: {type: String, required: true},
    notes: {type: String},
    //connects the figure to a specific user
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Figure = mongoose.model("Figure", figureSchema);

export default Figure;