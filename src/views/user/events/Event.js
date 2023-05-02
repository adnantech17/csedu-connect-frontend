// ** MUI Imports
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from 'src/components/container/Loader';
import EventCard from 'src/components/shared/EventCard';
import { getEvents, subscribe, unsubscribe } from 'src/services/query/events';

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

  const handleSubscribe = async (id, is_subscriber) => {
    try {
      await (is_subscriber ? unsubscribe : subscribe)(id);
      toast.success(`Event ${is_subscriber ? 'Unsubscribed' : 'Subscribed'}`);
      setLoading(true);
      const res = await getEvents();
      setEvents(res);
    } catch (err) {
      toast.error(`Unable to  ${is_subscriber ? 'unsubscribe' : 'subscribe'} to the event`);
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
        <Loader isLoading={loading}>
          {events?.map((event) => (
            <EventCard event={event} handleSubscribe={handleSubscribe} />
          ))}
        </Loader>
      </Grid>
    </Grid>
  );
};

export default Event;
