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
  role: string = "normal_user";
  user_id!: number;
  constructor(private authService: AuthService, private router: Router){
    if(this.status != null){
      this.role = JSON.parse(this.status).user_role;
      this.user_id = JSON.parse(this.status).user_id;
    }
  }

  logout(){
    let token = localStorage.getItem('token');
    if(token != null){
    this.authService.logout(token).subscribe({
      next: () =>  {
        localStorage.clear();
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });;
    },
    });
  }
 }
}
