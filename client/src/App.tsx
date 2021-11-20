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
import { reverse } from 'fp-ts/lib/Array'
import React, { useState } from 'react'
import {
  PhoneValidationResult,
  validatePhone
} from './services/phoneValidatorService'
import { css } from '@emotion/css'

type Result = {
  phone: string;
  validationResult: PhoneValidationResult;
};

function App () {
  const [results, setResults] = useState<Result[]>([])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
    const phone = (data.get('phone') as string) || ''
    console.log('phone:', phone)
    if (!phone) return
    const validationResult = await validatePhone(phone)
    setResults([...results, { phone, validationResult: validationResult }])
  }
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit}>
        phone number:
        <Input name="phone" id="phone" />
        <Button type="submit">validate</Button>
        {reverse(
          results.map((result, index) => (
            <div
              key={index}
              className={css`
                margin-bottom: 12px;
              `}
            >
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>phone</TableCell>
                      <TableCell>{result.phone}</TableCell>
                    </TableRow>
                    {Object.entries(result.validationResult).map(
                      ([key, val]) => (
                        <TableRow key={key}>
                          <TableCell>{key}</TableCell>
                          <TableCell>{String(val)}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))
        )}
      </Box>
    </div>
  )
}

export default App
