import React, { useEffect, useState } from 'react'
import './profile.scss'
import { FaHome } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import NavbarLeft from '../navbar/NavbarLeft';
import { getUserById } from '../../services/getUserById';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FaLocationDot } from 'react-icons/fa6';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { TbWorldWww } from 'react-icons/tb';
import PostCard from '../../components/postCard/PostCard';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Profile = () => {

    const listItems = [
        { icon: <FaHome />, text: 'Inicio', root: '/home' },
        // { icon: <BsFillPatchPlusFill />, text: 'Publicar' },
        { icon: <CgProfile />, text: 'Dashboard', root: '/dashboard' },
        // { icon: <BiPhotoAlbum />, text: 'Mi Galería' },
    ];

    const [userData, setUserData] = useState([]);
    const [initialsName, setInitialsName] = useState([]);
    const [ setAvatarBackgroundColor] = useState([]);
    const avatarColors = ['#D61C4E', '#2EC1AC', '#D2E603', '#9c27b0'];
   // const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showNavbarLeft, setShowNavbarLeft] = useState(true);
    const [marginLeft, setMarginLeft] = useState('200px');


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

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        if (windowWidth <= 500) {
            setShowNavbarLeft(false);
            setMarginLeft('0px');
        } else {
            setShowNavbarLeft(true);
            setMarginLeft('200px');
        }
    }, [windowWidth]);

    let posts = JSON.parse(localStorage.getItem("posts"));
    return (
        <>
            {showNavbarLeft && <NavbarLeft listItems={listItems} />}
            <div style={{ marginLeft, marginTop: '64px' }}>
                <div className='profile__container'>
                    {posts ? (
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
                    ) :
                        <div className='profile__container__left'>
                            <h3 className='profile__container__left__title'>MIS FAVORITOS</h3>
                            <Divider variant="inset" component="div" />
                        </div>
                    }
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
                                    <ListItemAvatar >
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