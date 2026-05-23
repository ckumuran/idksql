import { Terminal } from "lucide-react";

import { useStore }
from "../store/useStore";

export default function TerminalPanel() {

    const {

        logs,

        clearLogs

    } = useStore();

    return (

        <div
            className="
                cyber-panel
                rounded-2xl
                p-5
                mt-6
                h-[300px]
                overflow-hidden
                flex
                flex-col
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    text-red-400
                    tracking-widest
                "
            >

                <Terminal size={18} />

                TERMINAL LOGS

                <button

                    onClick={clearLogs}

                    className="
                        ml-auto
                        text-xs
                        text-gray-500
                        hover:text-red-400
                    "
                >
                    CLEAR
                </button>

            </div>

            <div
                className="
                    flex-1
                    overflow-auto
                    font-mono
                    text-sm
                    space-y-2
                "
            >

                {logs.map((log) => (

                    <div
                        key={log.id}

                        className="
                            text-gray-400
                        "
                    >

                        <span
                            className="
                                text-red-500
                                mr-3
                            "
                        >
                            [{log.timestamp}]
                        </span>

                        {log.message}

                    </div>
                ))}

                {
                    !logs.length && (

                        <div
                            className="
                                text-gray-600
                            "
                        >
                            No terminal activity.
                        </div>
                    )
                }

            </div>

        </div>
    );
}
