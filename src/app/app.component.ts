import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpResponse } from './services/http-wrap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpClient]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<IHttpResponse>('https://api.github.com/users/tomagi').subscribe((data) => {
      console.log(data.login);
      console.log(data.avatar_url);
      console.log(data.url);
    },
      error => {
        console.log(error.status);
      });

    this.http.get('https://api.github.com/users/tomagi').subscribe((data: any) => {
      console.log(data.login);
    },
      error => {
        console.log(error.status);
      });

    this.http.post('https://jsonplaceholder.typicode.com/posts',
      { firstName: 'T', lastName: 'G', time: new Date().toString() })
      .subscribe(  
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
      );
  }
}
