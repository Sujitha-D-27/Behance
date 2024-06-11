



import { useState, useEffect } from "react";
import axios from "axios";
import Filterandsearch from "../Components/search/Filterandsearch";
import Cards from "../Components/cards/Cards";

import NavBar from "../Components/navbar/Navbar";



function Home() {
   

  // const [toggleSidebar, setToggleSidebar] = useState(false);
  const [data, setData] = useState([])
 
  const [sortOption, setSortOption] = useState('Recommended');

  const fetchData = async() => {
      const response = await axios.get(`https://api.unsplash.com/photos/?client_id=wyeYxti1H1OCfh7E_oaWY2TbhUQTFmgUp53al9H1uOA&per_page=40`);
      const data = await response.data
      console.log("Dataaaa",data);
      setData(data)
  }


    useEffect(() =>{
        fetchData()   

    }, [])

    const sortData = (data) => {
        console.log(sortOption); // dropdown data clicked 
        let sortedData = [...data];
        if (sortOption === 'Most Liked') {
          sortedData.sort((a, b) => b.likes - a.likes);
        } else if (sortOption === 'Most Viewed') {
          sortedData.sort((a, b) => b.user.total_likes - a.user.total_likes);  // Assuming 'views' is a valid property
        }
        // You can add more sorting conditions here if needed
        return sortedData;
      };

  return (
    <div className="App">
      <NavBar/>
      <Filterandsearch  setSortOption={setSortOption}/>      
      {/* <div className={toggleSidebar?"gallery expanded":"gallery"}>
      {toggleSidebar && <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar}/>}
        <div className="cards">
          {data.length > 0 && (
            data.map((d) => <Cards data={d}/>)
          )}
        </div>
      </div>  */}
        <div className="cards">
          {data.length > 0 && (
            sortData(data).map((d) => <Cards data={d}/>)
          )}
        </div> 
          
   
    </div>
  );
}

export default Home;