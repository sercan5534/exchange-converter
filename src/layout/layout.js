import React, { Fragment, useState } from 'react'
import styled from "styled-components";
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const WRAPPER = styled.div`
    display: grid;
    grid-template-rows: 80px calc(100vh - 80px);
`
const HEADER = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .logo{
        margin-right: 20px;
    }
    nav{
        display: none;
    }
    @media(min-width: 1024px){
        width: 1024px;
        margin: 0 auto;
        nav{
            display: flex;
            flex-grow: 1;
            .menu-item{
                margin-right: 20px;
                color: var(--text);
                line-height: 78px;
                &.active{
                    color: var(--primary);
                    border-bottom: 2px solid var(--primary);
                }
            }
        }
        .burger{
            display: none;
        }
    }
`
const MOBILE_MENU = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .menu-item{
        margin-bottom: 20px;
        color: var(--text);
        &.active{
            color: var(--primary);
        }
    }
`;
const CONTENT_WRAPPER = styled.div`
    background-color: #efefef;
    border-top: 1px solid #e1e1e1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px;
`

export default function Layout() {
    const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);

    const menuClass = (navData) => (navData.isActive ? 'menu-item active' : 'menu-item ')

    const menu = () => <Fragment>
        <NavLink className={menuClass} to="/" >CURRENCY CONVERTER</NavLink>
        <NavLink className={menuClass} to="/history">VIEW CONVERSION HISTORY</NavLink>
    </Fragment>
    return (
        <WRAPPER>
            <HEADER>
                <img className="logo" alt='currency exchange logo' src="/logo.png" />
                <nav>
                    {menu()}
                </nav>
                <MenuOutlined className="burger" onClick={() => setVisibleMobileMenu(true)} />
            </HEADER>
            <CONTENT_WRAPPER>
                <Outlet />
            </CONTENT_WRAPPER>
            <Drawer
                open={visibleMobileMenu}
                bodyStyle={{ padding: 20 }}
                onClose={() => setVisibleMobileMenu(false)}
            >
                <MOBILE_MENU>
                    {menu()}
                </MOBILE_MENU>
            </Drawer>
        </WRAPPER>
    )
}
