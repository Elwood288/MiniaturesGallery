import { Component, OnInit } from '@angular/core';
import { IMiniature } from "../interfaces/iminiature";
import { MiniatureService } from "../services/miniature.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
//   template: `
//   <label for="file">File:</label>
//   <input type="file" (change)="upload($event)" accept=".jpg" />
//  `
})
export class ManagementComponent implements OnInit {
  miniatureList: IMiniature[]= [];
  displayedColumns: string[] = ["name", "base64Image","game", "keywords"]
  miniatureForm: FormGroup;
  Id: number = 1;
  name: string;
  image:File;
  game: string;
  keywords: string;
  isEditing: boolean = false;
  rowState: { [key: string]: boolean } = {};
  http: any;

  onFileChanged(event) {
    const file = event.target.files[0]
    this.image = file;
    console.log(file);
  }

  // onUpload() {
  //   this.http.post('my-backend.com/file-upload', this.selectedFile)
  //   .subscribe(...);
  // }

  selectedFile(arg0: string, selectedFile: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private _miniatureService: MiniatureService, private formBuilder: FormBuilder, private Router: Router, ) {}

  // private afStorage: AngularFireStorage, private db: AngularFireDatabase

  // upload(event) {
  //   this.afStorage.upload('/upload/to/this-path', event.target.files[0]);  
  // }

  ngOnInit() {
   
    this._miniatureService.get().subscribe(data=> {
      this.miniatureList = data;

      if(Object.keys(this.rowState).length === 0) {
        data.map(({ id }) => id).reduce((memo, val) => {
          memo[val] = false;
          return memo;
        }, this.rowState);
      }
      console.log(this.miniatureList);
    });
    

    this.miniatureForm = this.formBuilder.group({
      name: "George",
      game: "Heroscape",
      image: null,
      keywords: "test, fake"
      
    });
  }

  addNew() {
    this._miniatureService.add(this.name,this.game,this.keywords,this.image)
    .subscribe(data=>{
      this._miniatureService.get().subscribe(data=> (this.miniatureList = data));
    });
    this.name = "";
    this.game = "";
    this.keywords = "";
  }
 

  toggle(id: number){
    this.rowState[id] = !this.rowState[id]
    this.isEditing = !this.isEditing;
  }

  update(miniature : IMiniature){
    console.log(miniature);
    this._miniatureService.update(miniature).subscribe(data=> data)
    this.toggle(miniature.id);
    
  }

  delete(miniature : IMiniature){
    this._miniatureService.delete(miniature).subscribe(data=> {  
      this._miniatureService.get().subscribe(data=> {
        this.miniatureList = data;})
    })

    

  }
}

