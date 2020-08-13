import React, {useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";

const host = 'http://localhost:8081';

export const CategoryCard = (props) => {

    const data = props.data;
    const subbed = props.subbed;
    const admin = props.admin;
    const userId = props.userId;
    const setOpen = props.setOpen;
    const setMessage = props.setMessage;
    const onRefresh = props.onRefresh;

    const [isEdit, setIsEdit] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(false);

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

    const remove = () => {
        axios.post(host + '/category/remove', {
            categoryId: data.id
        })
            .then(res => {
                setOpen(true);
                setMessage(data.name + ' kategori silindi');
                onRefresh();
            })
            .catch(err => {
                setOpen(true);
                setMessage(data.name + ' kategori silinirken hata oluştu \n' + err.message);
            })
    };

    const edit = () => {
        setIsEdit(true);
    };

    const save = () => {
        axios.post(host + '/category/update', {
            categoryId: data.id,
            categoryName: newCategoryName
        })
            .then(res => {
                setOpen(true);
                setMessage(data.name + ' kategori güncellendi');
                onRefresh();
                setIsEdit(false);
            })
            .catch(err => {
                setOpen(true);
                setMessage(data.name + ' kategori güncellenirken hata oluştu \n' + err.message);
            })
    };

    const cancel = () => {
        setIsEdit(false);
    };

    const changeCategoryName = (e) => {
        setNewCategoryName(e.target.value);
    };

    return (
        <Paper className="CategoryCard">
            {!isEdit && <Typography component={'h4'}>{data.name}</Typography>}
            {isEdit && <TextField onChange={changeCategoryName} defaultValue={data.name} component={'h4'}>{data.name}</TextField>}
            {!admin && subbed && <Button onClick={unSub}>Aboneliği iptal et</Button>}
            {!admin && !subbed && <Button onClick={sub} className={'subButton'}>Abone ol</Button>}
            {!isEdit && admin && <Button onClick={remove}>Kaldır</Button>}
            {!isEdit && admin && <Button onClick={edit}>Düzenle</Button>}
            {isEdit && admin && <Button onClick={save}>Onayla</Button>}
            {isEdit && admin && <Button onClick={cancel}>İptal</Button>}
        </Paper>
    )
};