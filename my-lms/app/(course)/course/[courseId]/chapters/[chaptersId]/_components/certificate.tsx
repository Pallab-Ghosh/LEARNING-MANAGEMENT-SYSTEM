

import Image from 'next/image';
import React from 'react';


type CertificateProps={
    username:string,
    courseName:string
    user_credential_Id : string
}
const Certificate = ({ username, courseName , user_credential_Id}:CertificateProps) => {
  return (
    <div className= 'bg-slate-50   lg:h-full h-96 w-full p-5 flex flex-col   m-auto  border-double border-x-4 border-y-4 border-teal-900 relative'>

        <div className=' absolute mt-0'>
           <Image src="/logo.svg" alt="Logo"  width={70}  height={40}/>
        </div>

        <div className='flex flex-col justify-center mt-12'>
             <h1 className=' text-center text-teal-500 font-extrabold -m-2 text-lg'>Skill</h1>
             <h1 className=' text-center text-blue-900 font-extrabold text-lg'>Learning</h1>
        </div>

        <div className='mt-2'>
             <p className='font-bold  text-gray-700 text-center justify-center'>
              Certificate of Completion
              </p>
        </div>

         <div className='mt-4 whitespace-normal flex justify-center'>
              <h3 className='text-gray-700 '>
              This is to certify that <span className='text-muted-foreground'>{username} </span>has successfully completed the course  <span className=' font-extrabold text-rose-900'>{courseName}</span>.</h3>
         </div>

         <div className=' flex flex-col justify-center font-bold pt-5'>
             <h1 className=' text-center  text-gray-700'>Provided By</h1>
             <h1 className=' text-center  text-gray-700'>Skill Learning Academy</h1>
        </div>
      

      <div className='flex justify-end mt-4 mr-0' >
             <div className=' w-72 h-8 flex items-center  bg-slate-100 text-black mr-2 text-xs border  rounded-lg'><span className='text-xs'>UId</span>: {user_credential_Id}</div>
      </div>
    </div>
  );
};

export default Certificate;