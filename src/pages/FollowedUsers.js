import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../style/FollowedUsers.css';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";
import {Paper} from "@material-ui/core";

const host = 'http://localhost:8081';

export const FollowedUsers = (props) => {

    // Props
    const userId = props.userId;

    // States
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [followedUsers, setFollowedUsers] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    // Mounting Functions
    useEffect(() => {
        getFollowedUsers();
    }, []);

    // Custom Functions
    const getUser = () => {
        axios.get(host + '/user/find', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                setError(err);
            })
    };

    const getFollowedUsers = () => {
        axios.get(host + '/user/followedUsers', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                setFollowedUsers(res.data);
            })
            .catch(err => {
                setError(err);
            })

    };

    return (
        <div className={'FollowedUsers'}>
            {followedUsers && followedUsers.map(user => (
                <UserCard isFollowed={true} setMessage={setMessage} setOpen={setOpen}
                          curUserId={userId} getFollowedUsers={getFollowedUsers} user={user}/>
            ))}
            <InfoDialog setIsOpen={setOpen} message={message} isOpen={open}/>
        </div>
    );
};