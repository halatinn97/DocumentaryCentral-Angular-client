import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'


@Component({
  selector: 'app-documentary-card',
  templateUrl: './documentary-card.component.html',
  styleUrls: ['./documentary-card.component.scss']
})
export class DocumentaryCardComponent implements OnInit {
  documentaries: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getDocumentaries();
  }

  getDocumentaries(): void {
    this.fetchApiData.getAllDocumentaries().subscribe((resp: any) => {
      this.documentaries = resp;
      console.log(this.documentaries);
      return this.documentaries;
    });
  }

}
