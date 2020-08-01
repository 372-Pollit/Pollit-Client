import React, {useEffect, useState} from 'react';
import '../style/Survey.css';
import Typography from "@material-ui/core/Typography";

export function Survey(props) {

    let survey = props.data;
    console.log(survey);
    useEffect(() => {
        console.log(survey);
    }, [survey]);
    return (
        <div className="Survey" href="/deneme">
            <span className={'dueDate'}>Bitiş: {survey.dueDate}</span>
            <img className={'image'} src="/images/imageplaceholder.png" alt=""/>
            <div className="content">
                <Typography className={'title'}>{survey.title}</Typography>
                <Typography className={'explanation'}>{survey.explanation}</Typography>
                <div className={'contentFooter'}>
                    <span className={'username'}>@{survey.username}</span>
                    <span className={'voteCount'}>Oy: {survey.voteCount}</span>
                    <span className={'commentCount'}>Yorum: {survey.commentCount}</span>
                </div>

            </div>
        </div>

    );
}