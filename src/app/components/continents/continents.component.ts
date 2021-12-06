import { Component, OnInit } from '@angular/core';
import { CovidService, Stats, ContinentStats } from 'src/app/services/covid.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {

  continents: ContinentStats[] = [];
  displayedColumns: string[] = [
    'continentName', 
    'newCases', 
    'newCasesPercentage', 
    'activeCases', 
    'activeCasesPercentage', 
    'deaths', 
    'deathsPercentage'
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
    this.continents = this.covidService.calculateContinentTotals(stats);

    let gobalNewCases = 0;
    let globalActiveCases = 0;
    let globalDeaths = 0;

    // Get global totals
    for (let continent of this.continents) {
      if (continent?.newCases) {
        gobalNewCases += continent.newCases;
      }
      if (continent?.activeCases) {
        globalActiveCases += continent.activeCases;
      }
      if (continent?.deaths) {
        globalDeaths += continent.deaths;
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