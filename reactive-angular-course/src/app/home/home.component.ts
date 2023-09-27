import {Component, inject, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo, CoursesCategories} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {CoursesStoreService} from "../services/courses.store.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  #coursesStore: CoursesStoreService = inject(CoursesStoreService);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.beginnerCourses$ = this.#coursesStore.filterByCategory((CoursesCategories.BEGINNER));
    this.advancedCourses$ = this.#coursesStore.filterByCategory((CoursesCategories.ADVANCED));
  }
}
