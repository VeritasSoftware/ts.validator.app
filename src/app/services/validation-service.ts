import {Injectable} from '@angular/core'

import { IValidationService } from './ivalidation-service'
import { User, RegisterUser } from '../models/models.component'
import { Validator, ValidationResult } from '../core/validate';

@Injectable()
export class ValidationService implements IValidationService {
    validateUser(model: User) : ValidationResult {
        return new Validator(model)
                    .NotEmpty(m => m.Id, "Id cannot be empty")
                    .NotEmpty(m => m.Pwd, "Pwd cannot be empty")
                    .If(m => m.Id != '' && m.Pwd != '', validator => 
                                                validator.RequiredAsync([
                                                                            { 
                                                                                predicate: m => m.Id, 
                                                                                required: (m, id) => {
                                                                                                        var userId = id;
                                                                                                        var pwd = m.Pwd;                                                    
                                                                                                        //Some long running validation task
                                                                                                        //Eg. id, pwd match in the database.  
                                                                                                        //You will return true or false from this must func
                                                                                                        return false;
                                                                                                    }, 
                                                                                message: "Id and/or Password do not match our records", 
                                                                                errorIdentifier: "Pwd.LoginFailed" 
                                                                            },
                                                                            { 
                                                                                predicate: m => m.Id, 
                                                                                required: (m, id) => {
                                                                                                        var userId = id;                                                    
                                                                                                        //Some long running validation task
                                                                                                        //Eg. user with id already logged in.  
                                                                                                        //You will return true or false from this must func
                                                                                                        return true;
                                                                                                    }, 
                                                                                message: "You are already logged in", 
                                                                                errorIdentifier: "Pwd.AlreadyLoggedIn" 
                                                                            } 
                                                                        ])
                                    .Exec()
                    )                                                         
                .Exec();
    }                           

    validateRegisterUser(model: RegisterUser) : ValidationResult {
        return new Validator(model)
                    .NotEmpty(m => m.Name, "Name cannot be empty")
                    .NotEmpty(m => m.CreditCardNo, "Credit Card Number cannot be empty")
                    .If(m => m.CreditCardNo != "", validator => 
                                                                validator.CreditCard(m => +m.CreditCardNo, "Credit Card Number is invalid", "CreditCardNo.Invalid")
                                                    .Exec())
                    .NotEmpty(m => m.Id, "Id cannot be empty")
                    .NotEmpty(m => m.Email, "Email cannot be empty")
                    .If(m => m.Email != "", validator =>
                                                        validator.Email(m => m.Email, "Email is invalid", "Email.Invalid")
                                            .Exec())
                    .NotEmpty(m => m.Password, "Pwd cannot be empty")
                    .NotEmpty(m => m.ConfirmPassword, "Confirm Pwd cannot be empty") 
                    .If(m => m.Password != "", validator => 
                                                            validator.Required(m => m.Password, (m, pwd) => pwd.length > 3, "Password length should be greater than 3", "Password.Length.GreaterThan3") 
                                                                     .Required(m => m.Password, (m, pwd) => pwd == m.ConfirmPassword, "Password and Confirm Password are not the same", "Password.ConfirmPassword.NotSame")
                                               .Exec())                    
                .Exec();
    }
}