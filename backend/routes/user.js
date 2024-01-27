const express = require('express');
const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware/middleware');
const { passwordMiddleware } = require('../middleware/password');
const { User, Account } = require('../db/db');

const router = express.Router();

const signUpObject = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
});

const updateObject = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});

const signInObject = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post('/signup',passwordMiddleware, async(req, res) => {

    const { success } = signUpObject.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg : 'Email already taken/Incorrect inputs'
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            msg : 'Email already taken/Incorrect inputs'
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userID = user._id;

    await Account.create({
        userID,
        balance: Math.floor(Math.random() * 10000) + 1
    })

    const token = jwt.sign({
        userID
    }, JWT_SECRET);

    res.status(200).json({
        msg : 'User created successfully',
        token: token
    })

});

router.post("/signin", authMiddleware, async (req, res) => {
    const { success } = signInObject.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
    });

    const checkPass = bcrypt.compare(req.body.password, user.password);

    if (checkPass) {
        const token = jwt.sign({
            userID: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
});

router.put('/', authMiddleware, async(req, res) => {
    const { success } = updateObject.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    try {
        
        await User.updateOne(req.body, {
            _id: req.userID
        })
        
        res.status(200).json({
            msg : 'Updated successfully'
        })

    } catch (error) {
        console.error('Error during user update:', error);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});

module.exports = router;
