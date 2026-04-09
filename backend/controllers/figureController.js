import Figure from "../models/figureSchema.js";

export const addFigure = async(req, res) => {
    try {
        const {branding, series, name, number, exclusive, chase, condition,notes } = req.body;
        const newFigure = new Figure({
            branding,
            series,
            name,
            number,
            exclusive,
            chase,
            condition, 
            notes,
            owner: req.user.id
        });
        const savedFigure = await newFigure.save();
        res.status(201).json(savedFigure)
    } catch(error) {
        res.status(500).json({message: "Error saving figure", error: error.message })
    }
};

export const getMyFigs = async(req, res) => {
    try {
        const figures = await Figure.find({ owner: req.user.id });
        res.status(200).json(figures);
    } catch(error) {
        res.status(500).json({ message: "Error fetching figs"});
    }
};

//Update a specific figure
export const updateFigure = async (req, res) => {
    try {
        const figure = await Figure.findById(req.params.id);

        if(!figure){
            return res.status(404).json({ message: "Figure not found" });
        }

        //Check if the logged in user owns this figure
        if (figure.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: "User not authorized to update this" });
        }

        const updatedFigure = await Figure.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: after } //Returns the modified document rather than the original
        );

        res.json(updatedFigure)
    } catch (error) {
        res.status(500).json({ message: "Server error during update" });
    }
};

//Delete a figure
export const deleteFigure = async (req, res) => {
    try {
        const figure = await Figure.findById(req.params.id);

        if(!figure){
            return res.status(404).json({ message: "Figure not found" });
        }

        //Check if the logged in user owns this figure
        if(figure.owner.toString() !== req.user.id) {
            return res.status(404).json({ message: "User not authorized to delete this" });
        }

        await figure.deleteOne();
        res.json({ message: "Figure removed from collection" });
    } catch (error) {
        res.status(500).json({ message: "Server error during deletion" });
    }
};