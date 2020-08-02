import React, {useEffect, useState} from 'react';
import { Router, Switch,Route } from 'react-router-dom'
import './App.css';
import {AppBar, Tabs, Tab, Menu, MenuItem } from '@material-ui/core';
import './style/home.css';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import {AppFooter} from "./components/AppFooter";
import {Home} from "./pages/Home";
import history from './history';
import {Signup} from "./pages/Signup";
import {User} from "./pages/User";

// Server host
const host = 'http://localhost:8081';

function App() {
    // States
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvatarMenu, setAnchorElAvatarMenu] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [surveyLoading, setSurveyLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [user, setUser] = useState(null);
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
        getSurveys();
    }, []);


    //Custom functions
    const getSurveys = () => {
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

    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarClick = (event) => {
        setAnchorElAvatarMenu(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        //setAnchorElProfile(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAvatarMenuClose = () => {
        setAnchorElAvatarMenu(null);
    };

    const handleSubmit = () => {

    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const login = (e) => {
        e.preventDefault();
        axios.get(host + '/user/isUser', {
            params: {
                username: username,
                password: password
            }
        })
            .then(res => {

                if (res.data==='') {
                    alert('hatali giris');
                }
                else {
                    alert(`hi ${res.data.username}`);
                    setUser(res.data);
                }

            })
            .catch(err => {
                setError(err);
                alert('ops');
            });

    };

    const logout = () => {
        setUser(null);
        handleAvatarMenuClose();
    };

    // Custom styles
    const loginTextField = {
        color: '#9FAFC1',
        marginRight: '0.7rem',
        fontSize: 'smaller'
    };

    return (
        <div className="App">
            <Router history={history}>
                <AppBar>
                    <Tabs className={"tabBar"}>7
                        <img className={'logo'} src="/logo.png" alt="logo" href={'/'}/>
                        <Link className={'AnasayfaLink'} to="/">
                            <Tab className={'Anasayfa'} label={'Anasayfa'}/>
                        </Link>
                        <Tab label={'Kategoriler'} onClick={handleClick} aria-controls={'categories_menu'}/>
                        {user && <Tab label={'Popüler'} href={'/'}/>}
                        {user && <Tab label={'Mesajlar'} href={'/'}/>}
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
                        {!user ? <form action="" className={'loginForm'} onSubmit={login}>
                            <TextField className={'loginText'} size={'small'} id={'username'} label={'Kullanıcı Adı'}
                                       onChange={event => setUsername(event.target.value)} variant={'outlined'}
                                       inputProps={loginTextField}/>
                            <TextField className={'loginText'} size={'small'} id={'password'} label={'Şifre'}
                                       onChange={event => setPassword(event.target.value)} variant={'outlined'}
                                       inputProps={loginTextField}/>
                            <Button className={'loginButton'} type={'submit'}>Giriş</Button>
                            <Link className={'signUp'} to="/sign-up">
                                Kayıt ol
                            </Link>
                        </form> : <Button className={'profileButton'} type={'submit'} onClick={handleAvatarClick} aria-controls={'avatar_menu'}>
                            <img className={'profileImage'} src = 'profile.jpg' />
                        </Button>}

                        {user && <Menu
                            id={'avatar_menu'}
                            anchorEl={anchorElAvatarMenu}
                            keepMounted
                            open={Boolean(anchorElAvatarMenu)}
                            onClose={handleAvatarMenuClose}
                        >
                            <Link className={'profileLink'} to={"/user/"+user.id}>
                                <MenuItem className={'profile'}>
                                    Profil
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={handleAvatarMenuClose}>Ayarlar</MenuItem>
                            <Link className={'logoutLink'} onClick={logout} to={"/"}>
                                <MenuItem className={'logout'}>
                                    Çıkış
                                </MenuItem>
                            </Link>
                        </Menu>}

                    </Tabs>
                </AppBar>
                <Toolbar/>
                <Route exact path={'/'}
                       component={() => <Home surveys={surveys} getSurveys={getSurveys} handleSubmit={handleSubmit}
                                              surveyLoading={surveyLoading} handleChange={handleChange}/>}/>
                {!user && <Route path={'/sign-up'} component={Signup}/>}
                {/*User login olduysa gidebileceği profil sayfası*/}
                {user && <Route path={'/user/:id'} component={User}/>}
            </Router>

            <AppFooter/>
        </div>
    );
}

export default App;
