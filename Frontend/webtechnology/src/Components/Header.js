// Header.js

import React from 'react';
import { IoMdLogOut } from "react-icons/io";

const Header = ({ handlelogout }) => {
    return (
        <div className='bg-[#EFBC9B]'>

            <div className='flex  justify-between w-full md:w-4/5 lg:w-2/3 mx-auto p-9 items-center'>

                <div className='text-xl font-semibold  text-black ' style={{ fontFamily: "cursive" }}>
                    INotebook
                </div>

                
                <div className='relative logout flex gap-5'>
                
                    <div className='font-bold px-4' onClick={handlelogout}>
                        <IoMdLogOut className='text-3xl cursor-pointer font-bold ' />
                    </div>
                    <div className='absolute top-[30px] hidden '>Log out</div>
                </div>
            </div>
        </div>
    );
};

export default Header;
