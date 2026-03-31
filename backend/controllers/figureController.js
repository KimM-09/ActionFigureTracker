import Figure from "../models/figureSchema";

export const addFigure = async(req, res) => {
    try {
        const {collection, series, name, number, exclusive, chase, condition } = req.body;
        const newFigure = new Figure({
            collection,
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