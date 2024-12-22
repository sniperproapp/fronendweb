import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-binancepay',
  templateUrl: './binancepay.component.html',
  styleUrls: ['./binancepay.component.css']
})
export class BinancepayComponent {
  constructor(
     
    public Sanitizer: DomSanitizer,
  ) {
    
  }
  urlsanada(CLASE_SELECT:any){
    return this.Sanitizer.bypassSecurityTrustResourceUrl("https://public.bnbstatic.com/static/payment/20241211/7721f883-98b9-4b9b-b3f8-1434c778d986.jpg");
  }
}
