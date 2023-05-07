import { Button, Card, CardHeader } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import FormModalButton from 'src/components/tables/FormModalButton';
import {
  CheckboxInput,
  FormBuilder,
  Input,
  Select,
  Textarea,
} from 'src/components/forms/FormBuilder';
import { getMyMails, userSendMail } from 'src/services/query/mails';
import { formatDateTime, getFullName } from 'src/views/utilities/utils';
import { Close, Done } from '@mui/icons-material';
import { getUsers } from 'src/services/query/user';
import { toast } from 'react-toastify';

const columns = [
  { id: 'sender', label: 'From', render: (data) => getFullName(data) },
  {
    id: 'recipients',
    label: 'To',
    render: (data) => (data?.length > 1 ? 'Multiple Recipients' : getFullName(data[0])),
  },
  { id: 'sent_at', label: 'Date', render: (data) => formatDateTime(data) },
  { id: 'subject', label: 'Subject' },
  {
    id: 'is_mail_private',
    label: 'Private',
    render: (data) =>
      data ? <Done style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />,
  },
];

const Emails = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const filterFields = [
    {
      label: 'To',
      field: 'recipient',
      type: 'select',
      options: users.map((user) => ({
        name: getFullName(user),
        value: user.username,
      })),
    },
  ];

  const getAllUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const handleSubmit = async (data) => {
    try {
      const res = await userSendMail(data);
      setOpen(false);
      toast.success('Mail sent successfully.');
    } catch (error) {
      console.log(error);
      toast.error('Unable to send mail.');
    } finally {
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Card>
        <FormModalButton
          className="d-flex m-3 justify-content-end"
          buttonTitle="+ New Mail"
          heading="Send Mail"
          onSubmit={() => {}}
          open={open}
          setOpen={setOpen}
        >
          <FormBuilder onSubmit={handleSubmit}>
            {(register, errors, { control }) => {
              return (
                <>
                  <div className="row mt-3">
                    <Select
                      name="receiver"
                      control={control}
                      errors={errors}
                      required={true}
                      class_name="col-12"
                      label={'Receiver'}
                      options={users.map((user) => ({
                        name: getFullName(user),
                        value: user.username,
                      }))}
                    />
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
                    <CheckboxInput
                      register={register}
                      errors={errors}
                      // defaultValue={academic?.is_private_mail}
                      name="is_private_mail"
                      label={'Private Mail'}
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
        <CardHeader title="Email Management" titleTypographyProps={{ variant: 'h6' }} />
        <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getMyMails} />
      </Card>
    </div>
  );
};

export default Emails;
