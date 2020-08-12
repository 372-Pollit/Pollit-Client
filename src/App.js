import React, {useEffect, useState} from 'react';
import { Router, Switch,Route, Link } from 'react-router-dom'
import './App.css';
import {AppBar, Tabs, Tab, Menu, MenuItem } from '@material-ui/core';
import './style/home.css';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {AppFooter} from "./components/AppFooter";
import {Home} from "./pages/Home";
import history from './history';
import {Signup} from "./pages/Signup";
import {User} from "./pages/User";
import {NewSurveyDialog} from "./components/NewSurveyDialog";
import './fonts.css';
import './style/NewSurvey.css';
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
    const [isInSearch, setIsInSearch] = useState(false);
    const [searchText, setSearchText] = useState("");
    // new survey states
    const [newSurveyStartingDate, setNewSurveyStartingDate] = useState(null);
    const [newSurveyDueDate, setNewSurveyDueDate] = useState(null);
    const [newSurveyExplanation, setNewSurveyExplanation] = useState(null);
    const [newSurveyTitle, setNewSurveyTitle] = useState(null);
    const [newSurveyPosterId, setNewSurveyPosterId] = useState(null);
    const [newSurveyOptions, setNewSurveyOptions] = useState([]);
    const [newSurveyTags, setNewSurveyTags] = useState([]);
    const [isNewSurveyOpen, setNewSurvey] = useState(false);

    let tmp_searchText;


    // Mounting functions
    /**
     * componentDidMount
     */
    useEffect(() => {
        setIsLoading(true);
        setIsInSearch(false);
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
        console.log(isInSearch);
        if (isInSearch) {
            setSurveyLoading(true);
            axios.get(host + '/survey/search', {
                params: {
                    search: searchText,
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

        } else {
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
                });

        }

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
        setPageNumber(0);
        setSurveyLoading(true);
        setIsInSearch(true);
        setSearchText(tmp_searchText);
        axios.get(host + '/survey/search', {
            params: {
                search: tmp_searchText,
                pageNumber: 0,
            }
        })
            .then(res => {
                setPageNumber(1);
                setSurveys(res.data);
                setSurveyLoading(false);
            })
            .catch(err => {
                setSurveyLoading(false);
                setError(err);
            })

    };

    const handleChange = (e) => {
        tmp_searchText = e.target.value;
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

    // new survey handles
    const handleNewSurveyStartingDate = (e) => {
        setNewSurveyStartingDate(e.target.value);
    };
    
    const handleNewSurveyDueDate = (e) => {
        setNewSurveyDueDate(e.target.value);
    };
    
    const handleNewSurveyExplanation = (e) => {
        setNewSurveyExplanation(e.target.value);
    };
    
    const handleNewSurveyTitle = (e) => {
        setNewSurveyTitle(e.target.value);
    };
    
    const handleNewSurveyPosterId = (e) => {
        setNewSurveyPosterId(e.target.value);
    };
    
    const handleNewSurveyOptionsAdd = (e) => {
        setNewSurveyOptions([...newSurveyOptions, ""]);
    };
    
    const handleNewSurveyOptionsChange = (e, index) => {
        newSurveyOptions.splice(index, 1, e.target.value);
        setNewSurveyOptions([...newSurveyOptions]);
    };
    
    const handleNewSurveyOptionsRemove = (e, index) => {
        newSurveyOptions.splice(index, 1)
        setNewSurveyOptions([...newSurveyOptions]);
    };
    
    const handleNewSurveyTags = (e) => {
        setNewSurveyTags(e.target.value.split(',').map(s => s.trim()).filter(s => s != ""));
    };

    const clearNewSurvey = () => {
        setNewSurveyStartingDate(null);
        setNewSurveyDueDate(null);
        setNewSurveyExplanation(null);
        setNewSurveyTitle(null);
        setNewSurveyPosterId(null);
        setNewSurveyOptions([]);
        setNewSurveyTags([]);
    }

    const openNewSurvey = () => {
        setNewSurvey(true);
    };

    const closeNewSurvey = () => {
        setNewSurvey(false);
        clearNewSurvey();
    };

    const postNewSurvey = () => {
        //TODO
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
                        {user && <Link className={'PopülerLink'} to="/">
                            <Tab className={'Popüler'} label={'Popüler'}/>
                        </Link>}
                        {user && <Link className={'MesajlarLink'} to="/">
                            <Tab className={'Mesajlar'} label={'Mesajlar'}/>
                        </Link>}
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
                        </form> : <div style={{display: "flex", marginLeft: "auto"}}>
                            <div className={"newSurvey"}>
                                <Button className={"newSurveyButton"} onClick={openNewSurvey} color="primary" variant="contained">YENİ ANKET</Button>
                            </div>
                            <Button className={'profileButton'} type={'submit'} onClick={handleAvatarClick} aria-controls={'avatar_menu'}>
                                <img className={'profileImage'} src = 'profile.jpg' />
                            </Button>
                        </div>}

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
                            <Link classNafome={'logoutLink'} onClick={logout} to={"/"}>
                                <MenuItem className={'logout'}>
                                    Çıkış
                                </MenuItem>
                            </Link>
                        </Menu>}

                    </Tabs>
                </AppBar>
                <Toolbar/>
                <Route exact path={'/'}
                       component={() => <Home searchText={searchText} surveys={surveys} getSurveys={getSurveys} handleSubmit={handleSubmit}
                                              surveyLoading={surveyLoading} handleChange={handleChange}/>}/>
                {!user && <Route path={'/sign-up'} component={Signup}/>}
                {/*User login olduysa gidebileceği profil sayfası*/}
                {user && <Route path={'/user/:id'} component={User}/>}
            </Router>

            <NewSurveyDialog newSurveyStartingDate={newSurveyStartingDate} newSurveyDueDate={newSurveyDueDate} 
                             newSurveyExplanation={newSurveyExplanation} newSurveyTitle={newSurveyTitle} 
                             newSurveyPosterId={newSurveyPosterId} newSurveyOptions={newSurveyOptions} 
                             newSurveyTags={newSurveyTags} handleNewSurveyStartingDate={handleNewSurveyStartingDate} 
                             handleNewSurveyDueDate={handleNewSurveyDueDate} handleNewSurveyExplanation={handleNewSurveyExplanation} 
                             handleNewSurveyTitle={handleNewSurveyTitle} handleNewSurveyPosterId={handleNewSurveyPosterId} 
                             handleNewSurveyOptionsAdd={handleNewSurveyOptionsAdd} handleNewSurveyOptionsChange={handleNewSurveyOptionsChange} 
                             handleNewSurveyOptionsRemove={handleNewSurveyOptionsRemove} handleNewSurveyTags={handleNewSurveyTags} 
                             isNewSurveyOpen={isNewSurveyOpen} closeNewSurvey={closeNewSurvey} postNewSurvey={postNewSurvey}/>

            <AppFooter/>
        </div>
    );
}

export default App;
