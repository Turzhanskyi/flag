import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

class App extends React.Component {
  state = {
    isLoading: true,
    country: [],
    error: null
  };

  fetchCountries() {
    fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => response.json())
        .then(data =>
            this.setState({
              countries: data,
              isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchCountries();
  }
  render() {
    const { isLoading, countries, error } = this.state;
    return (
        <React.Fragment>
          <h1 className="card-header text-center">Перелік країн з прапорами</h1>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
              countries.map(country => {
                const { name, capital, flag } = country;
                return (
                    <div key={name}>
                      <h1 className="text">{name}</h1>
                      <h1 className="capital">Столиця: {capital}</h1>
                      <div>
                        <img src={flag} alt="country" className="flag"/>
                      </div>
                      <hr />
                    </div>
                );
              })
          ) : (
              <h3>Loading...</h3>
          )}
        </React.Fragment>
    );
  }
}

export default App;
