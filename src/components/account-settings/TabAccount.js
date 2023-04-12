// ** React Imports
import { useContext, useEffect, useState } from 'react';

// ** MUI Imports
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { ArrayInput, FormBuilder, Input, Select } from '../forms/FormBuilder';
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
  const [profile, setProfile] = useState(null);

  const { userData } = useContext(AuthContext);

  useEffect(() => {
    setProfile({
      ...userData,
      ...userData?.social_media_links?.reduce((acc, x) => {
        acc[x.platform_name.toLowerCase()] = x.link;
        return acc;
      }, {}),
    });
  }, [userData]);

  const handleSubmit = async (data) => {
    try {
      const social_media_links = [
        { platform_name: 'Facebook', link: data.facebook },
        { platform_name: 'Twitter', link: data.twitter },
        { platform_name: 'LinkedIn', link: data.linkedin },
      ].filter((data) => data.link);
      console.log(data);
      const res = await updateUserProfile({
        username: userData.username,
        ...data,
        social_media_links,
        present_address: {
          city: data.present_city,
          country: data.present_country,
        },
      });
      toast.success(`Profile Updated.`);
    } catch (error) {
      toast.error('Error updating Profile.');
    } finally {
    }
  };

  return (
    <CardContent>
      <FormBuilder onSubmit={handleSubmit} defaultValues={userData}>
        {(register, errors, { control }) => {
          return (
            <>
              <h3>Basic Informations</h3>
              <div className="row mt-3">
                <Input
                  name="first_name"
                  defaultValue={userData?.first_name}
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'First Name'}
                />
                <Input
                  name="last_name"
                  defaultValue={userData?.last_name}
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Last Name'}
                />
              </div>
              <div className="row mt-3">
                <Input
                  defaultValue={userData?.batch_number}
                  name="batch_number"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Batch Number'}
                />
                <Input
                  defaultValue={userData?.hometown}
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
                  defaultValue={userData?.date_of_birth}
                  type="date"
                  name="date_of_birth"
                  errors={errors}
                  required={true}
                  register={register}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  class_name="col-6"
                  label={'Date of Birth'}
                />
                <Select
                  name="sex"
                  defaultValue={userData?.sex}
                  control={control}
                  errors={errors}
                  required={true}
                  class_name="col-6"
                  label={'Gender'}
                  options={[
                    { name: 'Male', value: 'M' },
                    { name: 'Female', value: 'F' },
                  ]}
                />
              </div>
              <h3 className="mt-2 mb-2">Present Address</h3>
              <div className="row mt-3">
                <Input
                  defaultValue={userData?.present_address?.city}
                  name="present_city"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'City'}
                />
                <Input
                  defaultValue={userData?.present_address?.country}
                  name="present_country"
                  errors={errors}
                  required={true}
                  register={register}
                  class_name="col-6"
                  label={'Country'}
                />
              </div>
              <h3 className="mt-2 mb-2">Social Informations</h3>
              <div className="row mt-3">
                <Input
                  name="facebook"
                  errors={errors}
                  register={register}
                  class_name="col-6"
                  defaultValue={profile?.facebook}
                  label={'Facebook id Link'}
                />
                <Input
                  name="linkedin"
                  errors={errors}
                  register={register}
                  class_name="col-6"
                  defaultValue={profile?.linkedin}
                  label={'LinkedIn Id Link'}
                />
              </div>
              <div className="row mt-3">
                <Input
                  name="twitter"
                  errors={errors}
                  register={register}
                  class_name="col-6"
                  defaultValue={profile?.twitter}
                  label={'Twitter id Link'}
                />
              </div>
              <h3 className="mt-2 mb-2">Skills</h3>
              <div className="row mt-3">
                <ArrayInput
                  name="skills"
                  control={control}
                  errors={errors}
                  register={register}
                  defaultValue={userData.skills}
                  class_name="col-12"
                  label={'Work Experience'}
                  formFields={[
                    { name: 'name', type: 'text', label: 'Name', className: 'col-6' },
                    {
                      name: 'proficiency',
                      className: 'col-6',
                      type: 'select',
                      label: 'Proficiency',
                      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Description',
                      className: 'col-12',
                    },
                  ]}
                />
              </div>

              <h3 className="mt-2 mb-2">Academics</h3>
              <div className="row mt-3">
                <ArrayInput
                  name="academic_histories"
                  control={control}
                  errors={errors}
                  register={register}
                  class_name="col-12"
                  label={'Academic Histories'}
                  formFields={[
                    {
                      name: 'institution_name',
                      type: 'text',
                      label: 'Institution Name',
                      className: 'col-6',
                    },
                    {
                      name: 'concentration',
                      className: 'col-6',
                      type: 'text',
                      label: 'Concentration',
                    },
                    {
                      name: 'degree_name',
                      type: 'text',
                      label: 'Degree',
                      className: 'col-6',
                    },
                    {
                      name: 'result',
                      type: 'text',
                      label: 'Result',
                      className: 'col-6',
                    },
                    {
                      name: 'start_date',
                      type: 'date',
                      label: 'Start Date',
                      className: 'col-6',
                    },
                    {
                      name: 'graduation_date',
                      type: 'date',
                      label: 'Graduation Date',
                      className: 'col-6',
                    },
                  ]}
                />
              </div>

              <h3 className="mt-2 mb-2">Work Experience</h3>
              <div className="row mt-3">
                <ArrayInput
                  name="work_experiences"
                  control={control}
                  errors={errors}
                  register={register}
                  class_name="col-12"
                  label={'Work Experience'}
                  formFields={[
                    {
                      name: 'company_name',
                      type: 'text',
                      label: 'Company Name',
                      className: 'col-6',
                    },
                    {
                      name: 'branch',
                      className: 'col-6',
                      type: 'text',
                      label: 'Branch',
                    },
                    {
                      name: 'position',
                      type: 'text',
                      label: 'Position',
                      className: 'col-6',
                    },
                    {
                      name: 'starting_date',
                      type: 'date',
                      label: 'Starting Date',
                      className: 'col-6',
                    },
                    {
                      name: 'ending_date',
                      type: 'date',
                      label: 'Ending Date',
                      className: 'col-6',
                    },
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
