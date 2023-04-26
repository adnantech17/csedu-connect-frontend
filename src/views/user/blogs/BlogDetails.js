import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Avatar, Box, Button, Container, IconButton, Input, Typography } from '@mui/material';
import { Comment, Favorite, FavoriteBorder } from '@mui/icons-material';
import { createComment, getBlogDetails } from 'src/services/query/blogs';
import { useParams } from 'react-router';
import Loader from 'src/components/container/Loader';
import { getFullName } from 'src/views/utilities/utils';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Card } from 'react-bootstrap';

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
  },
  commentList: {
    marginTop: 2,
  },
  avatar: {
    width: 4,
    height: 4,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
}));

function BlogDetailsPage() {
  const classes = useStyles();

  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBlogDetailsAsync = async () => {
    setLoading(true);
    try {
      const res = await getBlogDetails(id);
      setBlog(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetailsAsync();
  }, []);

  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setCommentText('');
    setLoading(true);
    try {
      createComment({
        blog: id,
        content: commentText,
      });
      const res = await getBlogDetails(id);
      setBlog(res);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.root}>
      <Loader isLoading={loading}>
        <Typography variant="h4" component="h1" className={classes.title}>
          {blog?.title}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.likeButton} onClick={handleLikeClick}>
            {liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{blog?.likes_count}</Typography>
          <IconButton className={classes.commentButton}>
            <Comment />
          </IconButton>
          <Typography variant="body2">{blog?.comments_count}</Typography>
        </Box>
        <Typography className="mt-3" variant="body1" component="div">
          {blog?.content}
        </Typography>

        <Box className={classes.commentBox}>
          <form onSubmit={handleCommentSubmit} className="d-flex">
            <Input
              placeholder="Add a comment"
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              className={classes.commentInput}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>

        <Box className={classes.commentList}>
          {blog?.comments.map((comment) => (
            <Card className="p-2 m-2">
              <Box key={comment.id}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    alt={getFullName(comment.user)}
                    src={comment.user.profile_picture ?? ProfileImg}
                    className={classes.avatar}
                  />
                  <Typography variant="subtitle2" color="primary" className={classes.username}>
                    {comment.user.username}
                  </Typography>
                  <Typography variant="body2" className="ms-1">
                    {comment.content}
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Loader>
    </Container>
  );
}
export default BlogDetailsPage;