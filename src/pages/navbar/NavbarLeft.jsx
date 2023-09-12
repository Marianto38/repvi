import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './navbar.scss'
import './navbarLeft.scss'


const drawerWidth = 200;

const NavbarLeft = ({listItems}) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '64px'
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {listItems.map((item, index) => (
                    <ListItem key={index}>
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
