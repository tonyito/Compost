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

  const usersList = [];
  for (let i in props.users) {
    usersList.push(
      <ListItem
        id={props.users[i].id}
      >
        <Checkbox
          checked={checked.indexOf(value) !== -1}
        />
        <ListItemText>
          {props.users[i].name}
        </ListItemText>
      </ListItem>
    )
  }

  const handleSubmit = (event) => {
    const usersToDelete = [];
    console.log('this is event target', event.target)
    for (let i = 0; i < usersList.length; i++) {
      if (event.target[i].checked === 1) {

      }
      usersToDelete.push()
    }

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
          <form onSubmit={handleSubmit}>
            <div>
              <Typography
                className={classes.title}
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
            <Button variant="contained" type="submit" color="primary">
              Delete User
            </Button>
          </form>
        </CardContent>
      </Card>
    </Modal>
  )

}

export default DeleteModal;