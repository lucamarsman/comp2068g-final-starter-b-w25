import express from "express"
import Destination from "../models/recipe.js"

const router = express.Router();

router.get("/fetchAll", async (req, res) => {
    let recipes = await Destination.find();
    if (!recipes) {
        return res.status(204).json({ err: 'No Results' });
    }

    return res.status(200).json(recipes);
});

export default router;