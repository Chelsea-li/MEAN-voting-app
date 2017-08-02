import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessage} from 'angular-flash-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //create property for each field for the user
  name: String;
  username: String;
  email: String;
  password: String;
   
 constructor(private validateService: ValidateService, private flashMessage: FlashMessage) { } 
   
  ngOnInit() {
  }
 
   onRegisterSubmit(){
    const user = {
       name: this.name,
       username: this.username,
       email: this.email,
       password: this.password
     };
    console.log(user);

    if (!this.validateService.validateRegister(user)){
      this.flashMessage.warning("please fill in all fields",{delay:3000});
      console.log("please fill in all fields");
      return false;
    };

    if (this.validateService.validateRegister(user)){
      this.flashMessage.success("Well done! You successfully registed.",{delay:3000});
      console.log("Well done! You successfully registed.");
      return false;
    };

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.warning("Please use a valid email",{delay:3000});
      console.log("Please use a valid email");
      return false;
    };
   }
}
