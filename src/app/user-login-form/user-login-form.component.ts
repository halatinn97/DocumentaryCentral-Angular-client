import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {


  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
* Login user
* @function loginUser
*/

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData)
      .subscribe((response) => {
        this.dialogRef.close();
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', response.user.Username);
        this.router.navigate(['documentaries']);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      }, (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
  }
}
