export function buildPrompt(
    userQuery: string,
    schema: string,
    databaseType: string
) {

    return `
You are a SQL generator.

Database Type:
${databaseType}

Database Schema:
${schema}

Rules:
- Return only SQL
- No markdown
- No explanations
- Generate valid SQL only

User Request:
${userQuery}
`;
}
