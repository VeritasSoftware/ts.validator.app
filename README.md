# ts.validator.app

# Angular 5 CLI app demoes the ts.validator TypeScript generic validation framework.

[ts.validator framework on GitHub](https://github.com/VeritasSoftware/ts.validator)

Initial       | After validation
------------- | ----------------
![Login initial](https://github.com/VeritasSoftware/ts.validator.app/blob/master/src/Login_1.jpg)|![Login validation](https://github.com/VeritasSoftware/ts.validator.app/blob/master/src/Login_2.jpg)

*   The business rules around model validation remain centralized in the validation service.
*   This service can be injected into any component. 

 ```typescript
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
                                                                         .Required(m => m.Password, (m, pwd) => pwd == m.ConfirmPassword, "Password and Confirm Password are not the same", "Password.ConfirmPassword.NotSame")
                                                .Exec())                    
                    .Exec();
        }
    }
```