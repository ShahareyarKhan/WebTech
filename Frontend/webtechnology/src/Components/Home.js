import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import Header from './Header';
import Notes from './Notes';
const HomePage = () => {

    const storedDataString = localStorage.getItem('data');
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const email = storedData?.user?.email || '';
    const name = storedData?.user?.name || '';

    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/loginsignup');
        }
        // eslint-disable-next-line
    }, []);

    const handlelogout = () => {
        localStorage.clear();
        navigate('/loginsignup');
    };
    return (
        <>
            <Header handlelogout={handlelogout} />
            <div className=' min-h-screen   ' >
                
                <Notes />
            </div>
        </>
    )
}

export default HomePage
