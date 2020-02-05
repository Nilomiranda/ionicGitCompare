export interface RepoData {
 name: string;
 id: number;
 owner: {
   login: string,
   avatarUrl: string,
 };
 stargazersCount: number;
 watchersCount: number;
 updatedAt: string;
}
