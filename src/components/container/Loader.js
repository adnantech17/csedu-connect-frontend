import { CircularProgress } from '@mui/material';
import React from 'react';

const Loader = ({ isLoading = false, children }) => {
  return isLoading ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '50vh',
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    children
  );
};

export default Loader;
