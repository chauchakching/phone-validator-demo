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
  // TODO: connect to backend api
  return {
    valid: true,
    number: '14158586273',
    local_format: '4158586273',
    international_format: '+14158586273',
    country_prefix: '+1',
    country_code: 'US',
    country_name: 'United States of America',
    location: 'Novato',
    carrier: 'AT&T Mobility LLC',
    line_type: 'mobile'
  }
}
