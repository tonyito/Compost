import React, { useState } from 'react';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import LinkDisplay from './components/LinkDisplay';

const useStyles = makeStyles({
  root: {
    width: 650,
    height: 440,
  },
  title: {
    fontSize: 26,
  },
  pos: {
    marginBottom: 12,
  },
});

const Home = () => {
  const [url, setUrl] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const handleSubmit = event => {
    event.preventDefault();
    const obj = {
      title: event.target.title.value,
      brief: event.target.description.value,
      location: event.target.location.value,
      date: `${moment(event.target.startDate.value).format(
        'MM/DD/YYYY',
      )} - ${moment(event.target.endDate.value).format('MM/DD/YYYY')}`,
    };
    fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(obj),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        handleClickOpen();
        setUrl(data);
      });
  };

  return (
    <div style={{ backgroundColor: '#eeeeee' }}>
      <Typography variant="h3" align="center">
        {'Compost'}
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: '25px' }}>
          <Card className={classes.root} variant="outlined">
            <form onSubmit={handleSubmit}>
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  className={classes.title}
                  color="textPrimary"
                  gutterBottom
                >
                  Create your adventure
                </Typography>
                <TextField
                  id="title"
                  style={{ width: '30vw' }}
                  variant="outlined"
                  placeholder="Title"
                  required
                />
                <TextField
                  style={{ margin: '10px 0 10px 0', width: '30vw' }}
                  id="description"
                  multiline
                  rows="4"
                  placeholder="Description"
                  variant="outlined"
                  required
                />
                <TextField
                  id="location"
                  style={{ width: '30vw', marginBottom: '10px' }}
                  variant="outlined"
                  placeholder="Location"
                  required
                />
                <div style={{ display: 'flex' }}>
                  <TextField
                    style={{ width: '200px' }}
                    id="startDate"
                    label="Start date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                    required
                  />
                  <TextField
                    style={{ width: '200px', marginLeft: '20px' }}
                    id="endDate"
                    label="End date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                    required
                  />
                </div>
                <Button
                  style={{ marginTop: '10px' }}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Lets Go!
                </Button>
                <LinkDisplay open={open} handleClose={handleClose} />
              </CardContent>
            </form>
          </Card>
        </div>
        <div>
          <Card className={classes.root} variant="outlined"></Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
