import React, { useContext, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { AiFillPlusCircle } from 'react-icons/ai';
import ModalCreatePost from '../../components/modalCreatePost/ModalCreatePost';
import { useNavigate } from 'react-router-dom';
import NavbarLeft from './NavbarLeft';
import { FaCarBurst } from 'react-icons/fa6';
import { BiSolidTrafficBarrier, BiSolidTrafficCone } from 'react-icons/bi';
import { FaClipboardList, FaRoad } from 'react-icons/fa';
import { TbCarOff, TbIdBadgeOff } from 'react-icons/tb';
import { RiFileList3Fill } from 'react-icons/ri';
import { GiBurningTree } from 'react-icons/gi';
import { AppContext } from '../../components/appContext/AppContext';
import './navbar.scss'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.50),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '600px',
  borderRadius: '24px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '600px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOpenModalCreatePost = () => {
    console.log('abrir');
    setOpen(true);
  }

  const navigate = useNavigate();


  const handleGoToDashboard = () => {
    navigate('dashboard');
    handleMenuClose();

  }

  const handleGoToHome = () => {
    navigate('/home');
    handleMenuClose();

  }

  const handleGoToProfile = () => {
    navigate('perfil');
    handleMenuClose();
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuOpened = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const listItems = [
    { icon: <FaCarBurst />, text: 'Accidentes' },
    { icon: <BiSolidTrafficCone />, text: 'Incidentes' },
    { icon: <FaClipboardList />, text: 'Trancones' },
    { icon: <TbCarOff />, text: 'Pico y placa' },
    { icon: <RiFileList3Fill />, text: 'Restricciones' },
    { icon: <TbIdBadgeOff />, text: 'Conducta inapropiada' },
    { icon: <GiBurningTree />, text: 'Catástrofes naturales' },
    { icon: <BiSolidTrafficBarrier />, text: 'Cierres' },
    { icon: <FaRoad />, text: 'Estado de vías' },
  ];

  const { searchValue, setSearchValue } = useContext(AppContext);

 
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToProfile}>Perfil</MenuItem>
      <MenuItem onClick={handleGoToDashboard} >Dashboard</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleGoToProfile}>Perfil</MenuItem>
      <MenuItem onClick={handleGoToDashboard} >Dashboard</MenuItem>
    </Menu>
  );


  return (
    <>
      {mobileMenuOpen ? <NavbarLeft listItems={listItems} /> : null}

      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="fixed" className='navbar__background' >
          <Toolbar  >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMobileMenuOpened}
              className='navbar__icon'
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: 'block' } }}
              onClick={handleGoToHome}
              style={{ cursor: 'pointer' }}
            >
              <img src="https://res.cloudinary.com/dd8l8bm6q/image/upload//c_thumb,w_300,h_75,g_auto/v1694662578/bqmafim6janb7fzxcw7x.png" alt="" style={{ width: '160px' }} />
            </Typography>
            <Search >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // Realiza la búsqueda o la acción deseada aquí con el valor de searchValue
                    console.log('Búsqueda realizada:', searchValue);
                  }
                }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleOpenModalCreatePost}>
                <span className='btn__post'>
                  PUBLICAR
                </span>
                <AiFillPlusCircle />
              </IconButton>
              <ModalCreatePost open={open} setOpen={setOpen} />
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}

export default Navbar


