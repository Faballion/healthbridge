import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private headers = new HttpHeaders().set('x-rapidapi-key', 'add1643dd3msha13287a248746c5p1f64eajsn0daae809762f').set('x-rapidapi-host', 'covid-193.p.rapidapi.com');
  constructor(private http:HttpClient) { }

  /**
   * Get the countries data from Rapid API
   */
  getCountries(): Observable<countries> {
    let headers = this.headers;
    let url = 'https://covid-193.p.rapidapi.com/countries'
    return this.http.get<countries>(url,{headers});
  }

}

export interface countries {

}
