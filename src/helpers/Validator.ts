import {
  MAX_AGE,
  MAX_HEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MIN_HEIGHT,
  MIN_WEIGHT,
} from "./constants";
import { ValidationResult } from "./enums";

export default class Validator {
  public validateString = (
    string: string,
    wordLimit?: number
  ): ValidationResult => {
    if (string.length === 0) return ValidationResult.ERROR_EMPTY;
    if (wordLimit && wordLimit > 0 && string.length > wordLimit)
      return ValidationResult.ERROR_INVALID;
    return ValidationResult.SUCCESS;
  };

  public validateNumber = (
    number: number,
    min?: number,
    max?: number
  ): ValidationResult => {
    if (isNaN(number)) return ValidationResult.ERROR_EMPTY;
    if (number < 0 || (min && number < min) || (max && number > max))
      return ValidationResult.ERROR_INVALID;
    return ValidationResult.SUCCESS;
  };

  public validateEmail = (email: string): ValidationResult => {
    if (email.length === 0) return ValidationResult.ERROR_EMPTY;
    if (!email.includes("@") || !email.includes(".") || email.length < 5)
      return ValidationResult.ERROR_INVALID;
    return ValidationResult.SUCCESS;
  };

  public validatePhone = (phoneNumber: string): ValidationResult => {
    if (phoneNumber.length === 0) return ValidationResult.ERROR_EMPTY;

    const regex = new RegExp(/^(\+420)? ?[6-7]{1}[0-9]{8}/);
    const numberToTest = phoneNumber.replace(/\s/g, "");
    const match = numberToTest.match(regex);
    if (match === null || match[0] !== numberToTest)
      return ValidationResult.ERROR_INVALID;

    return ValidationResult.SUCCESS;
  };

  public validateWeight = (weight: number): ValidationResult => {
    return this.validateNumber(weight, MIN_WEIGHT, MAX_WEIGHT);
  };

  public validateHeight = (weight: number): ValidationResult => {
    return this.validateNumber(weight, MIN_HEIGHT, MAX_HEIGHT);
  };

  public validateAge = (weight: number): ValidationResult => {
    return this.validateNumber(weight, MIN_AGE, MAX_AGE);
  };
}
