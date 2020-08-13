import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, InputLabel, Select, MenuItem, DialogActions, Button, Typography } from '@material-ui/core';

export const NewSurveyDialog = (props) => {
    const newSurveyStartingDate = props.newSurveyStartingDate;
    const newSurveyDueDate = props.newSurveyDueDate;
    const newSurveyExplanation = props.newSurveyExplanation;
    const newSurveyTitle = props.newSurveyTitle;
    const newSurveyPosterId = props.newSurveyPosterId;
    const newSurveyOptions = props.newSurveyOptions;
    const newSurveyTags = props.newSurveyTags;
    const handleNewSurveyStartingDate = props.handleNewSurveyStartingDate;
    const handleNewSurveyDueDate = props.handleNewSurveyDueDate;
    const handleNewSurveyExplanation = props.handleNewSurveyExplanation;
    const handleNewSurveyTitle = props.handleNewSurveyTitle;
    const handleNewSurveyPosterId = props.handleNewSurveyPosterId;
    const handleNewSurveyOptionsAdd = props.handleNewSurveyOptionsAdd;
    const handleNewSurveyOptionsChange = props.handleNewSurveyOptionsChange;
    const handleNewSurveyOptionsRemove = props.handleNewSurveyOptionsRemove;
    const handleNewSurveyTags = props.handleNewSurveyTags;
    const isNewSurveyOpen = props.isNewSurveyOpen;
    const closeNewSurvey = props.closeNewSurvey;
    const postNewSurvey = props.postNewSurvey;

    return (
        <Dialog open={isNewSurveyOpen} onClose={closeNewSurvey} aria-labelledby="new-survey-dialog" maxWidth={"md"} fullWidth>
            <DialogTitle id="new-survey-dialog">Yeni Anket Oluşturma</DialogTitle>
            <DialogContent className={"newSurveyDialog"} >
                <TextField className={"newSurveyItem"} id="new-survey-title" label="Başlık" onChange={handleNewSurveyTitle} required variant={"outlined"} />
                <TextField className={"newSurveyItem"} id="new-survey-explanation" label="İçerik" multiline rows={8} onChange={handleNewSurveyExplanation} required variant={"outlined"} />
                <div id={"new-survey-options"} key={newSurveyOptions}>
                    <div style={{textAlign: "center"}}>
                        <Typography component="h1">Seçenekler</Typography>
                    </div>
                    <div className={"newSurveyOptions"} >
                        {newSurveyOptions.map((option, index) => 
                            <div className={"newSurveyItem newSurveyOptionItem"}>
                                <Typography component="h1">{index + 1}</Typography>
                                <TextField className={"newSurveyOptionText"} id={"new-survey-option"} defaultValue={option} onChange={(e) => handleNewSurveyOptionsChange(e, index)} required variant={"outlined"} fullWidth />
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <Button className={"newSurveyRemoveOptionButton"} onClick={(e) => handleNewSurveyOptionsRemove(e, index)} color="secondary" variant="contained" >–</Button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Button className={"newSurveyAddOptionButton"} onClick={handleNewSurveyOptionsAdd} color="primary" variant="contained" >+</Button>
                    </div>
                </div>
                <div className={"newSurveyDates"} >
                    <TextField className={"newSurveyItem"} id="new-survey-starting-date" defaultValue={new Date().toISOString().substring(0,16)} label="Başlangıç Tarihi" type="datetime-local" onChange={handleNewSurveyStartingDate} required variant={"outlined"} />
                    <TextField className={"newSurveyItem"} id="new-survey-due-date" defaultValue={new Date().toISOString().substring(0,16)} label="Bitiş Tarihi" type="datetime-local" onChange={handleNewSurveyDueDate} required variant={"outlined"} />
                </div>
                <TextField className={"newSurveyItem"} id="new-survey-tags" label="Etiketler" onChange={handleNewSurveyTags} variant={"outlined"}
                error={newSurveyTags.length > 10} helperText="Anketin bulunmasında yardımcı olacak anahtar kelimeler. Virgülle ayırınız. Maksimum 10 adet." />
            </DialogContent>
            <DialogActions>
                <Button onClick={postNewSurvey} color="primary" variant="contained">
                    Oluştur
                </Button>
                <Button onClick={closeNewSurvey} color="secondary" variant="contained">
                    İptal
                </Button>
            </DialogActions>
        </Dialog>
    );
}