import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class TalkService {

  talks: any;

  constructor(private http: Http) {
      this.talks = this.http.get('/assets/talks.json')
      .map((res: Response) => res.json() || {})
      .catch(this.handleError);

      this.talks = Observable.forkJoin(
        this.http.get('/assets/talks.json').map((res: Response) => res.json()),
        this.http.get('/assets/conferences.json').map((res: Response) => res.json())
      )
  }

  getAllTalks() {
    return this.talks;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
