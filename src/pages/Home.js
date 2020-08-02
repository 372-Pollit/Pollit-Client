import {CircularProgress, Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import {Survey} from "../components/Survey";
import Button from "@material-ui/core/Button";
import React from "react";


export const Home = (props) => {

    const handleChange = props.handleChange;
    const surveys = props.surveys;
    const getSurveys = props.getSurveys;
    const surveyLoading = props.surveyLoading;
    const handleSubmit = props.handleSubmit;
    const searchText = props.searchText;
    return (
        <Container maxWidth={'md'}>
            <form className={'searchForm'} action="" onSubmit={handleSubmit}>
                <TextField defaultValue={searchText} className={'searchBar'} size={'small'} placeholder={'Örn: lorem,' +
                ' @username, ...'}
                           id="outlined-basic" label="Arama" variant="outlined"  onChange={(e) => handleChange(e)}/>
            </form>
            {surveys.map(survey => (
                <Survey data={survey}/>
            ))}
            {!surveyLoading && <Button variant={'contained'} className={'loadMoreButton'} onClick={getSurveys}>Daha fazla...</Button>}
            {(surveyLoading) && <CircularProgress/>}

        </Container>

    )
};