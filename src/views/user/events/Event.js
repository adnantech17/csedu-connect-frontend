// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import EventCard from 'src/components/shared/EventCard';
import { getEvents, subscribe } from 'src/services/query/events';

const Event = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(null);

  const getAllEvents = async (data) => {
    setLoading(true);
    try {
      const res = await getEvents(data);
      setEvents(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (id) => {
    try {
      await subscribe(id);
      toast.success('Event Subscribed');
      setLoading(true);
      const res = await getEvents();
      setEvents(res);
    } catch (err) {
      toast.error('Unable to subscribe to the event');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={10} md={10}>
        {events?.map((event) => (
          <EventCard event={event} handleSubscribe={handleSubscribe} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Event;
