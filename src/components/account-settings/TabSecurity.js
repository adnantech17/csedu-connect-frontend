// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import { FormBuilder, Input } from '../forms/FormBuilder';
import { CardContent, Grid } from '@mui/material';
import { changePassword } from 'src/services/query/user';
import { toast } from 'react-toastify';

const TabSecurity = () => {
  const handleSubmit = async (data) => {
    try {
      await changePassword(data);
      toast.success('Password Updated!');
    } catch (err) {
      toast.error('Unable to change password!');
    }
  };

  const validatePassword = (getValues) => {
    const { new_password, confirm_password } = getValues();
    return new_password === confirm_password || 'The passwords do not match';
  };

  return (
    <CardContent sx={{ paddingBottom: 0 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={5}>
            <Grid item xs={12} sx={{ marginTop: 4.75 }}>
              <FormBuilder onSubmit={handleSubmit}>
                {(register, errors, { control, getValues }) => {
                  return (
                    <div
                      className="row"
                      style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
                    >
                      <Input
                        name="current_password"
                        type="password"
                        errors={errors}
                        required={true}
                        register={register}
                        class_name="col-12 mt-2"
                        label={'Current Password'}
                      />
                      <Input
                        name="new_password"
                        type="password"
                        errors={errors}
                        required={true}
                        register={register}
                        class_name="col-12 mt-2"
                        label={'New Password'}
                      />
                      <Input
                        name="confirm_password"
                        type="password"
                        errors={errors}
                        required={true}
                        register={register}
                        class_name="col-12 mt-2"
                        label={'Confirm Password'}
                        validate={() => validatePassword(getValues)}
                      />
                      <Button
                        className="text-right"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                  );
                }}
              </FormBuilder>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TabSecurity;
