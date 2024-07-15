import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList } from '@fortawesome/free-solid-svg-icons';

// Estilos
const SidebarContainer = styled.div`
    width: 200px;
    height: 100vh;
    background-color: #004080;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
`;

const SidebarTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    margin: 15px 0;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;

    &:hover {
        color: #e7f0fd;
    }
`;

const Icon = styled(FontAwesomeIcon)`
    margin-right: 10px;
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarTitle>Menu</SidebarTitle>
            <NavList>
                {/* <NavItem>
                    <NavLink to="/">
                        <Icon icon={faHome} /> Home
                    </NavLink>
                </NavItem> */}
                <NavItem>
                    <NavLink to="/setores">
                        <Icon icon={faList} /> Setores
                    </NavLink>
                </NavItem>
            </NavList>
        </SidebarContainer>
    );
};

export default Sidebar;
