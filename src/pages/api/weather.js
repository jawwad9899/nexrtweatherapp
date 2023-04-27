// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${req.body.location}`;
      const options = {
        method: "GET",
        headers: {
          "content-type": "application/octet-stream",
          "X-RapidAPI-Key":
            "b549dd92a7msh2682a5e9edf22cap195048jsn36e8b6786d14",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };
      const data = await fetch(url, options);
      const { location, current } = await data.json();
      if (data.ok) {
        return res.status(200).json({
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
      } else {
        res.status(400).json({ success: false });
      }
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ msg: "Method Not Allowed!" });
  }
}
