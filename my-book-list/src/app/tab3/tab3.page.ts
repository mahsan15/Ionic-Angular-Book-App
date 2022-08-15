import { Component } from '@angular/core';
import { Book } from '../books';
import { StorageReadService } from '../storageRead.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 

  readList: Book[] = [];
  constructor(public router: Router, private storageReadService: StorageReadService, 
    private alertController: AlertController) {}

  ngOnInit(){
    this.readList = this.storageReadService.getAllReadBooks();
   }
 
   ionViewWillEnter(){
     this.readList = this.storageReadService.getAllReadBooks();
   }

      
   deleteAll(){

    this.alertController.create({
      header: 'Danger!',
      message : 'Are sure you want to delete all books?',
      buttons: [{
        text :'delete',
        handler : ()=>{
          this.storageReadService.deleteAll();
          this.readList = this.storageReadService.getAllReadBooks();
        }
      },'Cancel']

    }).then(alert => {
      alert.present();
    })
  }

  deleteTask(bookToDelete: any){

    this.alertController.create({
      header: 'Warning!',
      message : 'Are sure you want to delete this book?',
      buttons: [{
        text :'delete',
        handler : ()=>{
          this.storageReadService.deleteOneBook(bookToDelete.key);
          this.readList = this.storageReadService.getAllReadBooks();
        }
      },'Cancel']

    }).then(alert => {
      alert.present();
    })

  }
  gotToDetails(key: any){
    console.log(key);
    this.router.navigate(['/bookdetail', key]);
  }


}
