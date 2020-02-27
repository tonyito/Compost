/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import '../styles.scss';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const Compost = () => {
  const [state, setState] = useState({ information: {}, list: [], users: {} });
  const [newInputsLength, setNewInputs] = useState(0);
  const [grabData, setGrabData] = useState(false);
  const [changedRows, setChangedRows] = useState({});
  const [addedRows, setAddedRows] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setState(data);
      })
      .catch(err => {
        console.log(err);
return window.location.replace('/');
      });
  }, [grabData]);

  const menuItem = [];
  const list = [];

  for (const i in state.users) {
    menuItem.push(
      <MenuItem value={state.users[i].id}>{state.users[i].name}</MenuItem>,
    );
  }
  const handleTextEdit = (event, row) => {
    const newChangedRow = Object.assign({}, changedRows);
    newChangedRow[row] = true;
    setChangedRows(newChangedRow);
  };

  for (const i in state.list) {
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
              id: `row${i}user`,
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

  const handleSubmit = event => {
    event.preventDefault();
    // to keep track of updated items
    const updatedItems = [];
    for (let i in changedRows) {
      updatedItems.push({
        id: event.target[`row${i}item`].getAttribute('itemID'),
        user: event.target[`row${i}user`].value,
        name: event.target[`row${i}item`].value,
      });
    }
    // to keep track of newly added items;
    const newItems = [];
    for (const i in addedRows) {
      newItems.push({
        user: Number(event.target[`newRow${i}user`].value),
        name: event.target[`newRow${i}item`].value,
      });
    }
    // add fetch here
    console.log('new items', newItems);
    console.log('updated items', updatedItems);
    fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updatedItems,
        newItems,
        location: id
      })
    })
      .then(res => res.json())
      .then(data => {
        setGrabData(!grabData);
        setNewInputs(0);
        setAddedRows([]);
        setChangedRows({});
      });

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
