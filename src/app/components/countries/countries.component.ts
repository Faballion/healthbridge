import { Component, OnInit } from '@angular/core';
import { CovidService, Stats } from 'src/app/services/covid.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: CountryStats[] = [];

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.covidService.getStats().subscribe((data: Stats) => {
      this.compileCountryData(data);
    });
  }

  compileCountryData(stats: Stats) {
    for (let stat of stats.response) {
      this.countries.push({
        continentName: stat.continent,
        countryName: stat.country,
        newCases: stat.cases.new !== null ? Number(stat.cases.new.substring(1)) : 0,
        activeCases: stat.cases.active,
        deaths: stat.deaths.total,
      })
    };

    console.log(this.countries);
  }
}

export interface CountryStats {
  continentName?: string;
  countryName?: string;
  newCases?: number;
  newCasesPercentage?: string;
  activeCases?: number;
  activeCasesPercentage?: string;
  deaths?: number;
  deathsPercentage?: string;
}
