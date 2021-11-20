import axios from 'axios'

export type EmailValidationResult = {
  valid: boolean,
}

export const validateEmail = async (email: string): Promise<EmailValidationResult> => {
  const response = await axios.get(`http://localhost:3000/validateEmail/${email}`)
  return response.data
}
