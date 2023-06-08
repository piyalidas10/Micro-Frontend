import { Component, OnInit, Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, 
  ElementRef, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { QuizexpandComponent } from '../quizexpand/quizexpand.component';
import { SharedService } from '../services/shared.service';
import { QuizModel } from '../models/quiz';
import { QuizAns } from '../models/qui-ans';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[quizcontainer]',
})
export class QuizcontainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-quizhome',
  templateUrl: './quizhome.component.html',
  styleUrls: ['./quizhome.component.css']
})

export class QuizhomeComponent implements OnInit {
  public isResultSubmitted = false;
  public quizLists: QuizModel[] = [];
  public quizAnsLists: QuizAns[] = [];
  @Output() isSubmitted = new EventEmitter();
  public isSubmitBtnClicked = false;

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */

  @ViewChildren(QuizcontainerDirective)
  entry!: QueryList<QuizcontainerDirective>;

  constructor(
    public apiService: ApiService,
    private resolver: ComponentFactoryResolver,
    private ele: ElementRef,
    private sharedSrv: SharedService
  ) {
    this.getDataLists();
  }

  ngOnInit() {
  }

  checkIsSubmitted(evt: string) {
    console.log('evt => ', evt);
    if (evt === 'true') {
      this.isResultSubmitted = true;
    }
  }

  getDataLists() {
    try {
      this.apiService.getData()
        .subscribe(
          data => {
            this.quizLists = data.questions;
            console.log('quizLists => ', this.quizLists);
            const originalansLists = this.quizLists.map( (ele: any) => ele.correctIndex);
            console.log('originalansLists => ', originalansLists);
            this.sharedSrv.setOriginalAnsLists(originalansLists);
          },
          err => {
            console.log('Error => ', err);
          }
        );
    } catch (error) {
      console.log('error => ', error);
    }
  }

  notifyAns(evt: any) {
    console.log('Question Ans => ', evt);
  }

  // ViewContainerRef — create templates or components dynamically
  openComponent(index: number) {
    console.log(this.entry);
    const alreadyChoosedAns = this.showAlreadySelectedAns(index);
    console.log('alreadyChoosedAns => ', alreadyChoosedAns);
    const myFactory = this.resolver.resolveComponentFactory(QuizexpandComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance.data = this.quizLists[index];
      myRef.instance.serialno = index;
      myRef.instance.alreadychoosedans = alreadyChoosedAns;
      myRef.instance.chooseVal.subscribe(event => {
        console.log('chooseVal => ', event);
        this.checkDuplicateAns(event);
      });
      myRef.changeDetectorRef.detectChanges();
    }
  }

  closeComponent(index: number) {
    console.log('close component', index);
    this.entry.toArray()[index].viewContainerRef.remove();
  }

  expandSection(index: number) {
    const expandElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('expandElement => ', expandElement);
    const rowElement = expandElement.parentElement;
    expandElement.children[0].classList.add('is-flipped');
    this.openComponent(index);
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
  }

  closeSection(index: number) {
    const closeElement = this.ele.nativeElement.querySelectorAll('.quiz' + index)[0];
    console.log('closeElement => ', closeElement);
    const rowElement = closeElement.parentElement;
    console.log('rowElement => ', rowElement);
    closeElement.children[0].classList.remove('is-flipped');
    rowElement.classList.remove('equal');
    rowElement.classList.add('equal');
    this.closeComponent(index);
  }

  showAlreadySelectedAns(index: number) {
    let serialNo = 0;
    console.log('quizAnsLists => ', this.quizAnsLists);
    console.log('index => ', index);
    if (this.quizAnsLists.length > 0) {
      this.quizAnsLists.forEach((ele: any) => {
        if (ele.slno === index) {
          serialNo = ele.index;
        } else {
          serialNo = -1;
        }
      });
    } else {
      serialNo = -1;
    }
    return serialNo;
  }

  checkDuplicateAns(evt: any) {
    if (this.quizAnsLists.length > 0) {
      const position = this.quizAnsLists.findIndex((ele: any) => ele.slno === evt.slno);
      console.log('position => ', position);
      if (position !== -1) {
        this.quizAnsLists[position].index = evt.index;
      } else {
        this.quizAnsLists.push(evt);
      }
    } else {
      this.quizAnsLists.push(evt);
    }
    console.log('quizAnsLists => ', this.quizAnsLists);
  }

  public submitQuiz() {
    this.isSubmitBtnClicked = true;
    this.sharedSrv.setQuizResult(this.quizAnsLists);
    console.log('quizAnsLists => ', this.quizAnsLists);
    this.isSubmitted.emit('true');
  }

}
