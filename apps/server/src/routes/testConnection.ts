import express from "express";

import { createAdapter }
from "../adapters/factory";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const {
            databaseType
        } = req.body;

        const adapter =
            createAdapter(
                databaseType
            );

        await adapter.connect();

        await adapter.disconnect();

        res.json({

            success: true,

            message:
                "Connection successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Connection failed"
        });
    }
});

export default router;
