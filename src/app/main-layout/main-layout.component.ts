import { Component, OnInit } from '@angular/core';
import { OpenAQService } from '../services/open-aq.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { WikipediaService } from '../services/wikipedia.service';
import { City } from '../interfaces/city';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public cities;
  public countryPhrase;

  control = new FormControl();
  countries: string[] = ['France', 'Germany', 'Poland', 'Spain'];
  filteredCountries: Observable<string[]>;


  constructor(private aq: OpenAQService, private wiki: WikipediaService) { }

  ngOnInit() {
    this.countryPhrase = sessionStorage.getItem("searchvalue");

    this.filteredCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  public getCities() {
    this.aq.getCities(this.countryPhrase).subscribe((val) => 
    {
      let temp = val.results;
      let arr = new Array();
      let pageId;
      temp.forEach(element => {
        if ((!arr.some(e => e.name === element.city)) && arr.length<10) {
          let cityObj: City = {
            name: '',
            value: '',
            unit: '',
            desc: '',
            extracts: ''
          };
          this.wiki.getDescription(element.city).subscribe((value) => {
            for (var key in value.query.pages)
            {
              pageId = key;
            }
            cityObj.desc = value.query.pages[pageId].description ? value.query.pages[pageId].description : 'No information found' ;
          });
          cityObj.name = element.city;
          cityObj.value = element.value;
          cityObj.unit = element.unit;
          arr.push(cityObj);
        }
      });
      this.cities = arr;
    })
  }

  private toSessionStorage(event: any) {
    sessionStorage.setItem("searchvalue", event.target.value);
  }

  // Second function used to bind to the mat-option element
  private toSessionStorageClick() {
    sessionStorage.setItem("searchvalue", this.countryPhrase);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.countries.filter(country => this._normalizeValue(country).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
