import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  pageTitle = 'Ласкаво просимо до Міта!';

  constructor() { }

  ngOnInit(): void {
    console.log('Home page loaded');
  }

  handleButtonClick(): void {
    alert('Ви натиснули кнопку!');
  }
}