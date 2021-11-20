import {
  Autocomplete,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from '@mui/material'
import { Box } from '@mui/system'
import { reverse } from 'fp-ts/lib/Array'
import React, { useEffect, useState } from 'react'
import {
  PhoneValidationResult,
  validatePhone
} from './services/phoneValidatorService'
import { css } from '@emotion/css'
import * as localforage from 'localforage'

type Result = {
  phone: string;
  validationResult: PhoneValidationResult;
};

function App () {
  const [phoneHistory, setPhoneHistory] = useState<string[]>([])
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    ;(async () => {
      setPhoneHistory(await localforage.getItem('PHONE_HISTORY') ?? [])
    })()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const phone = (data.get('phone') as string) || ''
    if (!phone) return

    // call api to validate phone
    const validationResult = await validatePhone(phone)
    setResults([...results, { phone, validationResult }])

    // save to phone history
    const updatedPhoneHistory = [...phoneHistory, phone]
    setPhoneHistory(updatedPhoneHistory)
    localforage.setItem('PHONE_HISTORY', updatedPhoneHistory)
  }
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit}>
        phone number:
        <Autocomplete
          freeSolo
          options={phoneHistory}
          renderInput={(params) => (
            <TextField {...params} name="phone" id="phone" />
          )}
        />
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
