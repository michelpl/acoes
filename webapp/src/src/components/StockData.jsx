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


export default function StockData({ data }) {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      <ListItem>
        <ListItemIcon>
            <LabelIcon />
        </ListItemIcon>
        <ListItemText primary={ "Id: " + data.id } />
      </ListItem>
      <ListItem>
        <ListItemIcon>
            <BadgeIcon />
        </ListItemIcon>
        <ListItemText primary={ "Slug: " + data.slug } />
      </ListItem>
      <ListItem>
        <ListItemIcon>
            <WorkIcon />
        </ListItemIcon>
        <ListItemText primary={ "Name: " + data.name }/>
      </ListItem>
        <ListItem>
            <ListItemIcon>
                    <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={ "Price: R$" + data.current_price } secondary={ "Updated at: " + data.updated_at } />
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <PriceCheck />
            </ListItemIcon>
            <ListItemText primary={ "Fundemental value: R$ " + data.fundamental_value }/>
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <DomainAddIcon />
            </ListItemIcon>
            <ListItemText primary={ "P/VP: " + data.pvp } />
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <CurrencyExchangeIcon />
            </ListItemIcon>
            <ListItemText primary={ "DY: " + data.dy + "%" } />
        </ListItem>
        <ListItem>
            <ListItemIcon>
                    <TrendingUp />
            </ListItemIcon>
            <ListItemText primary={ "Growing expectation: " + data.growing_expectation + "%" } />
        </ListItem>
    </List>
  );
}