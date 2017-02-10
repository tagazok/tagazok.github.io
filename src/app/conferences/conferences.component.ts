import { Component, OnInit } from '@angular/core';
import { ConferenceService } from './conference.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  conferences: any;
  errorMessage: string;

  constructor(public cs: ConferenceService) { 
    console.log("Conference component constructor");
  }

  ngOnInit() {
    this.cs.getAllConferences()
                     .subscribe(conferences => {this.conferences = conferences}),
                      (error) => { this.errorMessage = <any>error };
  }
}
