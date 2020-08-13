import React, {useEffect, useState} from 'react';
import {Paper, Link} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import {InfoDialog} from "./InfoDialog";
import {Link} from "react-router-dom";
import '../style/FollowedUsers.css';

const host = 'http://localhost:8081';

export const UserCard = (props) => {

    const isFollower = props.isFollowed;
    const curUserId = props.curUserId;
    const user = props.user;
    const getFollowedUsers = props.getFollowedUsers;
    const getBlockedUsers = props.getBlockedUsers;
    const setMessage = props.setMessage;
    const setOpen = props.setOpen;
    const admin = props.admin;
    const moderatorKaldir = props.moderatorKaldir;
    const moderator = props.moderator;

    const [isCurUserFollowing, setIsCurUserFollowing] = useState(false);
    const [error, setError] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isModerator, setIsModerator] = useState(false);

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

    useEffect(() => {
        getBlocked();
        getModerator();
    }, []);

    const getBlocked = () => {
        axios.get(host + '/user/isBlocked', {
            params: {
                id: user.id
            }
        })
            .then(res => {
                setIsBlocked(res.data);
            })
            .catch(err => {
                setError(err);
            })
    }

    const getModerator = () => {
        axios.get(host + '/moderator/isModerator', {
            params: {
                id: curUserId
            }
        })
            .then(res => {
                setIsModerator(res.data);
            })
            .catch(err => {
                setError(err);
            })
    }

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

    const blockUser = () => {
        if (!checkBlocked()) {
            axios.post(host + '/user/blockUser', {
                moderatorId: curUserId,
                userId: user.id
            })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' kullanıcısı engellendi.');
                getBlockedUsers && getBlockedUsers();
                getBlocked();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
            })
        }
        else {
            alert("Kullanıcı zaten engellenmiş.");
            getBlocked();
        }
    };

    const unblockUser = () => {
        if (!checkBlocked()) {
            axios.post(host + '/user/unblockUser', {
                moderatorId: curUserId,
                userId: user.id
            })
            .then(res => {
                setOpen(true);
                setMessage(user.username + ' kullanıcısının engeli kaldırıldı.');
                getBlockedUsers && getBlockedUsers();
                getBlocked();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
            })
        }
        else {
            alert("Kullanıcı zaten engelli değil.");
            getBlocked();
        }
    };

    const checkBlocked = () => {
        axios.get(host + '/user/isBlocked', {
            params: {
                id: user.id
            }
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                setError(err);
            })
    }

    return (
        <Paper className={'UserCard'}>
            <Link href={'/user/' + user.id} style={{display: 'flex'}}>
                <img className={'userAvatar'}
                    src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'} alt=""/>
                <div className={'UserCardData'}>
                    <Typography component={'h5'} className={''}>{user.firstName + ' ' + user.lastName}</Typography>
                    <Typography component={'h5'}>@{user.username}</Typography>
                </div>
            </Link>
            {!admin && !moderator && isCurUserFollowing && curUserId && <Button className={'unfollowButton'} color={'secondary'} onClick={unFollow}>Takibi Bırak</Button>}
            {!admin && !moderator && !isCurUserFollowing && curUserId && <Button className={'followButton'} color={'secondary'} onClick={follow}>Takip Et</Button>}
            {isModerator && !isBlocked && <Button className={'blockUserButton'} color={'secondary'} onClick={blockUser}>Kullanıcıyı Engelle</Button>}
            {isModerator && isBlocked && <Button className={'unblockUserButton'} color={'primary'} onClick={unblockUser}>Kullanıcının Engelini Kaldır</Button>}
            {admin && moderatorKaldir && <Button className={'removeModeratorButton'} color={'secondary'} onClick={removeModerator}>Moderator Kaldır</Button>}
            {admin && !moderatorKaldir && <Button className={'addModeratorButton'} color={'secondary'} onClick={addModerator}>Moderator Ekle</Button>}
        </Paper>
    );
};