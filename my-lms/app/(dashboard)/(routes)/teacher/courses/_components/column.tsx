"use client"

import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Home, MoreHorizontal, Pencil } from "lucide-react"
import {  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button  variant="ghost"  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}  >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button  variant="ghost"  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button  variant="ghost"  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

    cell:({row})=>{
       const isPublished=row.getValue('isPublished') || false
      // const { isPublished } = row.original || false; same as line no 50 code
       return (
        <div>
           <Badge className={cn("bg-slate-500", isPublished && 'bg-sky-700')}>
            {
              isPublished ? 'Published' : 'Draft'
            }
           </Badge>
        </div>
       )
    }
  },

    {
      accessorKey: "Actions",
      id:"actions",
      cell: ({ row }) => {
         const {id} =row.original
         return(
          <DropdownMenu>

              <DropdownMenuTrigger asChild>

                  <Button className=" h-4 w-8 p-0">
                      <span className="sr-only">Open Menu</span>
                      <MoreHorizontal className=" h-4 w-4"/>
                  </Button>

              </DropdownMenuTrigger>  

              <DropdownMenuContent align="end">
                  <Link href={`/teacher/courses/${id}`}>
                     <DropdownMenuItem>
                        <Pencil className=" h-4 w-4 mr-2"/>
                        Edit
                     </DropdownMenuItem>
                  </Link>

                  <Link href={`/`}>
                     <DropdownMenuItem>
                        <Home className=" h-4 w-4 mr-2"/>
                         Home
                     </DropdownMenuItem>
                  </Link>

              </DropdownMenuContent>
          </DropdownMenu>
         )
      }
      
    }

]
