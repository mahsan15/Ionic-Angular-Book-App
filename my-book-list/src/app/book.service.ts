import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = 'https://openlibrary.org/search.json?q=';

  constructor(private http: HttpClient) { 
  }
  mds: Book[] = [];    
  md: Book;

  searchData(title: string){
    title = title.replace(' ', '+')
    console.log("step 2: " + this.url+title);
    var dd = this.http.get((this.url+title)).pipe(map(data => data['docs']));
     // map(data => this.modify(data['docs'])));
    //  var sz = this.http.get(this.url+title.replace(' ', '+')).
   //   pipe(
    //    map(data => data['numFound']));

console.log(this.mds);
return dd;
    //return  this.mds;
  }

  searchDataDetail(title: string){
return this.http.get((this.url+title)).pipe(map(data => data['docs']));
    //return  this.mds;
  }

  modify(data: any){
    this.md.title = data['title'];
        this.md.imgUrl= 'http://covers.openlibrary.org/b/isbn/' + data['isbn'];
        this.md.author = data['author_name'];
        console.log(data['author_name']);
        this.md.release = data['first_publish_year'];
        this.mds.push(data);
    return data;
  }
}
