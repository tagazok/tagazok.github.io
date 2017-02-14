import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { ConferenceService } from './conferences/conference.service';
import { TalkService } from './talks/talk.service';
import { CourseService } from './courses/course.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TalksComponent } from './talks/talks.component';
import { CoursesComponent } from './courses/courses.component';


const appRoutes: Routes = [
  { path: 'conferences', component: ConferencesComponent },
  { path: 'talks',      component: TalksComponent },
  { path: 'courses',      component: CoursesComponent },
  { path: '',
    redirectTo: '/conferences',
    pathMatch: 'full'
  },
  { path: '**', component: ConferencesComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ConferencesComponent,
    TalksComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaR4phIYlbFb8EiIm6LKo_KeqBTVyfdZo'
    })
  ],
  providers: [ConferenceService, TalkService, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
