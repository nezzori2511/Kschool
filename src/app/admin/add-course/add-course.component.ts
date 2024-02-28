import { HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { an } from '@fullcalendar/core/internal-common';
import { ApiServices } from 'app/api/index.service';
import { environment } from 'app/environments/environment';
import { DataService } from 'app/services/data.service';
import { DialogService } from 'app/services/dialog-service.service';
import { SharefunshionService } from 'app/services/sharefunshion.service';
import { error, log } from 'console';
import { format } from 'date-fns';
import { response } from 'express';
import { data } from 'jquery';

import { EMPTY, from } from 'rxjs';
import { concatMap, mergeMap,map } from 'rxjs/operators';
// import { CloudinaryService } from './cloudinary.service';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  id_video_lesson :number;
  id_video_chapter:number;
  duration_video_upload:number;
  selectedVideoLesson :any[]=[];
  selectedImageCourse :File;;
  id_course:any;
  selected:any;
  list_specialized:any[]=[];
  //videoDuration: number = 0;
  campaignOne: FormGroup;
  campaignTwo:FormGroup;
  constructor(private fb: FormBuilder,
    private apiservice: ApiServices,
    private dataservice:DataService,
    private sharefunshion:SharefunshionService,
    private dialogservice:DialogService,
    ) {
    
    this.courseForm = this.fb.group({
      courseName: '',
      describe:'',
      price:'',
      image:'',
      time_start_course:'',
      total_slot:'',
      //selected:'',
      // correct_answer: '',
      chapters: this.fb.array([])
    });
   }
   
   get chapters() {
    return this.courseForm.get('chapters') as FormArray;
  }
 
  
  addChapter() {
    this.chapters.push(this.fb.group({
      chapterName: '',
      
      lessons: this.fb.array([])
    }));
  }

  addLesson(chapter: FormGroup) {
    const lessons = chapter.get('lessons') as FormArray;
    lessons.push(this.fb.group({
      lessonType: 'video',
      video: '',
      lessonName: '',
      quiz: '',
      question: '',
      answer_1:'',
      answer_2:'',
      answer_3:'',
      answer_4:'',
      correct_answer: [''],
      videoFile: [null],
      
      // correct_answer: this.fb.control(''), // Tạo FormControl cho correct_answer
      // answer_1: this.fb.control(''), // Tạo FormControl cho answer_1
      // answer_2: this.fb.control(''), // Tạo FormControl cho answer_2
      // answer_3: this.fb.control(''), // Tạo FormControl cho answer_3
      // answer_4: this.fb.control(''), // Tạo FormControl cho answer_4
  
    }));
    // const lessonFormGroup = this.fb.group({
    //   lessonType: 'video',
    //   video: '', // Thêm một trường video vào FormGroup của bài học
    //   lessonName: '',
    //   quiz: '',
    //   question: '',
    //   answer_1: '',
    //   answer_2: '',
    //   answer_3: '',
    //   answer_4: '',
    // });
    // lessons.push(lessonFormGroup);
  }
  removeChapter(index: number) {
    this.chapters.removeAt(index);
  }
  removeLesson(chapterIndex: number, lessonIndex: number) {
    const lessons = this.chapters.at(chapterIndex).get('lessons') as FormArray;
    lessons.removeAt(lessonIndex);
  }
  
  onVideoChange(event: Event,lesson_index:number,chapter_index:number) {
    
  
  
    const inputElement = event.target as HTMLInputElement;
    console.log("Chương và bài ",lesson_index,chapter_index);
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        
        const videoElement = document.createElement('video');
        const file = inputElement.files[0];
        const objectURL = URL.createObjectURL(file);
        videoElement.src = objectURL;
        
        videoElement.onloadedmetadata = () => {
        this.duration_video_upload = videoElement.duration;
      
      
        this.id_video_lesson=lesson_index;
        this.id_video_chapter=chapter_index;
  
        const videoItem = {
          file: inputElement.files[i],
          id_video_lesson: this.id_video_lesson,
          id_video_chapter: this.id_video_chapter,
          duration_video_upload:this.duration_video_upload,
        };
        const existingItemIndex = this.selectedVideoLesson.findIndex(
          item => item.id_video_lesson === videoItem.id_video_lesson && item.id_video_chapter === videoItem.id_video_chapter
        );
 
      console.log("kiểm tra trùng",existingItemIndex)
      if (existingItemIndex !== -1) {
        console.log("Có file trùng");
        this.selectedVideoLesson.splice(existingItemIndex, 1); // Xóa đối tượng trùng lặp từ mảng
      }

      this.selectedVideoLesson.push(videoItem); // Thêm đối tượng mới vào mảng
    }
      console.log('Thời lượng video:', this.duration_video_upload , 'giây');
    }

  
      console.log('Video đã chọn:', this.selectedVideoLesson);
      
 
    } else {
      console.log('Không có video nào được chọn.');
    }
  }
  OnImageChange(event: Event)
  {
    const inputElement = event.target as HTMLInputElement;
    
    if (inputElement.files && inputElement.files.length > 0) {
      for (let i = 0; i < inputElement.files.length; i++) {
        this.selectedImageCourse = inputElement.files[0];
      }
      console.log("Ảnh đã chọn",this.selectedImageCourse);
    }
    
  }

  onSubmit()
  {
    const formData: {
      courseName: string,
      describe: string,
      price: string,
      image:string,
      time_start_course:Date,
      total_slot:string,
      chapters: {
        chapterName: string,
        lessons: {
          lessonType: string,
          video: string, // Bạn cần điều chỉnh kiểu dữ liệu dựa trên cấu trúc thực của dữ liệu
          lessonName: string,
          quiz: string,
          question: string,
          answer_1: string,
          answer_2: string,
          answer_3: string,
          answer_4: string,
          correct_answer: string, // Điều chỉnh kiểu dữ liệu nếu không phải là chuỗi
          videoFile: File | null // Điều chỉnh kiểu dữ liệu nếu không phải là đối tượng File
        }[]
      }[]
    } = this.courseForm.value;
   
    //const formData = this.courseForm.value;
    let count_video: number = 0;
    console.log("image khóa học",this.selectedImageCourse);
    this.dialogservice.openProgressDialog();
    
    this.apiservice.uploadImage(this.selectedImageCourse ).pipe(
      concatMap(data=>{
        if(data.mathongbao===1)
        { 
          const startValue = this.campaignOne.get('start').value; // Đối tượng Date
          const endtValue = this.campaignTwo.get('start').value; // Đối tượng Date
          const timestarttime = formData.time_start_course; // Đối tượng Date
          // Định dạng thành chuỗi năm-tháng-ngày
          const formattedStartValue = format(startValue, 'yyyy-MM-dd');
          const formattedendValue = format(endtValue, 'yyyy-MM-dd');
          const formattedTimeStartCourseValue=format(timestarttime, 'yyyy-MM-dd');
          const imagechoose=data.linkvideo;
          console.log("image sau khi upload",data.linkvideo)
          const reqCourse = {
            action_id: 1,
            var1: formData.courseName,
            var2: formData.describe,
            var3: formData.price,
            var4: imagechoose,
            var5: this.selected,
            var6: formattedStartValue,
            var7: formattedStartValue,
            var8: formattedTimeStartCourseValue,
            var9: formData.total_slot,
            var10: '',
          };
          return this.apiservice.callAPIJson(environment.ApiEndpoint.Course, reqCourse).pipe(
            concatMap(data => {
              if (data.mathongbao === 1) {
                
                //this.sharefunshion.showNotification('top', 'right', 2, data.thongbao);
                console.log("image thu được",data.dulieu.table1[0].image);
                this.id_course = data.dulieu.table1[0].course_id;
                // console.log("Data ", data);
                //console.log("id khóa học", this.id_course);
        
                return from(formData.chapters).pipe(
                  concatMap((chapter, index) => {
                    console.log("Duyệt chương 1 lần ",index+1);
                    const chapterName = chapter.chapterName;
                    //console.log(`Chương ${index + 1}: ${chapterName}`);
                   // console.log("id khóa học", this.id_course);
        
                    const reqChapter = {
                      action_id: 2,
                      var1: index + 1,
                      var2: chapter.chapterName,
                      var3: this.id_course,
                      var4: '',
                      var5: '',
                      var6: '',
                      var7: '',
                      var8: '',
                      var9: '',
                      var10: '',
                    };
        
                    return this.apiservice.callAPIJson(environment.ApiEndpoint.Course, reqChapter).pipe(
                      concatMap(chapterData => {
                        if (chapterData.mathongbao === 1) {
                          //this.sharefunshion.showNotification('top', 'right', 2, chapterData.thongbao);
                          const chapter_id_created = chapterData.dulieu.table1[0].chapter_id;
                          const chapter_name_created=chapterData.dulieu.table1[0].chapter_name;
                          return from(chapter.lessons).pipe(
                            concatMap((lesson, lessonIndex) => {
                              
                              let id_lesson_created:any;
                              const lesson_name_created=lesson.lessonName;
                              console.log("Duyệt bài bài lần",lessonIndex+1);
                              //console.log(`Bài ${lessonIndex + 1}: ${lesson.lessonName}`);
                              //console.log("id chương", chapter_id_created);
                              if (lesson.lessonType === 'quiz')
                              {
                                const reqLesson =
                                {
                                  action_id:3,
                                  var1:lesson.lessonName,
                                  var2:lessonIndex + 1,
                                  var3:chapter_id_created,
                                  var4:'quiz',
                                  var5:'',
                                  var6:'',
                                  var7:'',
                                  var8:'',
                                  var9:'',
                                  var10:'',
                                };
                                return this.apiservice.callAPIJson(environment.ApiEndpoint.Course, reqLesson).pipe(
                                  concatMap(data => {
                                    console.log("ma thong bao them bai hoc",data.mathongbao);
                                    if(data.mathongbao==1)
                                    {
                                      //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                      id_lesson_created=data.dulieu.table1[0].lesson_id;
                                      
                                      const selectedAnswer= lesson.correct_answer;
                                      console.log("id bài học",id_lesson_created);
                                      if(selectedAnswer=='1')
                                      {
                                        const answer=lesson.answer_1;
                                        console.log(`Câu trả lời đúng: Đáp án ${answer}`);
                                        const reqQuiz =
                                          {
                                            action_id:5,
                                            var1:lesson.question,
                                            var2:lesson.answer_1,
                                            var3:lesson.answer_2,
                                            var4:lesson.answer_3,
                                            var5:lesson.answer_4,
                                            var6:answer,
                                            var7:id_lesson_created,
                                            var8:'',
                                            var9:'',
                                            var10:'',
                                          };
                                         return this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqQuiz).pipe(
                                          concatMap (data=>{
                                
                                              if(data.mathongbao==1)
                                              {
                                                //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                                
                                              }
                                              else
                                              {
                                                this.sharefunshion.showNotification('top','right',4,"Lỗi");
                                              }
                                              return EMPTY;
                                        }));
                                      }
                                      else if(selectedAnswer=='2')
                                      {
                                        const answer=lesson.answer_2;
                                        console.log(`Câu trả lời đúng: Đáp án ${answer}`);
                                        const reqQuiz =
                                          {
                                            action_id:5,
                                            var1:lesson.question,
                                            var2:lesson.answer_1,
                                            var3:lesson.answer_2,
                                            var4:lesson.answer_3,
                                            var5:lesson.answer_4,
                                            var6:answer,
                                            var7:id_lesson_created,
                                            var8:'',
                                            var9:'',
                                            var10:'',
                                          };
                                         return this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqQuiz).pipe(
                                          concatMap (data=>{
                                
                                              if(data.mathongbao==1)
                                              {
                                                //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                                
                                              }
                                              else
                                              {
                                                this.sharefunshion.showNotification('top','right',4,"Lỗi");
                                              }
                                              return EMPTY;
                                        }));
                                      }
                                      else if(selectedAnswer=='3')
                                      {
                                        const answer=lesson.answer_3;
                                        console.log(`Câu trả lời đúng: Đáp án ${answer}`);
                                        const reqQuiz =
                                          {
                                            action_id:5,
                                            var1:lesson.question,
                                            var2:lesson.answer_1,
                                            var3:lesson.answer_2,
                                            var4:lesson.answer_3,
                                            var5:lesson.answer_4,
                                            var6:answer,
                                            var7:id_lesson_created,
                                            var8:'',
                                            var9:'',
                                            var10:'',
                                          };
                                         return this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqQuiz).pipe(
                                          concatMap (data=>{
                                
                                              if(data.mathongbao==1)
                                              {
                                                //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                                
                                              }
                                              else
                                              {
                                                this.sharefunshion.showNotification('top','right',4,"Lỗi");
                                              }
                                              return EMPTY;
                                        }));
                                      }
                                      else if(selectedAnswer=='4')
                                      {
                                        const answer=lesson.answer_4;
                                        console.log(`Câu trả lời đúng: Đáp án ${answer}`);
                                        const reqQuiz =
                                          {
                                            action_id:5,
                                            var1:lesson.question,
                                            var2:lesson.answer_1,
                                            var3:lesson.answer_2,
                                            var4:lesson.answer_3,
                                            var5:lesson.answer_4,
                                            var6:answer,
                                            var7:id_lesson_created,
                                            var8:'',
                                            var9:'',
                                            var10:'',
                                          };
                                         return this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqQuiz).pipe(
                                          concatMap (data=>{
                                
                                              if(data.mathongbao==1)
                                              {
                                                //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                                
                                              }
                                              else
                                              {
                                                this.sharefunshion.showNotification('top','right',4,"Lỗi");
                                              }
                                              return EMPTY;
                                        }));
                                      }
                                    }
                                    else
                                    {
                                      this.sharefunshion.showNotification('top','right',4,"Lỗi");
                                    }
                                    return EMPTY;
                                  })
                                  );
                              }
                              else if(lesson.lessonType == 'video')
                              {
                                const reqLesson =
                                {
                                  action_id:3,
                                  var1:lesson.lessonName,
                                  var2:lessonIndex + 1,
                                  var3:chapter_id_created,
                                  var4:'video',
                                  var5:'',
                                  var6:'',
                                  var7:'',
                                  var8:'',
                                  var9:'',
                                  var10:'',
                                };
                                return this.apiservice.callAPIJson(environment.ApiEndpoint.Course, reqLesson).pipe(
                                  concatMap(data => {
                                    id_lesson_created=data.dulieu.table1[0].lesson_id;
                                    //this.sharefunshion.showNotification('top','right',2,data.thongbao);
                                    let link_video:string;
                               
                                
                                    const vd=this.selectedVideoLesson.findIndex(item => item.id_video_lesson === lessonIndex+1 && item.id_video_chapter === index+1);
                                    console.log('video thứ: ',vd);
                                    console.log('Video đã chọn:', this.selectedVideoLesson[vd]);
                                    
                              
                              const reqVideo =
                                  {
                                    action_id:4,
                                    var1:'0',
                                    var2:'',
                                    var3:id_lesson_created,
                                    var4:'',
                                    var5:'',
                                    var6:'',
                                    var7:'',
                                    var8:'',
                                    var9:'',
                                    var10:'',
                                  };
                              
                              return this.apiservice.uploadVideoCloud(this.selectedVideoLesson[vd].file).pipe(concatMap(
                                response=>{
                                  console.log("respone",response.secure_url);
                                  console.log('duration video',this.selectedVideoLesson[vd].duration_video_upload.toFixed(0));
                                  const reqVideo =
                                  {
                                    action_id:4,
                                    var1:this.selectedVideoLesson[vd].duration_video_upload.toFixed(0),
                                    var2:response.secure_url,
                                    var3:id_lesson_created,
                                    var4:'',
                                    var5:'',
                                    var6:'',
                                    var7:'',
                                    var8:'',
                                    var9:'',
                                    var10:'',
                                  };
                                  return this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqVideo).pipe(concatMap(
                                    data=>{
                                      console.log("Mã thông báo",data.mathongbao);
                                      if(data.mathongbao==1)
                                      {
                                          console.log("Link video thu dc",response.secure_url);
                                          console.log("data",data);
                                          //this.n+=1;
                                      }
                                      else
                                      {
                                        console.log("Lỗi link video");
                                      }
                                      return EMPTY;
                                    }
                                  ))
                                }
                              ))
                              
      
                              }));
                              }
                              
                            })
                          );
                        } 
                        else {
                          this.sharefunshion.showNotification('top', 'right', 4, "Lỗi thêm chương");
                          
                        }
                      })
                    );
                  })
                );
              } else {
                this.sharefunshion.showNotification('top', 'right', 4, 'Lỗi chung');
               
              }
              
            })
            
          )
        }
        
      })
      )
    .subscribe(
      response => {
        console.log("Hoàn thành", response);
      },
      error => {
        this.dialogservice.closeProgressDialog();
        console.error("Lỗi xảy ra:", error);
      },
      () => {
        //console.log("Hoàn thành hàm subscribe");
        this.courseForm.reset();
        const chapterArray= this.courseForm.get('chapters') as FormArray;
        chapterArray.clear();
        //console.log("mảng",this.courseForm.get('chapters'));
        const leesonArray= this.courseForm.get('lessons') as FormArray;
        chapterArray.clear();
        this.selectedVideoLesson=[];
        this.selectedImageCourse=null;
        this.selected=null
        this.dialogservice.closeProgressDialog();
        this.sharefunshion.showNotification('top', 'right', 2, 'Tạo khóa học thành công');
        
      }
    );
   
  }
  getListspecialized()
  {
    const reqSpecialized =
    {
      action_id:21,
      var1:'',
      var2:'',
      var3:'',
      var4:'',
      var5:'',
      var6:'',
      var7:'',
      var8:'',
      var9:'',
      var10:'',
    };
    this.apiservice.callAPIJson(environment.ApiEndpoint.Course,reqSpecialized).subscribe(data=>
      {
        if(data.mathongbao==1)
        {
          this.list_specialized=data.dulieu.table1;
          console.log(this.list_specialized)
        }
      })

  } 
  onSelectChangeSpecialized(envent:any)
  {
    this.selected=envent.value;
  }
  ngOnInit(): void {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });
    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19)),
    });
    // campaignTwo = new FormGroup({
    //   start: new FormControl(new Date(year, month, 15)),
    //   end: new FormControl(new Date(year, month, 19)),
    // });
   this.getListspecialized()
  }

}
