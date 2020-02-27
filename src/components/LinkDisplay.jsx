import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography, Slide, makeStyles } from '@material-ui/core/';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles(theme => ({
  link: {
    color: 'white',
  },
}));

const LinkDisplay = props => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ display: 'flex' }}
          >
            <a
              className={classes.link}
              href={`http://${window.location.host}/page/${props.url}`}
            >
              <Typography>{`http://${window.location.host}/page/${props.url}`}</Typography>
            </a>
            <FileCopyIcon color="white" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinkDisplay;
