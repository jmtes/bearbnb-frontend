import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';
import chevron from '../../assets/chevron.svg';

const UserWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  font-weight: ${font.weight.medium};
  border: 1px solid black;
  position: relative;
  padding: 0.5rem;

  & div {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 55px;
  background: url(${(props) => props.avatar});
  background-size: cover;
  display: inline-block;
`;

const UserName = styled.div`
  font-size: 1rem;
  display: inline-block;
`;

const UserDropdownToggle = styled.div`
  display: inline-flex;
  align-items: center;
`;

const UserDropdown = styled.div`
  position: absolute;
  display: none;
`;

const User = ({
  isLoggedIn = false,
  user: { avatar = 'https://i.imgur.com/ccPgAlP.png', name = 'Guest Hibermate' }
}) => {
  return (
    <UserWrapper>
      <UserAvatar avatar={avatar} />
      <UserName>{name}</UserName>
      <UserDropdownToggle>
        <img src={chevron} alt="Show user menu" />
      </UserDropdownToggle>
      <UserDropdown>
        <ul className="menu-options">
          {isLoggedIn ? (
            <Fragment>
              <li>Log out</li>
            </Fragment>
          ) : (
            <Fragment>
              <li>Log in</li>
              <li>Sign up</li>
            </Fragment>
          )}
        </ul>
      </UserDropdown>
    </UserWrapper>
  );
};

User.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

User.defaultProps = {
  isLoggedIn: false,
  user: {
    avatar: 'https://i.imgur.com/ccPgAlP.png',
    name: 'Guest Hibermate'
  }
};

export default User;
