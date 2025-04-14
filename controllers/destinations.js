import express from "express"
import Destination from "../models/recipe.js"
import Subscriber from "../models/subscriber.js"

const router = express.Router();

router.get("/fetchAll", async (req, res) => {
    let recipes = await Destination.find();
    if (!recipes) {
        return res.status(204).json({ err: 'No Results' });
    }

    return res.status(200).json(recipes);
});

router.post("/subscribe", async(req, res) => {
    try {
        let sub = await Subscriber.findOne({ username: req.body.username });

        if (sub) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        sub = new Subscriber({ username: req.body.username });
        await sub.setPassword(req.body.password);
        await sub.save();
        return res.status(201).json({ msg: 'User registered successfully' });
    }
    catch (err) {
        return res.status(400).json(err);
    }
});

export default router;