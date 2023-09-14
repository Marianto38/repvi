import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './postCard.scss'
import { getAllCommentsByPostId } from '../../services/getAllCommentsByPostId';
import { getUserById } from '../../services/getUserById';
import { useNavigate } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";


export default function PostCard({ post }) {

  const [expanded, setExpanded] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [initialsName, setInitialsName] = useState([]);
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState([]);
  const avatarColors = ['#D61C4E', '#2EC1AC', '#D2E603', '#9c27b0'];
  const navigate = useNavigate();


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getAllCommentsByPostId(post.id)
      .then((data) => {
        setCommentsData(data);
      })
      .catch((err) => {
        console.error(err);
      });

    getUserById(post.userId)
      .then((data) => {
        setUsersData(data);
        const initials = getInitialsName(data.name);
        setInitialsName(initials);
        const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
        setAvatarBackgroundColor(randomColor);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  function getInitialsName(name) {

    const words = name.split(' ');
    let initials = '';
    for (const word of words) {
      initials += word.charAt(0);
    }

    return initials;
  }

  const handleOpenDetail = () => {
    setShowMenuCard(true)
  }

  const handleOutDetail = () => {
    setShowMenuCard(false)
  }

  const handleGoToDetail = () => {

    const postId = post.id;
    navigate(`detalle-publicacion/${postId}`);
  }


  const [showMenuCard, setShowMenuCard] = useState(false)

  // ************************Crear Favorito de post info ************************

  const [colorHeart, setColorHeart] = useState('#2EC1AC')

  const handleSaveFavorites = () => {
    setColorHeart('red')
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = { post, commentsData, usersData };
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

  }

  // ************************Compartir en redes ************************

  const [showShareButtons, setShowShareButtons] = useState(false);
  const [url] = useState(window.location.href + `/detalle-publicacion/${post.id}`); 

  const handleShareClick = () => {
    setShowShareButtons(!showShareButtons);
  };


  return (
    <div style={{ height: 'auto' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: avatarBackgroundColor }} aria-label="recipe">
              {initialsName}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onMouseOver={handleOpenDetail} onMouseOut={handleOutDetail}>
              <MoreVertIcon className='icon__menu__details' style={{ position: 'relative' }} />
              {showMenuCard && (
                <div className='menu__details'>
                  <p onClick={handleGoToDetail}>Ver detalle</p>
                </div>
              )}
            </IconButton>
          }
          title={post.title}
          subheader={usersData.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleSaveFavorites}>
            <FavoriteIcon style={{ color: colorHeart }} />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShareClick}>
            <ShareIcon />
          </IconButton>
          {showShareButtons && (
            <>
              <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={url} >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={url} >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {commentsData.map((comment, index) => (
              <Typography key={index} className='comments__content'>
                <div className='comments__card'>
                  <p className='comment__name'>{comment.name}</p>
                  <p>{comment.body}</p>
                </div>
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );

}
