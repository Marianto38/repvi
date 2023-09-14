import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import './navbar.scss'
import './navbarLeft.scss'
import { useNavigate } from 'react-router-dom';


const drawerWidth = 200;

const NavbarLeft = ({listItems}) => {

    const navigate = useNavigate();

const handleGoTo = (address) => {
    console.log(address)
    navigate(`${address}`);
}

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '64px',
                    backgroundColor:'#2EC1AC'
                },
            }}
            variant="permanent"
            anchor="left"
            className='navbarLeft__drawer'
        >
            <List>
                {listItems.map((item, index) => (
                    <ListItem key={index} onClick={() => handleGoTo(item.root)}>

                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Typography variant="inherit">{item.text}</Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default NavbarLeft;
