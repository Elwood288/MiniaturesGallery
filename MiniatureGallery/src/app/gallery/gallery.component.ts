import { Component, OnInit } from '@angular/core';
import { IMiniature } from '../interfaces/iminiature';
import { MiniatureService } from '../services/miniature.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  miniatureList: IMiniature[]= [];
  
  constructor(private _miniatureService: MiniatureService) { }

  ngOnInit() {
    this._miniatureService.get().subscribe(data=> {
      this.miniatureList = data});
  }

}
