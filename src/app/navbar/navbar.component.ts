import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
  * Navigate to documentaries
  * @function goToDocumentaries
  */

  goToDocumentaries(): void {
    this.router.navigate(['documentaries']);
  }

  /**
  * Navigate to ProfileViewComponent
  * @function goToProfile
  */

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
  * Clear localStorage and navigate to "/"
  * @function logOut
  */

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
