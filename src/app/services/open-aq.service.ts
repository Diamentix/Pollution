import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenAQService {

  private aqURL = 'https://api.openaq.org/v1/cities';


  constructor(private http: HttpClient) { }

  public getCities(countryPhrase: string) {
    let country = countryPhrase.toLocaleLowerCase().trim();
    let countryCode;

    switch(country) {
      case "poland":
        countryCode = 'PL';
        break;
      case 'germany':
        countryCode = 'DE';
        break;
      case 'spain':
        countryCode = 'ES';
        break;
      case 'france':
        countryCode = 'FR';
        break;
    }

    return this.http.get(`https://api.openaq.org/v1/measurements?country=${countryCode}&limit=500&order_by=value&sort=desc&parameter=co`);
  }
}
