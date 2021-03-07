from time import sleep
import os
import json
import requests
# import socketio
# sio = socketio.Client()
# sio.connect('http://localhost:3000')


import pprint
pp = pprint.PrettyPrinter(indent=4)

with open('main.py', "r") as file:
    code = file.read()
# sleep(0.3)
with open('body.json', "r+") as file: 
    data = json.load(file)
    data['code'] = code
    # sleep(0.2)
    file.seek(0)
    # sleep(0.3)
    json.dump(data, file, indent=4)
    # sleep(0.3)

    
    
#might have to look up how to get authorization header (maybe manually from website)
response = requests.post("https://www.codewars.com/api/v1/runner/authorize", headers={"authorization": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVlNWJhMGIzMDE3MTIyMDAyZTRiOTU2MiIsImV4cCI6MTYxNTM4MzM4M30.WSCOGTgS6ocDza4dLlChblRgtzCrN0e4mIEexYoY1Mg"})
authToken = response.json()["token"]

#send code, receive results
response = requests.post("https://runner.codewars.com/run", headers={"authorization": f"Bearer {authToken}"}, json=data).json()
# print(type(response))
# pp.pprint(response)


# sleep(1)
# sio.emit('inData', response)

#send result to server
print(type(response))
respone = requests.post("http://localhost:3000/update", json=response)
# requests.get("http://localhost:3000/")



#for key in response:
    #print(key, response[key])

# sleep(1)
os._exit(1) # sucide