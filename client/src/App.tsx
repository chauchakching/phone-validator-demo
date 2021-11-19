import {
  Button,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import {
  PhoneValidationResult,
  validatePhone
} from './services/phoneValidatorService'

function App () {
  const [result, setResult] = useState<PhoneValidationResult>()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
    const phone = (data.get('phone') as string) || ''
    console.log('phone:', phone)
    if (!phone) return
    const validationResult = await validatePhone(phone)
    setResult(validationResult)
  }
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit}>
        phone number:
        <Input name="phone" id="phone" />
        <Button type="submit">validate</Button>
        {result && (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                {Object.entries(result).map(([key, val]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{val}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  )
}

export default App
