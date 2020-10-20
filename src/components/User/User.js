import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { font } from '../../shared/theme';
import chevron from '../../assets/chevron.svg';

const Wrapper = styled.nav`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

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

  &:hover {
    background-color: #f4f4f4;
    cursor: pointer;
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
  transition: all 1s ease;
  list-style-type: none;
  margin-top: 0.5rem;
  padding: 0;
  border-radius: 12px;
  font-weight: ${font.weight.medium};
  text-align: right;
  width: 95%;
  border: 1px solid #f4f4f4;
  overflow: hidden;
  font-size: 0.875rem;

  li {
    padding: 0.75rem 1.25rem 0.75rem 0.75rem;
    border-bottom: 1px solid #f4f4f4;
  }

  li:hover {
    background-color: #f4f4f4;
  }

  li:last-child {
    border-bottom: 0;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #699d8e;
`;

const User = ({
  isLoggedIn = false,
  user: { avatar = 'https://i.imgur.com/ccPgAlP.png', name = 'Guest' }
}) => {
  const MenuButtonRef = useRef();
  const MenuRef = useRef();

  const expandMenu = () => {
    MenuButtonRef.current.setAttribute('aria-expanded', true);
    MenuRef.current.hidden = false;
  };

  const hideMenu = () => {
    MenuButtonRef.current.setAttribute('aria-expanded', false);
    MenuRef.current.hidden = true;
  };

  return (
    <Wrapper>
      <UserButton ref={MenuButtonRef} onClick={expandMenu} onFocus={expandMenu}>
        <UserAvatar avatar={avatar} />
        <UserName>{name}</UserName>
        <UserDropdownToggle>
          <img src={chevron} alt="Show user menu" />
        </UserDropdownToggle>
      </UserButton>
      <UserMenu hidden ref={MenuRef}>
        {isLoggedIn ? (
          <Fragment>
            <li>
              <StyledLink>Log out</StyledLink>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <StyledLink to="/login">Log in</StyledLink>
            </li>
            <li>
              <StyledLink to="/logout">Sign up</StyledLink>
            </li>
          </Fragment>
        )}
      </UserMenu>
    </Wrapper>
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
