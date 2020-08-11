import React from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';

const host = 'http://localhost:8081';

export const CategoryCard = (props) => {

    const data = props.data;
    const subbed = props.subbed;
    const userId = props.userId;
    const setOpen = props.setOpen;
    const setMessage = props.setMessage;
    const onRefresh = props.onRefresh;

    const unSub = () => {
        axios.post(host + '/subs/unSub', {
            userId: userId,
            categoryId: data.id
        })
            .then(res => {
                setOpen(true);
                setMessage(data.name + ' kategorisinin aboneliği iptal edildi')
                onRefresh();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
            })
    };

    const sub = () => {
        axios.post(host + '/subs/sub', {
            userId: userId,
            categoryId: data.id
        })
            .then(res => {
                setOpen(true);
                setMessage(data.name + ' kategorisine abone olundu');
                onRefresh();
            })
            .catch(err => {
                setOpen(true);
                setMessage(data.name + ' kategorisine abone olunurken hata oluştu \n' + err.message);
            })
    };

    return (
        <Paper className="CategoryCard">
            <Typography component={'h4'}>{data.name}</Typography>
            {subbed && <Button onClick={unSub}>Aboneliği iptal et</Button>}
            {!subbed && <Button onClick={sub} className={'subButton'}>Abone ol</Button>}
        </Paper>
    )
};