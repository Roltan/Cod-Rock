import React from 'react'
import axios from 'axios'

const GetPvz = () => {
    const[pvz, setPvz] = React.useState([])
    const[isClick, setIsClick] = React.useState(false)

    async function getPvz(id){
        const getPVZ = await axios.get(`http://127.0.0.1:3001/pvz/${id}`)
        setPvz(getPVZ.data.date)
        console.log(pvz.address)
        setIsClick(true)
    }
    
    return ( 
    <div>
        Получить ПВЗ
        <button onClick={() => getPvz(1)}>Пвз 1</button>
        <button onClick={() => getPvz(2)}>Пвз 2</button>
        <button onClick={() => getPvz(3)}>Пвз 3</button>
        <button onClick={() => getPvz(4)}>Пвз 4</button>
        <button onClick={() => getPvz(5)}>Пвз 5</button>
        <button onClick={() => getPvz(6)}>Пвз 6</button>
        <button onClick={() => getPvz(7)}>Пвз 7</button>
        <button onClick={() => getPvz(14)}>Пвз 14</button>
        {/* {pvz.address} */}
        {isClick ? 
        pvz.map((item, index) => (
            <div key={index}>
                Информация о ПВЗ
                <div>Продавец</div>
                <div>{item.address}</div>
                <div>Город {item.city}</div>
                <div>Адресс {item.address}</div>
                <div></div>
            </div> 
        ))
        
        :   <div>
                Пвз не найден
            </div>}
    </div> );
}
 
export default GetPvz;