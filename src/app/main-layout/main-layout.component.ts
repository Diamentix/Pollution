import { Component, OnInit } from '@angular/core';
import { OpenAQService } from '../services/open-aq.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public cities;
  public country;

  constructor(private aq: OpenAQService) { }

  ngOnInit() {
    // this.aq.getCities('poland').subscribe((val) => this.results = val );
  }

  public getCities() {
    this.aq.getCities(this.country).subscribe((val) => 
    {
      // let temp = val.results;
      // let counter = 0;
      // temp.forEach(element => {
      //   if (!(this.cities.indexOf(element.city) > -1)) {
      //     this.cities[counter] = element;
      //     counter++;
      //   }
      // });

      let temp = val.results;
      let arr = new Array();
      temp.forEach(element => {
        if ((!arr.some(e => e.city === element.city)) && arr.length<10) {
          arr.push(element);
        }
      });
      this.cities = arr;



      // this.cities = val.results;
      console.log(this.cities);
    })

    // console.log('Local');
  }

}
