import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

const Both = () => {
    const [login, setlogin] = useState(true);
    return (
        <div className=' h-[100vh] flex items-center justify-center'>

            <div className=' flex flex-col  w-2/3 lg:w-1/3 border-[2px] rounded-[10px] border-black toggle box '>

                <div className='flex bg-indigo-400 rounded-full'>
                    <div className={`w-1/2 flex justify-center p-5 text-xl font-semibold ${login === true ? "bg-white rounded-l-[9px]" : "bg-inherit rounded-[9px]"} toggle`} onClick={() => setlogin(true)} >Login</div>
                    <div className={`w-1/2  flex justify-center p-5 text-xl font-semibold ${login === false ? "bg-white rounded-r-[9px]" : "bg-inherit rounded-[9px]"} toggle `} onClick={() => setlogin(false)} >Register</div>
                </div>

                {login === true ? <Login /> : <Signup />}

            </div>
            
        </div>
    )
}

export default Both
