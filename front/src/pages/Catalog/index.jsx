import React from 'react';
import Card from '../../components/Card';



const Catalog = ({items}) => {

    
    

    // const renderItems = () => {
    //     const allitems = items.date
    //     console.log(allitems)
    //     allitems.map((item, index)=>{
    //         return <Card key={index} {...item} />
    //     })
        
            
        
        
    // }

    return ( 
        <div>
            Каталог продуктов
            {
                items.map((item, index) => <Card key={index} {...item}/>)   
            }
        </div>
     );
}
 
export default Catalog;