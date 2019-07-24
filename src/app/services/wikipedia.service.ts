import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  public getDescription(city: string) {
    const cityName = city.trim();

    return this.http.get(`https://en.wikipedia.org/w/api.php?action=query&titles=${cityName}&prop=description&format=json&origin=*`);
  }
}
