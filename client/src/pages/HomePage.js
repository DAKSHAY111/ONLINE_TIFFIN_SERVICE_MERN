import React from 'react';

import SubHeading from './SubHeading';
import { images } from '../constants';
import './Home.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  const history = useHistory();

  return (
    <div className="app__header app__wrapper section__padding" id="home">
      <div className="app__wrapper_info">
        <SubHeading title="Chase the new flavour" />
        <h1 className="app__header-h1">The Key To Fine Dining</h1>
        <p className="p__opensans" style={{ margin: '2rem 0' }}>
          Welcome to our tiffin service... Just Explore different type of foods
          and order as per your taste.
        </p>
        <button
          type="button"
          className="custom__button"
          component={Link}
          to="/viewMenu"
          onClick={() => history.push('/viewMenu')}
        >
          Explore Menu
        </button>
      </div>

      <div className="app__wrapper_img">
        <img src={images.welcome} alt="header_img" />
      </div>
    </div>
  );
};

export default HomePage;
