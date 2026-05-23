import { motion } from "framer-motion";

import { askDatabase } from "../services/api";

import { useStore } from "../store/useStore";

export default function DangerousQueryModal() {

    const {

        showDangerModal,

        dangerousSQL,

        selectedDatabase,

        setShowDangerModal,

        setResults,

        setLoading

    } = useStore();

    if (!showDangerModal) {

        return null;
    }

    async function runDangerousQuery() {

        try {

            setLoading(true);

            const data = await askDatabase(

                selectedDatabase,

                "",

                dangerousSQL
            );

            setResults(
                data.result || []
            );

            setShowDangerModal(
                false
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/70
                flex
                items-center
                justify-center
                z-50
            "
        >

            <motion.div

                initial={{
                    scale: 0.8,
                    opacity: 0
                }}

                animate={{
                    scale: 1,
                    opacity: 1
                }}

                className="
                    cyber-panel
                    w-[600px]
                    rounded-2xl
                    p-8
                "
            >

                <div
                    className="
                        text-4xl
                        glow-red
                        mb-4
                    "
                >
                    WARNING
                </div>

                <div
                    className="
                        text-gray-400
                        mb-6
                    "
                >
                    Dangerous SQL query detected.
                </div>

                <pre
                    className="
                        bg-black
                        border
                        border-red-950
                        p-4
                        rounded-xl
                        text-red-300
                        overflow-auto
                    "
                >
                    {dangerousSQL}
                </pre>

                <div
                    className="
                        flex
                        gap-4
                        mt-8
                    "
                >

                    <button

                        onClick={
                            runDangerousQuery
                        }

                        className="
                            bg-red-950
                            hover:bg-red-900
                            border
                            border-red-700
                            px-5
                            py-3
                            rounded-xl
                        "
                    >
                        RUN ANYWAY
                    </button>

                    <button

                        onClick={() =>
                            setShowDangerModal(
                                false
                            )
                        }

                        className="
                            border
                            border-gray-700
                            px-5
                            py-3
                            rounded-xl
                            text-gray-400
                        "
                    >
                        CANCEL
                    </button>

                </div>

            </motion.div>

        </div>
    );
}
