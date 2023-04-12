import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import FilterBuilder from './FilterBuilder';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Col, Row } from 'react-bootstrap';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    margin: '10px',
    padding: '1rem',
  },
});

const SingleColumnTableWithFilter = ({ columns, fetchData, filterFields }) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleFilterSubmit = (data) => {
    console.log(data);
    fetch(data);
  };

  const fetch = async (data) => {
    try {
      const res = await fetchData({ page_size: rowsPerPage, page: page, ...data });
      setTableData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleViewDetails = async (row) => {
    try {
      setOpen(true);
      setSelectedUser(row);
      // const res = await fetchData({ page_size: rowsPerPage, page: page, ...data });
      // setTableData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Profile Details</DialogTitle>
        <DialogContent>
          <Row>
            <Col md={6} className="p-2">
              <TextField label="First Name" value={selectedUser?.first_name} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Last Name" value={selectedUser?.last_name} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Email" value={selectedUser?.email_address} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Username" value={selectedUser?.username} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Batch Number" value={selectedUser?.batch_number} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Current Country" value={selectedUser?.country} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Current City" value={selectedUser?.city} fullWidth />
            </Col>
            <Col md={6} className="p-2">
              <TextField label="Current Company" value={selectedUser?.current_company} fullWidth />
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filters" id="filters">
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {filterFields && (
            <FilterBuilder filterFields={filterFields} handleFilterSubmit={handleFilterSubmit} />
          )}
        </AccordionDetails>
      </Accordion>
      <Card>
        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Card className={classes.root}>
                      <CardContent className="m-0 w-100">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            <Avatar
                              src={ProfileImg}
                              alt={ProfileImg}
                              sx={{
                                width: 48,
                                height: 48,
                              }}
                            />
                            <div style={{ marginLeft: 12 }}>
                              <Typography variant="h5" component="h2">
                                {row.first_name ? row.first_name + ' ' + row.last_name : 'Unnamed'}
                              </Typography>
                              <Typography color="textSecondary">{row.email_address}</Typography>
                              <Typography variant="body2" component="p">
                                From {row.batch_number} Batch
                              </Typography>
                            </div>
                          </div>

                          <Button
                            className={classes.button}
                            onClick={() => handleViewDetails(row)}
                            variant="contained"
                            color="primary"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SingleColumnTableWithFilter;
