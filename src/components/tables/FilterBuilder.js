import { Button, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const FilterBuilder = ({ filterFields, handleFilterSubmit }) => {
  const { register, handleSubmit, reset, control } = useForm();
  return (
    <form onSubmit={handleSubmit(handleFilterSubmit)}>
      <Row className="m-2">
        {filterFields.map((filter) => (
          <Col md={4} sm={12}>
            {filter.type === 'string' && (
              <TextField
                key={filter.field}
                fullWidth
                margin="normal"
                variant="outlined"
                label={`Filter by ${filter.label}`}
                {...register(filter.field)}
              />
            )}
            {filter.type === 'select' && (
              <Controller
                name={filter.field}
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label={filter.label} fullWidth variant="outlined">
                    {filter?.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-end m-4">
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            reset();
          }}
          className="me-2"
        >
          Reset
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Filter
        </Button>
      </div>
    </form>
  );
};

export default FilterBuilder;
