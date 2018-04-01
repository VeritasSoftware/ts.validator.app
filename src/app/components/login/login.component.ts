import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { Validator, ValidationError, ValidationResult } from '../../core/validate/validator'
import {NgbTooltip, NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/models.component'
import { ValidationService } from '../../services/validation-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  },
  providers: [NgbTooltipConfig, ValidationService] 
})
export class LoginComponent implements OnInit {
loginUser : User;
Id: string;
Pwd: string;
title: string = "Login"
validationResult: ValidationResult;

   @ViewChild('t') public tooltipId: NgbTooltip;
   @ViewChild('t1') public tooltipPwd: NgbTooltip;

  constructor(config: NgbTooltipConfig, private validationService: ValidationService) {
    config.placement = 'top';
    config.triggers = 'manual';
   }

  ngOnInit() {     
    this.loginUser = new User("", "");
  }

  onResize(event){
    this.validateForm();
  }

  validateMe(p: string) {
    this.validationResult = this.validationService.validateUser(this.loginUser);    
    var errors = this.validationResult.IdentifierStartsWith(p);
    return !(errors != null && errors.length > 0);     
  }

  validateForm() {
    this.validationResult = this.validationService.validateUser(this.loginUser);

    this.showValidationTooltip(this.tooltipId);
    this.showValidationTooltip(this.tooltipPwd); 
  }

  public showValidationTooltip(tooltip: NgbTooltip): void {    
    tooltip.close();
    setTimeout(()=> tooltip.open());    
  }  

  login() {
     this.validateForm();                            
  }

}
