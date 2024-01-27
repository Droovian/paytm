const express = require('express');
const { authMiddleware } = require('../middleware/middleware');
const { Account } = require('../db/db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/balance', authMiddleware, async(req, res) => {

    const account = await Account.findOne({
        userID: req.userID
    });

    res.json({
        balance: account.balance
    })

});

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const { amount, to } = req.body;

        console.log("Received transfer request:", { amount, to });

        const account = await Account.findOne({
            userID: req.userID
        });
        console.log(account);
        // console.log(req.userID);
        if (!account) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }
        // console.log(account);
        if (account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
       console.log(req.body.to);
        const toAccount = await Account.findOne({
            userID: req.body.to
        });
        console.log(toAccount);
        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid recipient account"
            });
        }

        await Account.updateOne({
            userID: req.userID
        }, {
            $inc: {
                balance: -amount
            }
        });

        await Account.updateOne({
            userID: to
        }, {
            $inc: {
                balance: amount
            }
        });

        res.json({
            msg: "Transfer successful"
        });
    } catch (error) {
        console.error("Error during transfer:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});


module.exports = router;