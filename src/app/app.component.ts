import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  QFD: string = '';
  alreadyAnsweredMsg: string = '';
  successMsg: string = '';
  info: string = 'No Info Today';
  questions: any;

  constructor(private http: HttpClient){}

  ngOnInit(){
      this.alreadyAnsweredMsg = 'You have already answered today`s question!!';
      this.successMsg = 'Your Answer is successfully submitted to the server';
      this.http.get('http://localhost:3100/question').subscribe(data => {
        this.questions = data;
      });
  }

  submit(){

  }
}
