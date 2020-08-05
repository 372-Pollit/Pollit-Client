import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import '../style/User.css';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ProfileSurveys} from "./ProfileSurveys";

const host = 'http://localhost:8081';
const tabs = ["Anketlerim", "Takip Ettiklerim", "Takipçilerim", "Abonelikler"];

export const User = (props) => {
    const userId = props.match.params.id;
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(null);
    const [tab, setTab] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    /**
     * ComponentDidMount
     */
    useEffect(() => {
        axios.get(host + '/user/find', {
            params: {
                id: userId
            }
        })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                setErr(err);
            })
    }, []);


    const handleChange = (e, newTab) => {
        setTab(newTab);
    };

    return (
        user ?
        <Container maxWidth={'md'}>
            <Card className={'UserCard'}>
                <img className={'UserAvatar'}
                           src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'}/>
                <CardContent className={'UserData'}>
                    <Typography className={'name'}
                                component={'h5'}><span>İsim: </span>{user.firstName + ' ' + user.lastName}</Typography>
                    <Typography className={'username'} component={'h5'}
                                variant="subtitle1" color="textSecondary">
                        {'@' + user.username}</Typography>
                    <Typography className={'email'}
                                component={'h5'}><span>E-posta:</span> {user.email}</Typography>
                    <Typography className={'bdate'}
                                component={'h5'}><span>Doğum Tarihi:</span> {user.birthDate}</Typography>
                    <Typography className={'sex'}
                                component={'h5'}><span>Cinsiyet:</span> {user.sex}</Typography>
                </CardContent>
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
                    tab === 1 ? <div/> :              // takip ettiklerim
                    tab === 2 ? <div/> :              // takipçilerim
                    <div/>                                  // abonelikler
                }
            </div>
        </Container> : <CircularProgress/>
    );
};