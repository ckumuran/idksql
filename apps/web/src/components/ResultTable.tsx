import { useStore } from "../store/useStore";

export default function ResultTable() {

    const { results } = useStore();

    if (!results.length) {

        return null;
    }

    const columns = Object.keys(results[0]);

    return (

        <div
            className="
                mt-6
                overflow-auto
                border
                border-red-900
                rounded-xl
            "
        >

            <table
                className="
                    w-full
                    border-collapse
                "
            >

                <thead>

                    <tr
                        className="
                            bg-red-950
                        "
                    >

                        {columns.map((column) => (

                            <th
                                key={column}

                                className="
                                    text-left
                                    p-3
                                    border-b
                                    border-red-900
                                "
                            >
                                {column}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {results.map((row, index) => (

                        <tr
                            key={index}

                            className="
                                border-b
                                border-red-950
                            "
                        >

                            {columns.map((column) => (

                                <td
                                    key={column}

                                    className="
                                        p-3
                                        text-gray-300
                                    "
                                >
                                    {
                                        String(
                                            row[column]
                                        )
                                    }
                                </td>

                            ))}

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}
