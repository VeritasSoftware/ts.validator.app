import {Injectable} from '@angular/core'

import { IValidationService } from './ivalidation-service'
import { User } from '../models/models.component'
import { Validator, ValidationResult } from '../core/validate/validator';

@Injectable()
export class ValidationService implements IValidationService {
    validateUser(model: User) : ValidationResult {
        return new Validator(model)
                    .NotEmpty(m => m.Id, "Id cannot be empty")
                    .NotEmpty(m => m.Pwd, "Pwd cannot be empty")                                                         
                .Exec();
    }
}