// ** MUI Imports
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router';
import ConfirmationPopup from '../popup/ConfirmationPopup';

const BlogPostCard = ({ title, author, short_details, image, id, handleDelete, showDelete }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardMedia sx={{ height: '9.375rem' }} image={image} />
      <CardContent sx={{ padding: (theme) => `${theme.spacing(2, 3, 2)} !important` }}>
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>{author}</Typography>
        <Typography variant="body2">{short_details}</Typography>
      </CardContent>
      <div className="d-flex">
        <Button
          style={{ flex: 1, borderRadius: 0 }}
          size="small"
          sx={{ margin: 1 }}
          onClick={() => navigate(`/blogs-list/${id}`)}
          className="w-100 m-0"
          color="primary"
          variant="contained"
        >
          Read More
        </Button>
        {showDelete && (
          <ConfirmationPopup onConfirm={() => handleDelete(id)} style={{ flex: 1 }}>
            <Button
              sx={{ margin: 1, borderRadius: 0 }}
              variant="contained"
              color="error"
              size="small"
              className="w-100 m-0"
            >
              Delete
            </Button>
          </ConfirmationPopup>
        )}
      </div>
    </Card>
  );
};

export default BlogPostCard;
