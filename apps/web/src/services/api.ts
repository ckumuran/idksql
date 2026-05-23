import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:3001/api"
});

export async function askDatabase(
    databaseType: string,
    userQuery: string
) {

    const response = await api.post(
        "/query",
        {
            databaseType,
            userQuery
        }
    );

    return response.data;
}

export async function getSchema(
    databaseType: string
) {

    const response = await api.get(
        `/schema/${databaseType}`
    );

    return response.data.schema;
}
