import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quizexpand',
  templateUrl: './quizexpand.component.html',
  styleUrls: ['./quizexpand.component.css']
})
export class QuizexpandComponent implements OnInit {
  @Input() data: any;
  @Input() serialno: number = 0;
  @Input() alreadychoosedans: number | undefined;
  @Output() chooseVal = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  chooseAns(slno: number, index: number) {
    const chooseAns = {slno, index};
    console.log('chooseAns => ', chooseAns);
    this.chooseVal.emit(chooseAns);
  }

}
