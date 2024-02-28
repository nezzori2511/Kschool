import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-pay',
  templateUrl: './error-pay.component.html',
  styleUrls: ['./error-pay.component.scss']
})
export class ErrorPayComponent implements OnInit {

  constructor(private router:Router) { }
  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000); // Chuyển hướng sau 5 giây
  }
}
