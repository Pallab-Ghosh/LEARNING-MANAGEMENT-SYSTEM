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
import { Download, Loader, Loader2, Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
 


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
    const { userId } = useAuth();
    const licenseCertficateProp = useRef<HTMLDivElement>(null);
    const [isReady , setReady]=useState(false)
    const [isloading, setloading] = useState(false);
    const [user_credential_Id , set_user_credential_Id]=useState('')
    
    
    

    const handleDownloadCertificate = async () => {

           setloading(true)

           const certificate = await axios.post(`/api/course/certificate`,{
              courseId:courseId,
           })
           const ID = certificate.data.credentialId
           set_user_credential_Id(ID)
      
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
            
                            pdf.addImage(imgdata, "PNG", 0, 94, width, height);
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
                {
                    isloading ? (
                        <Button disabled={isloading}
                        onClick={handleDownloadCertificate} 
                        className="text-lg font-bold bg-blue-500"
                        >
                          <Loader2Icon className=' animate-spin h-5 w-5 mr-3 '/>
                          Processing..
                      </Button>
                    ) : (
                        <Button disabled={isloading}
                        onClick={handleDownloadCertificate} 
                        className="text-lg font-bold bg-blue-500"
                        >
                          <Download className=' animate-bounce h-5 w-5 mr-3 '/>
                          Download Certificate
                      </Button>
                        )
                }
            </div>
        </div>
    );
}

export default CourseCertificate;
