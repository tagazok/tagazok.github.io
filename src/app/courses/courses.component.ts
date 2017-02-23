import { Component, OnInit, HostBinding } from '@angular/core';
import { CourseService } from './course.service';
import { slideInDownAnimation } from '../animations';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  animations: [ slideInDownAnimation ]
  // host: {
  //   '[@routeAnimation]': 'true',
  // }
})
export class CoursesComponent implements OnInit {
  skills: any;
  errorMessage: string;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(public cs: CourseService) { }

  ngOnInit() {
    this.cs.getAllCourses()
                     .subscribe(data => {this.skills = data}),
                      (error) => { this.errorMessage = <any>error };
  }

}
