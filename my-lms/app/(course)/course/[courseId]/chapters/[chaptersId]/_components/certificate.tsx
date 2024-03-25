

import Image from 'next/image';
import React from 'react';


type CertificateProps={
    username:string,
    courseName:string
}
const Certificate = ({ username, courseName }:CertificateProps) => {
  return (
    <div className= 'bg-slate-50 lg:w-full lg:h-full h-full w-96 p-5 flex flex-col m-2  border-double border-x-4 border-y-4 border-teal-900 relative'>

        <div className=' mt-0'>
           <Image src="/logo.svg" alt="Logo"  width={50}  height={20}/>
        </div>

        <div className='flex flex-col justify-center mt-1'>
             <h1 className=' text-center text-teal-500 font-extrabold -m-2 text-lg'>Skill</h1>
             <h1 className=' text-center text-blue-900 font-extrabold text-lg'>Learning</h1>
        </div>

        <div className='mt-1'>
            <h1 className=' pt-6 font-bold  text-gray-700 text-center justify-center'>
              Certificate of Completion
              </h1>
        </div>

         <div className='pt-3 whitespace-normal flex justify-center'>
              <h3 className='text-gray-700 '>
              This is to certify that {username} has successfully completed the online course <br/> <span className=' font-extrabold text-rose-900'>{courseName}</span></h3>
         </div>

         <div className=' flex flex-col justify-center font-bold pt-5'>
             <h1 className=' text-center  text-gray-700'>Provided By</h1>
             <h1 className=' text-center  text-gray-700'>Skill Learning Academy</h1>
        </div>
      

      <div className=' pt-9 pb-2  flex justify-end' >
             <h3 className='underline decoration-slate-900 mr-2'>Pallab Ghosh</h3>
      </div>
    </div>
  );
};

export default Certificate;