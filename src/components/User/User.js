import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { font } from '../../shared/theme';
import chevron from '../../assets/chevron.svg';

const UserButton = styled.button.attrs({
  'aria-expanded': false
})`
  display: inline-flex;
  align-items: center;
  font-weight: ${font.weight.medium};
  position: relative;
  padding: 0.5rem;
  border-radius: 24px;
  background-color: #fff;
  transition: background-color 0.25s ease;
  border: 2px solid transparent;

  &:hover,
  &:focus,
  &:active {
    background-color: #f4f4f4;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus,
  &:active {
    outline: none;
    border: 2px solid black;
  }

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

const UserMenu = styled.ul`
  position: absolute;
  display: none;

  ${UserButton}:active + &,
  ${UserButton}:focus + & {
    display: block;
  }
`;

const User = ({
  isLoggedIn = false,
  user: { avatar = 'https://i.imgur.com/ccPgAlP.png', name = 'Guest Hibermate' }
}) => {
  const MenuRef = useRef();

  const expandMenu = () => {
    MenuRef.current.setAttribute('aria-expanded', true);
  };

  const hideMenu = () => {
    MenuRef.current.setAttribute('aria-expanded', false);
  };

  return (
    <Fragment>
      <UserButton
        ref={MenuRef}
        onClick={expandMenu}
        onFocus={expandMenu}
        onBlur={hideMenu}>
        <UserAvatar avatar={avatar} />
        <UserName>{name}</UserName>
        <UserDropdownToggle>
          <img src={chevron} alt="Show user menu" />
        </UserDropdownToggle>
      </UserButton>
      <UserMenu>
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
      </UserMenu>
    </Fragment>
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
