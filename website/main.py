import requests

api_key = '67cd66468ef30c43f5829b114b27c686'
BASE_URL = "https://api.openweathermap.org/data/2.5/"

def get_results(query):
    url = f"{BASE_URL}weather?q={query}&units=metric&APPID={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        display_results(response.json())
    else:
        print("Error:", response.status_code, response.text)

def display_results(weather):
    city = f"{weather['name']}, {weather['sys']['country']}"
    now = datetime.now()
    date = date_builder(now)
    temp = f"{round(weather['main']['temp'])}°c"
    weather_main = weather['weather'][0]['main']
    hilow = f"{round(weather['main']['temp_min'])}°c / {round(weather['main']['temp_max'])}°c"

    print(f"\nLocation: {city}")
    print(f"Date: {date}")
    print(f"Temperature: {temp}")
    print(f"Weather: {weather_main}")
    print(f"High/Low: {hilow}\n")

def date_builder(d):
    months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]
    day = days[d.weekday()]
    date = d.day
    month = months[d.month - 1]
    year = d.year
    return f"{day} {date} {month} {year}"

def main():
    while True:
        query = input("Enter city name (or 'exit' to quit): ")
        if query.lower() == 'exit':
            break
        get_results(query)

if __name__ == "__main__":
    main()
