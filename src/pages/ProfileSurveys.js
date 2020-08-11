import React, {useEffect, useState} from 'react';
import '../style/ProfileSurveys.css';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import {Survey} from "../components/Survey";
import {CircularProgress, Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const host = 'http://localhost:8081';

export const ProfileSurveys = (props) => {

    const userId = props.userId;
    const [type, setType] = useState('Oy Kullandıklarım');
    const [surveys, setSurveys] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [surveyLoading, setSurveyLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * ComponentDidMount
     */
    useEffect(() => {
        getVotedSurveys();
    }, []);

    /**
     * ComponentDidUpdate (Type değiştiğinde çalışacak)
     */
    useEffect(() => {
        setPageNumber(0);
        setSurveys([]);
        console.log(surveys);
        handleClick();
    }, [type]);

    const handleClick = () => {
        if (type === 'Paylaşımlarım') {
            getPostedSurveys();
        } else {
            getVotedSurveys();
        }
    };

    const getVotedSurveys = () => {
        setSurveyLoading(true);
        axios.get(host + '/survey/votedSurveys', {
            params: {
                userId: userId,
                pageNumber: pageNumber
            }
        })
            .then(res => {
                if (pageNumber === 0) {
                    setSurveys(res.data);
                } else {
                    setSurveys(surveys.concat(res.data));
                }
                if (res.data.length !== 0) {
                    setPageNumber(pageNumber + 1);
                }
                setSurveyLoading(false);
            })
            .catch(err => {
                setError(err);
                setSurveyLoading(false);
            })
    };

    const getPostedSurveys = () => {
        setSurveyLoading(true);
        axios.get(host + '/survey/postedSurveys', {
            params: {
                userId: userId,
                pageNumber: pageNumber
            }
        })
            .then(res => {
                if (pageNumber === 0) {
                    setSurveys(res.data);
                } else {
                    setSurveys(surveys.concat(res.data));
                }
                if (res.data.length !== 0) {
                    setPageNumber(pageNumber + 1);
                }
                setSurveyLoading(false);
            })
            .catch(err => {
                setError(err);
                setSurveyLoading(false);
            })
    };

    const handleChange = (e) => {
        setPageNumber(0);
        setType(e.target.value);
    };

    return (
        <div className={'ProfileSurveys'}>
            <FormControl className={'typeControl'}>
                <InputLabel id={'type'}>Tür</InputLabel>
                <Select labelId={'type'}
                        id={'typeSelect'}
                        onChange={handleChange}
                        value={type}
                >
                    <MenuItem value={'Oy Kullandıklarım'}>Oy Kullandıklarım</MenuItem>
                    <MenuItem value={'Paylaşımlarım'}>Paylaşımlarım</MenuItem>
                </Select>
            </FormControl>
            {!surveyLoading && surveys.map(survey => (
                <div className={'SurveyContainer'}>
                    <Survey data={survey}/>
                    {type === 'Oy Kullandıklarım' && <p className={'option'}>
                        <span className={'voteLabel'}>Kullanılan Oy: </span>{survey.option}</p>}
                </div>
            ))}
            {surveyLoading && <CircularProgress />}
            {!surveyLoading && <Button variant={'contained'} className={'loadMoreButton'} onClick={handleClick}>Daha fazla...</Button>}
        </div>
    );
};