import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../style/FollowedUsers.css';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";
import {Paper} from "@material-ui/core";

const host = 'http://localhost:8081';

export const AddingModerators = (props) => {

    // Props
    const userId = props.userId;

    // States
    const [error, setError] = useState(null);
    const [nonModeratorUsers, setNonModeratorUsers] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    // Mounting Functions
    useEffect(() => {
        getNonModeratorUsers();
    }, []);

    const getNonModeratorUsers = () => {
        axios.get(host + '/user/nonModeratorUsers')
            .then(res => {
                setNonModeratorUsers(res.data);
            })
            .catch(err => {
                setError(err);
            })
    };

    return (
        <div className={'NonModeratorUsers'}>
            {nonModeratorUsers && nonModeratorUsers.map(user => (
                <UserCard admin={true} moderatorKaldir={false} setMessage={setMessage} setOpen={setOpen}
                          curUserId={userId} user={user}/>
            ))}
            <InfoDialog setIsOpen={setOpen} message={message} isOpen={open}/>
        </div>
    );
};