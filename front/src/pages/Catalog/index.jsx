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

            {items
                .filter(item => {
                return item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                })
                .map((item, index) => (
                    <Card key={index} {...item} token={token} onPlus={(id) => onAddToCart(id)} />
                ))}

            </div>
        </div>
     );
}
 
export default Catalog;