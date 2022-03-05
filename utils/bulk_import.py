import requests
import json
import csv
import datetime

token_url = 'http://127.0.0.1:8000/api/token/'
fillup_url = 'http://127.0.0.1:8000/api/fillups/'

login_body = {
    "email": "aesakof@gmail.com",
    "password": "Django123!"
}

x = requests.post(token_url, data= login_body)

access_token = json.loads(x.text)["access"]

head = {'Authorization': 'Bearer ' + access_token}

request_body = {
    "date": "2021-03-01", 
    "price_per_gallon": 3.33, 
    "trip_distance": 450, 
    "gallons": 12, 
    "fuel_grade": "Regular",
    "car": 27
}

with open('gas_data.csv') as csvfile:
    csv_reader = csv.reader(csvfile, delimiter=',')
    for row in csv_reader:
        request_body["date"] = datetime.datetime.strptime(row[0], '%m/%d/%y').strftime('%Y-%m-%d')
        request_body["price_per_gallon"] = float(row[1])
        request_body["trip_distance"] = float(row[2])
        request_body["gallons"] = float(row[3])

        response = requests.post(fillup_url, json=request_body, headers=head)
        print(response)
