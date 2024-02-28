import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { ProgressCourseComponent } from '../progress-course/progress-course.component';
import { ScheduleClientComponent } from '../schedule-client/schedule-client.component';
import { MyCourseComponent } from '../my-course/my-course.component';
import { SuccessComponent } from '../success/success.component';
import { ErrorPayComponent } from '../error-pay/error-pay.component';
import { TeacherInformationComponent } from '../teacher-information/teacher-information.component';
import { CourseClientComponent } from '../course-client/course-client.component';




export const ClientLayoutRoutes: Routes = [
    
    { path: 'home',      component: HomeComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'course-detail/:id', component: CourseDetailComponent },
    { path: 'progress-course/:id', component: ProgressCourseComponent },
    { path: 'schedule-client', component: ScheduleClientComponent },
    { path: 'my-course', component: MyCourseComponent },
    { path: 'success', component: SuccessComponent },
    { path: 'error', component: ErrorPayComponent },
    { path: 'teacher', component: TeacherInformationComponent },
    { path: 'course', component: CourseClientComponent },
];
