import SkeletonPost from "./SkeletonPost"

export default function ListSkeletonPost({size}:{size:number}){
    const render = ()=> {
        const item =[]
        for (let index = 0; index < size; index++) {
            item.push(<SkeletonPost key={index}/>)
        }
        return item
    }
    return (
        <div>
            {render()}
        </div>
    )
}