import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";

const host = 'http://localhost:8081';

export const EditingModerators = (props) => {

    const curUserId = props.userId;

    const [moderators, setModerators] = useState([]);
    const [err, setError] = useState(null);

    // Mounting Functions
    useEffect(() => {
        getModerators();
    }, []);


    const getModerators = () => {
        axios.get(host + '/moderator/findAll')
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
                <UserCard admin={true} curUserId={curUserId} user={moderator}/>
            ))}
        </div>
    )
};