import Sidebar from "../components/Sidebar";

import QueryInput from "../components/QueryInput";

import SQLPreview from "../components/SQLPreview";

import ResultTable from "../components/ResultTable";

export default function Home() {

    return (

        <div
            className="
                flex
                h-screen
                bg-black
            "
        >

            <Sidebar />

            <div
                className="
                    flex-1
                    p-10
                    overflow-auto
                "
            >

                <div
                    className="
                        text-7xl
                        leading-none
                        font-bold
                        text-red-700
                        mb-10
                    "
                >
                    ASK YOUR
                    <br />
                    DATA
                    <br />
                    ANYTHING
                </div>

                <QueryInput />

                <SQLPreview />

                <ResultTable />

            </div>

        </div>
    );
}
