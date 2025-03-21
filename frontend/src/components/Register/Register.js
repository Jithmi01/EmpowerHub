import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Checkbox, Link, MenuItem } from '@mui/material';
import RegisterImage from '../../assets/images/EmpowerHub.png';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

function RegisterPage() {
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [cNo, setCno] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        const UserSchema = { email, password, name, designation, gender, address, cNo };

        try {
            const response = await fetch('http://localhost:4000/auth/signup', {
                method: 'POST',
                body: JSON.stringify(UserSchema),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();

            if (response.ok) {
                // Handle successful signup
                console.log('Signup successful!');
                notification.success({
                    message: 'Registration Successful',
                    description: 'You have successfully Registratered',
                });
                navigate("/login")
                const data = await response.json();
                if (data.errors) {
                    console.log("Error" + email.errors)
                }
                if (data.user) {
                    // location.assign('/dashboard');
                }
            } else {
                // Handle signup error
                console.log('Signup failed. Please try again.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#081229' }}>
                <Box sx={{ width: '30%', height: '500px', backgroundColor: '#202942', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #007AFB', marginLeft: '100px', marginBottom: '80px', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 122, 251, 0.5)' }}>
                    <img src={RegisterImage} alt="Register" style={{ width: '400px', height: '400px' }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', marginTop: '20px' }}>Welcome to Our Platform!</Typography>
                </Box>

                <Box sx={{ width: '50%', height: 'auto', borderRadius: '15px', padding: '30px', marginBottom: '90px', marginLeft: '100px',marginTop:'100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}>Create an Account</Typography>
                    
                    
                    
                    <TextField placeholder="Full Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} InputProps={{ style: { color: 'white' } }} sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }} />

                    <TextField placeholder="Designation" variant="outlined" fullWidth value={designation} onChange={(e) => setDesignation(e.target.value)} sx={{ marginTop: '15px', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }} />
                    <TextField placeholder="Address" variant="outlined" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} sx={{ marginTop: '15px', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }} />
                    
                    <TextField
  select
  value={gender}
  onChange={(e) => setGender(e.target.value)}
  fullWidth
  displayEmpty
  defaultValue=""
  sx={{
    marginTop: '15px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'white' },
    },
    '& .MuiSelect-select': {
      color: gender ? 'white' : 'gray', // Gray when empty, white when selected
    },
  }}
  SelectProps={{
    renderValue: (selected) => (selected ? selected : <span style={{ color: 'gray' }}>Select Gender</span>),
  }}
>
  <MenuItem value="" disabled>
    Select Gender
  </MenuItem>
  <MenuItem value="male">Male</MenuItem>
  <MenuItem value="female">Female</MenuItem>
  <MenuItem value="other">Other</MenuItem>
</TextField>

                    
                    <TextField placeholder="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ marginTop: '15px', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }} />
                    <TextField placeholder="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ marginTop: '15px', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }} />
                    <TextField placeholder="Contact Number" variant="outlined" fullWidth value={cNo} onChange={(e) => setCno(e.target.value)} sx={{ marginTop: '15px', input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }} />

                    <FormControlLabel control={<Checkbox sx={{ color: 'white' }} />} label={<Typography sx={{ color: 'white' }}>I agree to the Terms & Conditions</Typography>} sx={{ marginTop: '10px', alignSelf: 'flex-start' }} />
                    
                    <Button variant="contained" onClick={handleRegister} sx={{ backgroundColor: '#1A44A4', color: 'white', marginTop: '20px', height: '50px', fontWeight: 'bold', width: '100%', fontSize: '20px', borderRadius: '5px', '&:hover': { backgroundColor: '#13327A' } }}>Register</Button>
                    <Box sx={{ width: '100%', height: '1px', backgroundColor: 'white', marginTop: '35px' }} />
                </Box>
            </Box>
        </div>
    );
}

export default RegisterPage;
