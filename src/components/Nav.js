import React from "react";
import {logo1 as logo} from "../logos";
import {FloatLeft, FloatRight} from "../styles/Grid";
import {SubtleLink} from "../styles/Typography";
import {AppNav, HomeNav} from "../styles/Header";
import {SpaceBetween} from "../styles/Grid";
import {Link} from "react-router-dom";

function LeftSide({user, handleLogIn, handleLogOut}) {
  return (
    <FloatLeft>
      <ul>
        <li>
          <SubtleLink href="https://dev.to/t/opensauced">Blog</SubtleLink>
        </li>
        <li>
          <SubtleLink href="https://github.com/bdougie/open-sauced">GitHub</SubtleLink>
        </li>
        <li>
          <SubtleLink href="https://dev.to/bdougieyo/a-path-for-open-source-contributions-2oa2">Story</SubtleLink>
        </li>
        {user && (
          <li>
            <SubtleLink className="nav-link" target="_blank" href="https://github.com/bdougie/open-sauced/issues/new">
              Issue
            </SubtleLink>
          </li>
        )}
        <li>
          {user ? (
            <SubtleLink onClick={handleLogOut}>Logout</SubtleLink>
          ) : (
            <SubtleLink onClick={handleLogIn}>Login</SubtleLink>
          )}
        </li>
      </ul>
    </FloatLeft>
  );
}

function RightSide({user}) {
  return (
    <FloatRight>
      <SpaceBetween>
        {user && (
          <SubtleLink alt="user login name" className="nav-link" href={`https://github.com/${user.login}`}>
            <span title="login name">Hi, {user.login}!</span>
          </SubtleLink>
        )}
        <Link to="/">
          <img alt="open sauced" src={logo} />
        </Link>
      </SpaceBetween>
    </FloatRight>
  );
}

function Header({user, handleLogOut, handleLogIn}) {
  const Nav = user ? AppNav : HomeNav;
  return (
    <Nav>
      <LeftSide handleLogOut={handleLogOut} handleLogIn={handleLogIn} user={user} />
      <RightSide user={user} />
    </Nav>
  );
}

export default Header;
