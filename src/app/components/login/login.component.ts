import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validator, ValidationError, ValidationResult } from '../../core/validate/validator'
import {NgbTooltip, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/models.component'
import { ValidationService } from '../../services/validation-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbTooltipConfig, ValidationService] 
})
export class LoginComponent implements OnInit {
loginUser : User;
Id: string;
Pwd: string;
title: string = "Login"
validationResult: ValidationResult;

  @ViewChild('t') public tooltip: NgbTooltip;
  @ViewChild('t1') public tooltip1: NgbTooltip;

  constructor(config: NgbTooltipConfig, private validationService: ValidationService) {
    config.placement = 'top';
    config.triggers = 'manual';
   }

  ngOnInit() {     
    this.loginUser = new User("", "");
  }

  public showValidationTooltip(name: string, tooltip: NgbTooltip): void {    
    tooltip.close();
    var error = this.validationResult.Identifier(name);
    if (error != null){
      var msg = error.Message;            
      setTimeout(()=> tooltip.open(msg));
    }        
  }  

  login() {
     this.validationResult = this.validationService.validateUser(this.loginUser);    

     this.showValidationTooltip("Id", this.tooltip);
     this.showValidationTooltip("Pwd", this.tooltip1);                            
  }

}
