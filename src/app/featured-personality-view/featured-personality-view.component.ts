import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-featured-personality-view',
  templateUrl: './featured-personality-view.component.html',
  styleUrls: ['./featured-personality-view.component.scss']
})
export class FeaturedPersonalityViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Biography: string,
      Birthday: Date,
    }
  ) { }

  ngOnInit(): void {
  }

}
