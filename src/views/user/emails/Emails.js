import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
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
import { formatDateTime, getFullName, getFullNameAlt } from 'src/views/utilities/utils';
import { Close, Done } from '@mui/icons-material';
import { getUsers } from 'src/services/query/user';
import { toast } from 'react-toastify';
import { Row } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

const Emails = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedMail, setSelectedMail] = useState(null);

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
    {
      id: 'action',
      label: 'Actions',
      render: (_, row) => (
        <div>
          <Button
            onClick={() => {
              setSelectedMail(row);
              setViewOpen(true);
            }}
            size="small"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

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
      <Dialog open={viewOpen} onClose={() => setViewOpen(false)} maxWidth={'lg'}>
        <DialogTitle>Email</DialogTitle>
        <DialogContent className="align-items-center m-3">
          <Row>
            <TextField
              value={selectedMail?.recipients?.map?.((r) => getFullNameAlt(r)).join(', ')}
              label="Recipient"
              className="mb-3 mt-3 "
            />
          </Row>
          <Row>
            <TextField value={selectedMail?.subject} label="Subject" className="mb-3 w-100" />
          </Row>
          <Row
            style={{
              maxWidth: '450px',
              border: '1px solid gray',
              borderRadius: '8px',
              padding: 10,
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{selectedMail?.body}</ReactMarkdown>
          </Row>
        </DialogContent>
      </Dialog>
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
