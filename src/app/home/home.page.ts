import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { RepoData } from '../models/repository.model';
import { FetchedRepoData } from '../models/fetchedRepository.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  repositories: RepoData[];
  isLoading: boolean;

  constructor(private appService: ServiceService, private alertController: AlertController) {}


  ngOnInit() {
    this.repositories = this.appService.getRepositories();
  }

  async showAlert(header: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
    });

    await alert.present();
  }

  lookForRepository(lookedRepository: string) {
    this.appService.fetchRepository(lookedRepository)
      .subscribe(
        (data: FetchedRepoData) => {
          this.isLoading = true;

          const foundRepo = this.checkForRepeatedRepos(data.id);

          if (foundRepo.length > 0) {
            this.showAlert(
              `Repeated repository`,
              `You already added this repository, please try another one`,
              [`OK`]
            );
            return;
          }

          return this.repositories = [
            ...this.repositories,
            {
              name: data.name,
              id: data.id,
              owner: {
                login: data.owner.login,
                avatarUrl: data.owner.avatar_url,
              },
              stargazersCount: data.stargazers_count,
              updatedAt: data.updated_at,
              watchersCount: data.watchers_count,
            }
          ];
        },
        error => {
          if (error.status === 404) {
            this.showAlert(
              `Search error`,
              `Unable to find repository and/or user, please try again`,
              [`OK`]
            );
          }
        },
        () => this.isLoading = false,
      );
  }

  checkForRepeatedRepos(repoId: number) {
    const foundRepo = this.repositories.filter(repository => repoId === repository.id);
    return foundRepo;
  }

  deleteRepository(repoId: number) {
    const newReposList: RepoData[] = this.repositories.filter(repo => repo.id !== repoId);
    this.repositories = newReposList;
  }
}
