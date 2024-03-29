/* @jsx jsx */
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import ZBLogo from '../../images/zb-logo.svg';
import { jsx, css } from '../../util/emotionReact';
import theme from '../../util/theme';

const Nav = styled.nav`
  display: flex;
  width: 100%;
  line-height: 2.5;
  background-color: white;

  & a {
    flex: 0;
    display: block;
    white-space: nowrap;
    color: ${theme.colors.text.primary};
    text-decoration: none;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  & a:hover {
    background-color: ${theme.colors.divider};
  }

  & a:active {
    background-color: ${theme.colors.divider.darken(1)};
  }

  ${theme.breakpoints.up(`sm`)} {
    #menu-button {
      display: none;
    }
  }

  ${theme.breakpoints.down(`sm`)} {
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
    <div
      css={css`
        flex: 1;
      `}
    >
      <div className='mobilebar'>
        <Link
          to='/'
          className='logo-icon'
          css={css`
            height: 3.8rem;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            width: 3.5rem;
            font-size: 3.5rem;
            line-height: 0;
          `}
        >
          <ZBLogo height='1em' width='1em' />
        </Link>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='menu-toggle' id='menu-button'>
          <AiOutlineMenu className='menu' size='25px' />
          <AiOutlineClose className='close' size='25px' />
        </label>
      </div>
    </div>
    <Link to='/'>About Me</Link>
    <Link to='/projects'>Projects</Link>
    <Link to='/contact'>Contact Me</Link>
    <div
      css={css`
        flex: 1;
      `}
    />
  </Nav>
);

export default Navbar;
