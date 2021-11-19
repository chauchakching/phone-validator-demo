import { Button, Input } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function App () {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data)
    console.log('phone:', data.get('phone'))
  }
  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit}>
        phone number:
        <Input name="phone" id="phone" />
        <Button type="submit">validate</Button>
      </Box>
    </div>
  )
}

export default App
