import { Card, CardHeader } from '@mui/material';
import React from 'react';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import FormModalButton from 'src/components/tables/FormModalButton';
import { FormBuilder, Select, Textarea } from 'src/components/forms/FormBuilder';
import { getUserMails } from 'src/services/query/mails';
import { formatDateTime, getFullName } from 'src/views/utilities/utils';
import { Close, Done } from '@mui/icons-material';

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

const filterFields = [
  { label: 'From', field: 'from', type: 'string' },
  { label: 'To', field: 'to', type: 'string' },
];

const EmailsManagement = () => {
  return (
    <div>
      <Card>
        {/* <FormModalButton
          className="d-flex m-3 justify-content-end"
          buttonTitle="+ New Mail"
          heading="Send Mail"
          onSubmit={() => {}}
        >
          <FormBuilder
            onSubmit={(d) => {
              console.log(d);
            }}
          >
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
                      options={[{ name: 'Adnan', value: 'adnantech17' }]}
                    />
                    <Textarea
                      name="email_body"
                      register={register}
                      errors={errors}
                      required={true}
                      class_name="col-12"
                      label={'Email Body'}
                    />
                  </div>
                </>
              );
            }}
          </FormBuilder>
        </FormModalButton> */}
        <CardHeader title="Email Management" titleTypographyProps={{ variant: 'h6' }} />
        <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getUserMails} />
      </Card>
    </div>
  );
};

export default EmailsManagement;
