import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class APIService {

  private serviceUrl = 'https://google.com';  // URL to web api

constructor(private http: Http) { }
//   getHeroes() {
//     return this.http.get(this.heroesUrl)
//                .toPromise()
//                .then(response => response.json().data as Hero[])
//                .catch(this.handleError);
//   }
//   getHero(id: number) {
//     return this.getHeroes()
//                .then(heroes => heroes.find(hero => hero.id === id));
//   }
//   save(hero: Hero): Promise<Hero>  {
//     if (hero.id) {
//       return this.put(hero);
//     }
//     return this.post(hero);
//   }
//   delete(hero: Hero) {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     let url = `${this.heroesUrl}/${hero.id}`;
//     return this.http
//                .delete(url, {headers: headers})
//                .toPromise()
//                .catch(this.handleError);
//   }
  // Send code statement
  post(code: string): Promise<string> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
               .post(this.serviceUrl, code, {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }
  // Update existing Hero
//   private put(hero: Hero) {
//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');
//     let url = `${this.heroesUrl}/${hero.id}`;
//     return this.http
//                .put(url, JSON.stringify(hero), {headers: headers})
//                .toPromise()
//                .then(() => hero)
//                .catch(this.handleError);
//   }
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
