// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import { FormBuilder, Input } from 'src/components/forms/FormBuilder';
import FormModalButton from 'src/components/tables/FormModalButton';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import { createReferrals, getUsers } from 'src/services/query/user';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';

const columns = [
  { id: 'username', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email_address', label: 'Email' },
  { id: 'sex', label: 'Sex' },
  { id: 'location', label: 'Location' },
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
  const handleSubmit = async (data) => {
    try {
      const res = await createReferrals(data);
      setOpen(false);
      toast.success(`Your referral code is ${res.data.referral_code}`);
    } catch (error) {
      toast.error('Error creating Referral code.');
    } finally {
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <FormModalButton
            open={open}
            setOpen={setOpen}
            className="d-flex m-3 justify-content-end"
            buttonTitle="+ New Invitation"
            heading="Send Invitation"
          >
            <FormBuilder onSubmit={handleSubmit}>
              {(register, errors, { control }) => {
                return (
                  <>
                    <div className="row mt-3">
                      <Input
                        name="email"
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
          <CardHeader title="Sticky Header" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter columns={columns} filterFields={filterFields} fetchData={getUsers} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default UsersManagement;
