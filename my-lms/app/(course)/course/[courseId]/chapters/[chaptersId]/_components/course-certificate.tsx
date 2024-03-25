"use client"
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Certificate from './certificate';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';
import { Loader } from 'lucide-react';

type CourseCertificateProps = {
    chapterId: string,
    courseId: string,
    nextChapterId: string,
    isCompleted: boolean,
    courseName: string
}

const CourseCertificate = ({ chapterId, courseId, nextChapterId, isCompleted, courseName }: CourseCertificateProps) => {


    const router = useRouter();
    const [isloading, setloading] = useState(false);
    const { userId } = useAuth();
    const licenseCertficateProp = useRef<HTMLDivElement>(null);



    const handleDownloadCertificate = async () => {


        const inputData = licenseCertficateProp.current;
        if (inputData) {
    
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
        } 

        else 
        {
            console.log("Certificate element is not available.");
        }
    };

    return (
        <div className='h-full w-full bg-neutral-200'>
           {
             <div ref={licenseCertficateProp} id="certificate" className={cn(!isCompleted && 'hidden', 'h-full flex items-center w-full')}>
                                <Certificate 
                                    username={userId!} 
                                    courseName={courseName}
                                />
                        </div>
           }

            <div className='flex border-double border-y-pink-950 items-center justify-center h-12 w-full text-center'>
                <Link href="#" role="button" onClick={handleDownloadCertificate} className="text-lg font-bold">
                    Download Certificate
                </Link>
            </div>
        </div>
    );
}

export default CourseCertificate;
