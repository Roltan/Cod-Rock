const MinDistanceComponent = ({ data }) => (
    <div>
      <h2>Минимальное расстояние</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>Города: {item.city.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
        </div>
      ))}
    </div>
  );
  
  const MinPriceComponent = ({ data }) => (
    <div>
      <h2>Минимальная цена</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>Города: {item.city.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
        </div>
      ))}
    </div>
  );
  
  const MinTimeComponent = ({ data }) => (
    <div>
      <h2>Минимальное время</h2>
      {data.map((item, index) => (
        <div key={index}>
          <p>Города: {item.city.join(', ')}</p>
          <p>Расстояние: {item.distance}</p>
          <p>Цена: {item.price}</p>
          <p>Время: {item.time}</p>
        </div>
      ))}
    </div>
  );
  
  export { MinDistanceComponent, MinPriceComponent, MinTimeComponent };