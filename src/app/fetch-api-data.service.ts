import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://documentary-central.herokuapp.com/';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  /**
   * POST API call to register the user
   * @param userDetails
   * @returns user data in JSON
   * @function userRegistration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * POST API call to log in the user
  * @param {any} userCredentials
  * @returns user data in JSON
  * @function userLogin
  */

  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http
      .post(apiUrl + 'login', userCredentials)
      .pipe(catchError(this.handleError));
  }


  /**
   * GET API call to get all documentaries
   * @returns array of all documentaries in JSON
   * @function getAllDocumentaries
   */

  getAllDocumentaries(): Observable<any> {

    return this.http
      .get(apiUrl + 'documentaries', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
* GET API call to get data of a single documentary
* @param {any} title
* @returns documentary data in JSON
* @function getSingleDocumentary
*/

  getSingleDocumentary(title: any): Observable<any> {

    return this.http
      .get(apiUrl + `documentaries/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * GET API call to get data of a featured personality
 * @param {any} name
 * @returns data of featured personality in JSON
 * @function getFeaturedPersonality
 */

  getFeaturedPersonality(name: any): Observable<any> {

    return this.http
      .get(apiUrl + `documentaries/featuredPersonalities/${name}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * GET API call to get data of a genre
   * @returns data of genre in JSON
   * @function getGenre
   */

  getGenre(): Observable<any> {

    return this.http
      .get(apiUrl + 'genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
    * GET API call to get user data
    * @returns user data in JSON
    * @function getUser
    */
  getUser(): Observable<any> {

    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * PUT API call to add documentary to favorite documentaries of a user
   * @param {string} documentaryId
   * @returns user data in JSON
   * @function addFavoriteDocumentary
   */

  addFavoriteDocumentary(documentaryId: string): Observable<any> {

    return this.http
      .post(apiUrl + `users/${user}/documentaries/${documentaryId}`, { FavoriteDocumentary: documentaryId }, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
    * GET API call to get all favorite documentaries of a user
    * @returns user data in JSON
    * @function getFavoriteDocumentaries
    */

  getFavoriteDocumentaries(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${user}/documentaries`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * DELETE API call to remove documentary from favorite documentaries of a user
   * @param {string} documentaryId
   * @returns user data in JSON
   * @function removeFavoriteDocumentary
   */

  removeFavoriteDocumentary(documentaryId: string): Observable<any> {

    return this.http
      .delete(apiUrl + `users/${user}/documentaries/${documentaryId}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * PUT API call to update user data
   * @param {any} updateDetails
   * @returns user data in JSON
   * @function editUser
   */

  editUser(updateDetails: any): Observable<any> {

    return this.http
      .put(apiUrl + `users/${user}`, updateDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
 * DELETE API call to delete user
 * @returns message as confirmation
 * @function deleteUser
 */

  deleteUser(): Observable<any> {

    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
     * Handle error
     * @param error
     * @returns
     * @function handleError
     */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error(
      'Something bad happened; please try again later.'));
  }
}