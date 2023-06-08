import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  datasource = new BehaviorSubject<any>([]);
  originalanslists = new BehaviorSubject<number[]>([]);

  setOriginalAnsLists(content: any) {
    this.originalanslists.next(content);
  }

  setQuizResult(content: any) {
    this.datasource.next(content);
  }
}
