'use client'

import { type } from "os"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
 

type confirmmosalprops={
    children:React.ReactNode,
    onConfirm:()=>void
};

export const ConfirmModal=({children,onConfirm}:confirmmosalprops)=>{
    return (
        <AlertDialog>
              <AlertDialogTrigger asChild>
                  {children}
              </AlertDialogTrigger>

              <AlertDialogContent>
                 <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure? </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                 </AlertDialogHeader>

                 <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continue
                    </AlertDialogAction>
                 </AlertDialogFooter>
              </AlertDialogContent>
        </AlertDialog>
    )
}