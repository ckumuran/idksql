import axios from "axios";

export async function generateSQLExplanation(
    sql: string
) {

    const prompt = `

Explain this SQL query in simple language.

SQL:
${sql}

Rules:
- Be concise
- Explain tables used
- Explain conditions
- Explain output
- No markdown
`;

    const response = await axios.post(

        `${process.env.OLLAMA_URL}/api/generate`,

        {
            model:
                process.env.OLLAMA_MODEL,

            prompt,

            stream: false
        }
    );

    return response.data.response;
}
