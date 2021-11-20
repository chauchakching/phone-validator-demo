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
import { reverse, uniq } from 'fp-ts/lib/Array'
import React, { useEffect, useState } from 'react'
import {
  PhoneValidationResult,
  validatePhone
} from './services/phoneValidatorService'
import { css } from '@emotion/css'
import * as localforage from 'localforage'
import {
  EmailValidationResult,
  validateEmail
} from './services/emailValidatorService'
import * as S from 'fp-ts/string'

type ValidationHistoryEntry = {
  phone: string;
  email: string;
};

type Result = {
  phone: string;
  email: string;
  phoneValidationResult: PhoneValidationResult;
  emailValidationResult: EmailValidationResult;
};

export function App () {
  const [validationHistory, setValidationHistory] = useState<
    ValidationHistoryEntry[]
  >([])
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    (async () => {
      setValidationHistory(
        (await localforage.getItem('VALIDATION_HISTORY')) || []
      )
    })()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const phone = (data.get('phone') as string) || ''
    const email = (data.get('email') as string) || ''
    if (!phone || !email) return

    // call api to validate phone
    const phoneValidationResult = await validatePhone(phone)
    const emailValidationResult = await validateEmail(email)
    setResults([
      ...results,
      { phone, email, phoneValidationResult, emailValidationResult }
    ])

    // save to phone history
    const updatedValidationHistory = [...validationHistory, { phone, email }]
    setValidationHistory(updatedValidationHistory)
    localforage.setItem('VALIDATION_HISTORY', updatedValidationHistory)
  }
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit}>
        <Autocomplete
          freeSolo
          options={uniq(S.Eq)(validationHistory.map((entry) => entry.phone))}
          renderInput={(params) => (
            <TextField
              {...params}
              name="phone"
              id="phone"
              label="phone number"
            />
          )}
        />

        <Autocomplete
          freeSolo
          options={uniq(S.Eq)(validationHistory.map((entry) => entry.email))}
          renderInput={(params) => (
            <TextField {...params} name="email" id="email" label="email" />
          )}
        />

        <Button type="submit">validate</Button>
        {reverse(
          results.map((result, index) => (
            <div
              key={index}
              className={css`
                margin-bottom: 12px;
                display: flex;
              `}
            >
              <ResultTable
                obj={{ phone: result.phone, ...result.phoneValidationResult }}
              />
              <ResultTable
                obj={{ email: result.email, ...result.emailValidationResult }}
              />
            </div>
          ))
        )}
      </Box>
    </div>
  )
}

const ResultTable = ({ obj }: { obj: Record<string, any> }) => (
  <div
    className={css`
      margin: 4px 8px;
    `}
  >
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {Object.entries(obj).map(([key, val]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{String(val)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)
