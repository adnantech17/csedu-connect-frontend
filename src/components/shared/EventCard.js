// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'


const EventCard = () => {
  return (
    <Card className='mb-3'>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
              CSEDU Annual Picnic
            </Typography>
            <Typography variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
              repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
              fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati
              tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia
              aut! Impedit sit sunt quaerat, odit, tenetur error
            </Typography>
            <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
            Features:
            <ul>
              <li>Lorem ipsum dolor</li>
              <li>sit amet consectetur</li>
              <li>adipisicing elit.</li>
            </ul>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{ paddingTop: ['0 !important', '1.5rem !important'], paddingLeft: ['1.5rem !important', '0 !important'] }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: theme => `${theme.spacing(18, 5, 16)} !important`
            }}
          >
            <Box>
              <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                  25-03-2023
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 13.75, display: 'flex', flexDirection: 'column' }}>
                <span>
                  <b>Subscribe Now</b>
                </span>
                <span>To Join The Event</span>
              </Typography>
              <Button variant='contained'>Subscribe</Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default EventCard
