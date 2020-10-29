import React, { useState } from 'react';
import { useStateValue, setStopName } from "../state";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: '100%'
        },
        button: {
            width: '50%',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
        }
    }),
);

const StopSearch: React.FC = () => {

    const [, dispatch] = useStateValue();
    const [name, setName] = useState('');
    const classes = useStyles();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (name) {
            console.log('STOP', name);
            dispatch(setStopName(name));
            setTimeout(() => setName(''), 5000);
        }
    }

    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={5}>
                    <TextField
                        id="outlined-basic"
                        className={classes.textField}
                        label="Hae pysäkkiä:"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={6}>
                    <Button
                        className={classes.button}
                        variant="contained" 
                        size="medium">
                        Hae
                 </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default StopSearch;