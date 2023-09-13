import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  products: any;
  constructor(private app: AppService, private loginSrv: LoginService) { }
  getProduct() {
    this.app.favorites(this.loginSrv.checkLogin().id).subscribe((res: any) => {
      this.products = res.result;
    });
  }
  ngOnInit(): void {
    this.getProduct();
  }

  onLike(product_id: number) {
    let data = {
      product_id: product_id,
      account_id: this.loginSrv.checkLogin().id
    }
    this.app.onFavorite(data).subscribe((res: any) => {
      alert(res.message);
      this.getProduct();
    });
  }
}
