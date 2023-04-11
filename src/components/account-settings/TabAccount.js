// ** React Imports
import { useContext, useState } from 'react';

// ** MUI Imports
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormBuilder, Input, Select } from '../forms/FormBuilder';
import { AuthContext } from 'src/context/AuthContext';
import { updateUserProfile } from 'src/services/query/user';
import { toast } from 'react-toastify';

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true);
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png');

  const { userData } = useContext(AuthContext);
  const handleSubmit = async (data) => {
    try {
      console.log(userData);
      const res = await updateUserProfile({ username: userData.user_name, ...data });
      toast.success(`Profile Updated.`);
    } catch (error) {
      toast.error('Error updating Profile.');
    } finally {
    }
  };

  return (
    <CardContent>
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
                  class_name="col-6"
                  label={'First Name'}
                />
                <Input
                  name="last_name"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Last Name'}
                />
              </div>
              <div className="row mt-3">
                <Input
                  name="batch_number"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Batch Number'}
                />
                <Input
                  name="hometown"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Hometown'}
                />
              </div>
              <div className="row mt-3">
                <Input
                  name="date_of_birth"
                  errors={errors}
                  required={true}
                  type="date"
                  register={register}
                  class_name="col-6"
                  label={'Date of Birth'}
                />
                <Select
                  name="sex"
                  control={control}
                  errors={errors}
                  required={true}
                  class_name="col-6"
                  label={'Gender'}
                  options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                  ]}
                />
              </div>

              <Button className="text-right" type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </>
          );
        }}
      </FormBuilder>
    </CardContent>
  );
};

export default TabAccount;
