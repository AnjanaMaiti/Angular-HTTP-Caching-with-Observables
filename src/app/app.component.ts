import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,startWith } from 'rxjs/operators';

const CACHE_KEY = "httpRepoCache";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  repos:any;
  constructor(http: HttpClient){
    const path = 'http://api.github.com/search/repositories?q=angular';
    this.repos = http.get<any>(path)
    .pipe(
      map(data => data.items)
    )

    //subscripe to "this.repos" observable and save it in localStorage
    this.repos.subscribe(next => {
        localStorage[CACHE_KEY] = JSON.stringify(next);
    });

    //startWith  takes in an Observable/string of events and add those events in the very beginning.Basically it will synchronously emit 
    this.repos = this.repos.pipe(
      startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
    )
  }
}
