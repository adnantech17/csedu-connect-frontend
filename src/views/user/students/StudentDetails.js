import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Container, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router';
import Loader from 'src/components/container/Loader';
import { getFullName } from 'src/views/utilities/utils';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Col, Row } from 'react-bootstrap';
import { getUserDetailByUsername } from 'src/services/query/user';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
  },
  title: {
    marginBottom: 20,
  },
  likeButton: {
    marginRight: 1,
  },
  commentButton: {
    marginLeft: 1,
  },
  commentBox: {
    marginTop: 20,
  },
  commentInput: {
    width: '100%',
    marginRight: 20,
    padding: 10,
  },
  commentList: {
    marginTop: 2,
  },
  avatar: {
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
}));

function StudentDetails() {
  const classes = useStyles();

  const { username } = useParams();

  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = async () => {
    try {
      setLoading(true);
      const res = await getUserDetailByUsername(username);
      setSelectedUser(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleViewDetails();
  }, []);

  return (
    <Container className={classes.root}>
      <Loader isLoading={loading}>
        <h3 className="mt-3">Basic Informations</h3>
        <Row>
          <div className="d-flex flex-column align-items-center">
            <Avatar
              src={selectedUser?.profile_picture || ProfileImg}
              alt={selectedUser?.profile_picture || ProfileImg}
              sx={{
                width: 128,
                height: 128,
                marginBottom: 2,
              }}
            />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {selectedUser &&
                selectedUser.first_name &&
                selectedUser.last_name &&
                `${selectedUser.first_name} ${selectedUser.last_name}`}{' '}
              ({selectedUser?.username})
            </Typography>
          </div>
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
                  academic.is_currently_studying ? 'Currently Studying' : academic.graduation_date
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

        {selectedUser?.work_experiences?.length ? <h3 className="mt-3">Work Experiences</h3> : ''}
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
                  experience.is_currently_studying ? 'Currently Studying' : experience.ending_date
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
    </Container>
  );
}
export default StudentDetails;
