import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { BsFillHeartPulseFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiPhotoAlbum, BiSolidHotel } from 'react-icons/bi';
import { RiFileList3Fill } from 'react-icons/ri';
import { MdDiscount } from 'react-icons/md';
import NavbarLeft from '../navbar/NavbarLeft';
import { FaMapLocationDot, FaLightbulb, FaClipboardList, FaPersonWalkingLuggage } from 'react-icons/fa6';
import PostCard from '../../components/postCard/PostCard';
import { getAllPosts } from '../../services/getAllPosts';
import './home.scss'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


const Home = () => {
  const listItems = [
    { icon: <FaMapLocationDot />, text: 'Destinos' },
    { icon: <FaLightbulb />, text: 'Consejos' },
    { icon: <FaClipboardList />, text: '¿Qué hacer?' },
    { icon: <FaPersonWalkingLuggage />, text: '¿Cómo viajar?' },
    { icon: <BiSolidHotel />, text: 'Alojamientos' },
    { icon: <RiFileList3Fill />, text: 'Regulaciones' },
    { icon: <BsFillHeartPulseFill />, text: 'Seguros' },
    { icon: <MdDiscount />, text: 'Promociones' },
  ];

  const [postsData, setPostsData] = useState([]);

  console.log(postsData);

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPostsData(data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  const styles = {
    pin_container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px', // Agrega espacio entre las tarjetas
    },
  };


  return (
    <>
      <NavbarLeft listItems={listItems} />

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry>
          {postsData.length > 0 ? (
            postsData.map((post) => (
              <PostCard
                className='postCard__card'
                key={post.id}
                post={post}
              />

            ))
          ) : "cargando..."}
        </Masonry>
      </ResponsiveMasonry>
      {/* <div className='postCard__container' style={styles.pin_container}>

      {postsData.length > 0 ? (
        postsData.map((post) => (
            <PostCard
            className='postCard__card'
              key={post.id}
              post={post}
            />
            
            ))
            ) : "cargando..."}
            </div> */}
    </>
  );
};

export default Home;
