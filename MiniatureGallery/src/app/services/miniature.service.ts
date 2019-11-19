import { Injectable } from '@angular/core';
import {IMiniature} from '../interfaces/iminiature';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MiniatureService {
  miniatureList: IMiniature[]= [];
  constructor(private http: HttpClient) { }

  // private _url: string = "../assets/Data/miniatures.json";
  private _url: string = "https://localhost:44304/api/miniatures"

  get():Observable<IMiniature[]> {
return this.http.get<IMiniature[]>(this._url)
}

// add(miniature: IMiniature){
//   this.miniatureList.push(miniature);

// }

add(name: string,game: string, keywords): Observable<any> {
  const newId =
    this.miniatureList
      .map(x => x.Id)
      .reduce((prev, curr) => (prev < curr ? curr : prev),0) + 1;
      var miniature = {
        Id: newId,
        Name: name,
        Game: game,
        Keywords: keywords
      };
      console.log(miniature);
 return this.http.post<IMiniature>(this._url, miniature);
}
}
