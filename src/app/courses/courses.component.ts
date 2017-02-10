import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  skills: any;
  errorMessage: string;

  constructor(public cs: CourseService) { }

  ngOnInit() {
    this.cs.getAllCourses()
                     .subscribe(data => {this.skills = data}),
                      (error) => { this.errorMessage = <any>error };
  }

}
