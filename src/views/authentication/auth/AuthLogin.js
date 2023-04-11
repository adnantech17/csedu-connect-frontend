import React, { useContext } from 'react';
import {
    Box,
    Typography,
    Button,
} from '@mui/material';

import { FormBuilder, Input } from 'src/components/forms/FormBuilder';
import { AuthContext } from 'src/context/AuthContext';

const AuthLogin = ({ title, subtitle, subtext }) => {

    const { loginToAccount } = useContext(AuthContext);

  const handleSubmit = async (data) => {
      try {
        const res = await loginToAccount(data);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }

    return (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}


        <FormBuilder
            onSubmit={handleSubmit}
          >
            {(register, errors, { control }) => {
              return (
                <>
                  <div className='row mt-3'>
                    <Input
                      name='username'
                      errors={errors}
                      required={true}
                      register={register}
                      class_name='col-12'
                      label={'Username'}
                    />
                    <Input
                      name='password'
                      type='password'
                      register={register}
                      errors={errors}
                      required={true}
                      class_name='col-12'
                      label={'Password'}
                    />
                    <Box>
                        <Button
                            color="primary"
                            variant="contained"
                            size="large"
                            fullWidth
                            type="submit"
                        >
                            Sign In
                        </Button>
                    </Box>
                  </div>
                </>
              )
            }}
          </FormBuilder>
        {subtitle}
    </>
)}

export default AuthLogin;
