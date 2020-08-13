import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, InputLabel, Select, MenuItem, DialogActions, Button } from '@material-ui/core';

export const Signup = (props) => {
    const isSignupOpen = props.isSignupOpen;
    const closeSignup = props.closeSignup;
    const signupFname = props.signupFname;
    const handleSignupFname = props.handleSignupFname;
    const signupLname = props.signupLname;
    const handleSignupLname = props.handleSignupLname;
    const signupUname = props.signupUname;
    const handleSignupUname = props.handleSignupUname;
    const signupEmail = props.signupEmail;
    const handleSignupEmail = props.handleSignupEmail;
    const signupPassword = props.signupPassword;
    const handleSignupPassword = props.handleSignupPassword;
    const signupPasswordAgain = props.signupPasswordAgain;
    const handleSignupPasswordAgain = props.handleSignupPasswordAgain;
    const signupBdate = props.signupBdate;
    const handleSignupBdate = props.handleSignupBdate;
    const signupSex = props.signupSex;
    const handleSignupSex = props.handleSignupSex;
    const handleSignupSubmit = props.handleSignupSubmit;

    return (
        <Dialog open={isSignupOpen} onClose={closeSignup} aria-labelledby="signup-dialog" maxWidth={"md"} fullWidth>
            <DialogTitle id="signup-dialog">Yeni Kullanıcı Kaydı</DialogTitle>
            <DialogContent className={"signupDialog"} >
                <TextField className={"signupItem"} id="signup-fname" label="Ad" onChange={handleSignupFname} variant={"outlined"} required />
                <TextField className={"signupItem"} id="signup-lname" label="Soyad" onChange={handleSignupLname} variant={"outlined"} required />
                <TextField className={"signupItem"} id="signup-uname" label="Kullanıcı Adı" onChange={handleSignupUname} variant={"outlined"} required />
                <TextField className={"signupItem"} id="signup-email" label="E-posta" type="email" onChange={handleSignupEmail} variant={"outlined"} required  />
                <div className={"signupDialogPass signupItem"} >
                    <TextField id="signup-password" label="Şifre" type="password" onChange={handleSignupPassword} variant={"outlined"} required 
                            error={signupPassword !== null && signupPasswordAgain !== null && signupPassword !== signupPasswordAgain} />
                    <TextField id="signup-password-again" label="Şifre Tekrar" type="password" onChange={handleSignupPasswordAgain} variant={"outlined"} required
                            error={signupPassword !== null && signupPasswordAgain !== null && signupPassword !== signupPasswordAgain} />
                </div>
                <TextField className={"signupItem"} id="signup-bdate" defaultValue={new Date().toISOString().substring(0,10)} label="Doğum Tarihi" type="date" onChange={handleSignupBdate} variant={"outlined"} required />
                <div className={"signupDialogSex signupItem"} >
                    <InputLabel id="signup-sex-label">Cinsiyet</InputLabel>
                    <Select id="signup-sex" onChange={handleSignupSex} variant={"outlined"} >
                        <MenuItem value={"F"}>Kadın</MenuItem>
                        <MenuItem value={"M"}>Erkek</MenuItem>
                        <MenuItem value={null}>Belirtmek istemiyorum</MenuItem>
                    </Select>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignupSubmit} variant={"contained"} color="primary">
                    Kaydol
                </Button>
                <Button onClick={closeSignup} variant={"contained"} color="secondary">
                    İptal
                </Button>
            </DialogActions>
        </Dialog>
    )
};

