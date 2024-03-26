"use client"
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Certificate from './certificate';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { string } from 'zod';
const { v4: uuidv4 } = require('uuid');


type CourseCertificateProps = {
    chapterId: string,
    courseId: string,
    nextChapterId: string,
    isCompleted: boolean,
    courseName: string,
    current_user : string
}

const CourseCertificate = ({ chapterId, courseId, nextChapterId, isCompleted, courseName , current_user }: CourseCertificateProps) => {


    const router = useRouter();
    const [isloading, setloading] = useState(false);
    const { userId } = useAuth();
    const licenseCertficateProp = useRef<HTMLDivElement>(null);
    const [isReady , setReady]=useState(false)
    const [user_credential_Id , set_user_credential_Id]=useState('')
    
    
    

    const handleDownloadCertificate = async () => {

        let credential_Id :string = uuidv4();
        set_user_credential_Id(credential_Id);

        setloading(true)

           const certificate = await axios.post(`/api/course/certificate`,{
              courseId:courseId,
              credential_Id : credential_Id
           })

         console.log("certificate object" , certificate)
           if(certificate.data.credentialId!='')
           {
                    const inputData = licenseCertficateProp.current;

                    if (inputData)
                     {
                
                        const canvas = await html2canvas(inputData);
                        const imgdata = canvas.toDataURL("image/png");
            
                        try {
                            const pdf = new jsPDF({
                                orientation: 'landscape',
                                unit: 'px',
                                format: "a4"
                            });
            
                            const width = pdf.internal.pageSize.getWidth();
                            const height = (canvas.height * width) / canvas.width;
            
                            pdf.addImage(imgdata, "PNG", 0, 0, width, height);
                            pdf.save("License.pdf");
                        } 
                        catch (error) {
                            console.log(error);
                        }
                        finally{
                            setReady(true)
                            setloading(false)
                        }
                    } 
            
                    else 
                    {
                        console.log("Certificate element is not available.");
                    }
           }
    };

    return (
        <div className='h-full w-full bg-slate-50'>
           {
             <div ref={licenseCertficateProp} id="certificate" className={cn(!isCompleted && 'hidden', 'h-full flex items-center w-full')}>
                              {
                                isReady &&  <Certificate 
                                                username={current_user!} 
                                                courseName={courseName}
                                                user_credential_Id = {user_credential_Id!}
                                            />
                              }
                        </div>
           }

            <div className='flex border-double border-y-pink-950 items-center justify-center h-12 w-full text-center'>
                <Button disabled={isloading}  onClick={handleDownloadCertificate} className="text-lg font-bold">
                    Download Certificate
                </Button>
            </div>
        </div>
    );
}

export default CourseCertificate;
