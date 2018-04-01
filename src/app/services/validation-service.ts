import {Injectable} from '@angular/core'

import { IValidationService } from './ivalidation-service'
import { User, RegisterUser } from '../models/models.component'
import { Validator, ValidationResult } from '../core/validate/validator';

@Injectable()
export class ValidationService implements IValidationService {
    validateUser(model: User) : ValidationResult {
        return new Validator(model)
                    .NotEmpty(m => m.Id, "Id cannot be empty")
                    .NotEmpty(m => m.Pwd, "Pwd cannot be empty")                                                         
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
                    .NotEmpty(m => m.Password, "Pwd cannot be empty")
                    .NotEmpty(m => m.ConfirmPassword, "Confirm Pwd cannot be empty") 
                    .If(m => m.Password != "", validator => 
                                                            validator.Required(m => m.Password, (m, pwd) => pwd.length > 3, "Password.Length.GreaterThan3") 
                                               .Exec())
                    .Required(m => m.Password, (m, pwd) => pwd == m.ConfirmPassword, "Password and Confirm Password are not the same", "Password.ConfirmPassword.NotSame")
                .Exec();
    }
}