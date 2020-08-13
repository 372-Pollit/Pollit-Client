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
import {User} from "./pages/User";
import {NewSurveyDialog} from "./components/NewSurveyDialog";
import {Signup} from "./components/Signup";
import './fonts.css';
import {Messages} from "./pages/Messages";
import './style/NewSurvey.css';
import './style/Signup.css';
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
    const [users, setUsers] = useState([]);
    const [surveyLoading, setSurveyLoading] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [user, setUser] = useState(null);
    const [isInSearch, setIsInSearch] = useState(false);
    const [isUserSearch, setIsUserSearch] = useState(false);
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
    // signup dialog states
    const [signupFname, setSignupFname] = useState(null);
    const [signupLname, setSignupLname] = useState(null);
    const [signupUname, setSignupUname] = useState(null);
    const [signupEmail, setSignupEmail] = useState(null);
    const [signupPassword, setSignupPassword] = useState(null);
    const [signupPasswordAgain, setSignupPasswordAgain] = useState(null);
    const [signupBdate, setSignupBdate] = useState(null);
    const [signupSex, setSignupSex] = useState(null);
    const [isSignupOpen, setSignup] = useState(false);

    let tmp_searchText = "";


    // Mounting functions
    /**
     * componentDidMount
     */
    useEffect(() => {
        setIsLoading(true);
        setIsInSearch(false);
        setIsUserSearch(false);
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

    useEffect(() => {
        setPageNumber(0);
        setSurveys([]);
        getSurveys();
    }, [user]);


    //Custom functions
    const getSurveys = () => {
        console.log(isInSearch);
        setSurveyLoading(true);
        if (isInSearch) {

            if (isUserSearch) {

                axios.get(host + '/user/search', {
                    params: {
                        searchString: searchText,
                        pageNumber: pageNumber,
                    }
                })
                    .then(res => {
                        setPageNumber(pageNumber + 1);
                        setUsers(users.concat(res.data));
                        setSurveyLoading(false);
                    })
                    .catch(err => {
                        setSurveyLoading(false);
                        setError(err);
                    })

            }

            else {

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

            }

        } else {
            if (user) {
                setSurveyLoading(true);
                axios.get(host + '/survey/forUser', {
                    params: {
                        userId: user.id,
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
            else {
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
        setIsUserSearch(tmp_searchText.toString().charAt(0)==="@");

        if (isUserSearch) {

            axios.get(host + '/user/search', {
                params: {
                    searchString: tmp_searchText,
                    pageNumber: 0,
                }
            })
                .then(res => {
                    setPageNumber(1);
                    setUsers(res.data);
                    setSurveyLoading(false);
                })
                .catch(err => {
                    setSurveyLoading(false);
                    setError(err);
                })

        }

        else {

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

        }

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

    const profile = () => {
        handleAvatarMenuClose();
    };

    const anasayfa = () => {
        setSearchText("");
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

    //signup handles
    const openSignup = () => {
        setSignup(true);
    };

    const closeSignup = () => {
        clearSignupDialog();
        setSignup(false);
    };

    const clearSignupDialog = () => {
        setSignupFname(null);
        setSignupLname(null);
        setSignupUname(null);
        setSignupEmail(null);
        setSignupPassword(null);
        setSignupPasswordAgain(null);
        setSignupBdate(null);
        setSignupSex(null);
    }

    const handleSignupFname = (e) => {
        setSignupFname(e.target.value);
    };

    const handleSignupLname = (e) => {
        setSignupLname(e.target.value);
    };

    const handleSignupUname = (e) => {
        setSignupUname(e.target.value);
    };

    const handleSignupEmail = (e) => {
        setSignupEmail(e.target.value);
    };

    const handleSignupPassword = (e) => {
        setSignupPassword(e.target.value);
    };

    const handleSignupPasswordAgain = (e) => {
        setSignupPasswordAgain(e.target.value);
    };

    const handleSignupBdate = (e) => {
        setSignupBdate(e.target.value);
    };

    const handleSignupSex = (e) => {
        setSignupSex(e.target.value);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        axios.get(host + '/user/findByUsername', {
            params: { username: signupUname }
        })
        .then(res1 => {
            if (res1.data === '') {
                axios.get(host + '/user/findByEmail', {
                    params: { email: signupEmail }
                })
                .then(res2 => {
                    if (res2.data === '') {
                        axios.post(host + '/user/signup', {
                            username: signupUname,
                            password: signupPassword,
                            email: signupEmail,
                            first_name: signupFname,
                            last_name: signupLname,
                            sex: signupSex,
                            birth_date: signupBdate
                        })
                        .then(res => {
                            closeSignup();
                            axios.get(host + '/user/isUser', {
                                params: {
                                    username: username,
                                    password: password
                                }
                            })
                                .then(res3 => {

                                    if (res3.data==='') {
                                        alert('hatali giris');
                                    }
                                    else {
                                        alert(`hi ${res3.data.username}`);
                                        setUser(res3.data);
                                    }

                                })
                                .catch(err => {
                                    setError(err);
                                    alert('sgnlgn');
                                });
                        })
                        .catch(err => {
                            alert("Could not signup");
                        })
                    }
                    else {
                        alert("E-mail is already in use.");
                    }
                })
                .catch(err => {
                    setError(err);
                    alert('eml');
                })
            }
            else {
                alert("Username is already in use.");
            }
        })
        .catch(err => {
            setError(err);
            alert('usr');
        });
    }

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
                        {user && <Link className={'MesajlarLink'} to={`/messages/${user.id}`}>
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
                            <Link className={'signUp'} onClick={openSignup}>
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
                            <Link className={'profileLink'} to={"/user/"+user.id} onClick={profile}>
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
                       component={() => <Home searchText={searchText} surveys={surveys} getSurveys={getSurveys} handleSubmit={handleSubmit}
                                              isUserSearch={isUserSearch} users={users} surveyLoading={surveyLoading}
                                              isLoggedIn={!!user} curUser={user} handleChange={handleChange}/>}/>
                {!user && <Route path={'/sign-up'} component={Signup}/>}
                {/*User login olduysa gidebileceği profil sayfası*/}
                {user && <Route path={'/user/:id'} component={User}/>}
                {user && <Route path={'/messages/:id'} component={Messages}/>}
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

            <Signup isSignupOpen={isSignupOpen} closeSignup={closeSignup} signupFname={signupFname}
                    handleSignupFname= {handleSignupFname} signupLname={signupLname}
                    handleSignupLname= {handleSignupLname} signupUname={signupUname}
                    handleSignupUname= {handleSignupUname} signupEmail={signupEmail}
                    handleSignupEmail= {handleSignupEmail} signupPassword={signupPassword}
                    handleSignupPassword= {handleSignupPassword} signupPasswordAgain={signupPasswordAgain}
                    handleSignupPasswordAgain={handleSignupPasswordAgain} signupBdate={signupBdate}
                    handleSignupBdate={handleSignupBdate} signupSex={signupSex}
                    handleSignupSex={handleSignupSex} handleSignupSubmit={handleSignupSubmit}/>

            <AppFooter/>
        </div>
    );
}

export default App;
