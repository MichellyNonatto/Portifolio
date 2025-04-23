import { useEffect, useState } from "react";
import { getGitHubData } from "@/services/request";
import { Repository } from "@/services/request"; 

export function useGitHubAPI() {
    const [repositories, setRepositories] = useState<Repository[]>([]); 
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const { repositories } = await getGitHubData();
                setRepositories(repositories);
            } catch (error: unknown) {
                console.error("Error fetching GitHub data:", error);
                setError("Failed to fetch GitHub data.");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { repositories, error, loading };
}