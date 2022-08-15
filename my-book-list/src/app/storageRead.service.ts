import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Book } from './books';
@Injectable({
  providedIn: 'root'
})
export class StorageReadService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private logAllTasks(str: any){
    console.log(str);
    console.log("All Tasks : ");
    this._storage.forEach((key, value, index) => {
      console.log(key, value, index);
    });
  }

  public addReadList(key: any, book: Book){
    this._storage?.set(key, book);
    this.logAllTasks("Adding");
  }



  getAllReadBooks(){
    var books: Book[] = [];
    if (this._storage != null){
    this._storage.forEach((value, key, index) =>{
      books.push(value as Book);
    })
  }
    return books;
  }

  public async deleteOneBook(key: any){
    console.log(key);
    this._storage.remove(key);
    this.logAllTasks("Deleted " + key);
  }
  public async deleteAll(){
    this._storage.clear();
    this.logAllTasks("All deleted ");
  }


}
