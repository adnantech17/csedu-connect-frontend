import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';

export function FormBuilder({ defaultValues, children, onSubmit, watchFields = [], pb }) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
    control,
    getValues,
    resetField,
    setValue,
  } = useForm({ defaultValues: defaultValues });

  const subscribedWatchFields = watch(watchFields);

  return (
    <FormProvider setValue={setValue}>
      <form onSubmit={handleSubmit(onSubmit)} className={pb ? pb : 'pb-4'}>
        {children(
          register,
          errors,
          { control, getValues, resetField, setValue },
          subscribedWatchFields,
        )}
      </form>
    </FormProvider>
  );
}

export const Input = ({
  prepend,
  register,
  name,
  label,
  labelClassName,
  value,
  type = 'text',
  pattern,
  class_name,
  required = false,
  errors,
  rules,
  defaultValue,
  ...rest
}) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <div className={`mb-3 ${class_name}`}>
      <>
        <div className="d-flex align-items-center input-form">
          {prepend && <span className="prepend-text text-dark">{prepend}</span>}
          <TextField
            label={label}
            type={type}
            {...register(name, { required })}
            {...rest}
            className="form-control"
            pattern={pattern}
          />
        </div>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
};

export const ArrayInput = ({
  prepend,
  register,
  name,
  label,
  labelClassName,
  value,
  type = 'text',
  pattern,
  class_name,
  required = false,
  errors,
  rules,
  defaultValue,
  control,
  formFields = [],
  ...rest
}) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  return (
    <div className={`mb-3 ${class_name}`}>
      <>
        {fields.map((field, index) => (
          <div className="d-flex align-items-start">
            <div key={field.id} className="row w-100">
              {formFields.map((meta) => (
                <div className={meta.className + ' p-2'}>
                  <Controller
                    name={`${name}[${index}].${meta.name}`}
                    control={control}
                    defaultValue={field[meta.name]}
                    rules={{ required }}
                    key={meta.name}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select={meta.type === 'select'}
                        fullWidth
                        type={meta.type}
                        label={meta.label}
                        InputLabelProps={
                          meta.type === 'date'
                            ? {
                                shrink: true,
                              }
                            : {}
                        }
                        multiline={meta.type === 'textarea'}
                        rows={2}
                      >
                        {meta.type === 'select' &&
                          meta.options.map((option) => (
                            <MenuItem key={option.value} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  />
                </div>
              ))}
            </div>
            <Button className="mt-3 ms-2 me-2" onClick={() => remove(index)}>
              Delete
            </Button>
          </div>
        ))}
        <Button onClick={() => append({})}>Add More</Button>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
};

export const Textarea = ({
  register,
  name,
  label,
  type = 'text',
  class_name,
  required = false,
  errors,
  rules,
  rows = '8',
  ...rest
}) => {
  return (
    <div className={`mb-3 ${class_name}`}>
      <TextField
        name={name}
        {...register(name, { required })}
        {...rest}
        label={label}
        className="form-control"
        rows={rows}
        multiline
        fullWidth
      />

      {errors[name] && errors[name].type === 'required' && (
        <span role="alert" className="text-danger">
          This is required
        </span>
      )}
    </div>
  );
};

export function Select({
  name,
  label,
  required = false,
  errors,
  control,
  class_name,
  options,
  defaultValue,
  ...rest
}) {
  const { setValue } = useFormContext();
  useEffect(() => {
    if (!defaultValue) return;
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <div className={`mb-3 ${class_name}`}>
      <>
        <div className="d-flex align-items-center input-form">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={defaultValue}
                select
                label={label}
                fullWidth
                variant="outlined"
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
}

export const InputError = ({ error, text, className }) => {
  if (!error) return null;

  return error.type === 'required' ? (
    <div className={className}>
      <span role="alert" className="text-danger">
        {text || 'This is required'}
      </span>
    </div>
  ) : null;
};
