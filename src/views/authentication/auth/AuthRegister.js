import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FormBuilder, Input } from 'src/components/forms/FormBuilder';
import { register } from 'src/services/query/user';

const AuthRegister = ({ title, subtitle, subtext }) => {
  const handleSubmit = async (data) => {
    try {
      const res = await register(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <FormBuilder onSubmit={handleSubmit}>
        {(register, errors, { control }) => {
          return (
            <>
              <div className="row mt-3">
                <Input
                  name="first_name"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-12"
                  label={'First Name'}
                />
                <Input
                  name="last_name"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-12"
                  label={'Last Name'}
                />
                <Input
                  name="username"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-12"
                  label={'Username'}
                />
                <Input
                  name="email"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-12"
                  label={'Email'}
                />
                <Input
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  required={true}
                  class_name="col-12"
                  label={'Password'}
                />
                <Input
                  name="batch"
                  register={register}
                  errors={errors}
                  required={true}
                  class_name="col-12"
                  label={'Batch'}
                />
                <Input
                  name="code"
                  register={register}
                  errors={errors}
                  required={true}
                  class_name="col-12"
                  label={'Code'}
                />
                <Box>
                  <Button color="primary" variant="contained" size="large" fullWidth type="submit">
                    Register
                  </Button>
                </Box>
              </div>
            </>
          );
        }}
      </FormBuilder>
      {subtitle}
    </>
  );
};

export default AuthRegister;
