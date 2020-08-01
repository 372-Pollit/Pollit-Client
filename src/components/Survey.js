import React, {useEffect, useState} from 'react';
import '../style/Survey.css';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

export function Survey(props) {

    let survey = props.data;
    console.log(survey);
    useEffect(() => {
        console.log(survey);
    }, [survey]);
    return (
        <Paper className="Survey" elevation={3}>
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

    );
}