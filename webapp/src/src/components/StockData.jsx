import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelIcon from '@mui/icons-material/Label';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import {PriceCheck, TrendingUp} from "@mui/icons-material";


export default function StockData() {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      <ListItem>
        <ListItemIcon>
            <LabelIcon />
        </ListItemIcon>

        <ListItemText primary="Id: 123"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
            <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary="Slug: BBSE3"/>
      </ListItem>
      <ListItem>
        <ListItemIcon>
            <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Name: Banco do Brasil"/>
      </ListItem>
        <ListItem>
            <ListItemIcon>
                    <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Price: R$ 12.99" secondary="(uptated at 2023-03-19T02:51)" />
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <PriceCheck />
            </ListItemIcon>
            <ListItemText primary="Fundamental value: R$ 35.87"/>
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <DomainAddIcon />
            </ListItemIcon>
            <ListItemText primary="P/VP: 5.55"/>
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <CurrencyExchangeIcon />
            </ListItemIcon>
            <ListItemText primary="DY: 32%" />
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <TrendingUp />
            </ListItemIcon>
            <ListItemText primary="Growing expectation 198.09%" />
        </ListItem>
    </List>
  );
}