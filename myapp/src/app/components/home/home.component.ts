import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: any;
  user: any;
  constructor(private app: AppService, private loginSrv: LoginService ) {}
  getProduct() {
    this.app.products(6).subscribe((res: any) => {
      this.products = res.result;
    });
  }
  ngOnInit(): void {
    this.user = this.loginSrv.checkLogin();
    this.getProduct();
  }

  onLike(product_id: number) {
    let data = {
      product_id: product_id,
      account_id: this.user.id
    }
    this.app.onFavorite(data).subscribe((res: any) => {
      alert(res.message);
      this.getProduct();
    });
  }
}
