// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import { FileInput, FormBuilder, Input, Textarea } from 'src/components/forms/FormBuilder';
import FormModalButton from 'src/components/tables/FormModalButton';
import TableWithFilter from 'src/components/tables/TableWithFilter';
import { Avatar, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { createCard, getCards } from 'src/services/query/cards';
import { uploadImage } from 'src/services/query/image';

const HallOfFame = () => {
  const [open, setOpen] = useState(false);
  const [forceReload, setForceReload] = useState(false);

  const handleSubmit = async (data) => {
    try {
      const imageUrl = await uploadImage(data.photo?.[0]);
      const res = await createCard({ ...data, photo: imageUrl });
      setOpen(false);
      toast.success(`Created.`);
    } catch (error) {
      toast.error('Error!');
    } finally {
    }
  };

  const columns = [
    { label: 'Title', id: 'title', type: 'string' },
    { label: 'Caption', id: 'caption', type: 'string' },
  ];
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <div className="d-flex justify-content-end">
            <FormModalButton
              open={open}
              setOpen={setOpen}
              className="d-flex justify-content-end"
              buttonTitle={
                <span>
                  <Add style={{ fontSize: 18, marginBottom: '2px' }} /> New Card
                </span>
              }
              heading="Send Invitation"
            >
              <FormBuilder onSubmit={handleSubmit}>
                {(register, errors, { control }) => {
                  return (
                    <>
                      <div className="row mt-3">
                        <Input
                          name="title"
                          errors={errors}
                          required={true}
                          register={register}
                          class_name="col-12"
                          label={'Title'}
                        />
                      </div>
                      <div className="row mt-3">
                        <Input
                          name="caption"
                          errors={errors}
                          required={true}
                          register={register}
                          class_name="col-12"
                          label={'Caption'}
                        />
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        {/* <Avatar
                          src={userData?.profile_picture || ProfileImg}
                          alt={userData?.profile_picture || ProfileImg}
                          sx={{
                            width: 128,
                            height: 128,
                            marginBottom: 2,
                          }}
                        /> */}
                        <FileInput
                          name="photo"
                          errors={errors}
                          register={register}
                          label={'Photo'}
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
          </div>
          <CardHeader title="Hall of Fame" titleTypographyProps={{ variant: 'h6' }} />
          <TableWithFilter
            forceReload={forceReload}
            columns={columns}
            filterFields={null}
            fetchData={getCards}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default HallOfFame;
