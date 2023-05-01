import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Col, Row } from 'react-bootstrap';
import Loader from '../container/Loader';
import { getUserDetailByUsername } from 'src/services/query/user';
import './table-pagination.css';

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
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const classes = useStyles();

  const handleFilterSubmit = (data) => {
    console.log(data);
    fetch(data);
  };

  useEffect(() => {
    if (!open) setSelectedUser(null);
  }, [open]);

  const fetch = async (data) => {
    try {
      setLoading(true);
      const res = await fetchData({ page_size: rowsPerPage, page: page + 1, ...data });
      setTableData(res.results);
      setCount(res.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, [rowsPerPage, page]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleViewDetails = async (row) => {
    try {
      setDetailLoading(true);
      setOpen(true);
      const res = await getUserDetailByUsername(row.username);
      setSelectedUser(res);
      // const res = await fetchData({ page_size: rowsPerPage, page: page, ...data });
      // setTableData(res.results);
    } catch (error) {
      console.log(error);
    } finally {
      setDetailLoading(false);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Loader isLoading={loading}>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
          <DialogTitle>Profile Details</DialogTitle>
          <DialogContent>
            <Loader isLoading={detailLoading}>
              <h3 className="mt-3">Basic Informations</h3>
              <Row>
                <Col md={6} className="p-2">
                  <TextField
                    label="First Name"
                    value={selectedUser?.first_name}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Last Name"
                    value={selectedUser?.last_name}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Email"
                    value={selectedUser?.email_address}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Username"
                    value={selectedUser?.username}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Batch Number"
                    value={selectedUser?.batch_number}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Registration Number"
                    value={selectedUser?.registration_number}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Phone Number"
                    value={selectedUser?.phone_number}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Gender"
                    value={selectedUser?.sex ? (selectedUser?.sex === 'M' ? 'Male' : 'Female') : ''}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
              </Row>
              <h3 className="mt-3">Present Address</h3>
              <Row>
                <Col md={6} className="p-2">
                  <TextField
                    label="Current City"
                    value={selectedUser?.present_address?.city}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
                <Col md={6} className="p-2">
                  <TextField
                    label="Current Country"
                    value={selectedUser?.present_address?.country}
                    InputProps={{
                      readOnly: true,
                      shrink: true,
                    }}
                    fullWidth
                  />
                </Col>
              </Row>

              {selectedUser?.skills?.length ? <h3 className="mt-3">Skills</h3> : ''}
              {selectedUser?.skills?.map((skill) => (
                <Row>
                  <Col md={6} className="p-2">
                    <TextField
                      value={skill.name}
                      className="w-100"
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      label="Name"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={skill.proficiency}
                      className="w-100"
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      label="Proficiency"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      multiline
                      className="w-100"
                      rows={2}
                      value={skill.description}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      label="Description"
                    />
                  </Col>
                </Row>
              ))}

              {selectedUser?.academic_histories?.length ? <h3 className="mt-3">Education</h3> : ''}
              {selectedUser?.academic_histories?.map((academic) => (
                <Row>
                  <Col md={6} className="p-2">
                    <TextField
                      value={academic.institution_name}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Institution"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={academic.degree_name}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Degree"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={academic.result}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Result"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={academic.concentration}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Concentration"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={academic.start_date}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Start Date"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={
                        academic.is_currently_studying
                          ? 'Currently Studying'
                          : academic.graduation_date
                      }
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Graduation Date"
                    />
                  </Col>
                </Row>
              ))}

              {selectedUser?.work_experiences?.length ? (
                <h3 className="mt-3">Work Experiences</h3>
              ) : (
                ''
              )}
              {selectedUser?.work_experiences?.map((experience) => (
                <Row>
                  <Col md={6} className="p-2">
                    <TextField
                      value={experience.company_name}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Company Name"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={experience.branch}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Branch"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={experience.position}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Position"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={experience.starting_date}
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Starting Date"
                    />
                  </Col>
                  <Col md={6} className="p-2">
                    <TextField
                      value={
                        experience.is_currently_studying
                          ? 'Currently Studying'
                          : experience.ending_date
                      }
                      InputProps={{
                        readOnly: true,
                        shrink: true,
                      }}
                      className="w-100"
                      label="Ending Date"
                    />
                  </Col>
                </Row>
              ))}
            </Loader>
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
                                  {row.first_name
                                    ? row.first_name + ' ' + row.last_name
                                    : 'Unnamed'}
                                </Typography>
                                <Typography color="textSecondary">{row.email_address}</Typography>
                                <Typography variant="body2" component="p">
                                  From {row.batch_number ?? 'Unknown'} Batch
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
          className="table-pagination"
        />
      </Loader>
    </TableContainer>
  );
};

export default SingleColumnTableWithFilter;
