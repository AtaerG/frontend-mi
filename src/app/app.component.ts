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

  status:string|null = sessionStorage.getItem('token');
  role: string = "normal_user";
  user_id!: number;
  constructor(private authService: AuthService, private router: Router){
    if(this.status != null){
      this.role = JSON.parse(this.status).user_role;
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  logout(){
    let token = sessionStorage.getItem('token');
    this.authService.logout(token).subscribe({
      next: () =>  {
        sessionStorage.clear();
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });;
    },
    });
  }
}
