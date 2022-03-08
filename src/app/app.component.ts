import { Component } from '@angular/core';
import { AuthService } from './forms/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-mi';

  status!:boolean;

  constructor(private authService: AuthService){}

  logout(){
    let token = localStorage.getItem('token');
    this.authService.logout(token).subscribe({
      next: () =>  {
        localStorage.removeItem('token');
    },
    });
  }
}
