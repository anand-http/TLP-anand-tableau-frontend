import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './Sidebardata';
import SubMenu from './Submenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: transparent;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position:fixed;
  top:0;
  z-index:111;
 
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #0e2c53;
  width: ${({ sidebar }) => (sidebar ? '250px' : '80px')};
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
 z-index:${({ sidebar }) => (sidebar ? '1000' : '10')};
  transition: 350ms;
  
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} sidebar={sidebar}/>;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;