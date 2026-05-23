export function saveHistory(
    history: any[]
) {

    localStorage.setItem(
        "idksql-history",
        JSON.stringify(history)
    );
}

export function loadHistory() {

    const history = localStorage.getItem(
        "idksql-history"
    );

    if (!history) {

        return [];
    }

    return JSON.parse(history);
}
