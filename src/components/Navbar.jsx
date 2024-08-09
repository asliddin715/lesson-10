import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";

const Navbar = () => {
    return (
        <div>
            <Navbar className="w-[960px] m-auto bg-[#0891b2] p-5 ">
                <a className="text-white" href="/">LOGO</a>
                <Button >Tanlanganlar</Button>
            </Navbar>
        </div>
    )
}

export default Navbar