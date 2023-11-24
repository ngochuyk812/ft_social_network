import { useParams } from "react-router-dom";
import './style.css'
import ItemUser from "../../component/ItemUser/ItemUser";
import { useSearchByQueryQuery } from "../../redux/services/home.service";
function Search() {
    const {q} = useParams();
    const {data: dataSearch } = useSearchByQueryQuery(q ?? "");

    return (
        <div className="home_container main_container d-flex justify-center px-1">
            <div className="container_search p-3">
                <p className="title-search">Kết quả tìm kiếm: {q}</p>
                {dataSearch?.map(tmp=>{
                    return <ItemUser user={tmp}/>
                })}
                
            </div>
        </div>
    );
}

export default Search;

