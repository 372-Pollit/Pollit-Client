import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";

const host = 'http://localhost:8081';

export const EditingModerators = (props) => {

    const curUserId = props.userId;

    const [moderators, setModerators] = useState([]);
    const [err, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);

    // Mounting Functions
    useEffect(() => {
        getModerators();
    }, []);


    const getModerators = () => {
        axios.get(host + '/user/getModerators')
            .then(res => {
                setModerators(res.data);
            })
            .catch(err => {
                setError(err);
            })
    };


    return (
        <div className={'Moderators'}>
            {moderators && moderators.map(moderator => (
                <UserCard admin={true} curUserId={curUserId} user={moderator} moderatorKaldir={true}
                setMessage={setMessage} setOpen={setOpen}/>
            ))}
        </div>
    )
};