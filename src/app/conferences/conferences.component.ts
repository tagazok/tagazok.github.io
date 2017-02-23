import { Component, OnInit } from '@angular/core';
import { ConferenceService } from './conference.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  futureConferences: any;
  pastConferences: any;
  errorMessage: string;

  constructor(public cs: ConferenceService) { 
    console.log("Conference component constructor");
  }

  ngOnInit() {
    this.cs.getAllConferences()
                     .subscribe(conferences => {
                       this.futureConferences = conferences.filter(c => {
                        return new Date(c.date).getTime() >= new Date().getTime(); 
                       });
                       this.pastConferences = conferences.filter(c => {
                        return new Date(c.date).getTime() < new Date().getTime(); 
                       })
                      }),
                      (error) => { this.errorMessage = <any>error };
  }
}
