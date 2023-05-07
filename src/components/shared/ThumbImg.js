import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    position: 'relative',
    display: 'inline-block',
    width: 64,
    height: 64,
    margin: 10,
    overflow: 'hidden',
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

const ThumbImg = ({ src, alt, onClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.imageContainer}>
      <img className={classes.image} src={src} alt={alt} />
      <IconButton className={classes.closeButton} onClick={onClose}>
        <Close fontSize="small" />
      </IconButton>
    </div>
  );
};

export default ThumbImg;
