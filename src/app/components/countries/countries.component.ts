import { Component, OnInit } from '@angular/core';
import { CovidService, Stats, ContinentStats } from 'src/app/services/covid.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries: CountryStats[] = [];
  showLoading = true;

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.covidService.getStats().subscribe((data: Stats) => {
      this.compileCountryData(data);
      this.showLoading = false;
    });
  }

  compileCountryData(stats: Stats) {
    let continents: ContinentStats[] = this.covidService.calculateContinentTotals(stats);

    for (let stat of stats.response) {
      if ((stat.continent !== stat.country)) {
        let continent = continents.find(continent => continent.continentName === stat.continent);

        let newCasesPercentage;
        let activeCasesPercentage;
        let deathsPercentage;

        if (continent?.newCases) {
          newCasesPercentage = ((stat.cases.new !== null ? Number(stat.cases.new.substring(1)) : 0) / continent.newCases * 100).toFixed(2)
        }

        if (continent?.activeCases) {
          activeCasesPercentage = (stat.cases.active / continent.activeCases * 100).toFixed(2);
        }

        if (continent?.deaths) {
          deathsPercentage = (stat.deaths.total / continent.deaths * 100).toFixed(2);
        }

        this.countries.push({
          continentName: stat.continent,
          countryName: stat.country,
          newCases: stat.cases.new !== null ? Number(stat.cases.new.substring(1)) : 0,
          newCasesPercentage: newCasesPercentage,
          activeCases: stat.cases.active,
          activeCasesPercentage: activeCasesPercentage,
          deaths: stat.deaths.total,
          deathsPercentage: deathsPercentage,
        })
      };
    }
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
