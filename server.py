from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.config['CORS_HEADERS'] = 'Content-Type'

# Sample data to return from the API in the specified format
workers = [
    {
        "workerId": 1,
        "userId": 3,
        "experienceYears": 5,
        "rating": 0,
        "bio": "Chuyên sửa chữa điện dân dụng",
        "verified": False,
        "user": {
            "userId": 3,
            "fullName": "Mike Worker",
            "email": "mike@example.com",
            "phoneNumber": "0369852147",
            "address": None,
            "userType": 2,
            "profilePicture": None,
            "createdAt": "2024-10-26T00:45:26.04"
        }
    }
]

@app.route('/api/Workers', methods=['GET'])
def get_workers():
    return jsonify(workers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000', debug=True)  # Use SSL context for HTTPS
