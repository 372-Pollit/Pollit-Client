import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import '../style/User.css';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ProfileSurveys} from "./ProfileSurveys";
import {FollowedUsers} from "./FollowedUsers";
import {Followers} from "./Followers";
import {SubbedCategories} from "./SubbedCategories";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {InfoDialog} from "../components/InfoDialog";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const host = 'http://localhost:8081';
const tabs = ["Anketlerim", "Takip Ettiklerim", "Takipçilerim", "Abonelikler"];

export const Moderator = (props) => {
    const userId = props.match.params.id;
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    const [tab, setTab] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [edit, setEdit] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [sex, setSex] = useState(undefined);
    const [editLoading, setEditLoading] = useState(false);
    /**
     * ComponentDidMount
     */
    useEffect(() => {
        findUser();
    }, []);

    const findUser = () => {
        axios.get(host + '/user/find', {
            params: {
                id: userId
            }
        })
            .then(res => {
                setUser(res.data);
                setEditUser(Object.assign({}, res.data));
                setSex(res.data.sex);
            })
            .catch(err => {
                setErr(err);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditLoading(true);
        axios.post(host + '/user/update', editUser)
            .then(res => {
                setMessage('Değişiklikler kaydedildi');
                setIsOpen(true);
                setEdit(false);
                if (res.status === 200) {
                    setEditUser({});
                }
                setEditLoading(false);
                findUser();
            })
            .catch(err => {
                setMessage('Değişiklikler kaydedilirken hata oluştu');
                setIsOpen(true);
                setEditLoading(false);

            })
    };

    const handleChange = (e, newTab) => {
        setTab(newTab);
    };

    const handleEditChange = (e) => {
        console.log(editUser);
        let tmp = editUser;
        tmp[e.target.name] = e.target.value;
        setEditUser(tmp);
    };

    return (
        user ?
            <Container maxWidth={'md'}>
                <Card className={'UserCard'}>
                    <img className={'UserAvatar'}
                         src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'}/>
                    {!edit && <CardContent className={'UserData'}>
                        <Typography className={'name'}
                                    component={'h5'}><span>İsim: </span>{user.firstName + ' ' + user.lastName}
                        </Typography>
                        <Typography className={'username'} component={'h5'}
                                    variant="subtitle1" color="textSecondary">
                            {'@' + user.username}</Typography>
                        <Typography className={'email'}
                                    component={'h5'}><span>E-posta:</span> {user.email}</Typography>
                        <Typography className={'bdate'}
                                    component={'h5'}><span>Doğum Tarihi:</span> {user.birthDate}</Typography>
                        <Typography className={'sex'}
                                    component={'h5'}><span>Cinsiyet:</span> {user.sex}</Typography>
                    </CardContent>}
                    {edit && !editLoading && <CardContent className="UserData">
                        <form action="" onSubmit={handleSubmit} className={'UserEditForm'}>
                            <FormGroup className={'form_1'}>
                                <TextField defaultValue={editUser.firstName} name={'firstName'}
                                           label={'İsim'} onChange={handleEditChange}/>
                                <TextField defaultValue={editUser.lastName} onChange={handleEditChange}
                                           name={'lastName'} label={'Soyisim'}/>
                            </FormGroup>
                            <FormGroup className={'form_2'}>
                                <TextField defaultValue={editUser.email} onChange={handleEditChange}
                                           name={'email'} label={'E-posta'} type={'email'}/>
                                <TextField defaultValue={editUser.birthDate} onChange={handleEditChange}
                                           name={'birthDate'} label={'Doğum Tarihi'} type={'date'}/>
                                <Select
                                    label={'Cinsiyet'}
                                    id="sexSelect"
                                    value={sex}
                                    onChange={e => {
                                        console.log(editUser);
                                        let tmp = editUser;
                                        tmp.sex = e.target.value;
                                        setEditUser(tmp);
                                        setSex(e.target.value);
                                        console.log(editUser.sex);
                                    }}
                                >
                                    <MenuItem value={'N'}>
                                        None
                                    </MenuItem>
                                    <MenuItem value={'M'}>Erkek</MenuItem>
                                    <MenuItem value={'F'}>Kadın</MenuItem>
                                </Select>


                            </FormGroup>
                        </form>
                    </CardContent>}
                    {editLoading && <CircularProgress className={'editLoading'}/>}
                    <CardActions style={{
                        alignItems: 'flex-start'
                    }}>
                        {!edit && <Button onClick={() => setEdit(true)}><EditIcon color={'primary'}/></Button>}
                        {edit &&
                        <Button onClick={() => {
                            setEdit(false);
                        }}>
                            <ClearIcon color={'secondary'}/>
                        </Button>}
                        {edit &&
                        <Button type={'submit'} onClick={handleSubmit}><DoneIcon color={''} style={{color: 'green'}}/></Button>}
                    </CardActions>
                </Card>
                <Tabs value={tab} className={'tabs'} indicatorColor="primary"
                      textColor="primary" onChange={handleChange} centered={true}>
                    {tabs.map(tab => (
                        <Tab className={'tab'} label={tab}/>
                    ))}
                </Tabs>
                <div className="main">
                    {
                        tab === 0 ? <ProfileSurveys userId={user.id}/> :   // anketlerim
                            tab === 1 ? <FollowedUsers userId={user.id}/> :              // takip ettiklerim
                                tab === 2 ? <Followers userId={user.id}/> :              // takipçilerim
                                    <SubbedCategories userId={user.id}/>                                  // abonelikler
                    }
                </div>
                <InfoDialog id={'UserPageDialog'} message={message} isOpen={isOpen} setIsOpen={setIsOpen}/>
            </Container> : <CircularProgress/>
    );
};