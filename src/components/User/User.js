import React, { Fragment, useRef, useState, useEffect } from 'react';
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

export const UserButton = styled.button`
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

export const UserMenu = styled.ul`
  transition: all 1s ease;
  list-style-type: none;
  margin-top: 0.25rem;
  padding: 0;
  border-radius: 12px;
  font-weight: ${font.weight.medium};
  text-align: right;
  width: 95%;
  border: 1px solid #f4f4f4;
  overflow: hidden;
  font-size: 0.875rem;

  &:focus-within {
    display: inline-block;
  }

  li {
    padding: 0.75rem 1.25rem 0.75rem 0.75rem;
    border-bottom: 1px solid #f4f4f4;
    transition: background-color 0.5s ease;
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
  color: #497d6e;
`;

const User = ({ isLoggedIn, user: { avatar, name } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const MenuButtonRef = useRef();
  const MenuRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // MenuRef.current.hidden = false;
      MenuRef.current.querySelector('a').focus();
      MenuRef.current.addEventListener('keydown', listenForEscape);
    } else {
      // MenuRef.current.hidden = true;
      MenuRef.current.removeEventListener('keydown', listenForEscape);
    }
  }, [isOpen]);

  const onMenuButtonClick = () => {
    setIsOpen(true);
    // MenuRef.current.hidden = false;
    // MenuRef.current.querySelector('a').focus();
  };

  const listenForEscape = ({ key }) => {
    if (key === 'Escape') MenuButtonRef.current.focus();
  };

  const onMenuFocus = () => {
    MenuRef.current.addEventListener('keydown', listenForEscape);
  };

  const onMenuBlur = () => {
    setIsOpen(false);
    // MenuRef.current.hidden = true;
    // MenuRef.current.removeEventListener('keydown', listenForEscape);
  };

  return (
    <Wrapper>
      <UserButton
        data-testid="user-menu-button"
        aria-label="Show User Menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="user-menu"
        ref={MenuButtonRef}
        onClick={onMenuButtonClick}>
        <UserAvatar avatar={avatar} />
        <UserName aria-hidden="true">{name}</UserName>
        <UserDropdownToggle aria-hidden="true">
          <img src={chevron} alt="Show user menu" />
        </UserDropdownToggle>
      </UserButton>
      <UserMenu
        hidden={!isOpen}
        id="user-menu"
        ref={MenuRef}
        onFocus={onMenuFocus}
        onBlur={onMenuBlur}>
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
