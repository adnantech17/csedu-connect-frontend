// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Components Imports
import { FormBuilder, Select, Textarea } from 'src/components/forms/FormBuilder'
import FormModalButton from 'src/components/tables/FormModalButton'
import TableWithFilter from 'src/components/tables/TableWithFilter'
import { useEffect } from 'react'
import { getUsers } from 'src/services/query/user'

const columns = [
  { id: 'username', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email_address', label: 'Email' },
  { id: 'sex', label: 'Sex' },
  { id: 'location', label: 'Location' }
]

const users = [
  { id: 1, name: 'John', age: 25, email: 'john@example.com', sex: 'Male', location: 'New York' },
  { id: 2, name: 'Jane', age: 32, email: 'jane@example.com', sex: 'Female', location: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 40, email: 'bob@example.com', sex: 'Male', location: 'Chicago' },
  { id: 4, name: 'Alice', age: 28, email: 'alice@example.com', sex: 'Female', location: 'Houston' },
  { id: 5, name: 'Tom', age: 21, email: 'tom@example.com', sex: 'Male', location: 'Miami' }
]

const filterFields = [
  { label: 'Name', field: 'name', type: 'string' },
  { label: 'Age', field: 'age', type: 'number' },
  { label: 'Email', field: 'email', type: 'string' }
]

const UsersManagement = () => {
  
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <FormModalButton
            className='d-flex m-3 justify-content-end'
            buttonTitle='+ New Invitation'
            heading='Send Invitation'
            onSubmit={() => {}}
          >
            <FormBuilder
              onSubmit={d => {
                console.log(d)
              }}
            >
              {(register, errors, { control }) => {
                return (
                  <>
                    <div className='row mt-3'>
                      <Select
                        name='receiver'
                        control={control}
                        errors={errors}
                        required={true}
                        class_name='col-12'
                        label={'Receiver'}
                        options={[{ name: 'Adnan', value: 'adnantech17' }]}
                      />
                      <Textarea
                        name='invitation_message'
                        register={register}
                        errors={errors}
                        required={true}
                        class_name='col-12'
                        label={'Invitation Message'}
                      />
                    </div>
                  </>
                )
              }}
            </FormBuilder>
          </FormModalButton>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getUsers} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UsersManagement
