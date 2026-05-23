import { create } from "zustand";

interface AppState {

    userQuery: string;

    sql: string;

    results: any[];

    loading: boolean;

    setUserQuery: (
        query: string
    ) => void;

    setSQL: (
        sql: string
    ) => void;

    setResults: (
        results: any[]
    ) => void;

    setLoading: (
        loading: boolean
    ) => void;
}

export const useStore = create<AppState>((set) => ({

    userQuery: "",

    sql: "",

    results: [],

    loading: false,

    setUserQuery: (query) =>
        set({
            userQuery: query
        }),

    setSQL: (sql) =>
        set({
            sql
        }),

    setResults: (results) =>
        set({
            results
        }),

    setLoading: (loading) =>
        set({
            loading
        })
}));
