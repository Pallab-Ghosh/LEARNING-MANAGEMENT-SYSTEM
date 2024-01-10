'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import 'react-quill/dist/quill.bubble.css'


type PreviewProps={
 
    value:string
}

export const Preview=({value}:PreviewProps)=>{

      //for avoiding hydration error so we import like this
    const ReactQuill=useMemo(()=>dynamic(()=>import('react-quill'),{ssr:false}), [])
    return (
    <ReactQuill
    theme='bubble'
    value={value}
    readOnly
    />
    )
}

