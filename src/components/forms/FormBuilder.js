import { Button, Checkbox, FormControlLabel, FormLabel, MenuItem, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
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
  validate = () => {},
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
            {...register(name, { required, validate: validate })}
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

export const DateInput = ({
  prepend,
  register,
  name,
  label,
  labelClassName,
  value,
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
            InputLabelProps={{
              shrink: true,
            }}
            label={label}
            type={'date'}
            {...register(name, { required })}
            {...rest}
            className="form-control"
          />
        </div>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
};

export const DateTimeInput = ({
  prepend,
  register,
  name,
  label,
  labelClassName,
  value,
  class_name,
  required = false,
  errors,
  rules,
  defaultValue,
  ...rest
}) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    console.log(defaultValue);
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <div className={`mb-3 ${class_name}`}>
      <>
        <div className="d-flex align-items-center input-form">
          {prepend && <span className="prepend-text text-dark">{prepend}</span>}
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label={label}
            defaultValue={defaultValue}
            type={'datetime-local'}
            {...register(name, { required })}
            {...rest}
            className="form-control"
          />
        </div>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
};

export const FileInput = ({
  prepend,
  register,
  name,
  label,
  labelClassName,
  value,
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
            InputLabelProps={{
              shrink: true,
            }}
            label={label}
            inputProps={{ accept: 'image/*' }}
            type={'file'}
            {...register(name, { required })}
            {...rest}
            className="form-control"
          />
        </div>
        <InputError error={errors[name]} className={'mt-1'} />
      </>
    </div>
  );
};

export const CheckboxInput = ({
  name,
  label,
  labelClassName,
  value,
  required = false,
  errors,
  register,
  rules,
  defaultValue,
  ...rest
}) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);

  return (
    <div className={`mb-3`}>
      {/* <FormControlLabel
        control={<Checkbox {...rest} name={name} color="primary" />}
        label={label}
      /> */}
      <div className="d-flex">
        <Checkbox
          label={label}
          {...register(name, { required })}
          {...rest}
          style={{ width: '32px', padding: 0 }}
          className="form-control"
          defaultChecked={defaultValue}
        />
        <FormLabel>{label}</FormLabel>
      </div>
      <InputError error={errors[name]} className={'mt-1'} />
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

export function RichTextEditor({
  name,
  label,
  required = false,
  errors,
  control,
  class_name,
  options,
  rules,
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
        <div className="d-flex input-form">
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className="w-100">
                <label>{label}</label>
                <Editor
                  apiKey="YOUR_API_KEY"
                  value={value}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist autolink lists link image',
                      'charmap print preview anchor help',
                      'searchreplace visualblocks code',
                      'insertdatetime media table paste wordcount',
                    ],
                    toolbar:
                      'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help',
                  }}
                  onEditorChange={(content) => {
                    onChange(content);
                  }}
                />
              </div>
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

  if (error.type === 'validate')
    return (
      <div className={className}>
        <span role="alert" className="text-danger">
          {error.message || 'Error'}
        </span>
      </div>
    );

  return error.type === 'required' ? (
    <div className={className}>
      <span role="alert" className="text-danger">
        {text || 'This is required'}
      </span>
    </div>
  ) : null;
};
