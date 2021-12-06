import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  private headers = new HttpHeaders().set('x-rapidapi-key', 'add1643dd3msha13287a248746c5p1f64eajsn0daae809762f').set('x-rapidapi-host', 'covid-193.p.rapidapi.com');
  constructor(private http: HttpClient) { }

  /**
   * Get the stats data from Rapid API
   */
  getStats(): Observable<Stats> {
    let headers = this.headers;
    let url = 'https://covid-193.p.rapidapi.com/statistics'
    return this.http.get<Stats>(url,{headers});
  }
}

export interface Stats {
  response: [{
    cases: {
      active: number;
      new: string | null;
    },
    continent: string;
    country: string;
    deaths: {
      new: string | null;
      total: number;
    },
    population: number;
  }]
}

export interface ContinentStats {
  continentName?: string;
  newCases?: number;
  newCasesPercentage?: string;
  activeCases?: number;
  activeCasesPercentage?: string;
  deaths?: number;
  deathsPercentage?: string;
}