import React, {useEffect, useState} from 'react';
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
    const admin = props.admin;
    const moderatorKaldir = props.moderatorKaldir;

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

    const removeModerator = () => {
        axios.post(host + '/moderator/remove', {
            id: user.id
        })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' moderator kaldirildi');
            })
            .catch(err => {
                setOpen(true);
                setMessage(user.username + ' moderator kaldirilirken hata oluştu \n' + err.message);
            })
    };

    const addModerator = () => {
        axios.post(host + '/moderator/add', {
            id: user.id
        })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' moderator eklendi');
            })
            .catch(err => {
                setOpen(true);
                setMessage(user.username + ' moderator eklenirken hata oluştu \n' + err.message);
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
            {!admin && isCurUserFollowing && curUserId && <Button className={'unfollowButton'} color={'secondary'} onClick={unFollow}>Takibi Bırak</Button>}
            {!admin && !isCurUserFollowing && curUserId && <Button className={'followButton'} color={'secondary'} onClick={follow}>Takip Et</Button>}
            {admin && moderatorKaldir && <Button className={'removeModeratorButton'} color={'secondary'} onClick={removeModerator}>Moderator Kaldır</Button>}
            {admin && !moderatorKaldir && <Button className={'addModeratorButton'} color={'secondary'} onClick={addModerator}>Moderator Ekle</Button>}
        </Paper>
    );
};