import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Navbar as FlowbiteNavbar } from "flowbite-react";

function CustomNavbar({handleDrawerOpen}) {
    return (
        <div>
            <FlowbiteNavbar className="w-[960px] m-auto bg-[#0891b2] p-5 ">
                <a className="text-white" href="/">LOGO</a>
                <Button onClick={handleDrawerOpen}>Tanlanganlar</Button>
            </FlowbiteNavbar>
        </div>
    );
}

export default CustomNavbar;
