import React, { useContext, useEffect, useState } from 'react';
import { BiSolidTrafficBarrier, BiSolidTrafficCone } from 'react-icons/bi';
import { RiFileList3Fill } from 'react-icons/ri';
import NavbarLeft from '../navbar/NavbarLeft';
import { FaClipboardList,  FaCarBurst } from 'react-icons/fa6';
import PostCard from '../../components/postCard/PostCard';
import { getAllPosts } from '../../services/getAllPosts';
import './home.scss'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import {  GiBurningTree } from 'react-icons/gi';
import { FaRoad } from 'react-icons/fa';
import { TbCarOff, TbIdBadgeOff } from 'react-icons/tb';
import { AppContext } from '../../components/appContext/AppContext';
import LocalLoader from '../../components/localLoader/LocalLoader';


const Home = () => {
  const listItems = [
    { icon: <FaCarBurst />, text: 'Accidentes', root:'/home'},
    { icon: <BiSolidTrafficCone />, text: 'Incidentes', root:'/home' },
    { icon: <FaClipboardList />, text: 'Trancones', root:'/home' },
    { icon: <TbCarOff />, text: 'Pico y placa', root:'/home' },
    { icon: <RiFileList3Fill />, text: 'Restricciones', root:'/home' },
    { icon: <TbIdBadgeOff />, text: 'Conducta inapropiada', root:'/home' },
    { icon: <GiBurningTree />, text: 'Catástrofes naturales', root:'/home' },
    { icon: <BiSolidTrafficBarrier />, text: 'Cierres', root:'/home' },
    { icon: <FaRoad />, text: 'Estado de vías', root:'/home' },
  ];

  const [postsData, setPostsData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavbarLeft, setShowNavbarLeft] = useState(true); 
  const [marginLeft, setMarginLeft] = useState('200px');

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPostsData(data);
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

  const { searchValue } = useContext(AppContext);

  const filteredPosts = postsData.filter((post) => {
    const { body, title } = post;
    const searchTerm = searchValue.toLowerCase(); 
    return title.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm);
  });


  return (
    <>
    {showNavbarLeft && <NavbarLeft listItems={listItems} />}
    <div style={{ marginLeft, marginTop: '64px' }}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                className='postCard__card'
                key={post.id}
                post={post}
              />
            ))
          ) : (
            <LocalLoader/>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  </>
  );
};

export default Home;
