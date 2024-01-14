'use client'

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import qs from "query-string"
import { useDebounce } from "@/hooks/use-debounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const SearchInput=()=>{

    const[value,setvalue]=useState("");
    const debounced_value=useDebounce(value)

    const searchparams=useSearchParams();
    const router=useRouter();
    const pathname=usePathname();
    const currentcategoryId=searchparams.get('categoryId')

     useEffect(()=>{
        const url= qs.stringifyUrl({
            url:pathname,
            query:{
                categoryId:currentcategoryId,
                title:debounced_value
            }
        },{skipEmptyString:true , skipNull:true},)
        router.push(url);
     },[debounced_value,currentcategoryId,router,pathname])

    return (
        <div className=" relative">
            <Search className=" h-4 w-4 absolute top-3 left-3 text-slate-500" />
            <Input
            className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
            placeholder="Search for a Course"

            value={value}
            onChange={(e)=>setvalue(e.target.value)}
            
            />

        </div>
    )
}