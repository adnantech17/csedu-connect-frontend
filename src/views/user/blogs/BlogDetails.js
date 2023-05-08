import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { Comment, Favorite, FavoriteBorder } from '@mui/icons-material';
import { createComment, getBlogDetails, likeBlog, unlikeBlog } from 'src/services/query/blogs';
import { useParams } from 'react-router';
import Loader from 'src/components/container/Loader';
import { getFullName } from 'src/views/utilities/utils';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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
  const [commentLoading, setCommentLoading] = useState(false);

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

  const [commentText, setCommentText] = useState('');

  const handleLikeClick = async () => {
    // setLoading(true);
    try {
      await (blog.is_liked ? unlikeBlog : likeBlog)(id);
      const res = await getBlogDetails(id);
      setBlog(res);
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
      await createComment({
        blog: id,
        content: commentText,
      });
      const res = await getBlogDetails(id);
      setBlog(res);
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
          {blog?.title}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.likeButton} onClick={handleLikeClick}>
            {blog?.is_liked ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <Typography variant="body2">{blog?.likes_count}</Typography>
          <IconButton className={classes.commentButton}>
            <Comment />
          </IconButton>
          <Typography variant="body2">{blog?.comments_count}</Typography>
        </Box>
        {blog?.cover_picture && (
          <img
            src={blog?.cover_picture}
            style={{ width: '100%', height: '60vh', margin: 'auto', objectFit: 'cover' }}
          />
        )}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{blog?.content}</ReactMarkdown>
        <Loader isLoading={commentLoading}>
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
                      sx={{
                        width: 48,
                        height: 48,
                      }}
                    />
                    <Typography variant="subtitle2" color="primary" className={classes.username}>
                      {getFullName(comment.user)}
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
      </Loader>
    </Container>
  );
}
export default BlogDetailsPage;
