import React from 'react';
import Card from '../../components/Card';



const Catalog = ({items, onAddToCart, token}) => {

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
    return ( 
        <div class="galary">
            <div class="header">
                <div class="search">
                <input
                    type="text"
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                    <button>
                        <img src="../img/lens.svg" alt="" />
                    </button>
                </div>
                <div class="sort">
                    <p>
                        Сортировать по
                        <span class="green">популярности</span>
                    </p>
                    <div>
                        <img src="../img/arrowBotom.svg" alt="arrow" />
                    </div>
                </div>
            </div>

            <div class="listStuff">
                
            {/* {
                 items.map((item, index) => <Card key={index} {...item} token={token} onPlus={(id) => onAddToCart(id)}/>)   
            } */}
            {items
                .filter(item => {
                // Фильтрация по строке поиска: проверка наличия подстроки в названии или описании
                return item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                })
                .map((item, index) => (
                <Card key={index} {...item} token={token} onPlus={(id) => onAddToCart(id)} />
                ))}
                {/* <div class="card">
                    <div>
                        <div>
                            <img src="../img/stuff.png" alt="stuff" />
                        </div>
                        <div>
                            <div>
                                <div class="img"><img src="../img/User.svg" alt="" /></div>
                                <p>Продовец</p>
                            </div>
                            <p>900р</p>
                        </div>
                    </div>
                    <div>
                        <p>Название</p>
                        <p>Продано 0</p>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div>
                            <img src="../img/stuff.png" alt="stuff" />
                        </div>
                        <div>
                            <div>
                                <div class="img"><img src="../img/User.svg" alt="" /></div>
                                <p>Продовец</p>
                            </div>
                            <p>900р</p>
                        </div>
                    </div>
                    <div>
                        <p>Название</p>
                        <p>Продано 0</p>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div>
                            <img src="../img/stuff.png" alt="stuff" />
                        </div>
                        <div>
                            <div>
                                <div class="img"><img src="../img/User.svg" alt="" /></div>
                                <p>Продовец</p>
                            </div>
                            <p>900р</p>
                        </div>
                    </div>
                    <div>
                        <p>Название</p>
                        <p>Продано 0</p>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div>
                            <img src="../img/stuff.png" alt="stuff" />
                        </div>
                        <div>
                            <div>
                                <div class="img"><img src="../img/User.svg" alt="" /></div>
                                <p>Продовец</p>
                            </div>
                            <p>900р</p>
                        </div>
                    </div>
                    <div>
                        <p>Название</p>
                        <p>Продано 0</p>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div>
                            <img src="../img/stuff.png" alt="stuff" />
                        </div>
                        <div>
                            <div>
                                <div class="img"><img src="../img/User.svg" alt="" /></div>
                                <p>Продовец</p>
                            </div>
                            <p>900р</p>
                        </div>
                    </div>
                    <div>
                        <p>Название</p>
                        <p>Продано 0</p>
                    </div>
                </div> */}
            </div>
        </div>
        // <div>
        //     Каталог продуктов
        //    
        // </div>
     );
}
 
export default Catalog;