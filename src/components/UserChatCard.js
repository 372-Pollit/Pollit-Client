import React, {useEffect} from 'react';
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export const UserChatCard = (props) => {

    const user = props.user;
    const setActiveUser = props.setActiveUser;
    const setSearchUsers = props.setSearchUsers;


    return (
        <Button className="UserChatCard" onClick={() => {setActiveUser(user); setSearchUsers(false)}}>
            <img className={'UserAvatar'}
                 src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'} alt=""/>
            <div className={'UserData'}>
                <Typography component={'h5'} className={''}>{user.firstName + ' ' + user.lastName}</Typography>
                <Typography component={'h5'}>@{user.username}</Typography>
            </div>

        </Button>
    )
}