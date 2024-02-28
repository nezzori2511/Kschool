import { Component, OnInit } from '@angular/core';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import * as Chartist from 'chartist';
import { EMPTY, concatMap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartData : { name: string, value: number }[] = []
  data_order:any[]=[]
  data_cost:any[]=[];
  total_teacher:any;
  total_student:any;
  total_course:any;
  total_revenue:any;
  // Các cài đặt khác của biểu đồ
  public view: [number, number] = [1200, 400];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  public gradient = false;
  public showLegend = false;
  public showXAxis = true;
  public showYAxis = true;
  public xAxisLabel = 'Tháng ';
  public yAxisLabel = 'Doanh thu(VNĐ)';



  public single: any[];
  public colorSchemeexpense = {
    domain: ['#9b59b6', '#e74c3c', '#3498db']
  };
  public gradientexpense = true;
  public showLegendexpense = false;
  public showXAxisexpense = true;
  public showYAxisexpense = true;
  public xAxisLabelexpense = 'Tháng';
  public yAxisLabelexpense = 'Chi phí(VNĐ)';
  public showDataLabel = false;
  constructor(private apiservice:ApiServices) { }
  get_order_course()
  {
    
    const reqAddSchedule=
    {
      action_id:1,
      var1:'',
      var2:'',
      var3:"",
      var4:"",
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',

    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).subscribe(data=>
      
      {
        if(data.mathongbao==1)
        {
          this.data_order=data.dulieu.table1;
          this.barChartData = this.data_order.map(item => ({
            name: `T${item.month}`,
            value: item.total_revenue
          }));
        }
      })
  }
  get_infor()
  {
    const reqAddSchedule=
    {
      action_id:3,
      var1:'',
      var2:'',
      var3:"",
      var4:"",
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',

    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).pipe(concatMap(data=>
      
      {
        if(data.mathongbao==1)
        {
          this.total_course=data.dulieu.table1[0];
          const reqAddSchedule=
          {
            action_id:4,
            var1:'',
            var2:'',
            var3:"",
            var4:"",
            var5:'',
            var6:'',
            var7:'',
            var8:'',
            var9:'',
            var10:'',

          }
          return this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).pipe(concatMap(data=>
            {
              if(data.mathongbao==1)
              {
                this.total_student=data.dulieu.table1[0];

                const reqAddSchedule=
                {
                  action_id:5,
                  var1:'',
                  var2:'',
                  var3:"",
                  var4:"",
                  var5:'',
                  var6:'',
                  var7:'',
                  var8:'',
                  var9:'',
                  var10:'',

                }
                return this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).pipe(concatMap(data=>
                  {
                    if(data.mathongbao==1)
                    {
                      this.total_teacher=data.dulieu.table1[0];
                      const reqAddSchedule=
                      {
                        action_id:6,
                        var1:'',
                        var2:'',
                        var3:"",
                        var4:"",
                        var5:'',
                        var6:'',
                        var7:'',
                        var8:'',
                        var9:'',
                        var10:'',

                      }
                      return this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).pipe(concatMap(data=>
                        {
                          if(data.mathongbao==1)
                          {
                            this.total_revenue=data.dulieu.table1[0];
                          }
                            return EMPTY;
                        }))
                    }
                  }))
              }
            }))
        }

      })).subscribe(
      
      
     )
  }
  get_chi_phi()
  {
    
    const reqAddSchedule=
    {
      action_id:2,
      var1:'',
      var2:'',
      var3:"",
      var4:"",
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',

    }
    this.apiservice.callAPIJson(environment.ApiEndpoint.Revenue_management,reqAddSchedule).subscribe(data=>
      
      {
        if(data.mathongbao==1)
        {
          this.data_cost=data.dulieu.table1;
          this.single = this.data_cost.map(item => ({
            name: `T${item.month}`,
            value: item.total_cost
          }));
        }
      })
  }
  // startAnimationForLineChart(chart){
  //     let seq: any, delays: any, durations: any;
  //     seq = 0;
  //     delays = 80;
  //     durations = 500;

  //     chart.on('draw', function(data) {
  //       if(data.type === 'line' || data.type === 'area') {
  //         data.element.animate({
  //           d: {
  //             begin: 600,
  //             dur: 700,
  //             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //             to: data.path.clone().stringify(),
  //             easing: Chartist.Svg.Easing.easeOutQuint
  //           }
  //         });
  //       } else if(data.type === 'point') {
  //             seq++;
  //             data.element.animate({
  //               opacity: {
  //                 begin: seq * delays,
  //                 dur: durations,
  //                 from: 0,
  //                 to: 1,
  //                 easing: 'ease'
  //               }
  //             });
  //         }
  //     });

  //     seq = 0;
  // };
  // startAnimationForBarChart(chart){
  //     let seq2: any, delays2: any, durations2: any;

  //     seq2 = 0;
  //     delays2 = 80;
  //     durations2 = 500;
  //     chart.on('draw', function(data) {
  //       if(data.type === 'bar'){
  //           seq2++;
  //           data.element.animate({
  //             opacity: {
  //               begin: seq2 * delays2,
  //               dur: durations2,
  //               from: 0,
  //               to: 1,
  //               easing: 'ease'
  //             }
  //           });
  //       }
  //     });

  //     seq2 = 0;
  // };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
      
//       const dataDailySalesChart: any = {
//           labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7','T8','T9','T10','T11','T12'],
//           series: [
//               [10000, 17, 7, 17, 23, 18, 38, 22, 5, 8, 22, 14, 21]
//           ]
//       };

//      const optionsDailySalesChart: any = {
//           lineSmooth: Chartist.Interpolation.cardinal({
//               tension: 0
//           }),
//           low: 0,
//           high: 100000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
//           chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
//       }

//       var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

//       this.startAnimationForLineChart(dailySalesChart);


//       /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

//       const dataCompletedTasksChart: any = {
//           labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
//           series: [
//               [230, 750, 450, 300, 280, 240, 200, 190]
//           ]
//       };

//      const optionsCompletedTasksChart: any = {
//           lineSmooth: Chartist.Interpolation.cardinal({
//               tension: 0
//           }),
//           low: 0,
//           high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
//           chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
//       }

//       var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

//       // start animation for the Completed Tasks Chart - Line Chart
//       this.startAnimationForLineChart(completedTasksChart);



//       /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

//       var datawebsiteViewsChart = {
//         labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
//         series: [
//           [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

//         ]
//       };
//       var optionswebsiteViewsChart = {
//           axisX: {
//               showGrid: false
//           },
//           low: 0,
//           high: 1000,
//           chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
//       };
//       var responsiveOptions: any[] = [
//         ['screen and (max-width: 640px)', {
//           seriesBarDistance: 5,
//           axisX: {
//             labelInterpolationFnc: function (value) {
//               return value[0];
//             }
//           }
//         }]
//       ];
//       var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
//       this.startAnimationForBarChart(websiteViewsChart);

//       document.addEventListener("DOMContentLoaded", function() {
//   // Đảm bảo DOM đã được load hoàn toàn
//   var chart = new Chartist.Line('#completedTasksChart', {
//     labels: [1, 2, 3, 4],  // Các nhãn trục x
//     series: [[5, 2, 8, 3]]  // Dữ liệu biểu đồ
//   });

//   // Kiểm tra xem biểu đồ đã được khởi tạo thành công hay không
//   if (chart instanceof Chartist.Line) {
//     console.log('Biểu đồ đã được khởi tạo thành công!');
//   } else {
//     console.error('Không thể khởi tạo biểu đồ.');
//   }

//   // Bạn có thể thêm các kiểm tra khác tùy thuộc vào yêu cầu của bạn
// });
      //start animation for the Emails Subscription Chart
      // const dataFromDatabase = [
      //   { "month": 1, "total_revenue": 0 },
      //   { "month": 2, "total_revenue": 0 },
      //   { "month": 3, "total_revenue": 0 },
      //   { "month": 4, "total_revenue": 0 },
      //   { "month": 5, "total_revenue": 0 },
      //   { "month": 6, "total_revenue": 0 },
      //   { "month": 7, "total_revenue": 1515115 },
      //   { "month": 8, "total_revenue": 1515115 },
      //   { "month": 9, "total_revenue": 0 },
      //   { "month": 10, "total_revenue": 1515115 },
      //   { "month": 11, "total_revenue": 1515115 },
      //   { "month": 12, "total_revenue": 14141341 }
      // ];
  
      // Chuyển đổi dữ liệu từ danh sách để truyền vào biểu đồ
     this.get_order_course()
      this.get_chi_phi()
      this.get_infor();
  }

}
