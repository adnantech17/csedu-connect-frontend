// ** React Imports
import { useContext, useState } from 'react';

// ** MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from 'src/context/AuthContext';
import FormModalButton from '../tables/FormModalButton';
import { FormBuilder, Input, Select, Textarea } from '../forms/FormBuilder';
import { createSkill, deleteSkill, updateSkill } from 'src/services/query/user';
import { toast } from 'react-toastify';

const SkillsSection = ({ setLoading }) => {
  const { userData, fetchUser } = useContext(AuthContext);
  const [openSkill, setOpenSkill] = useState(false);
  const [skill, setSkill] = useState(null);

  const handleSkillSubmit = async (data) => {
    setLoading(true);
    try {
      await (skill ? updateSkill : createSkill)({ ...data, id: skill?.id });
      setOpenSkill(false);
      toast.success(`Your skill has been added.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error creating Skill.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteSkill(id);
      toast.success(`Your skill has been deleted.`);
      await fetchUser();
    } catch (error) {
      toast.error('Error deleting Skill.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="mt-2 mb-2">Skills</h3>

        <FormModalButton
          open={openSkill}
          setOpen={setOpenSkill}
          buttonTitle="+ New Skill"
          heading="Add New Skill"
          maxWidth="lg"
        >
          <FormBuilder onSubmit={handleSkillSubmit}>
            {(register, errors, { control, setValue }) => {
              return (
                <>
                  <Input
                    name="name"
                    errors={errors}
                    required={true}
                    register={register}
                    defaultValue={skill?.name}
                    class_name="col-12 mt-2"
                    label={'Name'}
                  />
                  <Select
                    name="proficiency"
                    defaultValue={skill?.proficiency}
                    control={control}
                    errors={errors}
                    required={true}
                    class_name="col-12"
                    label={'Proficiency'}
                    options={[
                      { name: 'Beginner', value: 'Beginner' },
                      { name: 'Intermediate', value: 'Intermediate' },
                      { name: 'Advanced', value: 'Advanced' },
                      { name: 'Expert', value: 'Expert' },
                    ]}
                  />
                  <Textarea
                    name="description"
                    defaultValue={skill?.description}
                    errors={errors}
                    required={true}
                    register={register}
                    class_name="col-12"
                    label={'Description'}
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
        {userData.skills?.map((skill) => (
          <div className="d-flex align-items-start mt-4">
            <div className="w-100 row">
              <div className="p-2 col-6">
                <TextField value={skill.name} className="w-100" disabled label="Name" />
              </div>
              <div className="p-2 col-6">
                <TextField
                  value={skill.proficiency}
                  className="w-100"
                  disabled
                  label="Proficiency"
                />
              </div>
              <div className="p-2 col-12">
                <TextField
                  multiline
                  className="w-100"
                  rows={2}
                  value={skill.description}
                  disabled
                  label="Description"
                />
              </div>
            </div>
            <div className="d-flex">
              <Button
                onClick={() => {
                  setSkill(skill);
                  setOpenSkill(true);
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
                onClick={() => handleDelete(skill.id)}
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

export default SkillsSection;
