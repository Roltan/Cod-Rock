const Main = (props) => {
    return ( 
        <div>
            Главная
            {props.token ? 'Вы авторизованы'  : 'Вы не авторизованы'}
        </div>
      );
}
 
export default Main;