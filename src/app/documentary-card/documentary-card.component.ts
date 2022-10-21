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
  /**
  * Get data of user
  * @return {array} data of user
  * @function getUser
  */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  /**
  * Get data of all documentaries using API and store locally
  * @return {array} data of all documentaries
  * @function getDocumentaries
  */
  getDocumentaries(): void {
    this.fetchApiData.getAllDocumentaries().subscribe((resp: any) => {
      this.documentaries = resp;
      console.log(this.documentaries);
      return this.documentaries;
    });
  }

  /**
* Check if documentary was favorited, if not, allow user to favorite it
* @param {string} id
* @returns {array} data of all documentaries with favorited or non-favorited tags
* @function onToggleFavoriteDocumentary
*/

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

  /**
  * Get data of all favorite documentaries 
  * @return {array} data of all favorite documentaries on user profile
  * @function getDocumentaries
  */

  getFavoriteDocumentaries(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteDocumentaries = resp;
      console.log(this.favoriteDocumentaries);
      return this.favoriteDocumentaries;
    });
  }

  /**
 * Check if documentary is included in favorite documentary list of user
 * @param {string} id
 * @returns {boolean}
 * @function isFav
 */

  isFav(id: string): boolean {
    return this.favoriteDocumentaries.includes(id)
  }

  /**
   * Opens dialog of GenreComponent
   * @param {string} name
   * @param {string} description
   * @function openGenreDialog
   */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }


  /**
* Opens dialog of FeaturedPersonalityViewComponent
* @param {string} name
* @param {string} biography
* @param {date} birth
* @function openFeaturedPersonalityDialog
*/

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

  /**
* Opens dialog of SynopsisViewComponent
* @param {string} synopsis
* @function openSynopsisDialog
*/

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });

  }

  /**
  * Add documentary to list of favorite documentaries
  * @param {string} id
  * @function addToFavoriteDocumentaries
  */

  addToFavoriteDocumentaries(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteDocumentary(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  /**
* Remove documentary to list of favorite documentaries
* @param {string} id
* @function removeFromFavoriteDocumentaries
*/

  removeFromFavoriteDocumentaries(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteDocumentary(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }
}
