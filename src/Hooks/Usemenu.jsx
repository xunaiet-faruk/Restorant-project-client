import { useEffect, useState } from "react";
import UseAxios from "./UseAxios";


const Usemenu = () => {
    const [popular, setPopular] = useState([]);
    const [loading,setLoading] =useState(true)
    const [error, setError] = useState(null);
    const axios =UseAxios()
   
       useEffect(() => {
          const FetchMenu =async()=>{
              try {
                  const response = await axios.get('/Allfood'); 

                  console.log('Fetched menu:', response.data);
                  setPopular(response.data);
                  setError(null);
              } catch (error) {
                  console.log(error);
              } finally {
                  setLoading(false);
              }
          }
          FetchMenu();
       }, [axios]);
       return [popular,loading]
};

export default Usemenu;