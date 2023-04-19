// ** React Imports
import { useContext, useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from 'src/context/AuthContext';
import FormModalButton from '../tables/FormModalButton';
import { FormBuilder, Input, Select, Textarea } from '../forms/FormBuilder';
import { createExperience, deleteExperience, updateExperience } from 'src/services/query/user';
import { toast } from 'react-toastify';

const WorkExperience = ({ setLoading }) => {
  const { userData, fetchUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [experience, setExperience] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await (experience ? updateExperience : createExperience)({ ...data, id: experience?.id });
      setOpen(false);
      toast.success(`Your Work Experience has been added.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error creating Work Experience.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      toast.success(`Your Experience has been deleted.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error deleting Experience.');
    } finally {
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-5">
        <h3 className="mt-2 mb-2">Work Experience</h3>

        <FormModalButton
          open={open}
          setOpen={setOpen}
          buttonTitle="+ New Work Experience"
          heading="Add New Work Experience"
          maxWidth="xl"
        >
          <FormBuilder onSubmit={handleSubmit}>
            {(register, errors, { control, setValue }) => {
              return (
                <>
                  <Input
                    name="company_name"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.company_name}
                    class_name="col-12 mt-2"
                    label={'Company Name'}
                  />
                  <Input
                    name="branch"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.branch}
                    class_name="col-12 mt-2"
                    label={'Branch'}
                  />
                  <Input
                    name="position"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.position}
                    class_name="col-12 mt-2"
                    label={'Position'}
                  />
                  <Input
                    name="starting_date"
                    type="date"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.starting_date}
                    class_name="col-12 mt-2"
                    label={'Start Date'}
                  />
                  <Input
                    name="ending_date"
                    type="date"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={experience?.ending_date}
                    class_name="col-12 mt-2"
                    label={'End Date'}
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
        {userData.work_experiences?.map((experience) => (
          <div className="d-flex align-items-start mt-4">
            <div className="w-100 row">
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.company_name}
                  disabled
                  label="Company"
                />
              </div>
              <div className="col-6 p-2">
                <TextField className="w-100" value={experience.branch} disabled label="Branch" />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.position}
                  disabled
                  label="Position"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={experience.starting_date}
                  disabled
                  label="Start Date"
                />
              </div>
              <div className="col-6 p-2">
                <TextField
                  className="w-100"
                  value={
                    experience.is_currently_studying ? 'Currently Studying' : experience.ending_date
                  }
                  disabled
                  label="End Date"
                />
              </div>
            </div>
            <div className="d-flex">
              <Button
                onClick={() => {
                  setExperience(experience);
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
                onClick={() => handleDelete(experience.id)}
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

export default WorkExperience;
