import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../../services/getPostById';
import { styled } from '@mui/material/styles';
import { getAllCommentsByPostId } from '../../services/getAllCommentsByPostId';
import { getUserById } from '../../services/getUserById';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import './postCardDetail.scss'

const PostCardDetail = () => {

    const { idPostCard } = useParams();
    const [postData, setPostData] = useState([])
    const [commentsData, setCommentsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [initialsName, setInitialsName] = useState([]);
    const [avatarBackgroundColor, setAvatarBackgroundColor] = useState([]);
    const avatarColors = ['#D61C4E', '#2EC1AC', '#D2E603', '#9c27b0'];
    const navigate = useNavigate();

    useEffect(() => {

        getPostById(idPostCard)
            .then((postData) => {
                setPostData(postData);

                // Metodo para obtener los comentarios 
                getAllCommentsByPostId(postData.id)
                    .then((commentsData) => {
                        console.log(commentsData);
                        setCommentsData(commentsData);
                    })
                    .catch((err) => {
                        console.error(err);
                    });

                // Metodo para obtener el usuario por id
                getUserById(postData.userId)
                    .then((userData) => {
                        setUsersData(userData);
                        const initials = getInitialsName(userData.name);
                        setInitialsName(initials);
                        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
                        setAvatarBackgroundColor(randomColor);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    }, [idPostCard]);


    function getInitialsName(name) {

        const words = name.split(' ');
        let initials = '';
        for (const word of words) {
            initials += word.charAt(0);
        }

        return initials;
    }
    const handleOpenDetail = () => {
        console.log('voy a detalle');
        setShowMenuCard(true)
    }

    const handleOutDetail = () => {
        setShowMenuCard(false)
    }

    const handleGoToDetail = () => {
        const postId = postData.id;
        navigate(`detalle-publicacion/${postId}`);
    }

    const [showMenuCard, setShowMenuCard] = useState(false)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));


    return (
        <div style={{ padding: '1% 5% 0 5%', marginTop: '64px' }}>
            <Box sx={{ flexGrow: 1 }} style={{ borderRadius: '1rem' }}>
                <Grid container spacing={0} columns={16}>
                    <Grid xs={8}>
                        <Item>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: avatarBackgroundColor }} aria-label="recipe">
                                        {initialsName}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings" onMouseOver={handleOpenDetail} onMouseOut={handleOutDetail} >
                                        <MoreVertIcon className='icon__menu__details' style={{ position: 'relative' }} />
                                        {showMenuCard && (
                                            <div className='menu__details'>
                                                <p onClick={handleGoToDetail} >Ver detalle</p>

                                            </div>
                                        )}
                                    </IconButton>
                                }
                                title={postData.title}
                                subheader={usersData.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {postData.body}
                                </Typography>
                            </CardContent>
                        </Item>
                    </Grid>
                    <Grid xs={8}>
                        <Item>
                            <CardContent>
                                {commentsData.map((comment, index) => (
                                    <Typography key={index} className='comments__content' >
                                        <div className='comments__card'>
                                            <p className='comment__name'>  {comment.name}</p>
                                            <p> {comment.body}</p>
                                        </div>
                                    </Typography>
                                ))}
                            </CardContent>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default PostCardDetail
