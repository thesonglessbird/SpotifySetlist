import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import CookieBanner from 'react-cookie-banner';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SearchSpinner from './components/SearchSpinner';
import { setToken, clearToken } from './actions';
import styleConfig from './config/styleConfig';

const AppHeader = styled.h1`
  font-family: ${styleConfig.fonts.mainHeading}, cursive;
  color: ${styleConfig.colors.white};
  font-size: 5em;
  text-align: center;
  padding: 50px 10px 0 10px;
  margin: 0;
  font-weight: 100;

  @media (max-width: 482px) {
    padding-top: 25px;
    line-height: 90px;
  }

`;

const AuthButton = styled.button`
  margin: 25px auto;
  display: block;
  padding: 1em;
  border: 0;
  color: ${styleConfig.colors.pink};
  background-color: ${styleConfig.colors.white};
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  font-size: 16px;
`;

const Blurb = styled.p`
  max-width: 500px;
  min-width: 300px;
  display: block;
  margin: 25px auto 0 auto;
  color: ${styleConfig.colors.white};
  text-align: center;
  font-size: 0.9em;
  padding: 0 10px;
`;

class _App extends Component {

  componentWillMount() {

    this.props.setToken();

  }

  handleLoginClick() {

    this.props.client.login().then((url) => {

      window.location.href = url;

    });

  }

  handleLogoutClick() {

    this.props.clearToken();
    window.location.href = `${window.location.protocol}//${window.location.host}`;

  }

  render() {

    const msg = 'This site uses cookies.';

    return (
      <div>
        <CookieBanner message={msg} />
        <div>
          <header>
            <AppHeader>Spotify Setlists</AppHeader>
            <Blurb>This app allows you to search for setlists by artist. You then have the option of previewing individual songs or saving the setlist as a playlist to your Spotify account.</Blurb>
            {
              this.props.loggedIntoSpotify ?
                <AuthButton onClick={ this.handleLogoutClick.bind(this) }>
                Log out of Spotify
                </AuthButton>
                :
                <AuthButton onClick={ this.handleLoginClick.bind(this) }>
                  Log in with Spotify
                </AuthButton>
            }
          </header>
          {
            this.props.loggedIntoSpotify ?
              <div>
                <SearchBar />
                <SearchSpinner isSearching={this.props.isSearching} />
                <SearchResults />
              </div> : ''
          }
        </div>
      </div>
    );

  }

}

const mapStateToProps = state => ({
  client: state.authState.client,
  loggedIntoSpotify: state.authState.loggedIn,
  isSearching: state.appState.isSearching,
});

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    setToken,
    clearToken,
  }, dispatch);

};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
