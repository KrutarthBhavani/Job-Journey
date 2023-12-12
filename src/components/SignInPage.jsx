import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import googleSignIn from '../assets/continue_with_google.svg'
import {doSignInWithEmailAndPassword, doGoogleSignIn} from '../firebase/FirebaseFunctions.js'
import { validateEmail, validatePassword } from '../helpers.js';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    try {
      if(email.length == 0) throw new Error("Email is Required")
      validateEmail(email)
      if(password.length == 0) throw new Error("Password is Required")
      validatePassword(password)
    
      await doSignInWithEmailAndPassword(email, password);
    } catch (e) {
      if(e.code == "auth/invalid-credential")
        setError("Invalid Login Credentials")
      else setError(e.message)
    }
  };

  const handleGoogleSignIn = async () =>{
    try{
      await doGoogleSignIn()
    }catch(e){
      if(e.code == "auth/invalid-credential")
        setError("Invalid Login Credentials")
      else setError(e.message)
    }
  }

  return (
    <Box height={'85vh'} display={'flex'} justifyContent={'center'}>
      <Box width={'400px'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Box padding={2} border={5} borderColor={'secondary.main'} borderRadius={4}>
          <Typography variant='h5'>Welcome Back!</Typography>
          <Divider/>
          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Email</Typography>
          <TextField
            required
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Email"
            type='email'
            onChange={e => setEmail(e.target.value.trim())}/>
        
          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Password</Typography>
          <TextField
            sx={{marginBottom: '15px'}}
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Password"
            type='password'
            onChange={e => setPassword(e.target.value.trim())}/>

          <Button fullWidth variant="outlined" color="primary" sx={{marginBottom: '15px'}} onClick={e => handleSignIn()}>
              Login
          </Button>

          <Divider/>

          <Box display={'flex'} justifyContent={'center'} marginTop={'15px'}>
            <img margin='0px' src={googleSignIn} alt="Continue with Google" onClick={e => handleGoogleSignIn()} />
          </Box>


          {error &&
            <Box display={'flex'} justifyContent={'center'} marginTop={'15px'}>
              <Typography variant='subtitle1' color={'error'} textAlign={'center'}>{error}</Typography>
            </Box>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
