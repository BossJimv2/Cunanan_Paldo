import React from 'react'
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, TextField, Button, Card } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../store/rootStore';
import './Customer.css';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone_number: Yup.string().required('Phone number is required')
    .min(10, 'Phone number must be 10 charecter')
    .max(10, 'Phone number must be 10 charecter'),
  zip_code: Yup.string().required('Zipcode is required')
    .min(6, 'Zipcode must be 6 charecter')
    .max(6, 'Zipcode must be 6 charecter'),
})

const CustomerCreate = () => {
  const { rootStore: { customerStore } } = useStore();
  const { createData } = customerStore;
  
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset, setError } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      zip_code: "",
    }
  })

  const onSubmit = async (data:any) => {
    try {
      const resData = await createData(data)
      if (resData){
        reset()
        navigate('..')
      }
    } catch (error:any) {
      Object.keys(error?.data).forEach((e:any) => {
        setError(e, {
          type: 'manual',
          message: error?.data[e],
        });
      })
    }
  }

  return (
    <div className="customer-container">
      <Card className="customer-card">
        <h1 className="page-title" style={{ color: 'black' }}>Create New Customer</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-field"
                    fullWidth
                    label="First name"
                    variant="filled"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-field"
                    fullWidth
                    label="Last name"
                    variant="filled"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-field"
                    fullWidth
                    label="Email"
                    variant="filled"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-field"
                    fullWidth
                    label="Phone number"
                    variant="filled"
                    error={!!errors.phone_number}
                    helperText={errors.phone_number?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="zip_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="form-field"
                    fullWidth
                    label="Zip code"
                    variant="filled"
                    error={!!errors.zip_code}
                    helperText={errors.zip_code?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button 
            className="action-button"
            sx={{ mt: 2 }} 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            Save
          </Button>
          <Button 
            className="action-button"
            sx={{ mt: 2, ml: 2 }} 
            variant="contained" 
            color="secondary"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Back
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default observer(CustomerCreate)