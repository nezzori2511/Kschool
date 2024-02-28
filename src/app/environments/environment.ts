export const environment = {
    production: false,
    khachang: 'WEB Bình Dương (DEV)',
    khachhang_id: 101,
    pathdev: '',
      ApiEndpoint: {
      BASE: 'https://localhost:44358/api',
  
      // Authorization: Xác thực người dùng
      DangNhap: '/Authorization/DN',
      Testuser:'/Authorization/GetUser',
      GetRole:'/Authorization/GetRole',
      EditUser:'/Authorization/EditUser',
      //Login admin
      Login_admin:'/Authorization/Login_admin',
      //Khóa học
      Course:'/Authorization/Course_management',
      //lịch học
      Schedule:'/Authorization/Schedule_management',
      //Up video
      TestUp2:'/Authorization/TestUp2',
      // Portal: Tin tức
      AddToken:'/Authorization/AddToken',
      UpdateTK:'/Authorization/UpdateTk',
      DeleteTK:'/Authorization/DeleteTk',
      AddTK:'/Authorization/DKTK',
      GetRoleUser:'/Authorization/GetRoleUser',
      GetTKWithRole:'/Authorization/GetTKWithRole',
      //User client
      UserClient:'/Client/User_account',
      DN:'/Client/DN',
      //Course client
     
      
      Course_client:'/Client/Course_client',

       //Schedule client

       Schedule_client:'/Client/Schedule_client',

       //Schedule client

       Revenue_management:'/Authorization/Revenue_management',
      //Progress client
      Progress_user:'/Client/Progress_user',
       //Teacher managementTeacher_Management
       Teacher_management:'/Authorization/Teacher_Management',
      // FormDong: Form động

     
      FormDong: '/FormDong/FormDong',
      FormDongJson: '/FormDong/FormDongJson',
      FORM_DONG: '/FormDong/FormDong',
  
  
      //PGAPI: PostgreSQL Api
      AuthorizationGet: '/Authorization/AuthorizationGet',
  
 
  
    },
    envi_key: {
      accounts: 'FCAC',
      token: '_cloud',
      khachhang: '_cloudkhachhang',
      portal: '_cloudportal',
      url: '_cloudurl',
      config: '_cloudConfig',
    },
    THAOTACFORMDONG: {
      THEM: 1,
      SUA: 2,
      XOA: 3
    },
  
    DATE_FORMATS: {
      parse: {
        dateInput: 'DD/MM/YYYY'
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
      }
    },
  };
  