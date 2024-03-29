import validator from 'validator';
import { IdataValidation, IdataValidationResponse } from '../interfaces/data-validation'

export class DataValidation implements IdataValidation {
  dataResponse: IdataValidationResponse = {
    status: 'Success',
    message: '',
    valid: false
  };

  user (user: any) {
    this.checkDocument(user.CPF_CNPJ)
    this.checkEmail(user.email)
    this.checkFullname(user.fullname)
    this.checkPassword(user.password)
    this.checkDocument(user.document)
    this.checkPhone(user.phone)

    return this.dataResponse
  }

  cash (amount: number) {
    const stringifyAmount = amount.toString()
    if (validator.isEmpty(stringifyAmount)) this.dataResponse.message = 'Amount cannot be empty'
    if (!validator.isCurrency(stringifyAmount)) this.dataResponse.message = 'Amount is not valid'
    return this.dataResponse
  }

  checkEmail (email: string) {
    if (validator.isEmpty(email)) this.dataResponse.message = 'Email cannot be empty'
    if (!validator.isEmail(email)) this.dataResponse.message = 'Email is not valid'
    return this.dataResponse
  }

  checkFullname (fullname: string) {
    if (validator.isEmpty(fullname))this.dataResponse.message = 'Fullname cannot be empty'
    if (!validator.isAlpha(fullname, 'pt-BR', {ignore: / /g})) this.dataResponse.message = 'FullName is not valid'
    if (fullname.search(/ /g) === -1) this.dataResponse.message = 'You should pass at least two names'
    if (!validator.isLength(fullname, { min: 6, max: 50 })) this.dataResponse.message = 'FullName should be filled with: first name + last name'
    return this.dataResponse
  }

  checkPassword (password: string) {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    if (validator.isEmpty(password)) this.dataResponse.message = 'Password cannot be empty'
    if (!validator.isAlphanumeric(password, 'pt-BR', { ignore: specialCharacters })) this.dataResponse.message = 'Password should have letters, numbers and special charaters'
    if (password.search(specialCharacters) === -1) this.dataResponse.message = 'Password should have at least one special character'
    if (!validator.isLength(password, { min: 8, max: undefined })) this.dataResponse.message = 'password should have minimum 8 charaters'
    return this.dataResponse
  }

  checkDocument (document: string) {
    if (validator.isEmpty(document)) this.dataResponse.message = 'Document CPF/CPNJ cannot be empty'
    if (validator.isNumeric(document)) this.dataResponse.message = 'Document should be numeric'
    if (!validator.isLength(document, {min: 11, max: 20})) this.dataResponse.message = 'Document should be a valid document'
    if (document.search(/[.\/-]/g) != -1) {
      const justNumbers = document.replace(/[.\/-]/g, '')
      if (justNumbers.length >= 11) this.dataResponse.message = 'Document should be a valid document'
    }
    return this.dataResponse
  }
  checkPhone (phone: string) {
    if (validator.isEmpty(phone)) this.dataResponse.message = 'Phone cannot be empty'
    if (!validator.isNumeric(phone)) this.dataResponse.message = 'Phone should be numeric'
    if (phone.length != 11) this.dataResponse.message = 'Phone should be valid'
    return this.dataResponse
  }
}
