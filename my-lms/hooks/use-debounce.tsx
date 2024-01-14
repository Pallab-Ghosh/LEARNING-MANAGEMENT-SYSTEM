import { TransformStreamDefaultController } from "node:stream/web";
import { useEffect, useState } from "react";


export function useDebounce<T>(value:T , delay?:number):T {
  const[debounce,setDebouncedvalue]=useState<T>(value)

  useEffect(()=>{
    const timer=setTimeout(() => {
        setDebouncedvalue(value)
    }, delay || 500);

    return ()=>clearTimeout(timer);
  },[delay,value])

  return debounce
}