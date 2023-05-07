// ** MUI Imports
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import SingleColumnTableWithFilter from 'src/components/tables/SingleColumnTableWithFilter';
import { getUsers } from 'src/services/query/user';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'email', label: 'Email' },
  { id: 'sex', label: 'Sex' },
  { id: 'location', label: 'Location' },
];

const filterFields = [
  { label: 'Name', field: 'name', type: 'string' },
  { label: 'Username', field: 'username', type: 'string' },
  { label: 'Batch', field: 'batch', type: 'string' },
  { label: 'Company', field: 'company', type: 'string' },
  { label: 'Hometown', field: 'hometown', type: 'string' },
  { label: 'Country', field: 'country', type: 'string' },
  { label: 'City', field: 'city', type: 'string' },
];

const Students = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Students" titleTypographyProps={{ variant: 'h6' }} />
          <SingleColumnTableWithFilter
            columns={columns}
            filterFields={filterFields}
            fetchData={getUsers}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Students;
