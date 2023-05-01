// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import { formatDateTime } from 'src/views/utilities/utils';

const EventCard = ({ event, handleSubscribe }) => {
  return (
    <Card className="mb-3">
      <Grid container spacing={6}>
        <Grid item xs={12} sm={7}>
          <CardContent sx={{ padding: (theme) => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
            <Typography variant="h6" sx={{ marginBottom: 3.5 }}>
              {event.title}
            </Typography>
            <Typography variant="body2">{event.description}</Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          sm={5}
          xs={12}
          sx={{
            paddingTop: ['0 !important', '1.5rem !important'],
            paddingLeft: ['1.5rem !important', '0 !important'],
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'action.hover',
              padding: (theme) => `${theme.spacing(18, 5, 16)} !important`,
            }}
          >
            <Box>
              <Box
                sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              >
                <Typography variant="h4" sx={{ lineHeight: 1, fontWeight: 600 }}>
                  {formatDateTime(event.start_datetime)}
                </Typography>
                <Typography variant="h3" sx={{ lineHeight: 1, fontWeight: 600 }}>
                  TO
                </Typography>
                <Typography variant="h4" sx={{ lineHeight: 1, fontWeight: 600 }}>
                  {formatDateTime(event.end_datetime)}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 3, display: 'flex', flexDirection: 'column' }}>
                <span>
                  <b>Subscribe Now</b>
                </span>
                <span>To Join The Event</span>
              </Typography>
              <Button variant="contained" onClick={() => handleSubscribe(event.id)}>
                Subscribe
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventCard;
