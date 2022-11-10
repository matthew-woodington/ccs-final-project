# filter profiles in django backend and get when filters are updated ?
# provide url with two places and recieve the distance between
# have distance checked against the radius user inputs and show all profiles within that mileage

# import os
# import urllib.parse
# import requests


# api_key = os.environ['GOOGLE_API_KEY']

# origin = '29687'
# destinations = ['Charlotte, NC', '101 Woodruff Industrial Lane Greenville, SC 29607',
#                 '5000 Old Spartanburg Rd, Taylors, SC 29687', 'Jacksonville', 'Seattle']
# destinations_string = ('|').join(destinations)
# url_destinations = urllib.parse.quote(destinations_string)

# # url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Washington%2C%20DC&destinations=New%20York%20City%2C%20NY&units=imperial&key=YOUR_API_KEY"
# url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={url_destinations}&units=imperial&key={api_key}"

# payload = {}
# headers = {}

# response = requests.request("GET", url, headers=headers, data=payload)

# # print(response.text)

# print(url)

{'destination_addresses': ['5000 Old Spartanburg Rd, Taylors, SC 29687, USA', '101 Woodruff Industrial Ln, Greenville, SC 29607, USA', '955 W Wade Hampton Blvd, Greenville, SC 29609, USA', '12325 Copper Way, Charlotte, NC 28277, USA',
                           '1302 Heyward St, Columbia, SC 29205, USA', '250 Mill St, Taylors, SC 29687, USA', '1162 Eden Terrace, Rock Hill, SC 29730, USA', '8811 Charlotte Hwy, Indian Land, SC 29707, USA'], 'origin_addresses': ['Greenville, SC 29601, USA'], }
data = {'rows': [{'elements': [{'distance': {'text': '7.5 mi', 'value': 12125}, 'duration': {'text': '13 mins', 'value': 774}, 'status': 'OK'}, {'distance': {'text': '6.3 mi', 'value': 10068}, 'duration': {'text': '10 mins', 'value': 586}, 'status': 'OK'}, {'distance': {
    'text': '10.8 mi', 'value': 17419}, 'duration': {'text': '22 mins', 'value': 1333}, 'status': 'OK'}, {'distance': {'text': '109 mi', 'value': 176052}, 'duration': {'text': '1 hour 47 mins', 'value': 6401}, 'status': 'OK'}, {'distance': {'text': '105 mi', 'value': 168217}, 'duration': {'text': '1 hour 38 mins', 'value': 5891}, 'status': 'OK'}, {'distance': {'text': '8.6 mi', 'value': 13762}, 'duration': {'text': '19 mins', 'value': 1129}, 'status': 'OK'}, {'distance': {'text': '93.1 mi', 'value': 149762}, 'duration': {'text': '1 hour 43 mins', 'value': 6181}, 'status': 'OK'}, {'distance': {'text': '115 mi', 'value': 185798}, 'duration': {'text': '1 hour 56 mins', 'value': 6959}, 'status': 'OK'}]}], 'status': 'OK'}

distance_dict = data['rows'][0]['elements']

# print(len(distance_dict))
# print(distance_dict[1]['distance']['text'])

distance_list = []
# for index in distance_dict:
#     distance_list.append(distance_dict[int(index)]['distance']['text'])

for i in range(len(distance_dict)):
    distance_list.append(distance_dict[i]['distance']['text'])

# print(distance_list)

final_list = []
for i in range(len(distance_list)):
    final_list.append(float((distance_list[i].replace(' mi', ''))))

print(final_list)
