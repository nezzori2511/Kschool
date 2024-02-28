import { Component, Input, OnInit } from '@angular/core';
// interface carouselImage
// {
//   imageSrc:string;
//   imageAlt:string;
// }

export interface Slide
{
  imageSrc:string;
  imageAlt:string;
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  
})
export class SliderComponent implements OnInit {
  // @Input() images: carouselImage[]=[];
  // @Input() indicators=true
  // @Input() controls=true
  // selectedIndex=0;
  // @Input() images:Slide[]=[];
  // selectedIndex=0;
  // constructor() { }
  images = [
    'assets/img/course_1.jpg',
    'assets/img/course_2.jpg',
    'assets/img/course_3.jpg'
  ];
  interval: any;
  currentIndex = 0;
  transitioning = false;
  ngOnInit(): void {
    this.startInterval(); 
  }
  ngOnDestroy() {
    this.clearInterval();
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.showNext();
    }, 3000);
  }

  clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  showNext() {
    this.transitioning = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.transitioning = false;
    }, 500); 
  }

  showPrev() {
    this.transitioning = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.transitioning = false;
    }, 500);
  }
  // selectImage(index:number):void
  // {
  //   this.selectedIndex=index;
  // }
}
