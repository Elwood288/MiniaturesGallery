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
  constructor(private _miniatureService: MiniatureService, private formBuilder: FormBuilder, private Router: Router) {}

  ngOnInit() {
   
    this._miniatureService.get().subscribe(data=> (this.miniatureList = data));
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
  // addMiniature(): void{
  //   this.Id++;
  //   this._miniatureService.add({
  //     id:this.Id,
  //     name: '',
  //     game: '',
  //     keywords: ''
  //   });
  // }

}

