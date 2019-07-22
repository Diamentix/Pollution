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

  public countries = ['France', 'Germany', 'Poland', 'Spain'];

  constructor(private aq: OpenAQService) { }

  ngOnInit() {
    this.country = sessionStorage.getItem("searchvalue");
  }

  public getCities() {
    this.aq.getCities(this.country).subscribe((val) => 
    {
      let temp = val.results;
      let arr = new Array();
      temp.forEach(element => {
        if ((!arr.some(e => e.city === element.city)) && arr.length<10) {
          arr.push(element);
        }
      });
      this.cities = arr;
    })
  }

  private toSessionStorage(event: any) {
    sessionStorage.setItem("searchvalue", event.target.value);
  }

}
