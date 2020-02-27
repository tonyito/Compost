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
import { Form } from 'react-bootstrap';

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
  const [newInputsLength, setNewInputs] = useState(0);
  const [grabData, setGrabData] = useState(false);
  const [changedRows, setChangedRows] = useState({});
  const [addedRows, setAddedRows] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
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
  const handleTextEdit = (event, row) => {
    const newChangedRow = Object.assign({}, changedRows);
    newChangedRow[row] = true;
    setChangedRows(newChangedRow);
  };

  for (let i in state.list) {
    // console.log(i);
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
          id={`row${i}item`}
          variant="outlined"
          defaultValue={state.list[i].itemName}
          onChange={e => handleTextEdit(e, i)}
          inputProps={{
            itemID: state.list[i].id,
          }}
        />

        <FormControl>
          <InputLabel>Name</InputLabel>
          <Select
            style={{ width: '30vh' }}
            defaultValue={state.list[i].user}
            inputProps={{
              id: 'row' + i + 'user',
            }}
          >
            {menuItem}
          </Select>
        </FormControl>
      </div>,
    );
  }

  const row = (length) => (
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
        id={`newRow${newInputsLength}item`}
        variant="outlined"
        placeholder="New Item"
        onChange={e => {
          if (e.target.value.length === 1) {
            newInputs.push(row);
            const newRows = Object.assign({}, addedRows)
            newRows[newInputsLength] = true;
            setAddedRows(newRows);
            setNewInputs(newInputsLength + 1);
            // const newItem = addedRows.push({ id: `newRow${newInputsLength}item` });
            // setAddedRows(newItem);
            // console.log(addedRows);
          }
        }}
        inputProps={{
          id: `newRow${length}item`
        }}
      />
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Select
          style={{ width: '30vh' }}
          inputProps={{
            id: 'newRow' + length + 'user',
          }}
        >
          {menuItem}
        </Select>
      </FormControl>
    </div>
  );
  const newInputs = [];
  for (let i = 0; i <= newInputsLength; i++) {
    newInputs.push(row(i));
  }
  console.log(addedRows);
  const handleSubmit = event => {
    event.preventDefault();
    // to keep track of updated items
    const updatedItems = [];
    // console.log(event.target);
    for (let i in changedRows) {
      updatedItems.push({
        id: event.target[`row${i}item`].getAttribute('itemID'),
        user: event.target[`row${i}user`].value,
        itemName: event.target[`row${i}item`].value,
      });
    }
    // to keep track of newly added items;
    const newItems = [];
    console.log(event.target.newRow0user);
    for (let i in addedRows) {
      newItems.push({
        user: Number(event.target[`newRow${i}user`].value),
        itemName: event.target[`newRow${i}item`].value,
      });
    }
    console.log(newItems)
    // add fetch here
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
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
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
