import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private userSource = new BehaviorSubject('');
  currentUser = this.userSource.asObservable();

  constructor() { }

  userDetails(user: any) {
    this.userSource.next(user);
  }
}
