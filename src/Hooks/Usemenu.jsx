import { useEffect, useState } from "react";


const Usemenu = () => {
    const [popular, setPopular] = useState([]);
    const [loading,setLoading] =useState(true)
   
       useEffect(() => {
           fetch('Popular.json')
               .then(res => res.json())
               .then(data => {
                   setPopular(data);
                   setLoading(false);
               });
       }, []);
       return [popular,loading]
};

export default Usemenu;