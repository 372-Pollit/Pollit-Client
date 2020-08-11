import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../style/SubbedCategories.css';
import {InfoDialog} from "../components/InfoDialog";
import {CategoryCard} from "../components/CategoryCard";

const host = 'http://localhost:8081';

export const SubbedCategories = (props) => {

    const userId = props.userId;

    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState(null);
    const [unSubbedCategories, setUnSubbedCategories] = useState(null);
    const [err, setError] = useState(null);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getSubbedCategories();
        getUnSubbedCategories();
    };

    const getSubbedCategories = () => {
        axios.get(host + '/subs/subbed', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                setError(err);
                setMessage(err.message);
                setIsOpen(true);
            })
    };

    const getUnSubbedCategories = () => {
        axios.get(host + '/subs/unSubbed', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                setUnSubbedCategories(res.data);
            })
            .catch(err => {
                setError(err);
                setMessage(err.message);
                setIsOpen(true);
            })
    };

    return (
        <div className="SubbedCategories">
            {categories && categories.map(category => (
                <CategoryCard onRefresh={refresh} subbed={true} data={category} userId={userId}
                              setMessage={setMessage}
                              setOpen={setIsOpen}/>
            ))}
            {unSubbedCategories && unSubbedCategories.map(category => (
                <CategoryCard onRefresh={refresh} subbed={false} data={category} userId={userId}
                              setMessage={setMessage}
                              setOpen={setIsOpen}/>
            ))}
            <InfoDialog isOpen={isOpen} setIsOpen={setIsOpen} message={message}/>
        </div>
    )
};
