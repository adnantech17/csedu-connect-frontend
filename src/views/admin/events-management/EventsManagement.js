// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import {
  addManager,
  createEvent,
  deleteManager,
  getEvents,
  updateEvent,
} from 'src/services/query/events';
import { formatDateTime, getFullName } from 'src/views/utilities/utils';
import { useEffect, useState } from 'react';
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
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';
import { uploadImage } from 'src/services/query/image';
import { getUsers } from 'src/services/query/user';
import { IconCross } from '@tabler/icons';
import { RemoveCircleOutline } from '@mui/icons-material';

// ** Demo Components Imports

const filterFields = [{ label: 'Author', field: 'author', type: 'string' }];

const EventsManagement = () => {
  const [open, setOpen] = useState(false);
  const [forceReload, setForceReload] = useState(false);
  const [openManager, setOpenManager] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [managers, setManagers] = useState([]);

  const handleSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(data.image?.[0]);
      await (selectedEvent ? updateEvent : createEvent)({
        ...data,
        id: selectedEvent?.id,
        cover_picture: imageUrl,
      });
      setOpen(false);
      setForceReload((state) => !state);
    } catch (error) {
      toast.error('Error Occured!!');
    } finally {
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!open) setSelectedEvent(null);
  }, [open]);

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      await addManager(selectedEvent.id, selectedUser);
      setManagers((state) => [...state, selectedUser]);
      setForceReload((state) => !state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (user) => {
    try {
      await deleteManager(selectedEvent.id, user);
      setManagers((state) => state.filter((u) => u.id !== user.id));
      setForceReload((state) => !state);
    } catch (error) {
      console.log(error);
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
      render: (_, row) => (
        <div>
          <Button
            onClick={() => {
              setSelectedEvent(row);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedEvent(row);
              setOpenManager(true);
              setManagers(row.managers);
            }}
          >
            Add Manager
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Dialog
          open={openManager}
          onClose={() => {
            setOpenManager(false);
          }}
          maxWidth={'lg'}
        >
          <DialogTitle>Managers</DialogTitle>
          <DialogContent className="align-items-center">
            <div>
              <Select
                value={selectedUser}
                onChange={handleUserSelect}
                style={{ width: '200px', marginRight: 16 }}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {getFullName(user)}
                  </MenuItem>
                ))}
              </Select>
              <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Add User
              </Button>
            </div>
            <div className="mt-4">
              <Card className="p-2">
                {managers?.map((manager, idx) => (
                  <div className="d-flex justify-content-between">
                    <p>
                      {idx + 1}. {getFullName(manager)}
                    </p>
                    <RemoveCircleOutline
                      className="cursor-pointer"
                      onClick={() => handleRemove(manager)}
                    />
                  </div>
                ))}
              </Card>
            </div>
          </DialogContent>
        </Dialog>
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
                      defaultValue={selectedEvent?.title}
                      class_name="col-12"
                      label={'Title'}
                    />
                  </div>
                  <div className="row mt-3">
                    <Textarea
                      name="description"
                      errors={errors}
                      defaultValue={selectedEvent?.description}
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
                      defaultValue={selectedEvent?.location}
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
                      defaultValue={selectedEvent?.start_datetime?.slice(0, -1)}
                      required={true}
                      register={register}
                      class_name="col-6"
                      label={'Start DateTime'}
                    />
                    <DateTimeInput
                      name="end_datetime"
                      errors={errors}
                      defaultValue={selectedEvent?.end_datetime?.slice(0, -1)}
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
