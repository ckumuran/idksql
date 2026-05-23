import { useStore } from "../store/useStore";

export default function SQLPreview() {

    const { sql } = useStore();

    return (

        <div
            className="
                border
                border-red-900
                bg-[#050505]
                p-4
                rounded-xl
                mt-6
            "
        >

            <div
                className="
                    text-red-400
                    mb-3
                "
            >
                GENERATED SQL
            </div>

            <pre
                className="
                    text-green-400
                    whitespace-pre-wrap
                "
            >
                {sql}
            </pre>

        </div>
    );
}
