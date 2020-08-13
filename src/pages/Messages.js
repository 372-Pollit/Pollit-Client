import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {InfoDialog} from "../components/InfoDialog";
import '../style/Messages.css';
import Box from "@material-ui/core/Box";
import {UserChatCard} from "../components/UserChatCard";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import CheckIcon from '@material-ui/icons/Check';

const host = 'http://localhost:8081';

function convertToDate(timestamp) {
    let t = timestamp.split(/[- :]/);
    return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
}

export const Messages = (props) => {

    const userId = props.match.params.id;
    const [messagedUsers, setMessagedUsers] = useState(null);
    const [error, setError] = useState(null);
    const [openInfo, setOpenInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [searchUsers, setSearchUsers] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([]);
    const [message, setMessage] = useState("");

    /**
     * activeUser means that the user your are chatting at the moment
     */
    const [activeUser, setActiveUser] = useState(null);

    useEffect(() => {
        setInterval(getMessagedUsers, 200);
    }, []);

    const getMessagedUsers = () => {
        axios.get(host + '/messages/messagedUsers', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                setMessagedUsers(res.data);
            })
            .catch(err => {
                setError(err);
                setOpenInfo(true);
                setInfoMessage(err.message);
            })
    };

    const searchUser = (e) => {
        axios.get(host + "/user/search", {
            params: {
                pageNumber: 0,
                searchString: '@' + e.target.value
            }
        })
            .then(res => {
                setSearchedUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const sendMessage = (e) => {
        e.preventDefault();
        axios.post(host + '/messages/send', {
            senderId: userId,
            receiverId: activeUser.id,
            content: message
        })
            .then(res => {
                setMessage("");
            })
            .catch(err => {
                console.log(err.message);
            })
    };

    return (
        <Container maxWidth={'md'} className="Messages">
            <Box className="ChatContainer">
                <div className="UserList">
                    {!searchUsers && <Button className="NewChat" onClick={() => {
                        setSearchUsers(true)
                    }}>
                        <AddIcon style={{color: 'green'}}/>
                        <p>Yeni Sohbet</p>
                    </Button>}
                    {searchUsers && <Button className="NewChat" onClick={() => {
                        setSearchUsers(false)
                    }}>
                        <ClearIcon style={{color: 'red'}}/>
                        <p>İptal</p>
                    </Button>}
                    {messagedUsers && !searchUsers && messagedUsers.map(user => (
                        <UserChatCard setSearchUsers={setSearchUsers} setActiveUser={setActiveUser} user={user}/>
                    ))}
                    {searchUsers &&
                    <TextField label={'Ara'} onChange={searchUser}/>}
                    {searchUsers && searchedUsers.map(user => (
                        <UserChatCard setSearchUsers={setSearchUsers} setActiveUser={setActiveUser} user={user}/>
                    ))}
                </div>
                <div className="ChatScreen">
                    {activeUser && <ChatHeader activeUser={activeUser}/>}
                    {activeUser && <Chat curUserId={userId} activeUser={activeUser}/>}
                    {activeUser && <form onSubmit={sendMessage}>
                        <TextField
                            className={'InputMessage'}
                            placeholder={'Mesaj giriniz'}
                            value={message}
                            onChange={event => {
                                setMessage(event.target.value)
                            }}
                            InputProps={{
                                startAdornment: <InputAdornment
                                    position={"end"}><IconButton onClick={sendMessage}><SendIcon/></IconButton></InputAdornment>
                            }}/></form>}
                </div>
            </Box>

            <InfoDialog isOpen={openInfo} setIsOpen={setOpenInfo} message={infoMessage} id={'messagesInfoDialog'}/>
        </Container>
    );
};

const ChatHeader = (props) => {

    const user = props.activeUser;

    return (
        <Card className="ChatHeader">
            <img className={'userAvatar'}
                 src={user.sex === 'M' ? '/images/male_avatar.svg' : '/images/female_avatar.svg'} alt=""/>
            <div className={'UserCardData'}>
                <Typography component={'h5'} className={''}>{user.firstName + ' ' + user.lastName}</Typography>
                <Typography component={'h5'}>@{user.username}</Typography>
            </div>

        </Card>
    );
};

const Chat = (props) => {

    const userId = props.curUserId;
    const activeUser = props.activeUser;
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const [openInfo, setOpenInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState("");
    const [intervalId, setIntervalId] = useState(null);


    useEffect(() => {
        setMessages([]);
        if (intervalId) {
            clearInterval(intervalId);
        }
        let tmp = setInterval(getMessages, 200);
        setIntervalId(tmp);
    }, [activeUser]);

    const getMessages = () => {
        axios.get(host + "/messages/chat", {
            params: {
                curUserId: userId,
                activeUserId: activeUser.id
            }
        })
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                setError(err);
                setOpenInfo(true);
                setInfoMessage(err.message);
            })
    };


    return (
        <div className="Chat">
            {messages && messages.map(message => (
                <ChatMessage message={message} curUserId={userId} activeUser={activeUser}/>
            ))}
            <InfoDialog isOpen={openInfo} setIsOpen={setOpenInfo} message={infoMessage} id={'messagesInfoDialog'}/>
        </div>
    )
};

const ChatMessage = (props) => {

    const [edit, setEdit] = useState(false);

    const curUserId = props.curUserId;
    const message = props.message;
    const [editMessage, setEditMessage] = useState(message);
    const activeUser = props.activeUser;
    const classNames = 'ChatMessage';

    const handleEdit = () => {

    };


    return (
        <Card className={curUserId.toString() === message.senderId.toString() ? classNames + ' CurUser' : classNames + ' ActiveUser'}>
            <p>{!edit && message.content}</p>
            {edit && <TextField size={'small'} className={'EditInput'} multiline defaultValue={message.content} onChange={event => {
                let tmp = editMessage;
                tmp.content = event.target.value;
                setEditMessage(tmp);
            }}/>}
                <CardActions>
                    <span>{message.date}</span>
                    {/*{curUserId.toString() === message.senderId.toString() && !edit && <Button className={'DeleteButton'}>*/}
                    {/*    <DeleteOutlineIcon color={'secondary'}/></Button>}*/}
                    {/*{curUserId.toString() === message.senderId.toString() && !edit && <Button onClick={() => {setEdit(true)}} >*/}
                    {/*    <EditIcon color={'primary'}/></Button>}*/}
                    {/*{edit && <Button onClick={() => {setEdit(false)}}><ClearIcon/></Button>}*/}
                    {/*{edit && <Button onClick={handleEdit}><CheckIcon/></Button>}*/}

                </CardActions>
        </Card>
    );
};