import React from 'react';
import './styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: 650,
    height: 435,
  },
  title: {
    fontSize: 26,
  },
  pos: {
    marginBottom: 12,
  },
});
const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment style={{ backgroundColor: '#eeeeee' }}>
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
            <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                Create your adventure
              </Typography>
              <TextField
                style={{ width: '30vh' }}
                variant="outlined"
                defaultValue="Title"
              />
              <TextField
                style={{ margin: '10px 0 10px 0' }}
                id="outlined-multiline-static"
                multiline
                rows="4"
                defaultValue="Description"
                variant="outlined"
              />
              <TextField
                style={{ width: '30vh', marginBottom: '10px' }}
                variant="outlined"
                defaultValue="Location"
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
                />
                <TextField
                  style={{ width: '200px', marginLeft: '20px' }}
                  id="endDate"
                  label="End date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className={classes.root} variant="outlined"></Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
