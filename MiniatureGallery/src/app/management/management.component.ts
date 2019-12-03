import { Component, OnInit } from '@angular/core';
import { IMiniature } from "../interfaces/iminiature";
import { MiniatureService } from "../services/miniature.service";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  miniatureList: IMiniature[]= [];
  displayedColumns: string[] = ["name", "game", "keywords"]
  miniatureForm: FormGroup;
  Id: number = 1;
  name: string;
  game: string;
  keywords: string;
  isEditing: boolean = false;
  rowState: { [key: string]: boolean } = {};

  onFileChanged(event) {
    const file = event.target.files[0]
  }

  constructor(private _miniatureService: MiniatureService, private formBuilder: FormBuilder, private Router: Router) {}

  ngOnInit() {
   
    this._miniatureService.get().subscribe(data=> {
      this.miniatureList = data;

      if(Object.keys(this.rowState).length === 0) {
        data.map(({ id }) => id).reduce((memo, val) => {
          memo[val] = false;
          return memo;
        }, this.rowState);
      }
    });
    console.log(this.miniatureList);

    this.miniatureForm = this.formBuilder.group({
      name: "George",
      game: "Heroscape",
      keywords: "test, fake"
      
    });
  }

  addNew() {
    this._miniatureService.add(this.name,this.game,this.keywords)
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

