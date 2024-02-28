import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { ComponentsModule } from './admin/components/components.module';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './admin/account/account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { HomeComponent } from './client/home/home.component';
import { TesttreeComponent } from './admin/testtree/testtree.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import { AdminLayoutModule } from './admin/layouts/admin-layout/admin-layout.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuantriComponent } from './admin/quantri/quantri.component';
import { CreateuserComponent } from './admin/createuser/createuser.component';
import { MatSortModule } from '@angular/material/sort';
import { CourseComponent } from './admin/course/course.component';
import {MatRadioModule} from '@angular/material/radio';
import { AddCourseComponent } from './admin/add-course/add-course.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProgressDialogComponent } from './admin/progress-dialog-component/progress-dialog-component.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditCourseComponent } from './admin/edit-course/edit-course.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import { AddEventDialogComponent } from './admin/add-event-dialog/add-event-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { SliderComponent } from './client/component/slider/slider.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './client/login/login.component';
import { CourseDetailComponent } from './client/course-detail/course-detail.component';
import { ProgressCourseComponent } from './client/progress-course/progress-course.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ScheduleManagerComponent } from './admin/schedule-manager/schedule-manager.component';
import { ViewScheduleComponent } from './admin/view-schedule/view-schedule.component';
import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { TeacherManagerComponent } from './admin/teacher-manager/teacher-manager.component';
import { ScheduleClientComponent } from './client/schedule-client/schedule-client.component';
import { MyCourseComponent } from './client/my-course/my-course.component';
import { SuccessComponent } from './client/success/success.component';
import { ErrorPayComponent } from './client/error-pay/error-pay.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CostTeacherManagementComponent } from './admin/cost-teacher-management/cost-teacher-management.component';
import { ToastrModule } from 'ngx-toastr';
import { TeacherInformationComponent } from './client/teacher-information/teacher-information.component';
import { CourseClientComponent } from './client/course-client/course-client.component';
@NgModule({
  imports: [

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  
    MatTreeModule,
    MatIconModule,
    //AdminLayoutModule,
    MatDividerModule,
    
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule,
   
    MatSortModule,
    MatRadioModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    FullCalendarModule ,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatSliderModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CanvasJSAngularChartsModule,
    NgxChartsModule,
    ToastrModule.forRoot(

    ),
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AccountComponent,
    ClientLayoutComponent,
    TesttreeComponent,
    QuantriComponent,
    CreateuserComponent,
    CourseComponent,
    AddCourseComponent,
    ProgressDialogComponent,
    EditCourseComponent,
    AddEventDialogComponent,
    SliderComponent,
    LoginComponent,
    CourseDetailComponent,
    ProgressCourseComponent,
    ScheduleManagerComponent,
    ViewScheduleComponent,
    LoginadminComponent,
    LogoutComponent,
    TeacherManagerComponent,
    ScheduleClientComponent,
    MyCourseComponent,
    SuccessComponent,
    ErrorPayComponent,
    CostTeacherManagementComponent,
    TeacherInformationComponent,
    CourseClientComponent,
  
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
