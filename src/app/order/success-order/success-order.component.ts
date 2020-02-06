import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.scss']
})
export class SuccessOrderComponent {

  faCheckCircle = faCheckCircle;

  constructor(private router: Router) { }

  goToHome() {
    this.router.navigate(['/'])
  }

}
