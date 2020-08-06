import React, {useState} from 'react';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import {InfoDialog} from "./InfoDialog";

const host = 'http://localhost:8081';

export const UserCard = (props) => {

    const isFollower = props.isFollowed;
    const curUserId = props.curUserId;
    const user = props.user;
    const getFollowedUsers = props.getFollowedUsers;
    const setMessage = props.setMessage;
    const setOpen = props.setOpen;

    const unFollow = () => {
        axios.post(host + '/user/unFollow',{
            followerId: curUserId,
            followedId: user.id
        })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' kullanıcı takipten çıkarıldı..');
                getFollowedUsers();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
            })
    };

    return (
        <Paper className={'UserCard'}>
            <img className={'userAvatar'}
                 src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'} alt=""/>
            <div className={'UserCardData'}>
                <Typography component={'h5'} className={''}>{user.firstName + ' ' + user.lastName}</Typography>
                <Typography component={'h5'}>@{user.username}</Typography>
            </div>
            {isFollower && <Button className={'unfollowButton'} color={'secondary'} onClick={unFollow}>Takibi Bırak</Button>}
        </Paper>
    );
};