import { User } from '../models/models.component'
import { ValidationResult } from '../core/validate/validator';

export interface IValidationService {
    validateUser(model: User) : ValidationResult;
}