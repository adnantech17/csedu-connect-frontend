// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import {
  addManager,
  createEvent,
  deleteEvent,
  deleteManager,
  getEvents,
  updateEvent,
} from 'src/services/query/events';
import { formatDateTime, getFullName, getFullNameAlt } from 'src/views/utilities/utils';
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
import ConfirmationPopup from 'src/components/popup/ConfirmationPopup';
import ThumbImg from 'src/components/shared/ThumbImg';

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
  const [currentImg, setCurrentImg] = useState(null);

  const handleSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(data.image?.[0]);
      await (selectedEvent ? updateEvent : createEvent)({
        ...data,
        id: selectedEvent?.id,
        cover_picture: imageUrl || currentImg,
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
      toast.success('Manager Added!');
    } catch (error) {
      toast.error('Error adding Manager!');
      console.log(error);
    }
  };

  const handleRemove = async (user) => {
    try {
      await deleteManager(selectedEvent.id, user);
      setManagers((state) => state.filter((u) => u.id !== user.id));
      setForceReload((state) => !state);
      toast.success('Manager Removed!');
    } catch (error) {
      console.log(error);
      toast.error('Error removing Manager!');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      toast.success('Event Deleted Successfully!');
      setForceReload((state) => !state);
    } catch (error) {
      toast.error('Event Deletion Failed!');
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
    { id: 'guest_count', label: 'Total Participants', render: (data) => data },
    {
      id: 'action',
      label: 'Actions',
      render: (_, row) => (
        <div>
          {row.is_manager && (
            <Button
              onClick={() => {
                setCurrentImg(row?.cover_picture);
                setSelectedEvent(row);
                setOpen(true);
              }}
              size="small"
            >
              Edit
            </Button>
          )}
          {row.is_manager && (
            <Button
              onClick={() => {
                setSelectedEvent(row);
                setOpenManager(true);
                console.log(row);
                setManagers(row.managers);
              }}
              size="small"
            >
              Add Manager
            </Button>
          )}
          {row.is_creator_or_superuser && (
            <ConfirmationPopup onConfirm={() => handleDeleteEvent(row.id)}>
              <Button color="error" variant="contained" size="small">
                Delete
              </Button>
            </ConfirmationPopup>
          )}
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
                    {getFullNameAlt(user)}
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
                      {idx + 1}. {getFullNameAlt(manager)}
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
                    {currentImg && (
                      <ThumbImg
                        src={selectedEvent?.cover_picture}
                        style={{ width: '64px', height: 'auto', objectFit: 'contain' }}
                        onClose={() => {
                          setCurrentImg(null);
                        }}
                      />
                    )}
                    <FileInput
                      name="image"
                      errors={errors}
                      register={register}
                      class_name="col-12"
                      onChange={() => {
                        setCurrentImg(null);
                      }}
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
