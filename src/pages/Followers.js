import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";

const host = 'http://localhost:8081';

export const Followers = (props) => {

    const curUserId = props.userId;

    const [users, setUsers] = useState([]);
    const [err, setError] = useState(null);

    // Mounting Functions
    useEffect(() => {
        getFollowers();
    }, []);


    const getFollowers = () => {
        axios.get(host + '/user/followers', {
            params: {
                userId: curUserId
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                setError(err);
            })

    };


    return (
        <div className={'FollowedUsers'}>
            {users && users.map(user => (
                <UserCard isFollowed={false}
                          curUserId={curUserId} user={user}/>
            ))}
        </div>
    )
};