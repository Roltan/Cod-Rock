# основной файл

from core import *

import route

# создать бд
# with api.app_context():
#     db.create_all()

if __name__ == '__main__':
    api.run(debug=True, port=3001)