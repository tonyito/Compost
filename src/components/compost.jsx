import React, { useState, useEffect } from 'react';
import '../styles.scss';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
  const [newInputsLength, setNewInputs] = useState(1);
  const [grabData, setGrabData] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
          id={`item${i}`}
          variant="outlined"
          defaultValue={state.list[i].itemName}
        />
        <FormControl>
          <InputLabel htmlFor={`responsibility${i}`}>Name</InputLabel>
          <Select
            style={{ width: '30vh' }}
            labelId={i}
            id={i}
            defaultValue={state.list[i].user}
          >
            {menuItem}
          </Select>
        </FormControl>
      </div>,
    );
  }

  const row = (
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
        id="outlined-basic"
        variant="outlined"
        placeholder="New Item"
        onChange={e => {
          if (e.target.value.length === 1) {
            setNewInputs(newInputsLength + 1);
            newInputs.push(row);
          }
        }}
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
  );
  const newInputs = [];
  for (let i = 0; i < newInputsLength; i++) {
    newInputs.push(row);
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
          minHeight: '90vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: 'solid',
            minHeight: '30vh',
          }}
        >
          <Typography variant="h1" component="h2" gutterBottom>
            {state.information.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {state.information.brief}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {state.information.date}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {state.information.location}
          </Typography>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div style={{ marginRight: '10px' }}>
              <Button variant="contained" color="primary">
                add user
              </Button>
            </div>
            <Button variant="contained" color="primary">
              delete user
            </Button>
          </div>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '62vh', overflow: 'auto' }}>
            {list}
            {newInputs}
          </div>
          <Button variant="contained" type="submit" color="primary">
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default Compost;
