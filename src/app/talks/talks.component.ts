import { Component, OnInit } from '@angular/core';
import { TalkService } from './talk.service';

@Component({
  selector: 'app-talks',
  templateUrl: './talks.component.html',
  styleUrls: ['./talks.component.scss']
})
export class TalksComponent implements OnInit {
  talks: any;
  errorMessage: string;

  constructor(public ts: TalkService) { }

  ngOnInit() {
    this.ts.getAllTalks()
    .subscribe(data => {
      this.talks = Array.from(data[0]);
      let conferences = Array.from(data[1]);
      
      this.talks.forEach(talk => {
        talk.events = [];
        talk.events_ids.forEach(eventId => {
          talk.events.push(conferences.find((conf: any) => conf.id == eventId));
        });
      });
    },
    error => { this.errorMessage = <any>error })
  }
}
