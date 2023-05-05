// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import { FormBuilder, Input, Textarea } from 'src/components/forms/FormBuilder';
import FormModalButton from 'src/components/tables/FormModalButton';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import { createReferrals, getUsers, makeAdmin } from 'src/services/query/user';
import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { adminMailSend } from 'src/services/query/mails';
import { Add, Send } from '@mui/icons-material';
import ConfirmationPopup from 'src/components/popup/ConfirmationPopup';

const columns = [
  { id: 'username', label: 'Name' },
  { id: 'first_name', label: 'First Name' },
  { id: 'last_name', label: 'Last Name' },
  { id: 'email_address', label: 'Email' },
  { id: 'batch_number', label: 'Batch' },
  { id: 'company', label: 'Company' },
  { id: 'country', label: 'Country' },
];

const filterFields = [
  { label: 'Batch', field: 'batch', type: 'string' },
  { label: 'Company', field: 'company', type: 'string' },
  { label: 'Hometown', field: 'hometown', type: 'string' },
  { label: 'Country', field: 'country', type: 'string' },
  { label: 'City', field: 'city', type: 'string' },
];

const UsersManagement = () => {
  const [open, setOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [forceReload, setForceReload] = useState(false);

  const onselectionchange = (users) => {
    setSelectedUsers(users);
  };

  const handleSubmit = async (data) => {
    try {
      const res = await createReferrals(data);
      setOpen(false);
      toast.success(`Your referral code is sent to ${data.email}.`);
    } catch (error) {
      toast.error('Error creating Referral code.');
    } finally {
    }
  };

  const handleMailSend = async (data) => {
    try {
      const res = await adminMailSend({
        ...data,
        recipients: selectedUsers.map((data) => data.username),
      });
      setEmailDialogOpen(false);
      toast.success('Email sent successfully.');
    } catch (error) {
      toast.error('Error sending mail');
    }
  };

  const handleAdmin = async (username) => {
    try {
      const res = await makeAdmin({
        username: username,
      });
      setEmailDialogOpen(false);
      setForceReload((state) => !state);
      toast.success('New Admin added.');
    } catch (error) {
      toast.error('Error adding new Admin!');
    }
  };

  const columns = [
    { id: 'username', label: 'Name' },
    { id: 'first_name', label: 'First Name' },
    { id: 'last_name', label: 'Last Name' },
    { id: 'email_address', label: 'Email' },
    { id: 'batch_number', label: 'Batch' },
    { id: 'company', label: 'Company' },
    { id: 'country', label: 'Country' },
    {
      id: 'admin',
      label: 'Actions',
      render: (_, row) =>
        !row.is_admin && (
          <ConfirmationPopup onConfirm={() => handleAdmin(row.username)}>
            <Button>Make Admin</Button>
          </ConfirmationPopup>
        ),
    },
  ];
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <div className="d-flex justify-content-end">
            <FormModalButton
              open={open}
              setOpen={setOpen}
              className="d-flex justify-content-end"
              buttonTitle={
                <span>
                  <Add style={{ fontSize: 18, marginBottom: '2px' }} /> New Invitation
                </span>
              }
              heading="Send Invitation"
            >
              <FormBuilder onSubmit={handleSubmit}>
                {(register, errors, { control }) => {
                  return (
                    <>
                      <div className="row mt-3">
                        <Input
                          name="referred_email"
                          errors={errors}
                          required={true}
                          register={register}
                          class_name="col-12"
                          label={'Email'}
                        />
                      </div>

                      <Button
                        className="text-right"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </>
                  );
                }}
              </FormBuilder>
            </FormModalButton>
            {selectedUsers?.length > 0 && (
              <FormModalButton
                className="d-flex ms-3 justify-content-end"
                buttonTitle={
                  <span>
                    <Send style={{ fontSize: 18, marginBottom: '2px' }} /> Send Mails
                  </span>
                }
                heading="Send Mail"
                onSubmit={() => {}}
                open={emailDialogOpen}
                setOpen={setEmailDialogOpen}
              >
                <FormBuilder onSubmit={handleMailSend}>
                  {(register, errors, { control }) => {
                    return (
                      <>
                        <div className="row mt-3">
                          <Input
                            name="subject"
                            register={register}
                            errors={errors}
                            required={true}
                            class_name="col-12"
                            label={'Subject'}
                          />
                          <Textarea
                            name="body"
                            register={register}
                            errors={errors}
                            required={true}
                            class_name="col-12"
                            label={'Email Body'}
                          />
                          <Button variant="outlined" type="submit">
                            Submit
                          </Button>
                        </div>
                      </>
                    );
                  }}
                </FormBuilder>
              </FormModalButton>
            )}
          </div>
          <CardHeader title="User Management" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter
            forceReload={forceReload}
            columns={columns}
            filterFields={filterFields}
            fetchData={getUsers}
            onSelectionChange={onselectionchange}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default UsersManagement;
