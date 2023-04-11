// ** MUI Imports
import Grid from '@mui/material/Grid'
import EventCard from 'src/components/shared/EventCard'

const Event = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={10} md={10}>
        <EventCard />
        <EventCard />
        <EventCard />
      </Grid>
    </Grid>
  )
}

export default Event
