import { Component, OnInit } from '@angular/core';
import { MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  status: string | null = localStorage.getItem('token');
  user_role: string = "";
  constructor(private mapBoxService: MapboxService) {
  }

  ngOnInit(): void {
    this.mapBoxService.buildMap();
    if(this.status != null){
      this.user_role = JSON.parse(this.status).user_role;
    }
  }
}
