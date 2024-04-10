# основной файл

from core import *

import authorization
import route.get_request
import route.put_request
import route.cart

# создать бд
with api.app_context():
    db.create_all()

    # создать граф мира
    def СreateMap():
        from instance.models import Map
        script_dir = os.path.dirname(sys.argv[0])
        with open(os.path.join(script_dir, 'instance/map.json'), 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        for el in data:
            initial_city = el['initial_city']
            final_city = el['final_city']
            time_way = el['time_way']
            price_way = el['price_way']
            distance_way = el['distance_way']
            # распределение транспорта
            transport = randint(0,10)
            if transport < 7:
                transport = 'car'
            elif transport < 8:
                transport = 'air'
            else:
                transport = 'ship'
            row = Map(initial_city=initial_city, final_city=final_city, time_way=time_way, price_way=price_way, distance_way=distance_way, transport=transport)
            db.session.add(row)
        db.session.commit()
    # СreateMap()

if __name__ == '__main__':
    api.run(debug=True, port=3001)
