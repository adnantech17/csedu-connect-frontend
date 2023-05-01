// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import { createEvent, getEvents } from 'src/services/query/events';
import { formatDateTime, getFullName } from 'src/views/utilities/utils';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormModalButton from 'src/components/tables/FormModalButton';
import {
  DateInput,
  DateTimeInput,
  FileInput,
  FormBuilder,
  Input,
  Textarea,
} from 'src/components/forms/FormBuilder';
import { Button } from '@mui/material';
import { uploadImage } from 'src/services/query/image';

// ** Demo Components Imports

const filterFields = [{ label: 'Author', field: 'author', type: 'string' }];

const EventsManagement = () => {
  const [open, setOpen] = useState(false);
  const [forceReload, setForceReload] = useState(false);
  const [openManager, setOpenManager] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(data.image?.[0]);
      await createEvent({ ...data, cover_picture: imageUrl });
      setOpen(false);
      setForceReload((state) => !state);
    } catch (error) {
      toast.error('Error creating Referral code.');
    } finally {
    }
  };

  const columns = [
    { id: 'creator', label: 'Creator', render: (data) => <p>{getFullName(data)}</p> },
    { id: 'title', label: 'Title' },
    {
      id: 'start_datetime',
      label: 'Start at',
      render: (data) => formatDateTime(data),
    },
    {
      id: 'end_datetime',
      label: 'End at',
      render: (data) => formatDateTime(data),
    },
    { id: 'total_participants', label: 'Total Participants' },
    {
      id: 'action',
      label: 'Total Participants',
      render: () => (
        <div>
          <Button>Edit</Button>
          <Button onClick={() => setOpenManager(true)}>Add Manager</Button>
        </div>
      ),
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormModalButton
          open={open}
          setOpen={setOpen}
          className="d-flex m-3 justify-content-end"
          buttonTitle="+ New Event"
          heading="Create New Event"
        >
          <FormBuilder onSubmit={handleSubmit}>
            {(register, errors, { control }) => {
              return (
                <>
                  <div className="row mt-3">
                    <Input
                      name="title"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-12"
                      label={'Title'}
                    />
                  </div>
                  <div className="row mt-3">
                    <Textarea
                      name="description"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-12"
                      label={'Description'}
                    />
                  </div>
                  <div className="row mt-3">
                    <Input
                      name="location"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-12"
                      label={'Location'}
                    />
                  </div>
                  <div className="row mt-3">
                    <DateTimeInput
                      name="start_datetime"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-6"
                      label={'Start DateTime'}
                    />
                    <DateTimeInput
                      name="end_datetime"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-6"
                      label={'End DateTime'}
                    />
                  </div>
                  <div className="row mt-3">
                    <FileInput
                      name="image"
                      errors={errors}
                      required={true}
                      register={register}
                      class_name="col-12"
                      label={'Cover Picture'}
                    />
                  </div>

                  <Button className="text-right" type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </>
              );
            }}
          </FormBuilder>
        </FormModalButton>
        <Card>
          <CardHeader title="Events Management" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter
            forceReload={forceReload}
            columns={columns}
            filterFields={filterFields}
            fetchData={getEvents}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default EventsManagement;
