import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {

  continents = [
    {
      continentName: 'Africa',
      newCases: '5000',
      newCasesPercentage: '5%',
      activeCases: '3434',
      activeCasesPercentage: '3%',
      deaths: '4334',
      deathsPercentage: '3%',
    },
    {
      continentName: 'Europe',
      newCases: '5000',
      newCasesPercentage: '5%',
      activeCases: '3434',
      activeCasesPercentage: '3%',
      deaths: '4334',
      deathsPercentage: '3%',
    },
  ]
  
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
    this.covidService.getStats().subscribe(data => {
      console.log(data);
    });
  }

}
