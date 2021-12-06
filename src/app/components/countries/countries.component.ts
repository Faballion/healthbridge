import { Component, OnInit } from '@angular/core';
import { CovidService, Stats, ContinentStats } from 'src/app/services/covid.service';

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

    console.log(stats);

    let continents: ContinentStats[] = [
      { continentName: "Africa" },
      { continentName: "Oceania" },
      { continentName: "Europe" },
      { continentName: "Asia" },
      { continentName: "North-America" },
      { continentName: "South-America" },
    ];

    for (let stat of stats.response) {
      // Compile continent stats
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

    for (let stat of stats.response) {
      if ((stat.continent !== stat.country)) {
        let continent = continents.find(continent => continent.continentName === stat.continent);

        let newCasesPercentage = undefined;
        let activeCasesPercentage = undefined;
        let deathsPercentage = undefined;

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
