import { Injectable } from '@angular/core';
import { Http } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: Http) { }
  
}
