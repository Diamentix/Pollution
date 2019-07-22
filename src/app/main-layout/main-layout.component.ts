import { Component, OnInit } from '@angular/core';
import { OpenAQService } from '../services/open-aq.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


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


  constructor(private aq: OpenAQService) { }

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
