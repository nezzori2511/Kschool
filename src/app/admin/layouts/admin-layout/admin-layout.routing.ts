import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AccountComponent } from 'app/admin/account/account.component';
import { TesttreeComponent } from 'app/admin/testtree/testtree.component';
import { QuantriComponent } from 'app/admin/quantri/quantri.component';
import { CreateuserComponent } from 'app/admin/createuser/createuser.component';
import { CourseComponent } from 'app/admin/course/course.component';
import { AddCourseComponent } from 'app/admin/add-course/add-course.component';
import { EditCourseComponent } from 'app/admin/edit-course/edit-course.component';
import { ScheduleManagerComponent } from 'app/admin/schedule-manager/schedule-manager.component';
import { ViewScheduleComponent } from 'app/admin/view-schedule/view-schedule.component';
import { LoginadminComponent } from 'app/loginadmin/loginadmin.component';
import { LogoutComponent } from 'app/admin/logout/logout.component';
import { TeacherManagerComponent } from 'app/admin/teacher-manager/teacher-manager.component';
import { CostTeacherManagementComponent } from 'app/admin/cost-teacher-management/cost-teacher-management.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'account',        component: AccountComponent },
    { path: 'test',        component: TesttreeComponent },
    { path: 'quantri',        component: QuantriComponent },
    { path: 'createuser',        component: CreateuserComponent },
    { path: 'course',        component: CourseComponent },
    { path: 'addcourse',        component: AddCourseComponent },
    { path: 'editcourse',        component: EditCourseComponent },
    { path: 'schedule-manager',        component: ScheduleManagerComponent },
    { path: 'schedule-teacher',        component: ViewScheduleComponent },
    { path: 'logout',        component: LogoutComponent },
    { path: 'teacher-management',        component: TeacherManagerComponent },
    { path: 'tuition-management',        component: CostTeacherManagementComponent },
];
