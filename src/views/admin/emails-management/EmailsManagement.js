import { Button, Card, CardHeader, Grid } from '@mui/material';
import React from 'react';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import FormModalButton from 'src/components/tables/FormModalButton';
import { FormBuilder, Select, Textarea } from 'src/components/forms/FormBuilder';
import { login } from 'src/services/query/login';

const columns = [
  { id: 'from', label: 'From' },
  { id: 'to', label: 'To' },
  { id: 'date', label: 'Date' },
  { id: 'time', label: 'Time' },
];

const filterFields = [
  { label: 'From', field: 'from', type: 'string' },
  { label: 'To', field: 'to', type: 'string' },
];

const emails = [
  { id: 1, from: 'John Smith', to: 'Jane Doe', date: '2022-03-25', time: '10:30 AM' },
  { id: 2, from: 'Jane Doe', to: 'Robert Johnson', date: '2022-03-26', time: '3:45 PM' },
  { id: 3, from: 'Robert Johnson', to: 'Alice Brown', date: '2022-03-27', time: '9:15 AM' },
  { id: 4, from: 'Alice Brown', to: 'Tom Lee', date: '2022-03-28', time: '2:00 PM' },
  { id: 5, from: 'Tom Lee', to: 'John Smith', date: '2022-03-29', time: '11:45 AM' },
];

function getData() {
  return new Promise((resolve, reject) => {
    resolve({ results: emails, success: true, meta: { count: emails.length } });
  });
}

const EmailsManagement = () => {
  return (
    <div>
      <Card>
        <FormModalButton
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
        </FormModalButton>
        <CardHeader title="Email Management" titleTypographyProps={{ variant: 'h6' }} />
        <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getData} />
      </Card>
    </div>
  );
};

export default EmailsManagement;
