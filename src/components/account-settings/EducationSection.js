// ** React Imports
import { useContext, useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from 'src/context/AuthContext';
import FormModalButton from '../tables/FormModalButton';
import { FormBuilder, Input } from '../forms/FormBuilder';
import { createAcademic, deleteAcademic, updateAcademic } from 'src/services/query/user';
import { toast } from 'react-toastify';

const EducationSection = ({ setLoading }) => {
  const { userData, fetchUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [academic, setAcademic] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await (academic ? updateAcademic : createAcademic)({ ...data, id: academic?.id });
      setOpen(false);
      toast.success(`Your academic history has been added.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error creating academic history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAcademic(id);
      toast.success(`Your Academic History has been deleted.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error deleting Academic History.');
    } finally {
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <h3 className="mt-2 mb-2">Academic History</h3>

        <FormModalButton
          open={open}
          setOpen={setOpen}
          buttonTitle="+ New Academic History"
          heading="Add New Academic History"
          maxWidth="xl"
        >
          <FormBuilder onSubmit={handleSubmit}>
            {(register, errors, { control, setValue }) => {
              return (
                <>
                  <Input
                    name="institution_name"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.institution_name}
                    class_name="col-12 mt-2"
                    label={'Institution Name'}
                  />
                  <Input
                    name="degree_name"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.degree_name}
                    class_name="col-12 mt-2"
                    label={'Degree'}
                  />
                  <Input
                    name="result"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.result}
                    class_name="col-12 mt-2"
                    label={'Result'}
                  />
                  <Input
                    name="concentration"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.concentration}
                    class_name="col-12 mt-2"
                    label={'Concentration'}
                  />
                  <Input
                    name="start_date"
                    type="date"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.start_date}
                    class_name="col-12 mt-2"
                    label={'Start Date'}
                  />
                  <Input
                    name="graduation_date"
                    type="date"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={academic?.graduation_date}
                    class_name="col-12 mt-2"
                    label={'Graduation Date'}
                  />

                  <Button className="text-right" type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </>
              );
            }}
          </FormBuilder>
        </FormModalButton>
      </div>
      <div className="row mt-3">
        {userData.academic_histories?.map((academic) => (
          <div className="d-flex align-items-start mt-4">
            <div className="w-100 row">
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={academic.institution_name}
                  disabled
                  label="Institution"
                />
              </div>
              <div className="col-6 p-2">
                <TextField className="w-100" value={academic.degree_name} disabled label="Degree" />
              </div>
              <div className="col-6 p-2">
                <TextField className="w-100" value={academic.result} disabled label="Result" />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={academic.concentration}
                  disabled
                  label="Concentration"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={academic.start_date}
                  disabled
                  label="Start Date"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={
                    academic.is_currently_studying ? 'Currently Studying' : academic.graduation_date
                  }
                  disabled
                  label="Graduation Date"
                />
              </div>
            </div>
            <div className="d-flex">
              <Button
                onClick={() => {
                  setAcademic(academic);
                  setOpen(true);
                }}
                color="success"
                variant="outlined"
                className="m-2"
              >
                Edit
              </Button>
              <Button
                color="error"
                className="mt-2 mb-2"
                variant="contained"
                onClick={() => handleDelete(academic.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection;
