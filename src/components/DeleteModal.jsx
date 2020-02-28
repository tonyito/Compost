import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Modal,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox
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


const DeleteModal = (props) => {
  const classes = useStyles();

  const handleToggle = val => () => {
    console.log('this is value of index of checked', props.checked.indexOf(val));
    const newChecked = [...props.checked];
    if (props.checked.indexOf(val) === -1) {
      newChecked.push(val);
    } else {
      newChecked.splice(newChecked.indexOf(val), 1);
    }

    console.log('newChecked', newChecked);
    props.setChecked(newChecked);
  }

  console.log('this is props', props.users[0]);
  const usersList = [];
  for (let i in props.users) {
    usersList.push(
      <ListItem
        id={props.users[i].id}
        key={'hell' + i}
      >
        <Checkbox
          onChange={handleToggle(i)}
          key={'shit' + i}
        />
        <ListItemText key={'hello' + i}>
          {props.users[i].name}
        </ListItemText>
      </ListItem>
    )
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const usersToDelete = { id: props.checked };
    //fetch to send users to delete to db
    fetch('/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usersToDelete),
      })
      .then(res => res.json())
      .then(data => {
        props.toggleDeleteModal(false);
        props.setGrabData(!grabData)
      })
  }

  return (
    <Modal
      className={classes.modal}
      open={props.show}
      onClose={() => {
        props.toggleDeleteModal(false);
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
          <form /*onSubmit={handleSubmit}*/>
            <div>
              <Typography
                color="textPrimary"
                variant="h4"
                gutterBottom
              >
                Delete User
              </Typography>
              <List>
                {usersList}
              </List>
            </div>
            <Button variant="contained" type="submit" color="primary" onClick={(e) => { handleSubmit }}>
              Delete User
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal >
  )

}

export default DeleteModal;