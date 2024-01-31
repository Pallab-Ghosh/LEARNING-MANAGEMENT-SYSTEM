import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee } from "lucide-react"

type DataCardProps={
    value:number,
    label:string,
    id:string
}



const DataCard = ({value,label,id}:DataCardProps) => {
  return (
     <Card>
          <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className=" text-sm font-medium">{label}</CardTitle>
          </CardHeader>
          <CardContent>
              <div className=" flex text-2xl font-bold">
                { id=='reveneu' ?  <IndianRupee/>: null}

                {id=='reveneu' ? `${value}/-` : value}
              </div>
          </CardContent>
     </Card>

  )
}

export default DataCard