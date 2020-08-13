import {CircularProgress, Container} from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";
import {Survey} from "../components/Survey";
import Button from "@material-ui/core/Button";
import React from "react";
import {UserCard} from "../components/UserCard";


export const Home = (props) => {

    const handleChange = props.handleChange;
    const surveys = props.surveys;
    const getSurveys = props.getSurveys;
    const surveyLoading = props.surveyLoading;
    const handleSubmit = props.handleSubmit;
    const searchText = props.searchText;
    const isUserSearch = props.isUserSearch;
    const users = props.users;
    const curUser = props.curUser;
    const isLoggedIn = props.isLoggedIn;

    return (
        <Container maxWidth={'md'}>
            <form className={'searchForm'} action="" onSubmit={handleSubmit}>
                <TextField defaultValue={searchText} className={'searchBar'} size={'small'} placeholder={'Örn: lorem,' +
                ' @username, ...'}
                           id="outlined-basic" label="Arama" variant="outlined"  onChange={(e) => handleChange(e)}/>
            </form>
            {!isUserSearch && surveys.map(survey => (
                <Survey data={survey}/>
            ))}
            {isUserSearch && isLoggedIn && users.map(user => (
                <UserCard curUserId={curUser.id} user={user}/>
            ))}
            {isUserSearch && !isLoggedIn && users.map(user => (
                <UserCard user={user}/>
            ))}
            {(surveyLoading) && <CircularProgress/>}
            {!surveyLoading && <Button variant={'contained'} className={'loadMoreButton'} onClick={getSurveys}>Daha fazla...</Button>}

        </Container>

    )
};