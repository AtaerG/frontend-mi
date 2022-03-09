import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-mi';

  status:string|null = localStorage.getItem('token');

  constructor(private authService: AuthService, private router: Router){}

  logout(){
    let token = localStorage.getItem('token');
    this.authService.logout(token).subscribe({
      next: () =>  {
        localStorage.removeItem('token');
        window.location.reload();
        this.router.navigate(['/']);
    },
    });
  }
}
