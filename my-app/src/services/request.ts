import axios, { AxiosResponse } from "axios";

export interface Repository {
    id: number;
    html_url: string;
    forks: number;
    name: string;
    language: string;
    languages: string[];
    updated_at: string;
    visibility: string;
    license: { name: string } | null;
    homepage: string | null;
    description: string | null;
}

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const getHeaders = () => ({
    Authorization: `Bearer ${token}`,
});

async function fetchFromGitHub<T>(url: string): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axios.get(url, { headers: getHeaders() });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching data from ${url}: ${error.message}`);
        } else {
            console.error(`Error fetching data from ${url}: ${String(error)}`);
        }
        throw new Error(`Failed to fetch data from GitHub: ${error instanceof Error ? error.message : String(error)}`);
    }
}

async function fetchUserRepositories(): Promise<Repository[]> {
    const url = `https://api.github.com/users/MichellyNonatto/repos`;
    return await fetchFromGitHub<Repository[]>(url);
}

async function fetchRepositoryLanguages(repoName: string): Promise<string[]> {
    const url = `https://api.github.com/repos/MichellyNonatto/${repoName}/languages`;
    const data = await fetchFromGitHub<Record<string, number>>(url);
    return Object.keys(data);
}

export async function getGitHubData(): Promise<{ repositories: Repository[] }> {
    try {
        const repositories = await fetchUserRepositories();

        const updatedRepositories = await Promise.all(
            repositories.map(async (repo) => {
                const languages = await fetchRepositoryLanguages(repo.name);
                return { ...repo, languages };
            })
        );

        return { repositories: updatedRepositories };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching GitHub data: ${error.message}`);
        } else {
            console.error(`Error fetching GitHub data: ${String(error)}`);
        }
        throw new Error("Unable to fetch GitHub data.");
    }
}