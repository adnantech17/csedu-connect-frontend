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
import { getUserMails } from 'src/services/query/mails';
import { formatDateTime, getFullName, getFullNameAlt } from 'src/views/utilities/utils';
import { Close, Done } from '@mui/icons-material';
import { getUsers } from 'src/services/query/user';
import { Row } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import rehypeRaw from 'rehype-raw';

const EmailsManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [open, setOpen] = useState(false);

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
              setOpen(true);
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
      label: 'From',
      field: 'sender',
      type: 'select',
      options: users.map((user) => ({
        name: getFullNameAlt(user),
        value: user.username,
      })),
    },
    {
      label: 'To',
      field: 'recipient',
      type: 'select',
      options: users.map((user) => ({
        name: getFullNameAlt(user),
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

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <Card>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth={'lg'}>
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
        <CardHeader title="Email Management" titleTypographyProps={{ variant: 'h6' }} />
        <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getUserMails} />
      </Card>
    </div>
  );
};

export default EmailsManagement;
