import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Validator } from './validator';

class Employee {
    Name: string;
    CreditCards: CreditCard[];
    Super: Super;
    Email: string;
 }
 
 class CreditCard {
   Number: number;
   Name: string;
 }
 
 class Super {
    Name: string;
    Code: string;
 }

describe('ValidatorTests', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
  });

  it('should have no validation errors', () => {
    var model = new Employee();
    model.Name = "John Doe";

    model.CreditCards = new Array<CreditCard>();
    var masterCard = new CreditCard();
    masterCard.Number = 5105105105105100;
    masterCard.Name = "John Doe"
    var amexCard = new CreditCard();
    amexCard.Number = 371449635398431;
    amexCard.Name = "John Doe"
    model.CreditCards.push(masterCard);
    model.CreditCards.push(amexCard);

    model.Super = new Super();
    model.Super.Name = "XYZ Super Fund";
    model.Super.Code = "XY1234";

    model.Email = "john.doe@xyx.com";

    var validationResult = new Validator(model)                              
                                .NotEmpty(m => m.Name, "Should not be empty", "Employee.Name.Empty")
                                .NotNull(m => m.CreditCards, "Should not be null", "CreditCard.Null")
                                .NotNull(m => m.Super, "Should not be null", "Super.Null")
                                .NotEmpty(m => m.Email, "Should not be empty", "Employee.Email.Empty")
                                .If(m => m.Super != null, validator => validator
                                                                                .NotEmpty(m => m.Super.Name, "Should not be empty", "Super.Code.Empty")
                                                                                .Matches(m => m.Super.Code, "^[a-zA-Z]{2}\\d{4}$", "Should not be invalid", "Super.Code.Invalid")
                                                                      .Exec())
                                .If(m => m.Email != '', validator => 
                                                                    validator.Email(m => m.Email, "Should not be invalid", "Employee.Email.Invalid")
                                                        .Exec())
                                .Required(m => m.CreditCards, (m, creditCards) => creditCards.length > 0, "Must have atleast 1 credit card", "CreditCard.Required")
                                .If(m => m.CreditCards != null && m.CreditCards.length > 0, 
                                            validator => validator
                                                                .ForEach(m => m.CreditCards, validator => 
                                                                                validator.CreditCard(m => m.Number, "Should not be invalid", "CreditCard.Number.Invalid")
                                                                                         .RequiredAsync([
                                                                                            {
                                                                                              predicate: m => m.Number,
                                                                                              required: (m, ccNo) => {
                                                                                                //Some long running task to validate 
                                                                                                //that the credit card no exists.
                                                                                                //return true or false.
                                                                                                return true;
                                                                                              },
                                                                                              message: "The credit card number does not exist",
                                                                                              errorIdentifier: "CreditCard.Number.DoesNotExist"
                                                                                            },
                                                                                            {
                                                                                              predicate: m => m.Name,
                                                                                              required: (m, ccName) => {
                                                                                                //Some long running task to validate 
                                                                                                //that the credit card name does not exist in our database.
                                                                                                //return true or false.
                                                                                                return true;
                                                                                              },
                                                                                              message: "The credit card name exists in our database.",
                                                                                              errorIdentifier: "CreditCard.Number.AlreadyExists"
                                                                                            }
                                                                                          ])
                                                                              .Exec())
                                                        .Exec())                                                            
                            .Exec(); 
    
    expect(validationResult.IsValid).toBeTruthy();
  });
});
