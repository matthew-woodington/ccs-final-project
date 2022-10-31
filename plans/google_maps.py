# filter profiles in django backend and get when filters are updated ?
# provide url with two places and recieve the distance between
# have distance checked against the radius user inputs and show all profiles within that mileage

import os
import urllib.parse
import requests


# api_key = os.environ['GOOGLE_KEY']
api_key = 'AIzaSyB2QnviN7Mkr0OtmCd7TPrqy38DMiniWUA'

origin = '29687'
destinations = ['Charlotte, NC', '101 Woodruff Industrial Lane Greenville, SC 29607',
                '5000 Old Spartanburg Rd, Taylors, SC 29687', 'Jacksonville', 'Seattle']
destinations_string = ('|').join(destinations)
url_destinations = urllib.parse.quote(destinations_string)

# url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=YOUR_API_KEY"
url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={url_destinations}&units=imperial&key={api_key}"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)

print(url)
