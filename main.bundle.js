webpackJsonp([0,3],{

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferenceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConferenceService = (function () {
    function ConferenceService(http) {
        this.http = http;
        this.conferences = this.http.get('/assets/conferences.json')
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleError);
    }
    ConferenceService.prototype.getAllConferences = function () {
        return this.conferences;
    };
    ConferenceService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ConferenceService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], ConferenceService);
    return ConferenceService;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/conference.service.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CourseService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CourseService = (function () {
    function CourseService(http) {
        this.http = http;
        this.courses = this.http.get('/assets/courses.json')
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleError);
    }
    CourseService.prototype.getAllCourses = function () {
        return this.courses;
    };
    CourseService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    CourseService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], CourseService);
    return CourseService;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/course.service.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TalkService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TalkService = (function () {
    function TalkService(http) {
        this.http = http;
        this.talks = this.http.get('/assets/talks.json')
            .map(function (res) { return res.json() || {}; })
            .catch(this.handleError);
        this.talks = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(this.http.get('/assets/talks.json').map(function (res) { return res.json(); }), this.http.get('/assets/conferences.json').map(function (res) { return res.json(); }));
    }
    TalkService.prototype.getAllTalks = function () {
        return this.talks;
    };
    TalkService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    TalkService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], TalkService);
    return TalkService;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/talk.service.js.map

/***/ }),

/***/ 423:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 423;


/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(559);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/main.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slideInDownAnimation; });

// Component transition animations
var slideInDownAnimation = 
// trigger('routeAnimation', [
//   state('*',
//     style({
//       opacity: 1,
//       transform: 'translateX(0)'
//     })
//   ),
//   transition(':enter', [
//     style({
//       opacity: 0,
//       transform: 'translateX(-100%)'
//     }),
//     animate('0.2s ease-in')
//   ]),
//   transition(':leave', [
//     animate('0.5s ease-out', style({
//       opacity: 0,
//       transform: 'translateY(100%)'
//     }))
//   ])
// ]);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["trigger"])('routeAnimation', [
    // state('void', 
    //   style({
    //     position:'fixed',
    //     width:'100%',
    //     height:'100%'
    //   })
    // ),
    // state('*',
    //   style({
    //     position:'fixed',
    //     width:'100%',
    //     height:'100%'
    //   })
    // ),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])(':enter', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
            transform: 'translateY(100%)'
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('0.5s ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({ transform: 'translateY(0%)'
        }))
    ]),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["transition"])(':leave', [
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
            transform: 'translateY(0%)'
        }),
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["animate"])('0.5s ease-in-out', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["style"])({
            transform: 'translateY(-100%)'
        }))
    ])
]);
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/animations.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(728),
            styles: [__webpack_require__(724)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/app.component.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__conferences_conferences_component__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__conferences_conference_service__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__talks_talk_service__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__courses_course_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_flex_layout__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__talks_talks_component__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__courses_courses_component__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__date_range_pipe__ = __webpack_require__(562);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var appRoutes = [
    { path: 'conferences', component: __WEBPACK_IMPORTED_MODULE_7__conferences_conferences_component__["a" /* ConferencesComponent */] },
    { path: 'talks', component: __WEBPACK_IMPORTED_MODULE_12__talks_talks_component__["a" /* TalksComponent */] },
    { path: 'courses', component: __WEBPACK_IMPORTED_MODULE_13__courses_courses_component__["a" /* CoursesComponent */] },
    { path: '',
        redirectTo: '/conferences',
        pathMatch: 'full'
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_7__conferences_conferences_component__["a" /* ConferencesComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__conferences_conferences_component__["a" /* ConferencesComponent */],
                __WEBPACK_IMPORTED_MODULE_12__talks_talks_component__["a" /* TalksComponent */],
                __WEBPACK_IMPORTED_MODULE_13__courses_courses_component__["a" /* CoursesComponent */],
                __WEBPACK_IMPORTED_MODULE_14__date_range_pipe__["a" /* DateRangePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_11__angular_flex_layout__["FlexLayoutModule"],
                __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDaR4phIYlbFb8EiIm6LKo_KeqBTVyfdZo'
                })
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_8__conferences_conference_service__["a" /* ConferenceService */], __WEBPACK_IMPORTED_MODULE_9__talks_talk_service__["a" /* TalkService */], __WEBPACK_IMPORTED_MODULE_10__courses_course_service__["a" /* CourseService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/app.module.js.map

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__conference_service__ = __webpack_require__(361);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConferencesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConferencesComponent = (function () {
    function ConferencesComponent(cs) {
        this.cs = cs;
        console.log("Conference component constructor");
    }
    ConferencesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cs.getAllConferences()
            .subscribe(function (conferences) {
            _this.futureConferences = conferences.filter(function (c) {
                return new Date(c.date).getTime() >= new Date().getTime();
            });
            _this.pastConferences = conferences.filter(function (c) {
                return new Date(c.date).getTime() < new Date().getTime();
            });
        }),
            function (error) { _this.errorMessage = error; };
    };
    ConferencesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-conferences',
            template: __webpack_require__(729),
            styles: [__webpack_require__(725)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__conference_service__["a" /* ConferenceService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__conference_service__["a" /* ConferenceService */]) === 'function' && _a) || Object])
    ], ConferencesComponent);
    return ConferencesComponent;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/conferences.component.js.map

/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__course_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__animations__ = __webpack_require__(557);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoursesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CoursesComponent = (function () {
    function CoursesComponent(cs) {
        this.cs = cs;
        this.routeAnimation = true;
    }
    CoursesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cs.getAllCourses()
            .subscribe(function (data) { _this.skills = data; }),
            function (error) { _this.errorMessage = error; };
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('@routeAnimation'), 
        __metadata('design:type', Object)
    ], CoursesComponent.prototype, "routeAnimation", void 0);
    CoursesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-courses',
            template: __webpack_require__(730),
            styles: [__webpack_require__(726)],
            animations: [__WEBPACK_IMPORTED_MODULE_2__animations__["a" /* slideInDownAnimation */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__course_service__["a" /* CourseService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__course_service__["a" /* CourseService */]) === 'function' && _a) || Object])
    ], CoursesComponent);
    return CoursesComponent;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/courses.component.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateRangePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DateRangePipe = (function () {
    function DateRangePipe() {
    }
    DateRangePipe.prototype.transform = function (value, args) {
        // filter items array, items which match and return true will be kept, false will be filtered out
        var filter = args;
        return value;
        // return value.filter(item => item.title.indexOf(args[0].title) !== -1);
    };
    DateRangePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'dateRange'
        }), 
        __metadata('design:paramtypes', [])
    ], DateRangePipe);
    return DateRangePipe;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/date-range.pipe.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__talk_service__ = __webpack_require__(363);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TalksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TalksComponent = (function () {
    function TalksComponent(ts) {
        this.ts = ts;
    }
    TalksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ts.getAllTalks()
            .subscribe(function (data) {
            _this.talks = Array.from(data[0]);
            var conferences = Array.from(data[1]);
            _this.talks.forEach(function (talk) {
                talk.events = [];
                talk.events_ids.forEach(function (eventId) {
                    talk.events.push(conferences.find(function (conf) { return conf.id == eventId; }));
                });
            });
        }, function (error) { _this.errorMessage = error; });
    };
    TalksComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-talks',
            template: __webpack_require__(731),
            styles: [__webpack_require__(727)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__talk_service__["a" /* TalkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__talk_service__["a" /* TalkService */]) === 'function' && _a) || Object])
    ], TalksComponent);
    return TalksComponent;
    var _a;
}());
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/talks.component.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: true
};
//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/environment.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/olivier/Downloads/tagazok.github.io/src/polyfills.js.map

/***/ }),

/***/ 724:
/***/ (function(module, exports) {

module.exports = ".header img {\n  border: 0;\n  max-width: 100%;\n  border-radius: 50%;\n  max-height: 120px; }\n\n.header .infos {\n  padding: 0 0 0 24px;\n  width: 100%;\n  line-height: 1.5em;\n  letter-spacing: .03em; }\n\n.nav {\n  /*background-color: #FC6B0A;\n  border-top: solid 1px #FC580C;*/\n  background-color: #1c262f; }\n\n.nav a {\n  color: #fff;\n  text-decoration: none;\n  text-transform: uppercase;\n  letter-spacing: 3px;\n  font-size: 13px;\n  padding: 24px 0; }\n  .nav a.active {\n    color: #039dc7; }\n\n.header {\n  padding: 48px 0;\n  width: 100%;\n  /*background-color: #F8872E;*/\n  background-color: #2e3d49;\n  color: #fff; }\n\n.header img {\n  border: 0;\n  max-width: 100%;\n  border-radius: 50%;\n  max-height: 120px; }\n\n.header .infos {\n  padding: 0 0 0 24px;\n  width: 100%;\n  line-height: 1.5em;\n  letter-spacing: .03em; }\n\n.header .tagline {\n  margin-bottom: .4em; }\n\n@media screen and (max-width: 600px) {\n  .nav a {\n    padding: 16px 0; } }\n\n.nav ul {\n  list-style: none; }\n\nmain.content {\n  padding: 65px 0; }\n"

/***/ }),

/***/ 725:
/***/ (function(module, exports) {

module.exports = ".card {\n  padding-top: 0px; }\n\n.title {\n  text-align: center;\n  color: #7d97ad;\n  margin-top: 0px;\n  padding: 40px 0; }\n\n.description {\n  line-height: 1.5em;\n  margin-bottom: 24px; }\n\n.conferences .conference {\n  display: block;\n  padding: 20px 0;\n  border-bottom: 1px solid #e5e5e5; }\n  .conferences .conference .host {\n    text-decoration: none;\n    color: #6f7679; }\n  .conferences .conference .infos {\n    color: #6f7679;\n    font-size: 12px;\n    font-weight: normal;\n    margin: 5px 0 0; }\n  .conferences .conference .roles {\n    list-style: none;\n    display: inline-block; }\n    .conferences .conference .roles .role {\n      display: inline-block;\n      font-size: 14px; }\n      .conferences .conference .roles .role.speaker, .conferences .conference .roles .role.jury {\n        color: #039dc7; }\n      .conferences .conference .roles .role.organizer {\n        color: #02ccba; }\n"

/***/ }),

/***/ 726:
/***/ (function(module, exports) {

module.exports = ".card {\n  padding-top: 0px; }\n\n.title {\n  text-align: center;\n  color: #7d97ad;\n  margin-top: 0px;\n  padding: 40px 0; }\n\n.description {\n  line-height: 1.5em;\n  margin-bottom: 24px; }\n\n.domain {\n  padding: 20px 0;\n  border-bottom: 1px solid #e5e5e5; }\n  .domain .domain-title {\n    color: #7d97ad;\n    font-weight: 600;\n    text-transform: uppercase;\n    margin-bottom: 17px;\n    letter-spacing: .1em; }\n\n.university-header {\n  margin-bottom: 17px; }\n  .university-header .university-title {\n    font-size: 1.2em;\n    color: #2e3d49;\n    font-weight: 600;\n    letter-spacing: .1em; }\n  .university-header .university .university-name {\n    color: #8a8a8a; }\n  .university-header .university img {\n    width: 50px;\n    height: auto;\n    padding-left: 10px; }\n\n.courses-list .course-title {\n  font-weight: 300;\n  margin-bottom: 17px;\n  letter-spacing: .1em;\n  text-transform: uppercase;\n  color: #444;\n  text-align: center; }\n\n.courses-list .course-description {\n  color: #666;\n  margin: 10px 0;\n  text-align: justify;\n  font-size: .9em; }\n\n.flex-card {\n  padding: 14px; }\n  .flex-card i {\n    color: #62C370;\n    margin-bottom: 25px; }\n  .flex-card .red {\n    color: #c3626e !important; }\n  .flex-card img {\n    height: 70px;\n    width: auto;\n    margin-bottom: 25px; }\n  .flex-card .link a {\n    color: #428bca;\n    text-decoration: none; }\n"

/***/ }),

/***/ 727:
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.card {\n  padding-top: 0px; }\n\n.title {\n  text-align: center;\n  color: #7d97ad;\n  margin-top: 0px;\n  padding: 40px 0; }\n\n@media screen and (max-width: 600px) {\n  .card {\n    padding: 0;\n    border: none;\n    box-shadow: none;\n    background-color: transparent; }\n    .card .title {\n      padding-top: 0px; }\n  .talks .talk {\n    box-shadow: 0 0 15px 0 rgba(46, 61, 73, 0.15);\n    background: #fff;\n    border: 1px 0px 1px 0px solid #dbe2e8;\n    padding-bottom: 0px !important;\n    margin-bottom: 40px; }\n    .talks .talk .talk-content {\n      padding: 0 24px; } }\n\n.talks .talk {\n  display: block;\n  padding: 20px 0;\n  border-bottom: 1px solid #e5e5e5; }\n  .talks .talk .talk-title {\n    color: #7d97ad;\n    font-weight: 600;\n    text-transform: uppercase;\n    margin-bottom: 17px;\n    letter-spacing: .1em; }\n  .talks .talk .tags {\n    color: grey;\n    font-size: .8em;\n    margin-bottom: 10px; }\n  .talks .talk .description {\n    color: #666;\n    font-size: .9em;\n    text-align: justify; }\n    .talks .talk .description > p:not(:last-child) {\n      margin-bottom: 1em; }\n  .talks .talk .links {\n    margin-bottom: 10px; }\n    .talks .talk .links .link {\n      font-size: .8em; }\n      .talks .talk .links .link:after {\n        content: ' • '; }\n      .talks .talk .links .link:last-of-type:after {\n        content: ''; }\n      .talks .talk .links .link a {\n        text-decoration: none;\n        color: #8a8a8a; }\n  .talks .talk hr {\n    width: 100%;\n    height: 0px;\n    border: 0;\n    border-top: 1px solid #ece9e9;\n    margin: 1em 0;\n    padding: 0; }\n  .talks .talk .details {\n    color: #666;\n    font-size: .8em; }\n  .talks .talk sebm-google-map {\n    width: 140px;\n    height: 140px;\n    margin-right: 64px; }\n  @media screen and (max-width: 600px) {\n    .talks .talk sebm-google-map {\n      width: 100% !important;\n      height: 200px !important;\n      margin-top: 20px; } }\n"

/***/ }),

/***/ 728:
/***/ (function(module, exports) {

module.exports = "<header class=\"header flex-container\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n  <div class=\"section-800\" fxLayout=\"row\">\n    <img src=\"/assets/images/avatar.jpg\" />\n    <div fxFlex class=\"infos\" fxLayout=\"column\" fxLayoutAlign=\"center start\" fxHide.xs>\n      <div class=\"tagline\">\n        Hi! I'm Olivier, and I am looking forward to see what is going to amaze me today.\n      </div>\n      <div>\n        <a href=\"https://twitter.com/olivierleplus\" class=\"twitter-follow-button\" data-lang=\"en\" data-show-count=\"false\"></a>\n      </div>\n    </div>\n  </div>\n</header>\n<nav class=\"nav\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n  <div class=\"section\" fxLayout=\"row\" fxFlex fxLayoutAlign=\"space-around center\" fxLayout.xs=\"column\">\n    <a href=\"#\">About</a>\n    <a routerLink=\"/conferences\" routerLinkActive=\"active\">Conferences</a>\n    <a routerLink=\"/talks\" routerLinkActive=\"active\">Talks</a>\n    <a routerLink=\"/courses\" routerLinkActive=\"active\">Courses</a>\n  </div>\n</nav>\n<main class=\"content\">\n  <div class=\"flex-container\" fxLayout=\"column\" fxLayoutAlign=\"center center\">\n    <div class=\"section\" fxFlex>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</main>"

/***/ }),

/***/ 729:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h1 class=\"title\">Conferences</h1>\n  <div class=\"description\">\n    <p>As one of the GDG Paris lead, I take part in the organization of monthly meetups as well as bigger events.<br />\n      I also regularly speak at conferences in Europe. If you’d like me to join yours, please contact me and we can discuss further.</p>\n\n    <!--<p>Please note: I prefer to speak at Angular-specific conferences. Thank you :)</p>-->\n  </div>\n  <div class=\"photos\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutWrap=\"wrap\">\n    <img fxFlex=\"25\" src=\"/assets/photos/conf6-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf1-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf3-2-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf4-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf5-2-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf2-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf7-square.jpg\" />\n    <img fxFlex=\"25\" src=\"/assets/photos/conf8-square.jpg\" />\n  </div>\n  <div  *ngIf=\"futureConferences?.length > 0\">\n    <h1 class=\"title\">Future events</h1>\n    <ul class=\"conferences\">\n      <li *ngFor=\"let conference of futureConferences\" class=\"conference\">\n        <div>\n          <ul class=\"roles\">\n            <li *ngFor=\"let role of conference.roles\" class=\"role\" [ngClass]=\"role\">[{{role}}]</li>\n          </ul>\n          <a [href]=\"conference.link\" class=\"host\" target=\"_blank\">{{conference.name}}</a>\n          <span class=\"talk\" *ngIf=\"conference.talk\"> • {{conference.talk.title}}</span>\n        </div>\n        <div class=\"infos\">\n          <span class=\"location\">{{conference.location.name}}</span>\n          •\n          <span class=\"date\">{{conference.date}}</span>\n        </div>\n      </li>\n    </ul>\n  </div>\n  <h1 class=\"title\">Past events</h1>\n  <ul class=\"conferences\">\n    <li *ngFor=\"let conference of pastConferences\" class=\"conference\">\n      <div>\n        <ul class=\"roles\">\n          <li *ngFor=\"let role of conference.roles\" class=\"role\" [ngClass]=\"role\">[{{role}}]</li>\n        </ul>\n        <a [href]=\"conference.link\" class=\"host\" target=\"_blank\">{{conference.name}}</a>\n        <span class=\"talk\" *ngIf=\"conference.talk\"> • {{conference.talk.title}}</span>\n      </div>\n      <div class=\"infos\">\n        <span class=\"location\">{{conference.location.name}}</span>\n        •\n        <span class=\"date\">{{conference.date}}</span>\n      </div>\n    </li>\n  </ul>\n</div>"

/***/ }),

/***/ 730:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h1 class=\"title\">Lifelong learning</h1>\n  <div class=\"description\">\n    <p>I graduated from college years ago with good technical skills. However, I believe there is so much more to learn. Nowadays, MOOC platforms such as edX exist and allow us to learn absolutely everything.</p> \n    <p>Since I discovered Udacity and especialy edX, I spend hours discovering new domains, even if they are not related to my line of work</p>\n  </div>\n  <div>\n  <div>\n    <div *ngFor=\"let domain of skills\" class=\"domain\">\n      <div class=\"domain-title\">\n        {{domain.title}}\n      </div>\n      <div *ngFor=\"let university of domain.universities\">\n        <div class=\"university-header\" fxLayout=\"row\" fxLayoutAlign=\"space-between center\">\n          <div class=\"university-title\">\n            {{university.skills[0].title}}\n          </div>\n          <div class=\"university\" fxLayout=\"row\" fxLayoutAlign=\"center center\">\n            <div class=\"university-name\">\n              {{university.name}}\n            </div>\n            <div class=\"image\">\n              <img class=\"logo\" [src]=\"university.icon_url\" />\n            </div>\n          </div>\n        </div>\n        <div *ngFor=\"let skill of university.skills\">\n          <div class=\"courses-list\" fxLayout=\"row\" fxLayoutAlign=\"space-around start\" fxLayoutWrap=\"wrap\">\n            <div *ngFor=\"let course of skill.courses\" class=\"flex-card\" fxLayout=\"column\" fxLayoutAlign=\"start center\" fxFlex=\"50\" fxFlex.xs=\"100\">\n              <img *ngIf=\"course.icon_url\" [src]=\"course.icon_url\" />\n              <i *ngIf=\"course.icon\" class=\"{{course.icon}} fa-3x\" aria-hidden=\"true\" ></i>\n              <div class=\"course-title\">\n                {{course.title}}\n              </div>\n              <div class=\"course-description\">\n                {{course.description}}\n              </div>\n              <div class=\"course-links\">\n                <div *ngFor=\"let link of course.links\" class=\"link\">\n                  <a [href]=\"link.link\">{{link.title}}</a> \n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!--<div *ngFor=\"let domain of skills\" class=\"card\">\n  <div class=\"title\">\n    {{domain.title}}\n  </div>\n\n  <div *ngFor=\"let university of domain.universities\">\n    <div class=\"header\">\n      <div class=\"title\">\n        {{university.skills[0].title}}\n      </div>\n      <div class=\"university\">\n        <div class=\"name\">\n          {{university.name}}\n        </div>\n        <div class=\"image\">\n          <img class=\"logo\" [src]=\"university.icon_url\" />\n        </div>\n      </div>\n    </div>\n    <div *ngFor=\"let skill of university.skills\">\n      <div class=\"courses-list\">\n        <div *ngFor=\"let course of skill.courses\" class=\"flex-card\">\n          <img *ngIf=\"course.icon_url\" [src]=\"course.icon_url\" />\n          <i *ngIf=\"course.icon\" class=\"{{course.icon}} fa-3x\" aria-hidden=\"true\" ></i>\n          <div class=\"title\">\n            {{course.title}}\n          </div>\n          <div class=\"description\">\n            {{course.description}}\n          </div>\n          <div class=\"links\">\n            <div *ngFor=\"let link of course.links\" class=\"link\">\n              <a [href]=\"link.link\">{{link.title}}</a> \n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>-->"

/***/ }),

/***/ 731:
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h1 class=\"title\">Talks</h1>\n  <div class=\"talks\">\n    <div *ngFor=\"let talk of talks\" class=\"talk\" fxLayout=\"row\" fxLayout.xs=\"column\">\n      <!--<div class=\"map\">-->\n        <sebm-google-map\n          fxFlexOrder=1\n          fxFlexOrder.xs=2\n          [latitude]=\"talk.map.lat\"\n          [longitude]=\"talk.map.lng\" \n          [zoom]=\"talk.map.zoom\"\n          [zoomControl]=\"false\"\n          [streetViewControl]=\"false\"\n          [scrollwheel]=\"false\">\n          <sebm-google-map-marker *ngFor=\"let event of talk.events\"\n          [latitude]=\"event.location.lat\"\n          [longitude]=\"event.location.lng\">\n          </sebm-google-map-marker>\n        </sebm-google-map>\n      <!--</div>-->\n      <div fxFlex fxFlexOrder=2 fxFlexOrder.xs=1 class=\"talk-content\">\n        <div class=\"talk-title\">{{talk.title}}</div>\n        <div class=\"tags\" fxLayout=\"row\" fxLayoutAlign=\"end center\">\n          <span *ngFor=\"let tag of talk.tags\">&nbsp;#{{tag}}</span>\n          </div>\n        <div class=\"description\" [innerHTML]=\"talk.description\"></div>\n        <ul class=\"links\" fxLayout=\"row\" fxLayoutAlign=\"end center\">\n          <li class=\"link\" *ngFor=\"let link of talk.links\">\n            <a [href]=\"link.link\" target=\"_blank\" rel=\"noreferrer\">&nbsp;{{link.title}}&nbsp;</a>\n          </li>\n        </ul>\n        <hr fxHide.gt-xs />\n        <div *ngFor=\"let event of talk.events\" class=\"details\">\n          - {{event.name}} ({{event.location.name}}) - {{event.date}}\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(424);


/***/ })

},[751]);
//# sourceMappingURL=main.bundle.map