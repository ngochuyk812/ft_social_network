import React from 'react';
import './style.css'
import ItemFriend from '../../ItemFriend/ItemFriend.tsx'
const SidebarRight : React.FC = () =>{
    const data = [{
        "img": "https://robohash.org/estducimusamet.jpg?size=50x50&set=set1",
        "name": "Jasmina Scopham",
        "link_story": "Room 849",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/doloremdeseruntid.jpg?size=50x50&set=set1",
        "name": "Carmelita Bazeley",
        "link_story": "Suite 78",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/rationeconsequaturvitae.jpg?size=50x50&set=set1",
        "name": "Bambie Bellward",
        "link_story": "5th Floor",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/explicaborepellatin.jpg?size=50x50&set=set1",
        "name": "Madelene Trevena",
        "link_story": "Apt 1825",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/pariaturporroipsam.jpg?size=50x50&set=set1",
        "name": "Bea Brenton",
        "link_story": "Apt 1753",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/quasetassumenda.jpg?size=50x50&set=set1",
        "name": "Rosabella Maginn",
        "link_story": "Room 213",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/iustoestest.jpg?size=50x50&set=set1",
        "name": "Jocko Consadine",
        "link_story": "PO Box 86098",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/fugitliberoest.jpg?size=50x50&set=set1",
        "name": "Franny McDonagh",
        "link_story": "PO Box 22454",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/voluptatemdoloresarchitecto.jpg?size=50x50&set=set1",
        "name": "Cyrille Parlott",
        "link_story": "18th Floor",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/estevenietconsequuntur.jpg?size=50x50&set=set1",
        "name": "Cathe Huitson",
        "link_story": "Suite 13",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/utnumquameos.jpg?size=50x50&set=set1",
        "name": "Kirsti Edgerley",
        "link_story": "Suite 34",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/perferendisreprehenderitaut.jpg?size=50x50&set=set1",
        "name": "Terry Maxsted",
        "link_story": "Suite 77",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/nequeetnecessitatibus.jpg?size=50x50&set=set1",
        "name": "Morgun Wastling",
        "link_story": "PO Box 3233",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/laboriosamnonasperiores.jpg?size=50x50&set=set1",
        "name": "Shanon Gates",
        "link_story": "7th Floor",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/velrepellatrepudiandae.jpg?size=50x50&set=set1",
        "name": "Tine Sackler",
        "link_story": "PO Box 99314",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/temporibussedasperiores.jpg?size=50x50&set=set1",
        "name": "Lana Bickerton",
        "link_story": "PO Box 99570",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/nullaidlibero.jpg?size=50x50&set=set1",
        "name": "Mar Challin",
        "link_story": "Room 241",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/delenitidebitisquia.jpg?size=50x50&set=set1",
        "name": "Quinn Swigg",
        "link_story": "Apt 1788",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/doloreundenam.jpg?size=50x50&set=set1",
        "name": "Mariquilla Billanie",
        "link_story": "Suite 59",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/oditquasiducimus.jpg?size=50x50&set=set1",
        "name": "Isac French",
        "link_story": "Room 557",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/minimanostrumplaceat.jpg?size=50x50&set=set1",
        "name": "Boonie Lamdin",
        "link_story": "11th Floor",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/estdoloribussunt.jpg?size=50x50&set=set1",
        "name": "Curr Tocknell",
        "link_story": "Suite 24",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/quibusdambeataeoptio.jpg?size=50x50&set=set1",
        "name": "Charley Casarini",
        "link_story": "Room 1744",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/estnamsint.jpg?size=50x50&set=set1",
        "name": "Tatum Blamires",
        "link_story": "Room 1689",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/consequaturaquam.jpg?size=50x50&set=set1",
        "name": "Joni By",
        "link_story": "Room 1063",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/etlaborumsequi.jpg?size=50x50&set=set1",
        "name": "Devin Katzmann",
        "link_story": "Room 689",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/expeditaetqui.jpg?size=50x50&set=set1",
        "name": "Iona Winscom",
        "link_story": "Room 545",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/quibusdamquipariatur.jpg?size=50x50&set=set1",
        "name": "Ava Swinburne",
        "link_story": "17th Floor",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/similiquequisnesciunt.jpg?size=50x50&set=set1",
        "name": "Zachariah Stooders",
        "link_story": "PO Box 52790",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/quasiipsumexcepturi.jpg?size=50x50&set=set1",
        "name": "Teodoor Scholey",
        "link_story": "Apt 1143",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/natusquiprovident.jpg?size=50x50&set=set1",
        "name": "Perry Elias",
        "link_story": "Apt 573",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/assumendasuscipitdignissimos.jpg?size=50x50&set=set1",
        "name": "Robbie Aldgate",
        "link_story": "PO Box 96415",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/laudantiumsitvelit.jpg?size=50x50&set=set1",
        "name": "Emmie Longworthy",
        "link_story": "Room 23",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/nemonecessitatibusdolorem.jpg?size=50x50&set=set1",
        "name": "Jessi Doul",
        "link_story": "Suite 21",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/molestiasdoloreius.jpg?size=50x50&set=set1",
        "name": "Zed Hassard",
        "link_story": "Room 1812",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/esseverocum.jpg?size=50x50&set=set1",
        "name": "Cory Crummy",
        "link_story": "3rd Floor",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/consequunturvoluptascorporis.jpg?size=50x50&set=set1",
        "name": "Kile Monday",
        "link_story": "7th Floor",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/voluptasundeipsa.jpg?size=50x50&set=set1",
        "name": "Gaby Macenzy",
        "link_story": "PO Box 84607",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/sitnisiest.jpg?size=50x50&set=set1",
        "name": "Hayes Gherardelli",
        "link_story": "Suite 81",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/quidemminusquas.jpg?size=50x50&set=set1",
        "name": "Belle Stones",
        "link_story": "Suite 73",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/utvoluptatumcorrupti.jpg?size=50x50&set=set1",
        "name": "Ophelia Hebard",
        "link_story": "Room 905",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/quibusdamquiaconsequatur.jpg?size=50x50&set=set1",
        "name": "Aaron Mounce",
        "link_story": "Apt 398",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/nonmollitiaiure.jpg?size=50x50&set=set1",
        "name": "Lindsay Burcombe",
        "link_story": "Suite 66",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/illumliberonatus.jpg?size=50x50&set=set1",
        "name": "Vale Warcup",
        "link_story": "Apt 1177",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/iddolorearum.jpg?size=50x50&set=set1",
        "name": "Tomasine Roloff",
        "link_story": "Apt 537",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/veritatisperspiciatisdolore.jpg?size=50x50&set=set1",
        "name": "Quinton Iron",
        "link_story": "Apt 946",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/estmagnamqui.jpg?size=50x50&set=set1",
        "name": "Kym Schutte",
        "link_story": "Apt 439",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/reiciendissedsequi.jpg?size=50x50&set=set1",
        "name": "Aurora Greenough",
        "link_story": "13th Floor",
        'status': 1,
        "view": true
      }, {
        "img": "https://robohash.org/aspernaturutqui.jpg?size=50x50&set=set1",
        "name": "Cinnamon Connerry",
        "link_story": "PO Box 95627",
        'status': 0,
        "view": false
      }, {
        "img": "https://robohash.org/consecteturquivoluptas.jpg?size=50x50&set=set1",
        "name": "Rory Mounter",
        "link_story": "Suite 46",
        'status': 0,
        "view": false
      }]
    return (
       <aside className='sidebar_right'>
        <p>Friends</p>
        <div className='main_search_sidebar_right'>
        <div className="form_search_sidebar_right"><i className="fa fa-search"></i><input type="text" className="form-control form-input" placeholder="Search anything..."/></div>

        </div>
        <div className='list_firend'>
            {data.map(tmp=>{
                return <ItemFriend key={tmp.name} item = {tmp} ></ItemFriend>
            })}
            
        </div>
       </aside>
    );
}

export default SidebarRight;