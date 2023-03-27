import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import {Button, Link} from "@mui/material";
import {useState} from "react";

export default function CheckboxList({ list }) {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <div>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {list.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                            <ListItem
                                key={value}
                                disablePadding
                            >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <Link href={"https://investidor10.com.br/" + value.class + '/' + value.slug} target="__blank"><ListItemText sx={{ marginRight: '15' }} id={labelId} primary={ 'Slug: ' + value.slug}  /></Link>
                                <ListItemText sx={{ marginLeft: '15' }} id={labelId} primary={ ' | Valor comprado: ' + value.price } />
                                <ListItemText sx={{ marginLeft: '15' }} id={labelId} primary={ 'Dividendo: ' + value.dividend } />
                                <ListItemText sx={{ marginLeft: '15' }} id={labelId} primary={ 'Dividendo total: ' + value.total } />
                                <ListItemText sx={{ marginLeft: '15' }} id={labelId} primary={ 'Data pagamento: ' + value.payment_date } />
                                <ListItemText sx={{ marginLeft: '15' }} id={labelId} primary={ 'Porcentagem rendimento: ' + value.revenue } />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}
