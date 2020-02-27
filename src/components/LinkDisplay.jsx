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
  const url = `http://${window.location.host}/page/${props.url}`;
  const copyFunction = () => {
    const textArea = document.querySelector('.linkText');
    textArea.value = url;
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
  };

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
            <a className={classes.link} href={url}>
              <Typography>{url}</Typography>
            </a>
            <FileCopyIcon onClick={copyFunction} style={{ color: 'white' }} />
            <textarea
              className="linkText"
              style={{ height: '0.01x', width: '0.01px' }}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinkDisplay;
