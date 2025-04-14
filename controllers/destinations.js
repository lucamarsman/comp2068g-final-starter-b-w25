import express from "express"
import Destination from "../models/recipe.js"
import Subscriber from "../models/subscriber.js"
import jwt from "jsonwebtoken"

const router = express.Router();

const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username
    };

    const jwtOptions = { 
        expiresIn: '1hr'
    };

    return jwt.sign(payload, process.env.PASSPORT_SECRET, jwtOptions);
};

const setTokenCookie = (res, token) => {
    res.cookie('examToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
};

const clearTokenCookie = (res) => {
    res.cookie('examToken', '', {
        httpOnly: true,
        expires: new Date(0)
    });
};

router.get("/fetchAll", async (req, res) => {
    try {
        const token = req.cookies.examToken;
        console.log(token);

        if (token) {
            const decode = jwt.verify(token, process.env.PASSPORT_SECRET);
            if (decode) {
                let recipes = await Destination.find();
                if (!recipes) {
                    return res.status(204).json({ err: 'No Results' });
                }

                return res.status(200).json(recipes);
            }
            else {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
        }
        else {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
    }
    catch (err) {
        return res.status(400).json({ err: `Bad Request: ${err}` });
    }
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

router.post("/login", async(req, res) => {
    Subscriber.authenticate()(req.body.username, req.body.password, (err, sub, info) => {
        if (err) {
            return res.status(500).json({ msg: 'Server error', err });
        }

        if (!sub) {
            return res.status(401).json({ msg: 'Invalid username or password', info });
        }

        const token = generateToken(sub);
        setTokenCookie(res, token);
        return res.status(200).json({ username: sub.username });
    });
});

router.get('/logout', async(req, res) => {
    try {
        clearTokenCookie(res);
        return res.status(200).json({ msg: 'User logged out' });
    }
    catch (err) {
        return res.status(400).json(err);
    }
})

export default router;