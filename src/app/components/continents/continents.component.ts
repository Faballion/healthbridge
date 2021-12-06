import { Component, OnInit } from '@angular/core';
import { CovidService, Stats, ContinentStats } from 'src/app/services/covid.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {

  displayedColumns: string[] = [
    'continentName', 
    'newCases', 
    'newCasesPercentage', 
    'activeCases', 
    'activeCasesPercentage', 
    'deaths', 
    'deathsPercentage'
  ];

  continents: ContinentStats[] = [
    { continentName: "Africa" },
    { continentName: "Oceania" },
    { continentName: "Europe" },
    { continentName: "Asia" },
    { continentName: "North-America" },
    { continentName: "South-America" },
  ];

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    this.covidService.getStats().subscribe((data: Stats) => {
      this.compileContinentData(data);
    });
  }

  /**
   * Compiles all the data for display
   */
  compileContinentData(stats: Stats) {
    console.log(stats);

    let gobalNewCases = 0;
    let globalActiveCases = 0;
    let globalDeaths = 0;

    // Calculate totals
    for (let stat of stats.response) {
      for (let continent of this.continents) {
        if (continent.continentName === stat.continent) {
          // New cases
          let newCasesNum = stat.cases.new !== null ? Number(stat.cases.new.substring(1)) : 0;
          if (continent?.newCases) {
            continent.newCases += newCasesNum;
          }
          else {
            continent.newCases = newCasesNum;
          }
          gobalNewCases += newCasesNum

          // Active cases
          if (continent?.activeCases) {
            continent.activeCases += stat.cases.active;
          }
          else {
            continent.activeCases = stat.cases.active;
          }
          globalActiveCases += stat.cases.active

          // Deaths
          if (continent?.deaths) {
            continent.deaths += stat.deaths.total;
          }
          else {
            continent.deaths = stat.deaths.total;
          }

          globalDeaths += stat.deaths.total
        }
      } 
    }

    // Calculate %
    for (let continent of this.continents) {
      // New cases %
      if (continent?.newCases) {
        continent.newCasesPercentage = (continent.newCases / gobalNewCases * 100).toFixed(2) + '%';
      }

      // Active cases %
      if (continent?.activeCases) {
        continent.activeCasesPercentage = (continent.activeCases / globalActiveCases * 100).toFixed(2) + '%';
      }

      // Deaths %
      if (continent?.deaths) {
        continent.deathsPercentage = (continent.deaths / globalDeaths * 100).toFixed(2) + '%';
      }
    }
  }

}