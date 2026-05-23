import express from "express";

import { generateSQLExplanation }
from "../ai/explainer";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            sql
        } = req.body;

        const explanation =
            await generateSQLExplanation(
                sql
            );

        res.json({
            explanation
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error:
                "Failed to explain SQL"
        });
    }
});

export default router;
