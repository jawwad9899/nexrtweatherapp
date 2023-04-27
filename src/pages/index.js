import { useEffect, useState } from "react";
import styles from "../styles/Main.module.css";

export default function Home() {
  const [location, setLocation] = useState("");
  const [locationInformation, setLocationInformation] = useState(null);

  async function fetchWeather(location_info) {
    try {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location_info}`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key": String(process.env.RAPID_API_KEY),
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      const data = await fetch(url, options);
      if (data.ok) {
        const { location, current } = await data.json();
        setLocationInformation({
          name: `${location.name} , ${location.region} (${location.country})`,
          temp: { f: current.temp_f, c: current.temp_c },
          feelslike_f: current.feelslike_f,
          feelslike_c: current.feelslike_c,
          humidity: current.humidity,
          precipitation: current.precip_in,
          wind_speed: current.wind_kph,
          icon: current.condition.icon,
          text: current.condition.text,
          wind_degree: current.wind_degree,
          uv: current.uv,
          wind_gust: current.gust_kph,
          wind_dir: current.wind_dir,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        fetchWeather(`${latitude},${longitude}`);
      },
      (e) => {
        console.error(e);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  function submitForm(e) {
    e.preventDefault();
    fetchWeather(location);
    setLocation("");
  }

  return (
    <main className="w-[100vw]  h-[100vh] max-h-[100vh] max-w-[100vw] bg-slate-300 flex justify-center pt-4 md:pt-16">
      <section className="rounded-md bg-transparent p-6 w-[70%] h-[100%] flex flex-col gap-5 items-center">
        <div className="flex flex-col w-fit r gap-4 md:items-baseline items-center">
          <h1 className="md:text-3xl self-center text-md md:border-l-4  md:border-r-4 md:w-fit px-2 border-slate-700  font-semibold text-slate-600  ">
            {locationInformation ? locationInformation.name : "Loading..."}{" "}
            <br />
          </h1>
          <h3 className="md:text-2xl text-sm capitalize text-slate-600">
            if weather {"isn't"} correct then please enter latitude and
            longitude.
          </h3>
          <form
            onSubmit={submitForm}
            action={`/`}
            method="post"
            className="w-full"
          >
            <input
              type="text"
              name="location"
              placeholder="Location Or Latitude,Longitude"
              className="py-2 px-3 rounded-md shadow-md md:text-xl  text-slate-700 outline-none w-full"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              autoComplete="off"
              autoCorrect="none"
              autoCapitalize="off"
              spellCheck={false}
            />
          </form>
        </div>
        {locationInformation ? (
          <section
            className={`box w-auto md:w-full h-full rounded-md max-h-full overflow-auto text-slate-100 p-3 flex gap-3 flex-wrap justify-center ${styles.box}`}
          >
            <div className="flex flex-col text-center text-xl md:w-[300px] md:h-[300px] bg-slate-100 rounded-[.5rem] shadow-md ">
              <h1 className="p-2 bg-slate-600 w-full rounded-tr-[.4rem] rounded-tl-[.4rem]">
                Tempratures
              </h1>
              <div className="flex flex-col gap-5 text-slate-600 p-5 ">
                <div className="w-full">
                  <h1 className="text-4xl">
                    {locationInformation.temp.c}
                    <span className="text-gray-300"> °C</span> /{" "}
                    {locationInformation.temp.f}
                    <span className="text-gray-300"> °F</span>{" "}
                  </h1>
                </div>
                <div>
                  <div>Temprature Is {locationInformation.temp.c} Celsius</div>
                </div>

                <div className=" w-full ">
                  <span>
                    Feels Like {locationInformation.feelslike_c}
                    <span className="text-gray-300"> °C</span> /{" "}
                    {locationInformation.feelslike_f}
                    <span className="text-gray-300"> °F</span>
                  </span>
                </div>
                <div className=" w-full ">
                  <span>
                    Precipitation is {locationInformation.precipitation}{" "}
                    <span className="text-gray-300"> %</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center text-xl w-[320px] h-[320px] bg-slate-100 rounded-[.5rem] shadow-md">
              <h1 className="p-2 bg-slate-600 w-full rounded-tr-[.4rem] rounded-tl-[.4rem]">
                Humidity Info
              </h1>
              <div className="flex flex-col gap-5 text-slate-600 p-5 items-baseline">
                <div className="w-full">
                  <h1 className="text-4xl">
                    {locationInformation.humidity}
                    <span className="text-gray-300"> %</span>
                  </h1>
                </div>
                <div className="  w-full text-2xl">
                  <span>Wind Degree Is {locationInformation.wind_degree}</span>
                </div>

                <div className="  w-full text-2xl">
                  <span>
                    Humidity Is {locationInformation.humidity}
                    <span className="text-gray-300"> %</span>
                  </span>
                </div>
                <div className="  w-full text-2xl ">
                  <span>Wind Direction ({locationInformation.wind_dir})</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-center text-xl w-[300px] h-[300px] bg-slate-100 rounded-[.5rem] shadow-md">
              <h1 className="p-2 bg-slate-600 w-full rounded-tr-[.4rem] rounded-tl-[.4rem]">
                Wind Info
              </h1>
              <div className="flex flex-col gap-5 text-slate-600 p-5 items-baseline">
                <div className="w-full">
                  <h1 className="text-4xl">
                    {locationInformation.wind_speed}
                    <span className="text-gray-300"> km/hr</span>
                  </h1>
                </div>
                <div className="  w-full ">
                  <span>
                    Wind Speed Is {locationInformation.wind_speed}{" "}
                    <span className="text-gray-300"> km/hr</span>
                  </span>
                </div>
                <div className=" w-full ">
                  <span>
                    Gust Is {locationInformation.wind_gust}{" "}
                    <span className="text-gray-300"> km/hr</span>
                  </span>
                </div>
                <div className="  w-full">
                  <span>UV Index Is {locationInformation.uv}</span>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <h1>Loading...</h1>
        )}
      </section>
    </main>
  );
}
