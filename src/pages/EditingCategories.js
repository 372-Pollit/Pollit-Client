import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../style/EditingCategories.css';
import {InfoDialog} from "../components/InfoDialog";
import {CategoryCard} from "../components/CategoryCard";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";

const host = 'http://localhost:8081';

export const EditingCategories = (props) => {

    const userId = props.userId;

    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState(null);
    const [err, setError] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState(null);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        getAllCategories();
    };

    const getAllCategories = () => {
        axios.get(host + '/category/findAll')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                setError(err);
                setMessage(err.message);
                setIsOpen(true);
            })
    };

    const add = (e) => {
        e.preventDefault();
        axios.post(host + '/category/add', {
                categoryName: newCategoryName
        })
            .then(res => {
                setMessage(newCategoryName + ' kategori eklendi..');
                setIsOpen(true);
                refresh();
            })
            .catch(err => {
                setError(err);
                setMessage(err.message);
                setIsOpen(true);
            })
    };

    return (
        <div className="EditingCategories">
            {categories && categories.map(category => (
                <CategoryCard onRefresh={refresh} admin={true} data={category} userId={userId}
                              setMessage={setMessage}
                              setOpen={setIsOpen}/>
            ))}
            <form action="" className={'newCategoryForm'} onSubmit={add}>
                <TextField className={'newCategoryNameText'} size={'small'} id={"categoryName"} label={'Yeni Kategori'}
                           onChange={event => setNewCategoryName(event.target.value)} variant={'outlined'}/>
                <Button className={'newCategoryButton'} type={'submit'}>Ekle</Button>
            </form>
            <InfoDialog isOpen={isOpen} setIsOpen={setIsOpen} message={message}/>
        </div>
    )
};
