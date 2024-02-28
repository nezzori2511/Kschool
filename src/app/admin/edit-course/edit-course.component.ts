import { DialogCloseOptions } from '@angular/cdk/dialog';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { an, dA, el } from '@fullcalendar/core/internal-common';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { DataService } from 'app/services/data.service';
import { DialogService } from 'app/services/dialog-service.service';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { response } from 'express';
import { data } from 'jquery';
import { env } from 'process';
import { EMPTY, empty, from, subscribeOn } from 'rxjs';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],

})
export class EditCourseComponent implements OnInit {
  chapteraddForm:FormGroup;
  courseForm: FormGroup;
  listchapter:any[]=[]
  listLesson:any[]=[];
  Listexercise:any[]=[];
  Listvideolesson:any[]=[];
  selectImage:File;
  link_image_course:any;
  addvideolessonForm:FormGroup;
  addexerciselessonForm:FormGroup;
  editchapterForm:FormGroup;
  editexerciselessonForm:FormGroup;
  editvideolessonForm:FormGroup;
  selectedEditChapter:any;
  selectedVideoLesson:any;
  id_chapter_addlesson:any;
  id_lesson_video:any;
  id_lesson:any
  link_video:any;
  total_time_video:any;
  duration_video_upload:any;
  constructor(private fb: FormBuilder,
    private dataService:DataService,
    private apiService:ApiServices,
    private dialogservice:DialogService,
    private sharefunshion:SharefunshionService,
    private dialog:MatDialog,
    ) {
      this.courseForm = this.fb.group({
        courseName: '',
        describe:'',
        price:'',
        image:'',
        course_id:''
        // correct_answer: '',
        
        
      });
      this.chapteraddForm = this.fb.group({
        chapter_name:'',
        course_id:'',
        // correct_answer: '',
       
        
      });
      this.editchapterForm = this.fb.group({
        chapter_name:'',

        
        chapter_id:'',
        // correct_answer: '',
       
        
      });
      this.addvideolessonForm = this.fb.group({
        lesson_name:'',
        //link_video:'',
        //chapter_id:''
        
      });
      this.editvideolessonForm = this.fb.group({
        // video_lesson_id:'',
        // link_video:'',
        lesson_name:'',
        
        
        
      });
      this.addexerciselessonForm = this.fb.group({
        question:'',
        answer_1:'',
        answer_2:'',
        answer_3:'',
        answer_4:'',
        correct_answer:'',
        //chapter_id:'',
        
        
      });
      this.editexerciselessonForm = this.fb.group({
        question:'',
        answer_1:'',
        answer_2:'',
        answer_3:'',
        answer_4:'',
        correct_answer:'',
        exercise_id:''
        
        
      });
   }
 
  // get leesons() {
  //   return this.courseForm.get('leesons') as FormArray;
  // }
 
 
  
  onSubmit()
  {
    
       if(this.selectImage!=null)
       {
          this.dialogservice.openProgressDialog();
          this.apiService.uploadImage(this.selectImage).pipe(concatMap(

          data=>
          {
            this.link_image_course=data.linkvideo;
            console.log("video sau khi chọn",this.link_image_course)
            if(data.mathongbao===1)
            {
              const reqCourse = {
                action_id: 12,
                var1: this.courseForm.get('course_id')?.value,
                var2: this.courseForm.get('courseName')?.value,
                var3: this.courseForm.get('describe')?.value,
                var4:this.courseForm.get('price')?.value,
                var5: this.link_image_course,
                var6: '',
                var7: '',
                var8: '',
                var9: '',
                var10: '',
              };
              return this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqCourse).pipe(
                concatMap(data=>
                  {
                    if(data.mathongbao===1)
                    {
                      this.dataService.data$.subscribe(data => {
    
                        this.getCourse(data);
                        
                        
                        
                      });
                      this.sharefunshion.showNotification('top', 'right', 2, 'Sửa khóa học thành công');
                    }
                    else
                    {
                      this.dialogservice.closeProgressDialog();
                      this.sharefunshion.showNotification('top', 'right', 4, 'lỗi');
                    }
                    return EMPTY;
                  }
      
              ))
            }
         
          }
         )).subscribe(
  
          response => {
            console.log("Hoàn thành", response);
          },
          error => {
            this.dialogservice.closeProgressDialog();
            console.error("Lỗi xảy ra:", error);
          },
          () => {
            this.dialogservice.closeProgressDialog();
            //console.log("Hoàn thành hàm subscribe");
          
            
            
          }
         )
       }
       else
       {
        this.dialogservice.openProgressDialog();
        const reqCourse = {
          action_id: 12,
          var1: this.courseForm.get('course_id')?.value,
          var2: this.courseForm.get('courseName')?.value,
          var3: this.courseForm.get('describe')?.value,
          var4:this.courseForm.get('price')?.value,
          var5: this.link_image_course,
          var6: '',
          var7: '',
          var8: '',
          var9: '',
          var10: '',
        };
        console.log("data ",reqCourse);
        this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqCourse).subscribe(data=>
          {
            console.log("mã thông báo",data.mathongbao)
            if(data.mathongbao===1)
            {
              this.dataService.data$.subscribe(data => {
    
                this.getCourse(data);
                
                
                
              });
              this.sharefunshion.showNotification('top', 'right', 2, 'Update khóa học thành công');
            
            }
            else
            {
              this.dialogservice.closeProgressDialog();
              this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi ');
            }
          })
          this.dialogservice.closeProgressDialog();
       }
      
       
    
    
   
  }
  onDeleteChapter(event: Event,chapter:any): void {
    const reqDeleteChapter = {
      action_id: 17,
      var1: chapter.chapter_id,
      var2: chapter.numerical_order,
      var3: chapter.course_id,
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    };
    console.log("data truyền vào delete",reqDeleteChapter)
    this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqDeleteChapter).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
          this.dataService.data$.subscribe(data => {
  
            this.getCourse(data);
            
            
            
          });
        }
        else{
          this.sharefunshion.showNotification('top', 'right', 4, 'thất bại');
        }
      })
    
    event.stopPropagation();
    
    // Your logic for deleting chapter
  }
  EditChapter(event:Event,chapter:any):void{
  
    this.selectedEditChapter = chapter;
    
    
    this.editchapterForm.patchValue({
      
      chapter_name:chapter.chapter_name,
      chapter_id:chapter.chapter_id,
     
      
    });
    
    event.stopPropagation();


  
  }
  editlessonvideo(listvideo:any)
  {
    console.log("list video",listvideo)
    this.editvideolessonForm.patchValue(
      {
        lesson_name:listvideo.lesson_name,
        // video_lesson_id:listvideo.video_lession_id,
        // link_video:listvideo.link_video,
      }
    )
    this.id_lesson_video=listvideo.video_lession_id;
    this.link_video=listvideo.link_video
    this.id_lesson=listvideo.lesson_id;

  }
  editlessonexercise(exercise:any)
  {
    this.editexerciselessonForm.patchValue(
      {
        question:exercise.question,
        answer_1:exercise.answer_1,
        answer_2:exercise.answer_2,
        answer_3:exercise.answer_3,
        answer_4:exercise.answer_4,
        correct_answer:exercise.correct_answer,
        exercise_id:exercise.exercise_id
      }
    )

    
  }
  AddExercise()
  {

  }
  OnAddExercise()
  {
    let answer;
    const selectedAnswer= this.addexerciselessonForm.get('correct_answer')?.value;
    console.log("selec",selectedAnswer);
    if(selectedAnswer=='1')
    {
       answer=this.addexerciselessonForm.get('answer_1')?.value;

    }
    else if(selectedAnswer=='2')
    {
      answer=this.addexerciselessonForm.get('answer_2')?.value;
    }
    else if(selectedAnswer=='3')
    {
      answer=this.addexerciselessonForm.get('answer_3')?.value;
    }
    else if(selectedAnswer=='4')
    {
      answer=this.addexerciselessonForm.get('answer_4')?.value;
    }
    console.log("câu 1",this.addexerciselessonForm.get('answer_1')?.value)
    console.log("câu 2",this.addexerciselessonForm.get('answer_2')?.value)
    console.log("câu 3",this.addexerciselessonForm.get('answer_3')?.value)
    console.log("câu 4",this.addexerciselessonForm.get('answer_4')?.value)
    console.log("đáp án",answer)
    const reqAddLessonExercise = {
      action_id: 15,
      var1: '',
      var2: '',
      var3: this.id_chapter_addlesson,
      var4:'quiz',
      var5: this.addexerciselessonForm.get('question')?.value,
      var6: this.addexerciselessonForm.get('answer_1')?.value,
      var7: this.addexerciselessonForm.get('answer_2')?.value,
      var8: this.addexerciselessonForm.get('answer_3')?.value,
      var9: this.addexerciselessonForm.get('answer_4')?.value,
      var10: answer,
    };
      console.log("object",reqAddLessonExercise)
      this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqAddLessonExercise).subscribe(data=>{
      if(data.mathongbao===1)
      {
        this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
      }
      else
      {
        this.sharefunshion.showNotification('top', 'right', 4, data.thongbao);
      }
      this.id_chapter_addlesson='';
      this.addexerciselessonForm.reset();
      this.cancelAddFormLesson();
      //this.cancelEditForm();
      this.dataService.data$.subscribe(data => {
  
        this.getCourse(data);
        
        
        
      });
    })
    
  }
  OnAddVideoLesson()
  {
    this.apiService.uploadVideoCloud(this.selectedVideoLesson).subscribe(data=>
      {
        console.log("thời lượng video và link video",this.duration_video_upload,data.secure_url)
        const reqAddVideoLesson = {
          action_id: 16,
          var1: this.addvideolessonForm.get('lesson_name')?.value,
          var2: '',
          var3: this.id_chapter_addlesson,
          var4:'video',
          var5: this.duration_video_upload.toFixed(0),
          var6: data.secure_url,
          var7: '',
          var8: '',
          var9: '',
          var10: '',
        };
        console.log("object addvideolesson",reqAddVideoLesson)
        this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqAddVideoLesson).subscribe(data=>
          {
            if(data.mathongbao==1)
            {
              this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
            }
            else
            {
              this.sharefunshion.showNotification('top', 'right', 4,"Lỗi upload video");
            }
            this.id_chapter_addlesson='';
            this.selectedVideoLesson=null;
            this.duration_video_upload=''
            //this.addexerciselessonForm.reset();
            this.cancelAddFormLesson();
            //this.cancelEditForm();
            this.dataService.data$.subscribe(data => {
        
              this.getCourse(data);
              
              
              
            });
          })
        
      })
  }
  onEditChapter():void
  {
    
    if (this.editchapterForm.valid) {
      // Get the updated values from the form
      const reqEditChapter = {
        
      
        action_id:14,
     
        var1: this.editchapterForm.get('chapter_name')?.value,
        var2: this.editchapterForm.get('chapter_id')?.value,
        var3: '',
        var4: '',
        var5:'',
        var6:'',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
       
      };
      // const reqEditChapter=
      // {
      //   "action_id": 14,
      //   "var1": this.editchapterForm.get('chapter_name')?.value,
      //   "var2": 177,
      //   "var3": "string",
      //   "var4": "string",
      //   "var5": "string",
      //   "var6": "string",
      //   "var7": "string",
      //   "var8": "string",
      //   "var9": "string",
      //   "var10": "string"
      // }
        
        console.log("object truyền vào",reqEditChapter)
      //   this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqEditChapter ).pipe(concatMap(data=>
      //   {
      //     if(data.mathongbao===1)
      //     {
      //       this.sharefunshion.showNotification('top','right',2,data.thongbao);
         
           
            
      //     }
      //     else
      //     {
      //       this.sharefunshion.showNotification('top','right',4,"Lỗi");
      //     }
      //     this.dataService.data$.subscribe(data => {
    
      //       this.getCourse(data);
            
            
            
      //       });
      //     this.cancelEditForm();
      //     this.dialog.closeAll();
          
      //     return EMPTY;
      //   })).subscribe(response => {
        
    
        
      // });
      this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqEditChapter).subscribe(data=>
        {
          if(data.mathongbao==1)
          {
            this.sharefunshion.showNotification('top','right',2,data.thongbao);
          }
          else
          {
            this.sharefunshion.showNotification('top','right',4,data.thongbao);
          }
          this.dataService.data$.subscribe(data => {
    
                  this.getCourse(data);
                  
                  
                  
                  });
                this.cancelEditForm();
                this.dialog.closeAll();
        })
    
    }
    
  }
  OnEditVideoLesson()
  {
    if(this.selectedVideoLesson!=null)
    {
      this.apiService.uploadVideoCloud(this.selectedVideoLesson).subscribe(data=>
        {
          const reqEditLessonVideo = {
            action_id: 18,
            var1: this.id_lesson_video,
            var2: this.duration_video_upload.toFixed(0),
            var3: data.secure_url,
            var4:this.id_lesson,
            var5: this.editvideolessonForm.get('lesson_name')?.value,
            var6: '',
            var7: '',
            var8: '',
            var9: '',
            var10: '',
          };
          console.log("req đưa vào",reqEditLessonVideo)
          this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqEditLessonVideo).subscribe(data=>
            {
              console.log("mat hong bao",data.mathongbao)
              if(data.mathongbao==1)
              {
                this.sharefunshion.showNotification('top', 'right', 2,data.thongbao);
             
               
                this.dataService.data$.subscribe(data => {
            
                  this.getCourse(data);
                  
                  
                  
                });
              }
              else
              {
                
                  this.sharefunshion.showNotification('top', 'right', 4,"Lỗi upload video");
              }
              this.cancelEditLessonForm();
              // this.editvideolessonForm.reset();
              this.id_lesson_video=null;
              this.id_lesson=null;
              this.duration_video_upload=null;
              this.selectedVideoLesson=null;
              this.link_video;
            })
        })

      
    }
    else{
      const reqEditLessonExercise = {
        action_id: 19,
        var1: this.id_lesson_video,
        var2: this.duration_video_upload.toFixed(0),
        var3:'',
        var4:this.id_lesson,
        var5: this.editvideolessonForm.get('lesson_name')?.value,
        var6: '',
        var7: '',
        var8: '',
        var9: '',
        var10: '',
      };
    }
  }
 OnEditExerciseLesson()
 {
    let answer;
    const selectedAnswer= this.editexerciselessonForm.get('correct_answer')?.value;
    console.log("selec",selectedAnswer);
    if(selectedAnswer=='1')
    {
      answer=this.editexerciselessonForm.get('answer_1')?.value;

    }
    else if(selectedAnswer=='2')
    {
      answer=this.editexerciselessonForm.get('answer_2')?.value;
    }
    else if(selectedAnswer=='3')
    {
      answer=this.editexerciselessonForm.get('answer_3')?.value;
    }
    else if(selectedAnswer=='4')
    {
      answer=this.editexerciselessonForm.get('answer_4')?.value;
    }

    const reqEditLessonExercise = {
      action_id: 19,
      var1:  this.editexerciselessonForm.get('exercise_id')?.value,
      var2:  this.editexerciselessonForm.get('question')?.value,
      var3: this.editexerciselessonForm.get('answer_1')?.value,
      var4:this.editexerciselessonForm.get('answer_2')?.value,
      var5: this.editexerciselessonForm.get('answer_3')?.value,
      var6: this.editexerciselessonForm.get('answer_4')?.value,
      var7: answer,
      var8: '',
      var9: '',
      var10: '',
    };
    this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqEditLessonExercise).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
          this.dataService.data$.subscribe(data => {
  
            this.getCourse(data);
            
            
            
          });
        }
        else

        {
          this.sharefunshion.showNotification('top', 'right', 4,data.thongbao);
        }
        this.cancelEditLessonForm();
      })
    
 }
 removeLesson(lesson:any)
 {
  const reqDeleteLesson = {
    action_id: 20,
    var1:  lesson.lesson_id,
    var2:  lesson.chapter_id,
    var3: lesson.stt_lesson,
    var4:'',
    var5: '',
    var6: '',
    var7: '',
    var8: '',
    var9: '',
    var10: '',
  };
  this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqDeleteLesson).subscribe(data=>
    {
      if(data.mathongbao==1)
      {
        this.sharefunshion.showNotification('top', 'right', 2,data.thongbao);
      }
      else
      {
        this.sharefunshion.showNotification('top', 'right', 4,data.thongbao);
      }
      this.dataService.data$.subscribe(data => {
  
        this.getCourse(data);
        
        
        
      });
    })
 }
  onAddLesson(event: Event,chapter:any): void {
    
    // this.addexerciselessonForm.patchValue({
      
      
    //   chapter_id:chapter.chapter_id,
     
      
    // });
    // this.addvideolessonForm.patchValue({
    //   chapter_id:chapter.chapter_id,
    // });
    this.id_chapter_addlesson=chapter.chapter_id;
    event.stopPropagation();

  }
  onVideoChange(event:Event)
  {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const selectedVideo = inputElement.files[0];
      this.selectedVideoLesson = selectedVideo;
  
     
      const videoElement = document.createElement('video');
      const file = inputElement.files[0];
      const objectURL = URL.createObjectURL(file);
      videoElement.src = objectURL;
      
      videoElement.onloadedmetadata = () => {
        this.duration_video_upload = videoElement.duration;
        console.log('Thời lượng video',this.duration_video_upload );
      }
      
      // Đặt nguồn video cho đối tượng video
      //videoElement.src = URL.createObjectURL(selectedVideo);
    }
    console.log('Video đã chọn:',this.selectedVideoLesson );
  }
  getCourse(id:any)
  { 
  
    const reqCourse = {
      action_id: 7,
      var1: id,
      var2: '',
      var3: '',
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    };
    this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqCourse ).pipe(
      concatMap(data=>{
        //console.log("link image",data.dulieu.table1[0].image);
        if(data.mathongbao===1)
        {
          this.link_image_course=data.dulieu.table1[0].image;
          console.log("image khi load",this.link_image_course)
          this.courseForm.patchValue({
            courseName: data.dulieu.table1[0].name,
            describe:data.dulieu.table1[0].describe,
            price:data.dulieu.table1[0].price,
            image:data.dulieu.table1[0].image,
            course_id:data.dulieu.table1[0].course_id,
          });
          console.log("course",this.courseForm);
          const reqChapter = {
            action_id: 8,
            var1: id,
            var2: '',
            var3: '',
            var4:'',
            var5: '',
            var6: '',
            var7: '',
            var8: '',
            var9: '',
            var10: '',
          };
          return this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqChapter).pipe(concatMap(data=>
            {
              if(data.mathongbao==1)
              {
                this.listchapter=data.dulieu.table1;
                console.log("data chapter",this.listchapter);
                const reqLesson = {
                  action_id: 9,
                  var1: id,
                  var2: '',
                  var3: '',
                  var4:'',
                  var5: '',
                  var6: '',
                  var7: '',
                  var8: '',
                  var9: '',
                  var10: '',
                };
                return this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqLesson).pipe(concatMap(data=>
                  {
                    if(data.mathongbao===1)
                    {
                      this.listLesson=data.dulieu.table1;
                      console.log("data lesson",this.listLesson);
                      const reqExercise = {
                        action_id: 10,
                        var1: id,
                        var2: '',
                        var3: '',
                        var4:'',
                        var5: '',
                        var6: '',
                        var7: '',
                        var8: '',
                        var9: '',
                        var10: '',
                      };
                      return this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqExercise).pipe(
                        concatMap(data=>
                          {
                            if(data.mathongbao===1)
                            {
                              this.Listexercise=data.dulieu.table1;
                              console.log("data exercise",this.Listexercise);
                              const reqVideolesson = {
                                action_id: 11,
                                var1: id,
                                var2: '',
                                var3: '',
                                var4:'',
                                var5: '',
                                var6: '',
                                var7: '',
                                var8: '',
                                var9: '',
                                var10: '',
                              };
                              return this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqVideolesson).pipe(
                                concatMap(data=>
                                  {
                                    if(data.mathongbao===1)
                                    {
                                      this.Listvideolesson=data.dulieu.table1;
                                      console.log("data imagelesson",this.Listvideolesson);
                                    }
                                    else
                                    {
                                      this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi chung');
                                    }
                                    return EMPTY;
                                  })
                              )
                            }
                            else
                            {
                              this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi chung');
                            }
                          })
                      )
                    }
                    else
                    {
                      this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi chung');
                    }
                 
                  }
                  ))
              }
              else
              {
                this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi chung');
              }
            }))
        
         
      
        }
        
      })
      )
    .subscribe(
      response => {
        console.log("Hoàn thành", response);
      },
      error => {
      
        console.error("Lỗi xảy ra:", error);
      },
      () => {
       
        
      }
    );
     
  }
  openDialog(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '420px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '260px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }


  openDialogAddLesson(dialogTemplate: TemplateRef<any>) {
    const dialogRef = this.dialog.open(dialogTemplate, {
      width: '500px', // Điều chỉnh kích thước dialog theo ý muốn
      height: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // Xử lý kết quả sau khi dialog đóng
      console.log('Dialog result:', result);
    });
  }

  OnImageChange(event: Event)
  {
    const inputElement = event.target as HTMLInputElement;
    
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        this.selectImage = inputElement.files[0];
      }
      console.log("ảnh",this.selectImage);
    }
  }
  onSubmitAddChapter()
  {
    const reqAddChapter = {
      action_id: 13,
      var1: '',
      var2: this.chapteraddForm.get('chapter_name')?.value,
      var3: this.courseForm.get('course_id')?.value,
      var4:'',
      var5: '',
      var6: '',
      var7: '',
      var8: '',
      var9: '',
      var10: '',
    };
    this.apiService.callAPIJson(environment.ApiEndpoint.Course,reqAddChapter).subscribe(data=>
      {
        if(data.mathongbao===1)
        {
          this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
        
        
        }
        else
        {
          this.sharefunshion.showNotification('top', 'right', 4, data.thongbao);
        }
        this.chapteraddForm.reset();
        this.dataService.data$.subscribe(data => {
    
          this.getCourse(data);
          
          
          
        });
      })
    
  }
  cancelEditForm(): void {
    //this.selectedTaiKhoan = null;
    this.dialog.closeAll();
    this.editchapterForm.reset();
  }
  cancelAddFormLesson(): void {
    //this.selectedTaiKhoan = null;
    this.dialog.closeAll();
    this.addexerciselessonForm.reset();
    this.addvideolessonForm.reset();
  }
  cancelEditLessonForm(): void {
    //this.selectedTaiKhoan = null;
    this.dialog.closeAll();
    this.editexerciselessonForm.reset();
    this.editvideolessonForm.reset();
  }
  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
    
      this.getCourse(data);
      
      
      
    });
  }

}
