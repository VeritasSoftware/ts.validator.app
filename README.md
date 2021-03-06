# ts.validator.app

# Angular 5 CLI app demoes the ts.validator TypeScript based generic validation framework.

[**ts.validator framework on GitHub**](https://github.com/VeritasSoftware/ts.validator)

[**Article on framework**](https://www.c-sharpcorner.com/article/ts-validator-typescript-based-generic-validation-framework/)

| Initial | After validation |
| --- | --- |
| ![Login initial](https://github.com/VeritasSoftware/ts.validator.app/blob/master/src/Login_1.jpg) | ![Login validation](https://github.com/VeritasSoftware/ts.validator.app/blob/master/src/Login_2.jpg) | 

*   The business rules around model validation remain centralized in the validation service.
*   This service can be injected into any component. 

 ```typescript
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
                .Exec();
    }                           

    validateRegisterUser(model: RegisterUser) : ValidationResult {
        return new Validator(model)
                    .NotEmpty(m => m.Name, "Name cannot be empty")
                    .NotEmpty(m => m.CreditCardNo, "Credit Card Number cannot be empty")                    
                    .If(m => m.CreditCardNo != "", validator =>
                                                        validator.For(m => m.CreditCardNo, creditCardValidator =>
                                                                                                creditCardValidator.Length(13, 19, "Credit Card Number length is invalid")
                                                                                                                   .CreditCard("Credit Card Number is invalid")
                                                                                            .Exec()
                                                                     )                                                                
                                                    .Exec())
                    .NotEmpty(m => m.Id, "Id cannot be empty")
                    .NotEmpty(m => m.Email, "Email cannot be empty")
                    .If(m => m.Email != "", validator =>
                                                        validator.Email(m => m.Email, "Email is invalid")
                                            .Exec())
                    .NotEmpty(m => m.Password, "Pwd cannot be empty")
                    .NotEmpty(m => m.ConfirmPassword, "Confirm Pwd cannot be empty") 
                    .If(m => m.Password != "", validator =>
                                                    validator.For(m => m.Password, passwordValidator => 
                                                                                        passwordValidator.Matches("(?=.*?[0-9])(?=.*?[a-z])(?=.*?[A-Z])", "Password strength is not valid")
                                                                                                         .Required((m, pwd) => pwd.length > 3, "Password length should be greater than 3") 
                                                                                                         .Required((m, pwd) => pwd == m.ConfirmPassword, "Password and Confirm Password are not the same")
                                                                                   .Exec()
                                                                 )
                                               .Exec())                    
                .Exec();
    }
}
```

**In the above code snippet:**

*   There is a **Validation Service** in the Angular 5 CLI app.
*   All business rules around model validation are centralized in this service.
*   There are 2 models for the **components** **Login** and **Register**. These **models** are **User** and **RegisterUser**.
*   The Validation Service creates 2 methods to validate these models. These **methods** are **validateUser** and **validateRegisterUser**.
*   In these methods, the framework class **Validator** is used to lay the validation rules for the models.
*   This service is injected into the components.
*   The methods of the service are used for model validation.