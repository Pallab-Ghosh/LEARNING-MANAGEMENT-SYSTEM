

type ChaptersPlayepageProps={
    params:{
        chaptersId:string
    }
}

const ChaptersPlayepage = ({params}:ChaptersPlayepageProps)=> {
  return (
    <div>Chapter player page with chapterId {params.chaptersId}</div>
  )
}

export default ChaptersPlayepage