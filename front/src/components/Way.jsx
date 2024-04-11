import axios from "axios"

const MinDistanceComponent = ({ data, id, pvz, token}) => {
  console.log(data)
  async function acceptOrder(a,b,c,d,e,f){
    try {
      const req = await axios({
        method: "POST",
        url: "http://127.0.0.1:3001/acceptOrder",
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          "id": a,
          "pvz": b,
          "storehouse": c,
          "initial_city": d,
          "final_city": e,
          "way": f
        }
      })
      console.log(req)
    } catch (error) {
      console.log('reror')
    }
  }
  return(
    <div>
      <h2>Минимальное расстояние</h2>
      {data.map((item, index) => (
        <div key={index}>
          {console.log(item.distance)}
          <p>Список городов: {item.wayList.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Конечный город: {item.final_city}</p>
          <p>Начальный город: {item.initial_city}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
          <button onClick={() => acceptOrder(id, pvz, item.storhous, item.initial_city, item.final_city, item.way)}>Выбрать этот путь</button>
        </div>
      ))}
    </div>
  )
}
  
const MinPriceComponent = ({ data, id, pvz}) => {
  console.log(data)
  return(
    <div>
      <h2>Минимальная цена</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>Список городов: {item.wayList.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Конечный город: {item.final_city}</p>
          <p>Начальный город: {item.initial_city}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
        </div>
      ))}
    </div>
  )
}

const MinTimeComponent = ({ data, id, pvz}) => {
  return(
    <div>
      <h2>Минимальное время</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>Список городов: {item.wayList.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Конечный город: {item.final_city}</p>
          <p>Начальный город: {item.initial_city}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
        </div>
      ))}
    </div>
  )
}
  
  export { MinDistanceComponent, MinPriceComponent, MinTimeComponent };