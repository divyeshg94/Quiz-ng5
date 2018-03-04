import { Component, OnInit } from '@angular/core';

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

  constructor(){}

  ngOnInit(){
      this.alreadyAnsweredMsg = 'You have already answered today`s question!!';
      this.successMsg = 'Your Answer is successfully submitted to the server';
  }

  submit(){

  }
}
