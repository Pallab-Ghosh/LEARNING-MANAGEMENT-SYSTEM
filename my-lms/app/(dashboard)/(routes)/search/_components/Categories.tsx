'use client'

import { Category } from "@prisma/client"
import { type } from "os"

type categories_props={
    items:Category[];
}

const Categories = ({items}:categories_props) => {
  return (
    <div>Categories</div>
  )
}

export default Categories