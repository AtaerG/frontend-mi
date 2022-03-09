import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regitser_complete = false;

  constructor() { }

  ngOnInit(): void {
  }

  canDeactivate() {
    if(!this.regitser_complete){
      return confirm("Quiere abandonar la pagina? La cuenta no se guardara!");
    } else {
      return true;
    }
  }

}
