import React, {useEffect, useState} from 'react';
import '../style/Survey.css';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";

export function Survey(props) {

    let survey = props.data;
    useEffect(() => {
    }, [survey]);
    return (
        <Link to={'/survey/' + survey.id}>
            <Paper className="Survey" elevation={3} on>
                <span className={'dueDate'}>Bitiş: {survey.dueDate}</span>
                <img className={'image'} src="/images/imageplaceholder.png" alt=""/>
                <div className="content">
                    <Typography className={'title'}>{survey.title}</Typography>
                    <Typography className={'explanation'}>{survey.explanation}</Typography>
                </div>
                <div className={'contentFooter'}>
                    <span className={'username'}>@{survey.username}</span>
                    <span className={'voteCount'}>Oy: {survey.voteCount}</span>
                    <span className={'commentCount'}>Yorum: {survey.commentCount}</span>
                </div>
            </Paper>
        </Link>

    );
}