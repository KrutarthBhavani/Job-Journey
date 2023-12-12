import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider } from '@mui/material';
import {doCreateUserWithEmailAndPassword, doGoogleSignIn} from '../firebase/FirebaseFunctions.js'
import googleSignUp from '../assets/sign_up_with_google.svg'
import { validateName, validateEmail, validatePassword } from '../helpers.js';

const SignUpPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {  
    try {
      if(name.length == 0) throw new Error("Name is Required")
      validateName(name)
      if(email.length == 0) throw new Error("Email is Required")
      validateEmail(email)
      if(password.length == 0) throw new Error("Password is Required")
      validatePassword(password)
      if(rePassword.length == 0) throw new Error("Re-enter Password is Required")
      validatePassword(rePassword)
      if(password !== rePassword) throw new Error("Password and Re-entered Password does not match!")

      await doCreateUserWithEmailAndPassword(email, password, name);
    } catch (e) {
      if(e.code == "auth/invalid-credential")
        setError("Invalid Login Credentials")
      else setError(e.message)
    }
  };

  const handleGoogleSignUp = async () =>{
    try{
      await doGoogleSignIn()
      console.log('Google User Signed Up successfully!');
    }catch(error){
      if(e.code == "auth/invalid-credential")
        setError("Invalid Login Credentials")
      else setError(e.message)
    }
  }

  return (
    <Box height={'85vh'} display={'flex'} justifyContent={'center'}>
      <Box width={'400px'} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Box padding={2} border={5} borderColor={'secondary.main'} borderRadius={4}>
          <Typography variant='h5'>Lets get you Registered!</Typography>
          <Divider/>
          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Name</Typography>
          <TextField
            required
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Name"
            type='text'
            onChange={e => setName(e.target.value.trim())}/>

          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Email</Typography>
          <TextField
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Email"
            type='email'
            onChange={e => setEmail(e.target.value.trim())}/>
        
          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Password</Typography>
          <TextField
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Password"
            type='password'
            onChange={e => setPassword(e.target.value.trim())}/>

          <Typography sx={{marginTop: '15px'}} variant='subtitle1' fontWeight={'bold'}>Re-enter Password</Typography>
          <TextField
            sx={{marginBottom: '15px'}}
            fullWidth
            InputLabelProps={{shrink: false}}
            placeholder="Re-enter Password"
            type='password'
            onChange={e => setRePassword(e.target.value.trim())}/>

          <Button fullWidth variant="outlined" color="primary" sx={{marginBottom: '15px'}} onClick={e => handleSignUp()}>
              Sign Up
          </Button>

          <Divider/>

          <Box display={'flex'} justifyContent={'center'} marginTop={'15px'}>
            <img margin='0px' src={googleSignUp} alt="Continue with Google" onClick={e => handleGoogleSignUp()} />
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

export default SignUpPage;
