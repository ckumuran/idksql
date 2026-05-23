import express from "express";

import { createAdapter } from "../adapters/factory";

const router = express.Router();

router.get("/:databaseType", async (req, res) => {

    try {

        const {
            databaseType
        } = req.params;

        const adapter = createAdapter(
            databaseType as any
        );

        await adapter.connect();

        const schema = await adapter.getSchema();

        await adapter.disconnect();

        res.json({
            schema
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to load schema"
        });
    }
});

export default router;
