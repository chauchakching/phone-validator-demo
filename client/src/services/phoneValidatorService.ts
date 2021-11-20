import axios from 'axios'

export type PhoneValidationResult = {
  valid: boolean,
  number: string
  local_format?: string
  international_format?: string
  country_prefix?: string
  country_code?: string
  country_name?: string
  location?: string
  carrier?: string
  line_type?: string
}

export const validatePhone = async (phone: string): Promise<PhoneValidationResult> => {
  const response = await axios({
    method: 'get',
    url: `http://localhost:3000/validatePhone/${phone}`
  })
  return response.data
}
