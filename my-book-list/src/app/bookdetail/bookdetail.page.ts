import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { StorageReadService } from '../storageRead.service';
import { Book } from '../books';
@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.page.html',
  styleUrls: ['./bookdetail.page.scss'],
})
export class BookdetailPage implements OnInit {

  bookInfo: any;
  bookInfos: Book =  new Book();
  constructor(private activateRoute: ActivatedRoute, 
    private bookService: BookService,
    private storageReadService: StorageReadService,
    public router: Router) {}

  ngOnInit() {
    var id = this.activateRoute.snapshot.paramMap.get('id').slice(7);
    console.log(id);
    this.bookInfo = this.bookService.searchDataDetail(id).subscribe(data =>{
      if(data != undefined){
      this.bookInfo.key = id;
      this.bookInfos.title =  data[0].title;
      this.bookInfos.author = data[0].author_name;
      this.bookInfos.imgUrl = 'http://covers.openlibrary.org/b/isbn/' + data[0].isbn[0] + "-L.jpg";
      this.bookInfos.release =  data[0].first_publish_year;
      if(data[0].subject != undefined ){
        data[0].subject.forEach((s) => {this.bookInfos.subject += (s+", ")});
      }else{
        this.bookInfos.subject = '';
      }

        this.bookInfos.amazonLink = (data[0].id_amazon != undefined) ? 'https://www.amazon.com/dp/' + data[0].id_amazon[0] : '';
      }
      console.log(this.bookInfos);
    });
    //this.bookInfo.isbn = 'http://covers.openlibrary.org/b/isbn/' + this.bookInfo.isbn;
  }
  openWebsite() {
    window.open(this.bookInfo.Website, '_blank'); // opens the link in the new tab.

  }
  addToReadingList(bk: Book){
    this.storageReadService.addReadList(bk.key,bk);
    this.router.navigate(['/tabs/tab3']);
    }

}
