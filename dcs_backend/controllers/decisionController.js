const Decision = require("../models/decisionModel");

exports.createDecision = async (req, res) => {

    console.log("Inside createDecision");

    console.log(req.body)
    const { item,criteria,options,scores} =req.body
    const userMail =req.payload
    console.log(userMail)
    try{
        const newDecision=await Decision({
        item,
        criteria,
        options,
        scores,
        userMail
    });
    await newDecision.save()
    res.status(200).json("Decision data added successfully...")
    }
    catch(err)
    {
        res.status(500).json("Error"+err)
    }

    // res.send("Request Received...")
};
exports.getLatestDecision = async (req, res) => {
    const userMail = req.payload;

    try {
        const decision = await Decision.findOne({ userMail })
            .sort({ createdAt: -1 });

        res.status(200).json(decision);
    } catch (err) {
        res.status(500).json("Error: " + err);
    }
};