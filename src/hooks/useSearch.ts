import { useState } from "react";
import { APP_URL } from "../lib/api";

export function useSearch(profileId?: string) {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const search = async (query: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${APP_URL}/api/search`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    profileId,
                    query,
                }),
            });

            if (!response.ok) {
                throw new Error("Search failed");
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return {
        search,
        results,
        loading,
    };
}
