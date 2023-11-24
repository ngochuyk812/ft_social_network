import React, {useEffect, useState} from 'react';
import './style.css'

function MenuAction({children}:{children:string | JSX.Element | JSX.Element[] }) {
   const[openMenu, setOpenMenu] = useState(false);
    

    return (
        <div className='main_menu_action'>
            <i className="fa-solid fa-ellipsis icon-menu-action" onClick={()=>setOpenMenu(!openMenu)} style={{cursor:"pointer"}}></i>
            {
                openMenu && 
                <>
                <div style={{position:'relative'}}>
                    <ul onClick={()=>setOpenMenu(false)
                    }>
                        {children}
                    </ul>
                </div>
                <div onClick={()=>setOpenMenu(false)} className='outside'>
                    
                </div>
                </>
            }
        </div>
        
    );
}




export default MenuAction;