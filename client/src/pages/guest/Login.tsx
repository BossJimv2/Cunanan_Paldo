import { Card, CardContent, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useStore } from '../../store/rootStore';
import {Navigate} from 'react-router-dom'
import { observer } from 'mobx-react-lite';
import './Login.css';
<link rel="stylesheet" href="/login.css" />
// Define a Yup schema for validation
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
});

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { rootStore: { authStore}} = useStore();
  const isAuthenticated = authStore.isAuthenticated;
 
  if (isAuthenticated) {
    return <Navigate to="/dashboard/customers" />;
  }

  const onSubmit = async (data: any) => {
    try{
      const resData = await authStore.login({
        email: data.email,
        password: data.password,
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}>
              <img src="logo2.png" alt="Logo" className="login-logo" />
                <h1 className="login-title" style={{ color: 'black', fontWeight: 300 }}></h1>
              
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="login-input"
                    fullWidth
                    label="Email"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    {...field}
                  />
                )}
              />
              
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    className="login-input"
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    {...field}
                  />
                )}
              />
                <button type="submit" className="button-icon" disabled={isSubmitting}>                  <div className="icon">
                    <img src="logohub-removebg-preview.ico
                    " alt="Logo" className="button-logo" />
                  </div>
                  <div className="cube">
                    <span className="side front">Sign in</span>
                    <span className="side top">Enjoy</span>
                  </div>
                </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(Login)