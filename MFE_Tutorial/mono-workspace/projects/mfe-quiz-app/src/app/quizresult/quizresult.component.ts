import { Component, OnInit, Input } from '@angular/core';
import { QuizAns } from '../models/qui-ans';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-quizresult',
  templateUrl: './quizresult.component.html',
  styleUrls: ['./quizresult.component.css']
})
export class QuizresultComponent implements OnInit {
  result: QuizAns[] = [];
  originalResult: number[] = [];
  userResult: boolean[] = [];
  count: number | undefined;
  score: number | undefined;
  @Input() isResultSubmitted: boolean = false;

  constructor(
    public apiService: ApiService,
    private sharedSrv: SharedService
  ) {
    this.getQuizResult();
    this.getOriginalResult();
  }

  ngOnInit() {
  }

  createUserResultArr() {
    const len = this.originalResult.length;
    for (let i = 0; i < len; i++) {
      this.userResult.push(false);
    }
  }

  getQuizResult() {
    this.sharedSrv.datasource.asObservable().subscribe(
      (res) => {
        this.result = res;
        this.calculateResult();
        console.log('result => ', this.result);
      }
    );
  }

  getOriginalResult() {
    this.sharedSrv.originalanslists.asObservable().subscribe(
      res => {
        this.originalResult = res;
        console.log('originalResult => ', this.originalResult);
        this.createUserResultArr();
      }
    );
  }

  calculateResult() {
    this.result.forEach((ele: any, i) => {
      if (ele.index === this.originalResult[i]) {
        this.userResult[i] = true;
      }
    });
    console.log('userResult => ', this.userResult);
    this.calculateScore();
  }

  calculateScore() {
    this.count = this.originalResult?.length;
    const correctAns = this.userResult?.filter(ele => ele === true);
    const correctAnsCount = correctAns.length;
    console.log('Correct Ans Count => ', correctAnsCount);
    this.score = correctAnsCount;
  }

}
