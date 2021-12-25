/* @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import ZBLogo from '../../images/zb-logo.svg';
import { up, down } from '../../util/mediaQueries';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  line-height: 2.5;
  border-bottom: 0.1rem solid #bdbdbd;
  background-color: white;

  & a {
    flex: 0;
    display: block;
    white-space: nowrap;
    color: #212121;
    text-decoration: none;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  & a:hover {
    background-color: #bdbdbd;
  }

  & a:active {
    background-color: #bdbdbd;
  }

  ${up('sm')} {
    #menu-button {
      display: none;
    }
  }

  ${down('sm')} {
    flex-direction: column;

    a,
    #menu-button {
      display: block;
      padding: 1rem 0;
      text-align: center;
      width: 100%;
    }

    .mobilebar {
      display: flex;
      #menu-button {
        padding-right: 1rem;
        flex: 1;
        text-align: right;

        svg {
          margin: 0 auto;
          margin-top: 1rem;
        }
      }
      .logo-icon {
        display: none;
      }
    }

    input[type='checkbox'] {
      & ~ div #menu-button {
        .menu,
        .close {
          display: none;
        }
      }

      &:checked ~ div #menu-button .close {
        display: block;
      }

      &:not(:checked) ~ div #menu-button .menu {
        display: block;
      }

      ~ a:not(.logo-icon) {
        display: none;
      }

      &:checked ~ a {
        display: block;
      }
    }
  }

  input[type='checkbox'] {
    display: none;
  }
`;

const Navbar = () => (
  <Nav>
    <input type='checkbox' id='menu-toggle' />
    <div className='mobilebar'>
      <Link
        to='/'
        className='logo-icon'
        css={css`
          height: 38px;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        `}
      >
        <ZBLogo height={35} width={35} />
      </Link>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor='menu-toggle' id='menu-button'>
        <AiOutlineMenu className='menu' size='25px' />
        <AiOutlineClose className='close' size='25px' />
      </label>
    </div>
    <div
      css={css`
        flex: 1;
      `}
    />
    <Link to='/'>About Me</Link>
    <Link to='/projects'>Projects</Link>
    <Link to='/contact'>Contact Me</Link>
  </Nav>
);

export default Navbar;
