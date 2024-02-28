import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
 
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'account', title: 'Quản lý tài khoản',  icon:'manage_accounts', class: '' },
    { path: 'course', title: 'Quản lý khóa học ',  icon:'school', class: '' },
    // { path: 'test', title: 'test',  icon:'manage_accounts', class: '' },
    { path: 'schedule-manager', title: 'Quản lý lịch',  icon:'schedule', class: '' },
    { path: 'teacher-management', title: 'Quản giảng viên',  icon:'person', class: '' },
    { path: 'tuition-management', title: 'Quản lý học phí',  icon:'payments', class: '' },
    { path: 'logout', title: 'Đăng xuất',  icon:'logout', class: '' },
    // { path: 'quantri', title: 'quantri',  icon:'manage_accounts', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
export const ROUTESStaff: RouteInfo[] = [
 
  //{ path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
  //{ path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
  //{ path: 'account', title: 'Quản lý tài khoản',  icon:'manage_accounts', class: '' },
  { path: 'course', title: 'Quản lý khóa học ',  icon:'manage_accounts', class: '' },
  //{ path: 'test', title: 'test',  icon:'manage_accounts', class: '' },
  { path: 'schedule-manager', title: 'Quản lý lịch',  icon:'schedule', class: '' },
  { path: 'teacher-management', title: 'Quản giảng viên',  icon:'teacher', class: '' },
  { path: 'logout', title: 'Đăng xuất',  icon:'logout', class: '' },
  // { path: 'quantri', title: 'quantri',  icon:'manage_accounts', class: '' },
  // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
export const ROUTESTeacher: RouteInfo[] = [
 
  //{ path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  // { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
  //{ path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: 'typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: 'icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: 'maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
  //{ path: 'account', title: 'Quản lý tài khoản',  icon:'manage_accounts', class: '' },
  // { path: 'course', title: 'Quản lý khóa học ',  icon:'manage_accounts', class: '' },
  // //{ path: 'test', title: 'test',  icon:'manage_accounts', class: '' },
  // { path: 'schedule-manager', title: 'Quản lý lịch',  icon:'schedule', class: '' },
  // { path: 'teacher-management', title: 'Quản giảng viên',  icon:'teacher', class: '' },
  { path: 'schedule-teacher', title: 'Lịch dạy',  icon:'schedule', class: '' },
  { path: 'logout', title: 'Đăng xuất',  icon:'logout', class: '' },
  // { path: 'quantri', title: 'quantri',  icon:'manage_accounts', class: '' },
  // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('role_id')=='1')
    {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else if(localStorage.getItem('role_id')=='4')
    {
      this.menuItems = ROUTESStaff.filter(menuItem => menuItem);
    }
    else if(localStorage.getItem('role_id')=='3')
    {
      this.menuItems = ROUTESTeacher.filter(menuItem => menuItem);
    }
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
