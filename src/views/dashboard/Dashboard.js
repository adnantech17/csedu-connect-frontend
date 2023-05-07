import { Divider, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getCards } from 'src/services/query/cards';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
  },
  carousel: {
    height: 500,
    // [theme.breakpoints.down('sm')]: {
    //   height: 300,
    // },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  caption: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    width: '100%',
  },
}));

const Dashboard = ({ title, caption, images }) => {
  const classes = useStyles();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cards, setCards] = useState([]);

  const fetch = async (data) => {
    try {
      const res = await getCards();
      setCards(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.carousel}>
        <Carousel showThumbs={false} selectedItem={selectedImageIndex} onChange={handleImageChange}>
          {/* {cards?.map((card, index) => (
            <div key={index}>
              <img
                src={card.photo}
                alt={card.caption}
                style={{ height: '450px', objectFit: 'cover' }}
              />
            </div>
          ))} */}

          {cards?.map((item, index) => (
            <Paper key={index}>
              {/* <div style={{ textAlign: 'left', marginBottom: 12, marginLeft: 8 }}>
                <Typography variant="h6">{item.title}</Typography>
              </div> */}
              <Divider />
              <img
                src={item.photo}
                alt={item.title}
                className={classes.image}
                style={{ height: '450px', objectFit: 'cover' }}
              />
              <div className={classes.caption}>
                <Typography variant="subtitle1">{item.caption}</Typography>
              </div>
            </Paper>
          ))}
        </Carousel>
      </div>
      <h3>Welcome to CSEDU</h3>
      <Divider
        sx={{
          height: 4,
          backgroundColor: '#000', // change color as needed
          margin: '16px 0', // adjust margin as needed
        }}
      />
      <p style={{ textAlign: 'justify' }}>
        The Department of Computer Science and Engineering (CSE) at University of Dhaka (also known
        as Dhaka University or DU) is a place where brightest of minds from all over the country
        assemble for a greater future. The department, popularly known as CSEDU, has been inspiring
        the best and brightest for more than twenty three years in fostering the frontiers of
        Computer Science and Engineering. We consider all members of the community as catalysts of
        evolution and inspire them to break away from traditional learn and apply mentality to
        create new knowledge and instigate others to do the same. Our credibility and efficacy of
        the methods of education is reflected by our alumni who have been performing with excellence
        in their respective fields; in the top ranking universities as teachers and researchers and
        in the top companies all around the world as software engineers and IT specialists. Our
        students are well equipped to take the challenge to stand out as the leaders of tomorrow. We
        welcome all in our community who are willing to take the challenge. Welcome to progress.
        Welcome to CSEDU.
      </p>
    </div>
  );
};

export default Dashboard;
