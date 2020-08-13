import React, { useState, useEffect } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import axios from 'axios';
import {UserCard} from "../components/UserCard";
import {InfoDialog} from "../components/InfoDialog";
import '../style/SurveyPage.css'
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const host = 'http://localhost:8081/';

export const SurveyPage = (props) => {
    const user = props.user;
    const surveyId = props.match.params.id;
    const [survey, setSurvey] = useState(null);
    const [err, setErr] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [vote, setVote] = useState(null);
    const [options, setOptions] = useState([]);
    const [comment, setComment] = useState("");
    const [votedOption, setVotedOption] = useState(null);
    const [openStatistics, setOpenStatistics] = useState(false);
    const [voteStatistics, setVoteStatistics] = useState([]);

    useEffect(() => {
        findSurvey();
        getVotedOption();
    }, []);

    useEffect(() => {
        if (survey) {
            getOptions();
            getVoteStatistics();
        }
    }, [survey]);

    useEffect(() => {
        setVotedOption(null);
        if (user) {
            getVotedOption();
        }
    }, [user]);

    const findSurvey = () => {
        axios.get(host + '/survey/findById', {
            params: {
                surveyId: surveyId
            }
        })
            .then(res => {
                setSurvey(res.data);
            })
            .catch(err => {
                setErr(err);
                setOpen(true);
                setMessage("Bir hata oluştu: " + err.message)
            })
    };

    const getOptions = () => {
        axios.get(host + '/survey/options', {
            params: {
                surveyId: survey.id
            }
        })
            .then(res => {
                setOptions(res.data);
            })
            .catch(err => {
                setErr(err);
                setMessage(err.message);
                setOpen(true);
            })
    };

    const getVotedOption = () => {
        axios.get(host + '/vote/votedOption', {
            params: {
                surveyId: surveyId,
                userId: user && user.id
            }
        })
            .then(res => {
                setVotedOption(res.data);
            })
            .catch(err => {
                setErr(err);
                // setOpen(true);
                // setMessage(err.message);
            })
    };

    const sendVote = () => {
        axios.post(host + '/vote/send', {
            userId: user.id,
            surveyId: surveyId,
            option: vote
        })
            .then(res => {
                getVotedOption();
            })
            .catch(err => {
                setErr(err);
            })
    };

    const sendComment = () => {
        axios.post(host + '/comment/send', {
            content: comment,
            surveyId: surveyId,
            userId: user.id,
        })
            .then(res => {
                findSurvey();
            })
            .catch(err => {
                setOpen(true);
                setMessage(err.message);
                setErr(err);
            })
    };

    const getVoteStatistics = () => {
        axios.get(host + '/vote/getVoteStatistics', {
            params: {
                surveyId: surveyId,
            }
        })
            .then(res => {
                // alert('başarılı');
                setVoteStatistics(res.data);
            })
            .catch(err => {
                setErr(err);
            });
    };


    const respond = () => {

    };

    return (
        survey  ?
            <Container className={'SurveyPage'} maxWidth={'md'}>
                <UserCard curUserId={user && user.id} user={survey.posterUser} setMessage={setMessage}
                          setOpen={setOpen}/>
                <div>
                    <span className={'StartingDate'}>Başlangıç: {survey.startingDate}</span>
                    <span className={'DueDate'}>Bitiş: {survey.dueDate}</span>
                </div>
                <h1>{survey.title}</h1>
                <img className={'TitleImage'} src="/images/imageplaceholder.png" alt="image"/>
                <p className={'Explanation'}>{survey.explanation}</p>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Oylar</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" defaultValue={votedOption && votedOption.option.option}
                                value={votedOption ? votedOption.option.option : vote}
                                onChange={event => {
                                    if (!votedOption) {
                                        setVote(event.target.value);
                                    }
                                }}>
                        {options && options.map(option => (
                            <FormControlLabel className={'OptionRadio'}
                                              value={option.option} control={<Radio/>} label={option.option}/>
                        ))}
                    </RadioGroup>
                    <Button disabled={!user || votedOption} variant="contained" color={'primary'} className={'VoteButton'}
                            onClick={sendVote}>{user ? 'Oyla' : 'Oylamak için giriş yap'}</Button>
                    {user && votedOption && <Button variant="contained" color={'primary'} className={'VoteButton'}
                                           onClick={() => {setOpenStatistics(true)}}>İstatistikler</Button>}
                </FormControl>
                <TextField className={'CommentInput'} variant="outlined" placeholder={'Yorum Yapınız'} multiline
                           rows={5}
                           onChange={event => {
                               setComment(event.target.value)
                           }}/>
                <Button className={'VoteButton'} color={'primary'} variant="contained" disabled={!user || !votedOption}
                        onClick={sendComment}>Gönder</Button>
                <h3>Yorumlar</h3>
                {(!user || !votedOption) && <h2>Yorumları görmek için lütfen giriş yapınız ve oy kullanınız</h2>}
                {user && votedOption && survey.comments.map(comment => (
                    <Card className={'CommentCard'}>
                        <CardMedia className={'CardMedia'}>
                            <img className={'CommentAvatar'}
                                src={comment.user.sex.toString() === 'F' ? '/images/female_avatar.svg' : '/images/male_avatar.svg'}
                                alt=""/>
                            <div className={'CommentUserInfo'}>
                                <p>{comment.user.firstName + comment.user.lastName}</p>
                                <p>@{comment.user.username}</p>
                            </div>
                            <div className={'CommentDate'}>
                                <span>Tarih: {comment.dateWritten}</span>
                            </div>
                        </CardMedia>
                        <CardContent className={'CommentContent'}>
                            <p>{comment.content}</p>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*    <Button onClick={respond}>Yanıtla</Button>*/}
                        {/*</CardActions>*/}
                    </Card>
                ))}
                <StatisticsDialog voteStatistics={voteStatistics}
                                  options={options} surveyId={surveyId} setOpen={setOpenStatistics} isOpen={openStatistics}/>
                <InfoDialog isOpen={open} message={message} setIsOpen={setOpen}/>
            </Container> : <CircularProgress/>
    );
};


const StatisticsDialog = (props) => {

    const options = props.options;
    const isOpen = props.isOpen;
    const surveyId = props.surveyId;
    const setIsOpen = props.setOpen;
    const id = props.id;
    const voteStatistics = props.voteStatistics;
    const [error, setError] = useState(null);



    return (
        <Dialog open={isOpen}>
            <DialogTitle id={id ? id : 'statisticTitle'}>İstatistikler</DialogTitle>
            <DialogContent>
                {voteStatistics && voteStatistics.map((vote, i) => (
                    <DialogContentText>
                        {vote.percentage}%
                        {options[i].option}
                    </DialogContentText>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsOpen(false)}>OK</Button>
            </DialogActions>
        </Dialog>
    )
};

