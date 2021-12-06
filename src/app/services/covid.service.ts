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

  /**
   * Calculate and return the totaled stats for the continents
   */
  calculateContinentTotals(stats: Stats): ContinentStats[] {
    let continents: ContinentStats[] = [
      { continentName: "Africa" },
      { continentName: "Oceania" },
      { continentName: "Europe" },
      { continentName: "Asia" },
      { continentName: "North-America" },
      { continentName: "South-America" },
    ];

    for (let stat of stats.response) {
      for (let continent of continents) {
        if (continent.continentName === stat.continent && (stat.continent !== stat.country)) {
          // New cases
          let newCasesNum = stat.cases.new !== null ? Number(stat.cases.new.substring(1)) : 0;
          if (continent?.newCases) {
            continent.newCases += newCasesNum;
          }
          else {
            continent.newCases = newCasesNum;
          }

          // Active cases
          if (continent?.activeCases) {
            continent.activeCases += stat.cases.active;
          }
          else {
            continent.activeCases = stat.cases.active;
          }

          // Deaths
          if (continent?.deaths) {
            continent.deaths += stat.deaths.total;
          }
          else {
            continent.deaths = stat.deaths.total;
          }

        }
      } 
    }

    return continents;
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