import { Injectable } from '@angular/core';
import {IMiniature} from '../interfaces/iminiature';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MiniatureService {
  miniatureList: IMiniature[]= [];
  constructor(private http: HttpClient) { }

  // private _url: string = "../assets/Data/miniatures.json";
  private _url: string = "https://localhost:44304/api/miniatures/"

  get():Observable<IMiniature[]> {
return this.http.get<IMiniature[]>(this._url)
}

// add(miniature: IMiniature){
//   this.miniatureList.push(miniature);

// }

add(name: string,game: string, keywords: string, file: File): Observable<any> {
  var keyWordsArray = keywords.split(' ');
    const body = new FormData();
    // @ts-ignore
    body.append('Id', 0);
    body.append('Name', name);
    body.append('Image', file);
    body.append('Game', game);
    body.append('Base64Image', '');
    keyWordsArray.forEach((v, i) => body.append(`Keywords[${i}]`, v))


      var miniature = {
        Id: 0,
        Name: name,
        Image: file,
        Game: game,
        Keywords: keyWordsArray
      };

 return this.http.post<IMiniature>(this._url, body);
}
 update(miniature: IMiniature): Observable<any>{
   return this.http.put(this._url + miniature.id, miniature);
 }

 delete(miniature: IMiniature): Observable<any>{
  return this.http.delete(this._url + miniature.id);
  // return this.http.delete(this._url + miniature.Id, miniature);
}

}
