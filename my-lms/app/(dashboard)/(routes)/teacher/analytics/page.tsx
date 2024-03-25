import { getAnalytics } from '@/action/get-analytics';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
 
import DataCard from './_component/data-card';
import Chart from './_component/chart';




const Analytics = async () => {

  const {userId,user}=auth();
 

  if(!userId)return redirect('/');
  console.log('userId',userId)

  const {data,totalrevenue,totalSales}=await getAnalytics(userId);
 

   
  return (
    <div className=' p-6 '>
       <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
           <DataCard
            label='Total Reveneu'
            value={totalrevenue!}
            id="reveneu"
           />

            <DataCard
            label='Total Sales'
            value={totalSales!}
            id="sales"
           />
       </div>
       <Chart
        data={data}
       />
      
    </div>
  )
}

export default Analytics