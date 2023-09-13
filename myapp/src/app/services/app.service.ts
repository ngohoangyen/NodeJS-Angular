import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const api = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

  products(limit: number = 4): any {
    return this.http.get<any>(`${api}/products/?limit=`+limit);
  }
  favorites(account_id: number): any {
    return this.http.get<any>(`${api}/favorites/${account_id}`);
  }

  onFavorite(data: any): any {
    return this.http.post<any>(`${api}/favorites`, data);
  }
}
