import { MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

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
  } = useForm({ defaultValues: defaultValues });

  const subscribedWatchFields = watch(watchFields);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={pb ? pb : 'pb-4'}>
      {children(register, errors, { control, getValues, resetField }, subscribedWatchFields)}
    </form>
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
  ...rest
}) => {
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
  defaultValue = '',
  options,
  ...rest
}) {
  return (
    <div className={`mb-3 ${class_name}`}>
      <>
        <div className="d-flex align-items-center input-form">
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextField {...field} select label={label} fullWidth variant="outlined">
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

// export default function Radio({ label, name, options, value, register, required, errors, className }) {
//   return (
//     <div className={className}>
//       <div>
//         <label>{label}</label>
//       </div>
//       <RadioGroup {...register(name, { required })} defaultValue={value}>
//         {options.map(option => (
//           <FormControlLabel
//             key={option.value}
//             value={option.value}
//             control={<Radio color='primary' />}
//             label={option.label}
//           />
//         ))}
//       </RadioGroup>
//       <InputError error={errors[name]} />
//     </div>
//   )
// }

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
