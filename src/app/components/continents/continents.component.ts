import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {

  constructor(private covidService: CovidService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.covidService.getCountries().subscribe(data => {
      console.log(data);
    });
  }

}
