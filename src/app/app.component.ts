import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Question = {
    count: any,
    data: {
      date: Date,
      question: string,
      option1: string,
      option2: string,
      option3: string,
      option4: string,
      sessionInfo: string
    },
    PrevAnswerData: {

    },
    prevData: {
      date: Date,
      TQuestion: string,
      Option1: string,
      Option2: string,
      Option3: string,
      Option4: string,
      SessionInfo: string
    }
}

type SubmitAnswer = {
  body: {
    user: string,
    questionNo: number,
    isAnswerCorrect: boolean,
    answer: string
  }
}

type SubmitResponse = {
  isAlreadyAnswered: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  alreadyAnsweredMsg: string = '';
  successMsg: string = '';
  info: string = '';
  questionData: any;
  previousQuestionData: any;
  count: number;
  prevAnswerData: any;
  selectedOption: string;
  isAnswerCorrect: boolean;
  isAlreadyAnswered: boolean;
  generalMsg: string;

  constructor(private http: HttpClient){}

  ngOnInit(){
      this.alreadyAnsweredMsg = 'You have already answered today`s question!!';
      this.successMsg = 'Your Answer is successfully submitted to the server';
      this.getQuestions();
  }

  getQuestions() {
    this.http.get('/api/question')
      .subscribe((response: Question) => {
        this.questionData = response.data;
        console.log(this.questionData);
        this.previousQuestionData = response.prevData;
        console.log(this.previousQuestionData);
        this.count = response.count;
        this.prevAnswerData = response.PrevAnswerData;
      },
      (err: any) => console.log(err),
      () => console.log('Question Retrieved Success!!'));
  }

  submit() {
    if (!this.selectedOption) {
      this.generalMsg = 'Select an option before Submitting';
      return;
    }
    this.isAnswerCorrect = false;
    if (this.selectedOption == this.questionData.sessionInfo)
    {
      this.isAnswerCorrect = true;
    }
    var request = {
      
    
    }
    this.http.get('/api/submitAnswer')
      .subscribe((response: SubmitResponse) => {
        this.isAlreadyAnswered = response.isAlreadyAnswered;
        if (this.isAlreadyAnswered) {
          this.alreadyAnsweredMsg = 'You have already answered today`s question :('
        }
        else {
          this.alreadyAnsweredMsg = 'Answer Submitted Successfully :)'
        }
      },
      (err: any) => console.log(err),
      () => console.log('Answer Submitted Success!!'));

  }
}
