import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Modal,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '35em',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddModal = props => {
  const classes = useStyles();
  const handleSubmit = event => {
    event.preventDefault();
    const addUserBody = {
      page_id: props.page,
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    props.toggleAddModal(false);
    // fetch('/api/items', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(addUserBody),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     //close modal
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  return (
    <Modal
      className={classes.modal}
      open={props.show}
      onClose={() => {
        props.toggleAddModal(false);
      }}
    >
      <Card className={classes.root}>
        <CardContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                gutterBottom
              >
                Add User
              </Typography>
              <TextField
                id="name"
                style={{ width: '30vw' }}
                variant="outlined"
                placeholder="Name"
                type="text"
                required
              />
              <TextField
                style={{ margin: '10px 0 10px 0', width: '30vw' }}
                id="email"
                placeholder="Email address"
                variant="outlined"
                type="email"
                required
              />
              <TextField
                id="phone"
                style={{ width: '30vw', marginBottom: '15px' }}
                variant="outlined"
                placeholder="Phone number"
                type="tel"
                required
              />
            </div>
            <Button variant="contained" type="submit" color="primary">
              Add User
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default AddModal;
