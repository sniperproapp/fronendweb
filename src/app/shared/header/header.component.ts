import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  user:any=null;
constructor(public authservices:AuthService){
this.user=authservices.user;
}


logout(){this.authservices.logout();}

}
