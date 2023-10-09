import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stock-tracker';
  constructor() {}
  ngOnInit(): void {
    this.history = JSON.parse(localStorage.getItem('history'));
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!this.history) {
      this.history = [];
      localStorage.setItem('history', JSON.stringify(this.history));
    }
    if (!this.favorites) {
      this.favorites = [];
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  history:any = [];
  favorites:any = [];

  numToWord(input:any) {
    let num:any = Number(input);
    let num2:any = 0;

    if (num < 0) { // if number is negative
      num2 = num.toString();
      num2 = num2.slice(1);
      num2 = Number(num2);
    }
    // If the number is less than 7 digits, just put in commas
    if (num.toFixed().length < 7) {
      return num.toLocaleString();
    }
    else {
      num = num.toFixed();
      if (this.findTerrain(7, num)) {
        return this.returnNum(7, "M", num);
      }
      else if (this.findTerrain(10, num)) {
        return this.returnNum(10, "B", num);
      }
      else if (this.findTerrain(13, num)) {
        return this.returnNum(13, "T", num);
      }
      else if (this.findTerrain(16, num)) {
        return this.returnNum(16, "Q", num);
      }
    }
  }
  
  findTerrain(terrain:any, num:any) {
    if (num.length === terrain || num.length === terrain + 1 || num.length === terrain + 2) { 
      return true;
    }
    else {
      return false; 
    }
  }
  returnNum(number:any, shortStr:any, num:any) {
    if (num.length == number) { 
      num = `${num.substring(0, 1)}.${num.substring(1, 3)} ${shortStr}`; 
    }
    else if (num.length == (number + 1)) {
      num = `${num.substring(0, 2)}.${num.substring(2, 4)} ${shortStr}`;
    }
    else if (num.length == (number + 2)) {
      num = `${num.substring(0, 3)}.${num.substring(3, 5)} ${shortStr}`;
    }
    return num;
  }

  getDate(timestamp: number) {
    let date = {
      today: new Date(timestamp).toLocaleString().slice(0, 9),
      yesterday: ''
    }
    let yesterday:any = new Date(date.today);
    yesterday = yesterday.setDate(yesterday.getDate() - 1);
    date.yesterday = new Date(yesterday).toLocaleString().slice(0, 9)
    return date
  }

  setPictureForNoBrand() {
    let colors = ['#966c63', '#f09c8a', '#85f3c6'];
    const random = Math.floor(Math.random() * colors.length);
    console.log(random, colors[random]);
    return colors[random]
  }
}
