import requests

api_key = '67cd66468ef30c43f5829b114b27c686'

while True:
    location = input('Enter city location: ')
    result = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={location}&units=imperial&appid={api_key}')
    if result.json()['cod'] == '404':
        print("Invalid location!")
        continue
    break
description = result.json()['weather'][0]['description']
temperature = round(result.json()['main']['temp'])
feels_like = round(result.json()['main']['feels_like'])
high_temp = round(result.json()['main']['temp_max'])
low_temp = round(result.json()['main']['temp_min'])
location = f'{location[0].upper()}{location[1:]}'
today = datetime.date.today()
date = today.strftime("%d, %m %Y")

print(f'The weather in {location[0].upper()}{location[1:]} is {temperature}F with {description}')
print(f'It feels like {feels_like}F with a high of {high_temp}F and a low of {low_temp}F')

cloudy_conditions = ['few clouds', 'scattered clouds', 'broken clouds', 'overcast clouds']
sunny_conditions = ['clear sky']
rainy_conditions = ['light intensity drizzle', 'drizzle', 'heavy intensity drizzle', 'light intensity drizzle rain',
                    'heavy intensity drizzle rain', 'shower rain and drizzle', 'heavy shower rain and drizzle', 'shower drizzle',
                    'moderate rain', 'heavy intensity rain', 'very heavy rain', 'extreme rain', 'freezing rain',
                    'light intensity shower rain', 'shower rain', 'heavy intensity shower rain', 'ragged shower rain',
                    ]
thunderstorm_conditions = ['thunderstorm with light rain','thunderstorm with rain','thunderstorm with heavy rain','light thunderstorm','thunderstorm','heavy thunderstorm',
                           'ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle'
                           ]
if description in cloudy_conditions:
    img = "cloudy Wallpaper.png"
elif description in sunny_conditions:
    img = "sunny Wallpaper.png"
elif description in rainy_conditions:
    img = "rainy Wallpaper.png"
elif description in thunderstorm_conditions:
    img = "thunderstorm Wallpaper.png"
