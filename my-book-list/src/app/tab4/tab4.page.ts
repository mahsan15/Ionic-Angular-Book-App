
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController } from '@ionic/angular';
import { Book } from '../books';
import { StorageReadService } from '../storageRead.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  rate: number;
  comment: string;
  err: string = '';
  readList: Book[] = [];
  constructor(public router: Router, private storageReadService: StorageReadService, 
    private alertController: AlertController) {}

  ngOnInit(){
    this.readList = this.storageReadService.getAllReadBooks();
   }
 
   ionViewWillEnter(){
     this.readList = this.storageReadService.getAllReadBooks();
   }

   cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
  if(this.rate < 11 && this.rate > 0){
    this.modal.dismiss((this.rate||this.comment), 'confirm');
    }else{
      this.err = "Please rate it out of 10!";
    }
    
  }

  onWillDismiss(event: Event, bk: Book) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      bk.rate = this.rate;
      bk.comment = this.comment;
      this.storageReadService.addReadList(bk.key, bk);
      this.err = "";
      
    }
  }

  
  gotToDetails(key: any){
    console.log(key);
    this.router.navigate(['/bookdetail', key]);
  }
}
