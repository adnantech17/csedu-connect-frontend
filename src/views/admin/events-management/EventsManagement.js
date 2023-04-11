// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableWithFilter from 'src/components/tables/TableWithFilter'

// ** Demo Components Imports

const columns = [
  { id: 'author', label: 'Author' },
  { id: 'date', label: 'Date' },
  { id: 'title', label: 'Title' },
  { id: 'total_participants', label: 'Total Participants' }
]

const data = [
  { id: 1, author: 'John', title: 'Title 1', email: 'john@example.com', total_participants: 10, date: '2023-3-26' },
  { id: 2, author: 'Jane', title: 'Title 2', email: 'jane@example.com', total_participants: 10, date: '2023-3-27' },
  { id: 3, author: 'Bob', title: 'Title 3', email: 'bob@example.com', total_participants: 10, date: '2023-3-28' },
  { id: 4, author: 'Alice', title: 'Title 4', email: 'alice@example.com', total_participants: 10, date: '2023-3-29' },
  { id: 5, author: 'Tom', title: 'Title 5', email: 'tom@example.com', total_participants: 10, date: '2023-3-20' }
]

function getData() {
  return new Promise((resolve, reject) => {
    resolve({ data: data, success: true, meta: { count: data.length } })
  })
}

const filterFields = [{ label: 'Author', field: 'author', type: 'string' }]

const EventsManagement = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Sticky Header' titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getData} />
        </Card>
      </Grid>
    </Grid>
  )
}

export default EventsManagement
