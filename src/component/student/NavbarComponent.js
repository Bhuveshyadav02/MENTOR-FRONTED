import React, { useState } from 'react';
import styled, { css } from "styled-components";
import '../../styles/profile.css';
import {Link} from 'react-router-dom';

const Containers = styled.div`
  
  .active {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Buttons = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--grey);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Logo = styled.div`
  width: 2rem;
  color:var(--black);
  svg {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? "8rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled.a`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid var(--white);
    svg {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  svg {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;
  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};
  background-color: var(--black);
  color: var(--white);
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h4 {
    display: inline-block;
    color: var(--grey);
  }
  
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  svg {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;

function LoadName({profile}){
  if(profile != null) {
    return(
      <h4 style={{color: "white"}}>{profile.name}</h4>
    );
  }
  else {  
    return(
      <h4 style={{color: "white"}}>User</h4>
    );
  }
}

function NavigationBar(props) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(click);

    const [profileClick, setprofileClick] = React.useState(false);
    const handleProfileClick = () => setprofileClick(!profileClick);
    return (
        <div className="sideNavbars">
            <div className="sideNavbarss">
                <Containers>
                    <Buttons clicked={click} onClick={() => handleClick()}>
                        
                    </Buttons>
                    <SidebarContainer>
                        <Logo>
                            <h2></h2>
                        </Logo>
                        <SlickBar clicked={click}>
                            <Item>
                              {
                                (props.auth.isTeacher) ?
                                <Link to="/teacher/home">
                                  <span className="fa fa-home fa-lg"></span>
                                  {/* <Text clicked={click}>Home</Text> */}
                                </Link>
                                :
                                <Link to="/student/home">
                                  <span className="fa fa-home fa-lg"></span>
                                  {/* <Text clicked={click}>Home</Text> */}
                                </Link>
                              }
                            </Item>
                        </SlickBar>

                        <Profile clicked={profileClick}>
                            <img
                                onClick={() => handleProfileClick()}
                                src="https://picsum.photos/200"
                                alt="Profile"
                            />
                            <Details clicked={profileClick}>
                                <Name>
                                {
                                  (props.auth.isTeacher) ?
                                  <LoadName profile = {props.teacher.profile}/>
                                  :
                                  <LoadName profile = {props.student.profile}/>
                                }
                                </Name>
                                {
                                  (props.auth.isTeacher) ?
                                  
                                <Logout onClick = {() => props.logoutTeacher()}>
                                    <span className="fa fa-sign-out"></span>
                                </Logout>
                                  :
                                  
                                <Logout onClick = {() => props.logoutStudent()}>
                                    <span className="fa fa-sign-out"></span>
                                </Logout>
                                }
                            </Details>
                        </Profile>
                    </SidebarContainer>
                </Containers>
            </div>
        </div>
    );
}

export default NavigationBar;