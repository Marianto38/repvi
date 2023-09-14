import React, { useContext, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { BsFillHeartPulseFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiPhotoAlbum, BiSolidHotel, BiSolidTrafficBarrier, BiSolidTrafficCone } from 'react-icons/bi';
import { RiFileList3Fill } from 'react-icons/ri';
import { MdDiscount } from 'react-icons/md';
import NavbarLeft from '../navbar/NavbarLeft';
import { FaMapLocationDot, FaLightbulb, FaClipboardList, FaPersonWalkingLuggage, FaCarBurst } from 'react-icons/fa6';
import PostCard from '../../components/postCard/PostCard';
import { getAllPosts } from '../../services/getAllPosts';
import './home.scss'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { GiTrafficLightsGreen, GiBurningTree } from 'react-icons/gi';
import { FaRoad } from 'react-icons/fa';
import { TbCarOff, TbIdBadgeOff } from 'react-icons/tb';
import { AppContext } from '../../components/appContext/AppContext';


const Home = () => {
  const listItems = [
    { icon: <FaCarBurst />, text: 'Accidentes'},
    { icon: <BiSolidTrafficCone />, text: 'Incidentes' },
    { icon: <FaClipboardList />, text: 'Trancones' },
    { icon: <TbCarOff />, text: 'Pico y placa' },
    { icon: <RiFileList3Fill />, text: 'Restricciones' },
    { icon: <TbIdBadgeOff />, text: 'Conducta inapropiada' },
    { icon: <GiBurningTree />, text: 'Catástrofes naturales' },
    { icon: <BiSolidTrafficBarrier />, text: 'Cierres' },
    { icon: <FaRoad />, text: 'Estado de vías' },
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

  const styles = {
    pin_container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px',
    },
  };

  const { searchValue, setSearchValue } = useContext(AppContext);

  const filteredPosts = postsData.filter((post) => {
    const { body, title } = post;
    const searchTerm = searchValue.toLowerCase(); // Convertir a minúsculas para hacer la búsqueda sin distinción de mayúsculas

    // Verificar si el título o el cuerpo del post contiene la búsqueda
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
            "No se encontraron resultados."
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  </>
  );
};

export default Home;
