import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  displayedColumns: string[] = [
    'continentName', 
    'countryName', 
    'newCases', 
    'newCasesPercentage', 
    'activeCases', 
    'activeCasesPercentage', 
    'deaths', 
    'deathsPercentage'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
