import React, { useState, useEffect } from 'react';
import '../styles.scss';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router';
import {
  Grid,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

// const state = {
//   information: {
//     date: '01/01/2020 - 02/01/2020',
//     brief:
//       'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
//     title: 'Vegas Baby!',
//     location: 'Las Vegas, NV'
//   },
// list: [
//     { id: 1, user: 1, itemName: 'clothing' },
//     { id: 2, user: 2, itemName: 'wet wipes' },
//     { id: 3, user: 3, itemName: 'the booze' }
//   ],
//   users: {
//     1: { id: 1, name: 'Andie', phone: 234567, email: 'aslfkj@akjsdf.com' },
//     2: {
//       id: 2,
//       name: 'Sean',
//       phone: 123234567890,
//       email: 'asihgaoig@fjkahweg;jh.com'
//     },
//     3: { id: 3, name: 'Noah', phone: 2234567890, email: 'EKHLNH@kjhogn.com' }
//   }
// };

const Compost = () => {
  const [state, setState] = useState({ information: {}, list: [], users: {} });
  const [grabData, setGrabData] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => {
        setState(data);
      });
  }, [grabData]);

  const menuItem = [];
  const list = [];

  for (let i in state.users) {
    menuItem.push(
      <MenuItem value={state.users[i].id}>{state.users[i].name}</MenuItem>,
    );
  }

  for (let i in state.list) {
    console.log('defaultvalue', state.users[state.list[i].user].name);
    list.push(
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '1vh',
        }}
        className="itemRow"
      >
        <TextField
          style={{ width: '70vh' }}
          id={`item${state.list[i].id}`}
          variant="outlined"
          defaultValue={state.list[i].itemName}
        />
        <FormControl>
          <InputLabel htmlFor={`responsibility${i}`}>Name</InputLabel>
          <Select
            style={{ width: '30vh' }}
            labelId={i}
            id={i}
            defaultValue={state.users[state.list[i].user].id}
          >
            {menuItem}
          </Select>
        </FormControl>
      </div>,
    );
  }

  const handleSubmit = event => {
    event.preventDefault();
    const result = [];
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: 'solid',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            border: 'solid',
            minHeight: '30vh',
          }}
        >
          <div style={{ border: 'solid', minWidth: '60%' }}>
            {state.information.title}
            <br />
            {state.information.brief}
            <br />
            {state.information.date}
            <br />
            {state.information.location}
          </div>
          <div style={{ border: 'solid', minWidth: '40%' }}>
            <Button variant="contained" color="primary">
              add user
            </Button>
            <br />
            <Button variant="contained" color="primary">
              delete user
            </Button>
          </div>
        </div>
        <div style={{ border: 'solid', minHeight: '70vh' }}>
          <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit}
          >
            {list}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '1vh',
              }}
            >
              <TextField
                style={{ width: '70vh' }}
                id="outlined-basic"
                variant="outlined"
                placeHolder="New Item"
              />
              <FormControl>
                <InputLabel>Name</InputLabel>
                <Select
                  style={{ width: '30vh' }}
                  labelId="demo-simple-select-label"
                  id={`responsibility`}
                >
                  {menuItem}
                </Select>
              </FormControl>
            </div>

            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  border: '1px solid black',
  height: '150px',
};

const styles2 = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  border: '1px solid black',
  height: '100%',
};

export default Compost;
