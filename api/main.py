# основной файл

from core import *

import authorization
import get_request
import put_request

# создать бд
with api.app_context():
    db.create_all()

if __name__ == '__main__':
    api.run(debug=True, port=3000)