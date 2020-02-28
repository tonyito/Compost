import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address).then(results => {
      console.log(results);
      this.setState({ address: results[0].formatted_address });
    });
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
              value={this.state.address}
              {...getInputProps({
                id: 'address',
                style: { width: '30vw', marginBottom: '10px' },
                variant: 'outlined',
                placeholder: 'Where are you going?',
              })}
            />
            <div
              className="autocomplete-dropdown-container"
              style={{
                zIndex: '2',
                position: 'fixed',
                borderRadius: '5px',
                backgroundColor: '#b5b5b5',
              }}
            >
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      cursor: 'pointer',
                      borderRadius: '5px',
                      margin: '5px 5px 5px 5px',
                    }
                  : {
                      cursor: 'pointer',
                      borderRadius: '5px',
                      margin: '5px 5px 5px 5px',
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>
                      <Typography>{suggestion.description}</Typography>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Search;
