"use client"

import { Button } from '@/components/ui/button';
import { useConfettiStore } from '@/hooks/use-confetti-store';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Certificate from './certificate';
import { auth, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { cn } from '@/lib/utils';
 
type  CourseCertificateProps={
    chapterId:string,
    courseId:string,
    nextChapterId :string,
    isCompleted:boolean
    courseName:string
}
const CourseCertificate = ({chapterId,courseId,nextChapterId,isCompleted,courseName}: CourseCertificateProps) => {
  
   // const Icon=isCompleted ? XCircle : CheckCircle

    const router=useRouter()
    const[isloading,setloading]=useState(false)
    const {userId}=useAuth();
    const [showCertificate, setShowCertificate] = useState(false);

 

    const handleDownloadCertificate = () => {

      setShowCertificate(true)
        const certificateElement = document.getElementById('certificate');
      
        if (certificateElement) {
          const doc = new jsPDF();
          doc.html(certificateElement, {
            callback: function () {
              doc.save('certificate.pdf');
            },
          });
        }
      };


    return (
      <div>
         {
         showCertificate && (
            <div id="certificate" className={cn(!isCompleted && 'hidden')}>
                    <Certificate 
                    username={userId!} 
                    courseName={courseName} />
            </div>
          )}

         
          
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link href="#" onClick={handleDownloadCertificate}>
                 Download Certificate
              </Link>
           </div>
     
         
      </div>
  )
}

export default CourseCertificate