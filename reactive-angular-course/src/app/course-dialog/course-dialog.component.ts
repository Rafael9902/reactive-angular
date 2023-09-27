import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {CoursesService} from "../services/courses.service";
import {LoadingService} from "../services/loading.service";
import {CoursesStoreService} from "../services/courses.store.service";

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {

    #coursesService = inject(CoursesService);

    #loadingService = inject(LoadingService);

    #courseStore = inject(CoursesStoreService);

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value;

      const saveCourse$ = this.#coursesService.saveCourse(this.course.id, changes)

        this.#loadingService.showLoaderUntilCompleted(saveCourse$).subscribe({
       next: (res) => this.dialogRef.close(res)
      })


    }

    close() {
        this.dialogRef.close();
    }

}
