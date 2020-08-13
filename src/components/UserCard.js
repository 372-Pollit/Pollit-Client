import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import {InfoDialog} from "./InfoDialog";
import {Link} from "react-router-dom";

const host = 'http://localhost:8081';

export const UserCard = (props) => {

    const isFollower = props.isFollowed;
    const curUserId = props.curUserId;
    const user = props.user;
    const getFollowedUsers = props.getFollowedUsers;
    const setMessage = props.setMessage;
    const setOpen = props.setOpen;

    const [isCurUserFollowing, setIsCurUserFollowing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(host + '/user/isXFollowingY', {
            params: {
                xId: curUserId,
                yId: user.id
            }
        })
            .then(res => {
                setIsCurUserFollowing(res.data);
            })
            .catch(err => {
                setError(err);
            })
    }, []);

    const unFollow = () => {
        axios.post(host + '/user/unFollow',{
            followerId: curUserId,
            followedId: user.id
        })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' kullanıcı takipten çıkarıldı..');
                getFollowedUsers && getFollowedUsers();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
            })
    };

    const follow = () => {
        axios.post(host + '/user/follow',{
            followerId: curUserId,
            followedId: user.id
        })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' kullanıcı takip edildi..');
                getFollowedUsers && getFollowedUsers();
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
            {isCurUserFollowing && curUserId && <Button className={'unfollowButton'} color={'secondary'} onClick={unFollow}>Takibi Bırak</Button>}
            {!isCurUserFollowing && curUserId && <Button className={'followButton'} color={'secondary'} onClick={follow}>Takip Et</Button>}
        </Paper>
    );
};