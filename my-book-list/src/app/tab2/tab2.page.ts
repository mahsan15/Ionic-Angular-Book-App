import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { StorageReadService } from '../storageRead.service';
import { Book } from '../books';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  searchTerm: string;
  results: Observable<any>;
  //bk: Book =  new Book();
  searchResults: Book[] = []
  //results: Movies[] = [];

  ngOnInit() {
  }
  constructor(public router: Router, private bookService: BookService, private storageReadService: StorageReadService) {}
  searchChanged(){
    this.searchResults = [];
    console.log('step one: ' + this.searchTerm);
  this.results = this.bookService.searchData(this.searchTerm);
  console.log(this.results);
  this.results.subscribe(data =>{
//this.searchResults = data as Book[];
    console.log(data[0]);
    console.log(data);
    console.log(this.searchResults);
    data.forEach((b)=>{
      var bk = new Book();
      bk.title = b.title;
      bk.author = b.author_name;
      if(b.isbn === undefined || b.isbn.length === 0)
      bk.imgUrl = '';
    else
      bk.imgUrl = 'http://covers.openlibrary.org/b/isbn/'+ b.isbn[0]  + "-L.jpg";
      bk.key = b.key;
      this.searchResults.push(bk);
      console.log( "b.isbn");
      
      
    });
    console.log(this.searchResults);
    });

  }
  gotToHome(){
    this.router.navigate(['/home']);
  }
  addToReadingList(bk: Book){
  this.storageReadService.addReadList(bk.key,bk);
  this.router.navigate(['/tabs/tab3']);
  }

  gotToDetails(key: any){
    this.router.navigate(['/bookdetail', key]);
  }
}
