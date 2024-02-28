import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { el } from 'date-fns/locale';

@Component({
  selector: 'app-progress-course',
  templateUrl: './progress-course.component.html',
  styleUrls: ['./progress-course.component.scss']
})
export class ProgressCourseComponent implements OnInit {
  
  id: Number | null = null;
  course:any;
  listchapter:any[]=[];
  listLesson:any[]=[];
  type_lesson:any='video';
  video_select:any;
  video_lesson:any;
  exercise_lesson:any;
  progress:any;
  correct_answer:any;
  show_exercise:boolean=false;
  constructor(private route:ActivatedRoute,
    private apiservice:ApiServices,
    private sharefunshion:SharefunshionService) { }
    check_exercise()
    {
      this.show_exercise=true;
    }
    getCourse()
    {
      const reqCourse =
      {
        action_id: 2,
        var1: this.id,
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.course=data.dulieu.table1[0];
          }
        })
      
    }
    getChapter()
    {
      const reqCourse =
      {
        action_id: 3,
        var1: this.id,
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.listchapter=data.dulieu.table1;
           
            console.log(this.listchapter);
            
          }
        })
      
    }
    
    getLesson()
    {
      const reqCourse =
      {
        action_id: 5,
        var1: this.id,
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Course_client,reqCourse).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.listLesson=data.dulieu.table1;
           
            //console.log(this.listchapter);
          }
        })
      
    }
    getProgressUser()
    {
      const reqCourse =
      {
        action_id: 2,
        var1: localStorage.getItem('client_id'),
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
        
        {

          if(data.mathongbao==1)
          {
            this.progress=data.dulieu.table1[0];
            this.video_select="https://res.cloudinary.com/djcvwvfb7/video/upload/v1699822841/L%E1%BA%ADp_Tr%C3%ACnh_JavaScript_C%C6%A1_B%E1%BA%A3n___by_F8_and_3_more_pages_-_Personal_-_Microsoft_Edge_2023-11-10_19-46-43_l4mcg1.mp4";
          }
        })
    }
    SelectLesson(lesson:any)
    {
      const reqCourse =
      {
        action_id: 3,
        var1: lesson.lesson_id,
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
        { 
        
            this.type_lesson='video';
            console.log(data.mathongbao);
            this.video_select=data.dulieu.table1[0].link_video;
            console.log("video", this.video_select)
            this.show_exercise=false;
        
         
        })
    }
    SelectLessonExercise(lesson:any)
    {
      const reqCourse =
      {
        action_id: 4,
        var1: lesson.lesson_id,
        var2: '',
        var3:'',
        var4:'',
        var5: '',
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      }
      this.apiservice.callAPIJson(environment.ApiEndpoint.Progress_user,reqCourse).subscribe(data=>
        {
            this.type_lesson='quiz';
            this.exercise_lesson=data.dulieu.table1[0];
            this.correct_answer=this.exercise_lesson.correct_answer;
            this.show_exercise=false;
        })
    }
  ngOnInit(): void {
    if(localStorage.getItem("client_id")!=null)
    {
      this.route.params.subscribe(params => {
        this.id = params['id'];
      });
      console.log(this.type_lesson)
      this.getCourse();
      this.getChapter();
      this.getLesson();
      this.getProgressUser()
    }
  
    
  }

}
