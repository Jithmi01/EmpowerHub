import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import BackgroundImage from '../../assets/images/loginBack.jpg';

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
                notification.success({
                    message: 'Registration Successful',
                    description: 'You have successfully registered',
                });
                navigate("/login");
            } else {
                console.log('Signup failed. Please try again.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box sx={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                width: '500px', // Increased width
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                <Typography variant="h5" fontWeight="bold" color="#1A1A1A">EmpowerHub</Typography>
                <Typography variant="body1" color="gray" mb={2}>Create your account</Typography>
                
                <TextField fullWidth placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mb: 2 }} />
                
                <TextField select fullWidth value={gender} 
                 onChange={(e) => setGender(e.target.value)} sx={{ mb: 2 }} displayEmpty>
                    <MenuItem value="" disabled>Select gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </TextField>

                <TextField fullWidth placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
                <TextField fullWidth placeholder="Contact Number" value={cNo} onChange={(e) => setCno(e.target.value)} sx={{ mb: 2 }} />

                <Button fullWidth variant="contained" sx={{ backgroundColor: '#1A1A1A', color: 'white', mt: 2 }} onClick={handleRegister}>
                    Register
                </Button>
                <Typography mt={2}>
                    Already have an account? <span style={{ color: '#007AFB', cursor: 'pointer' }} onClick={() => navigate('/login')}>Log in</span>
                </Typography>
            </Box>
        </Box>
    );
}

export default RegisterPage;
