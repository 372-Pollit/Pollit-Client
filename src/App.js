import React, {useEffect, useState} from 'react';
import './App.css';
import {AppBar, Tabs, Tab, Container, Menu, MenuItem, CircularProgress } from '@material-ui/core';
import './style/home.css';
import axios from "axios";
import {Category, Home} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {Survey} from "./components/Survey";
import {AppFooter} from "./components/AppFooter";
// import logo from '/images/logo.png';

// Server host
const host = 'http://localhost:8081';

function App() {
    // States
    const [anchorEl, setAnchorEl] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [surveyLoading, setSurveyLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    // Mounting functions
    /**
     * componentDidMount
     */
    useEffect(() => {
        setIsLoading(true);
        // Sunucudan kategorileri alıyoruz
        axios.get(host + '/category/findAll')
            .then(res => {
                setCategories(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });

        // Sunucudan trend surveyleri alıyoruz
        setSurveyLoading(true);
        axios.get(host + '/survey/trends', {
            params: {
                pageNumber: pageNumber,
            }
        })
            .then(res => {
                setPageNumber(pageNumber + 1);

                setSurveys(surveys.concat(res.data));
                setSurveyLoading(false);
            })
            .catch(err => {
                setSurveyLoading(false);
                setError(err);
            })
    }, []);

    //Custom functions
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = () => {

    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const login = () => {
        alert(`username: ${username}, password: ${password}`);
    };

    // Custom styles
    const loginTextField = {
        color: '#9FAFC1',
        marginRight: '0.7rem',
        fontSize: 'smaller'
    };
    return (
        <div className="App">
            <AppBar>
                <Tabs className={"tabBar"}>7
                    <img className={'logo'} src="/logo.png" alt="logo" href={'/'}/>
                    <Tab label={'Anasayfa'}/>
                    <Tab label={'Kategoriler'} onClick={handleClick} aria-controls={'categories_menu'}/>
                    <Menu
                        id={'categories_menu'}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {categories && categories.map(category => (
                            <MenuItem onClick={handleClose}>{category.name}</MenuItem>
                        ))}

                    </Menu>
                    <form action="" className={'loginForm'} onSubmit={login}>
                        <TextField className={'loginText'} size={'small'} id={'username'} label={'Kullanıcı Adı'}
                                   onChange={event => setUsername(event.target.value)} variant={'outlined'}
                                   inputProps={loginTextField}/>
                        <TextField className={'loginText'} size={'small'} id={'password'} label={'Şifre'}
                                   onChange={event => setPassword(event.target.value)} variant={'outlined'}
                                   inputProps={loginTextField}/>
                        <Button className={'loginButton'} type={'submit'}>Giriş</Button>
                        <Link className={'signUp'} href="#">
                            Kayıt ol
                        </Link>
                    </form>

                </Tabs>
            </AppBar>
            <Toolbar/>
            <Container maxWidth={'md'}>
                <form className={'searchForm'} action="" onSubmit={handleSubmit}>
                    <TextField className={'searchBar'} size={'small'} placeholder={'Örn: lorem, @username, ...'}
                               id="outlined-basic" label="Arama" variant="outlined" onChange={handleChange}/>
                </form>
                {surveys.map(survey => (
                    <Survey data={survey}/>
                ))}
                {surveyLoading && <CircularProgress/>}

            </Container>
            <AppFooter/>
        </div>
    );
}

export default App;
