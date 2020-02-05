export interface FetchedRepoData {
 name: string;
 id: number;
 owner: {
   login: string,
   avatar_url: string,
 };
 stargazers_count: number;
 watchers_count: number;
 updated_at: string;
}
