import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Input,
  Tab,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettingsOutlined,
  Comment,
  FeedOutlined,
  InfoOutlined,
  SearchOff,
  SearchOffOutlined,
  ThumbUp,
  ThumbUpOffAlt,
} from '@mui/icons-material';
import {
  createAnnouncement,
  getEventDetails,
  subscribe,
  unsubscribe,
} from 'src/services/query/events';
import { useParams } from 'react-router';
import Loader from 'src/components/container/Loader';
import { getFullName } from 'src/views/utilities/utils';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { TabContext, TabList, TabPanel } from '@mui/lab';

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

function EventsDetails() {
  const classes = useStyles();

  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('feed');
  const [showAllGuests, setShowAllGuests] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getEventDetailsAsync = async () => {
    setLoading(true);
    try {
      const res = await getEventDetails(id);
      setEvent(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetailsAsync();
  }, []);

  const [commentText, setCommentText] = useState('');

  const handleLikeClick = async () => {
    setLoading(true);
    try {
      await (event.is_subscriber ? unsubscribe : subscribe)(id);
      const res = await getEventDetails(id);
      setEvent(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setCommentText('');
    setCommentLoading(true);
    try {
      await createAnnouncement({
        event: id,
        text: commentText,
      });
      const res = await getEventDetails(id);
      setEvent(res);
    } catch (err) {
      console.log(err);
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <Container className={classes.root}>
      <Loader isLoading={loading}>
        <Typography variant="h4" component="h1" className={classes.title}>
          {event?.title}
        </Typography>
        <Box display="flex" alignItems="center">
          {event?.is_manager ? (
            <span className="link">
              <AdminPanelSettingsOutlined /> Manager
            </span>
          ) : (
            <IconButton className={classes.likeButton} onClick={handleLikeClick}>
              {event?.is_subscriber ? (
                <Button>
                  <ThumbUpOffAlt /> Unsubscribe
                </Button>
              ) : (
                <Button>
                  <ThumbUp /> Subscribe
                </Button>
              )}
            </IconButton>
          )}
          <IconButton className={classes.commentButton}>
            <Comment />
          </IconButton>
          <Typography variant="body2">{event?.comments_count}</Typography>
        </Box>
        <img
          src={event?.cover_picture}
          style={{
            width: '100%',
            height: '300px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label="account-settings tabs"
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value="feed"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FeedOutlined />
                  <div>Feed</div>
                </Box>
              }
            />
            <Tab
              value="about"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InfoOutlined />
                  <div>About</div>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value="feed">
            {event?.is_manager && (
              <Box className={classes.commentBox}>
                <form onSubmit={handleCommentSubmit} className="d-flex">
                  <TextareaAutosize
                    minRows={4}
                    placeholder="Add a Post"
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    className={classes.commentInput}
                  />
                  <Button type="submit" variant="contained" style={{ height: '32px' }}>
                    Submit
                  </Button>
                </form>
              </Box>
            )}

            <Box className={classes.commentList}>
              {event?.announcements?.length ? (
                event?.announcements?.map((comment) => (
                  <Card className="p-3 m-2">
                    <Box key={comment.id}>
                      <Box display="flex" alignItems="center">
                        <Avatar
                          alt={getFullName(comment.posted_by)}
                          src={comment.posted_by.profile_picture ?? ProfileImg}
                          className={classes.avatar}
                          sx={{
                            width: 48,
                            height: 48,
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          className={classes.username}
                        >
                          {comment.posted_by.username}
                        </Typography>
                        <Typography variant="body2" className="ms-1">
                          {comment.text}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <div className="text-center m-5">
                  <SearchOffOutlined sx={{ fontSize: 32 }} />
                  No Posts Yet
                </div>
              )}
            </Box>
          </TabPanel>
          <TabPanel sx={{ p: 0 }} value="about">
            <Box className={classes.commentList}>
              <h4 className="p-2 mt-2">Manager List</h4>
              {event?.managers?.map((manager) => (
                <Card className="p-2 m-2">
                  <Box key={manager.id}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        alt={getFullName(manager)}
                        src={manager.profile_picture ?? ProfileImg}
                        className={classes.avatar}
                        sx={{
                          width: 48,
                          height: 48,
                        }}
                      />
                      <Typography variant="subtitle2" color="primary" className={classes.username}>
                        {getFullName(manager)}
                        &nbsp;({manager.username})
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
            <Box className={classes.commentList}>
              <h4 className="p-2 mt-2">Guests List</h4>
              {event?.guests?.length === 0 ? (
                <Typography variant="subtitle2" color="textSecondary" className="p-2 m-2">
                  No guests
                </Typography>
              ) : (
                <>
                  {event?.guests
                    ?.slice(0, showAllGuests ? event.guests.length : 5)
                    .map((manager) => (
                      <Card className="p-2 m-2">
                        <Box key={manager.id}>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              alt={getFullName(manager)}
                              src={manager.profile_picture ?? ProfileImg}
                              className={classes.avatar}
                              sx={{
                                width: 48,
                                height: 48,
                              }}
                            />
                            <Typography
                              variant="subtitle2"
                              color="primary"
                              className={classes.username}
                            >
                              {getFullName(manager)}
                              &nbsp;({manager.username})
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    ))}
                  {event?.guests?.length > 5 && !showAllGuests && (
                    <Button
                      onClick={() => setShowAllGuests(true)}
                      className={classes.showAllButton}
                    >
                      Show All
                    </Button>
                  )}
                </>
              )}
            </Box>

            <h4 className="p-2 mt-4">Description</h4>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="p-2">
              {event?.description}
            </ReactMarkdown>
          </TabPanel>
        </TabContext>
      </Loader>
    </Container>
  );
}
export default EventsDetails;
