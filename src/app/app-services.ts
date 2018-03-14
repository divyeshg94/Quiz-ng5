import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) {

  }
}
