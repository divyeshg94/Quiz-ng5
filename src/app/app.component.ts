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
    sessionInfo: string,
    info: string
  },
  PrevAnswerData: {
    FirstName: string,
    LastName: string
  },
  prevData: {
    date: Date,
    TQuestion: string,
    Option1: string,
    Option2: string,
    Option3: string,
    Option4: string,
    SessionInfo: string,
    Explanation: string
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

type UserInfo = {

}

type SubmitResponse = {
  isAlreadyAnswered: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: string;
  userInfo: any;
  questionData: any;
  previousQuestionData: any;
  prevQuestionParticipationcount: number;
  prevAnswerData: any;
  selectedOption: string;
  isAnswerCorrect: boolean;
  isAlreadyAnswered: boolean;
  generalMsg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.user = this.getParameterByName('user', window.location.href);
    if(this.user){
      console.log('/api/getUserName/'+this.user);
      this.http.get('/api/getUserName/'+this.user)
        .subscribe((response: UserInfo) => {
            this.userInfo = response;
        },
        (err: any) => console.log(err),
        () => console.log("User Data Retrieved!!"));
    }
    this.getQuestions();
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  getQuestions() {
    this.http.get('/api/question')
      .subscribe((response: Question) => {
        this.questionData = response.data;
        console.log(response);
        this.previousQuestionData = response.prevData;
        this.prevQuestionParticipationcount = response.count;
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
    if (this.selectedOption == this.questionData.sessionInfo) {
      this.isAnswerCorrect = true;
    }

    var request = {
      user: this.user,
      questionNo: 1,
      correct: this.isAnswerCorrect,
      answer: this.selectedOption
    }

    this.http.put('/api/submitAnswer', request)
      .subscribe((response: SubmitResponse) => {
        this.isAlreadyAnswered = response.isAlreadyAnswered;
        console.log("From Angular");
        console.log(this.isAlreadyAnswered);
        if (this.isAlreadyAnswered) {
          this.generalMsg = 'You have already answered today`s question :('
        }
        else {
          this.generalMsg = 'Answer Submitted Successfully :)'
        }
      },
      (err: any) => console.log(err),
      () => console.log('Answer Submitted Success!!'));
  }
}
