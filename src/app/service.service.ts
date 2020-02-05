import { Injectable } from '@angular/core';
import { RepoData } from './models/repository.model';
import { FetchedRepoData } from './models/fetchedRepository.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private reposList: RepoData[] = [
    {
      name: 'react',
      id: 2000,
      owner: {
        login: 'facebook',
        avatarUrl: 'https://avatars3.githubusercontent.com/u/69631?v=4',
      },
      stargazersCount: 2,
      updatedAt: '300',
      watchersCount: 56,
    }
  ];

  private baseURL = 'https://api.github.com/repos/';

  constructor(private http: HttpClient) { }

  fetchRepository(url: string) {
    url = `${this.baseURL}${url}`;
    return this.http.get(url);
  }

  getRepositories() {
    return [...this.reposList];
  }
}
