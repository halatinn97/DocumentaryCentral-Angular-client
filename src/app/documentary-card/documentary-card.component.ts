import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { FeaturedPersonalityViewComponent } from '../featured-personality-view/featured-personality-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-documentary-card',
  templateUrl: './documentary-card.component.html',
  styleUrls: ['./documentary-card.component.scss']
})
export class DocumentaryCardComponent implements OnInit {
  documentaries: any[] = [];
  favoriteDocumentaries: any[] = [];
  user: any = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDocumentaries();
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  getDocumentaries(): void {
    this.fetchApiData.getAllDocumentaries().subscribe((resp: any) => {
      this.documentaries = resp;
      console.log(this.documentaries);
      return this.documentaries;
    });
  }

  onToggleFavoriteDocumentary(id: string): any {
    if (this.isFav(id)) {
      this.fetchApiData.removeFavoriteDocumentary(id).subscribe((resp: any) => {
        this.snackBar.open('Removed from favorites!', 'OK', {
          duration: 2000,
        });
      });
      const index = this.favoriteDocumentaries.indexOf(id);
      return this.favoriteDocumentaries.splice(index, 1);
    } else {
      this.fetchApiData.addFavoriteDocumentary(id).subscribe((response: any) => {
        this.snackBar.open('Added to favorites!', 'OK', {
          duration: 2000,
        });
      });
    }
    return this.favoriteDocumentaries.push(id);
  }


  getFavoriteDocumentaries(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteDocumentaries = resp;
      console.log(this.favoriteDocumentaries);
      return this.favoriteDocumentaries;
    });
  }


  isFav(id: string): boolean {
    return this.favoriteDocumentaries.includes(id)
  }


  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }


  openFeaturedPersonalityDialog(name: string, biography: string, birthday: Date): void {
    this.dialog.open(FeaturedPersonalityViewComponent, {
      data: {
        Name: name,
        Biography: biography,
        Birthday: birthday
      },
      width: '500px'
    });

  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });

  }

  addToFavoriteDocumentaries(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteDocumentary(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFromFavoriteDocumentaries(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteDocumentary(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}
