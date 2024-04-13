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
    <>
    {console.log(data.length)}
      {data.map((item, index) => (
        <div key={index}>
          <div>
            <p>
                <span>Список городов</span>
                <span>{item.wayList.join(', ')}</span>
            </p>
            <p>
                <span>Расстояние</span>
                <span>{item.distance} км</span>
            </p>
            <p>
                <span>Цена доставки</span>
                <span>{item.price} р</span>
            </p>
          </div>
          <div>
          {/* <button onClick={() => acceptOrder(id, pvz, item.storhous, item.initial_city, item.final_city, item.way)}>Выбрать этот путь</button> */}
              <input type="checkbox" name="" id="dist" />
              <label for="dist"><div></div></label>
          </div>
        </div>
      ))}
    </>
  )
}
  
const MinPriceComponent = ({ data, id, pvz}) => {
  console.log(data)
  return(
    <>
    {console.log(data.length)}
      {data.map((item, index) => (
        <div key={index}>
          <div>
            <p>
                <span>Список городов</span>
                <span>{item.wayList.join(', ')}</span>
            </p>
            <p>
                <span>Расстояние</span>
                <span>{item.distance} км</span>
            </p>
            <p>
                <span>Цена доставки</span>
                <span>{item.price} р</span>
            </p>
          </div>
          <div>
          {/* <button onClick={() => acceptOrder(id, pvz, item.storhous, item.initial_city, item.final_city, item.way)}>Выбрать этот путь</button> */}
              <input type="checkbox" name="" id="dist" />
              <label for="dist"><div></div></label>
          </div>
        </div>
      ))}
    </>
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