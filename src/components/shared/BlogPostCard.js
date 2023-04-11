// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const BlogPostCard = ({ title, author, short_details, image }) => {
  return (
    <Card>
      
      <CardMedia sx={{ height: '9.375rem' }} image={image} />
      <CardContent sx={{ padding: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>{author}</Typography>
        <Typography variant='body2'>{short_details}</Typography>
      </CardContent>
      <Button sx={{ margin: 2 }}>Read More</Button>
      <Button sx={{ margin: 2 }} variant='contained' color='error'>
        Delete
      </Button>
    </Card>
  )
}

export default BlogPostCard
