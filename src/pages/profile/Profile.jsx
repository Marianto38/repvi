import React, { useEffect, useState } from 'react'
import './profile.scss'
import { FaHome } from 'react-icons/fa';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiPhotoAlbum } from 'react-icons/bi';
import NavbarLeft from '../navbar/NavbarLeft';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/getUserById';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { TbWorldWww } from 'react-icons/tb';
import PostCard from '../../components/postCard/PostCard';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Profile = () => {

    const listItems = [
        { icon: <FaHome />, text: 'Inicio' },
        { icon: <BsFillPatchPlusFill />, text: 'Publicar' },
        { icon: <CgProfile />, text: 'Perfil' },
        // { icon: <BiPhotoAlbum />, text: 'Mi Galería' },
    ];

    const [userData, setUserData] = useState([]);
    const [initialsName, setInitialsName] = useState([]);
    const [avatarBackgroundColor, setAvatarBackgroundColor] = useState([]);
    const avatarColors = ['#D61C4E', '#2EC1AC', '#D2E603', '#9c27b0'];
    const navigate = useNavigate();

    const userId = 1

    function getInitialsName(name) {

        const words = name.split(' ');
        let initials = '';
        for (const word of words) {
            initials += word.charAt(0);
        }

        return initials;
    }

    useEffect(() => {

        getUserById(userId)
            .then((data) => {
                setUserData(data);
                const initials = getInitialsName(data.name);
                setInitialsName(initials);
                const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
                setAvatarBackgroundColor(randomColor);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
        
    let posts = JSON.parse(localStorage.getItem("posts"));
    return (
        <>
            <NavbarLeft listItems={listItems} />
            <div style={{ marginLeft: '200px', marginTop: '64px' }}>
                <div className='profile__container'>
                    <div className='profile__container__left'>
                        <h3 className='profile__container__left__title'>MIS FAVORITOS</h3>
                         <Divider variant="inset" component="div" />
                        
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry>
                                {posts.map((post, index) => (
                                    <PostCard key={post.id} post={post.post} />
                                ))}

                            </Masonry>
                        </ResponsiveMasonry>
                    </div>


                    <div className='profile__container__right'>

                        <div className='profile__container__right__avatar'>
                            <p className='profile__container__right__avatar__p'>
                                {initialsName}

                            </p>
                        </div>
                        {userData && (
                            <List
                                style={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            >

                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#D61C4E' }} aria-label="recipe">
                                            {initialsName}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.name} secondary={userData.username} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#2EC1AC' }}>
                                            <FaLocationDot />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.address?.street} secondary={userData.address?.suite} />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#D2E603' }}>
                                            <MdOutlineAlternateEmail />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.email} secondary={userData.phone} />
                                </ListItem>
                                 <Divider variant="inset" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#9c27b0' }}>
                                            <TbWorldWww />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={userData.website} />
                                </ListItem>
                            </List>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile