import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import Map from './components/Map';
import './App.css';
import { useFetch } from './hooks/useFetch';

function App() {
  const [IP, setIP] = useState('');
  const [adress, setAdress] = useState(null);
  const {data, loading, error} = useFetch(`https://api.ipgeolocation.io/ipgeo?apiKey=4ac3c6e2417247d78a9b13c924dbf3ff&ip=${IP}`);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (data) {
      setAdress({
        ip: data.ip,
        country_capital: data.country_capital,
        country_name: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        time_zone: data.time_zone,
        isp: data.isp,
      });
    }
  }, [data]);


const handleSearch = () => {
    if (!search.trim()) {
      alert('Please enter a valid IP address');
      return;
    }
    setIP(search.trim());
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      {!(adress === null) && (
        <div>
          <div className="relative w-full bgIMG bg-no-repeat bg-center bg-cover grid items-center justify-items-center z-[1000]">
            <div className="w-[calc(100%-3rem)] max-w-[34.688rem] text-center pt-8 md:pt-[2.125rem] mb-36 mx-auto">
              <p className="font-medium text-[clamp(1.625rem,1.3846rem+1.0256vw,2rem)] leading-5 text-white tracking-normal">
                IP Address Tracker
              </p>
              <div className="w-full flex mt-6 mb-6 z-30">
                <input
                  type="text"
                  id="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  required
                  className="w-full py-[1.125rem] px-6 text-base rounded-l-[.938rem] bg-white placeholder:text-[black] focus:outline-none focus:ring-0 focus:border-[#2b2b2b] border-[1px] border-[#2b2b2b] text-[#2b2b2b] leading-6"
                  placeholder="Search for any IP address or domain"
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="inline-flex p-5 rounded-r-2xl bg-[#2b2b2b] ring-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="14"
                    role="img"
                    aria-describedby="icon-arrow"
                  >
                    <title id="icon-arrow">Icon arrow</title>
                    <path
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="3"
                      d="M2 1l6 6-6 6"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-[calc(100%-3rem);] max-w-[69.375rem] text-center mt-[2.875rem] md:mt-0 bg-white py-6 rounded-[.938rem] grid md:grid-cols-4 gap-6 leading-4 absolute top-[100%] left-[50%] -translate-x-[50%] -translate-y-[50%] md:gap-0 md:text-left md:py-[2.375rem]">
              <div className="border-gray-600 flex flex-col gap-2 md:px-8 md:gap-[.875rem] md:border-l-[1px]">
                <h2 className="uppercase tracking-[1.46px] font-bold text-[clamp(.625rem,.5449rem+.3419vw,.75rem);] text-[#969696]">
                  IP ADDRESS
                </h2>
                <div className="flex flex-wrap">
                  <p className="text-center m-auto font-medium text-[clamp(1.25rem,1.0096rem+1.0256vw,1.625rem)] leading-8 break-all">
                    {adress.ip}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:px-8 md:gap-[.875rem] md:border-l-[1px]">
                <h2 className="uppercase tracking-[1.46px] font-bold text-[clamp(.625rem,.5449rem+.3419vw,.75rem);] text-[#969696]">
                  LOCATION
                </h2>
                <p className="font-medium text-[clamp(1.25rem,1.0096rem+1.0256vw,1.625rem)] leading-8 break-words">
                {(adress?.country_capital || 'N/A') + (adress?.country_name ? `, ${adress.country_name}` : '')}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:px-8 md:gap-[.875rem] md:border-l-[1px]">
                <h2 className="uppercase text-center tracking-[1.46px] font-bold text-[clamp(.625rem,.5449rem+.3419vw,.75rem);] text-[#969696]">
                  TIME
                </h2>
                <p className="font-medium  text-[clamp(1.25rem,1.0096rem+1.0256vw,1.625rem);] leading-8 break-all">
                  <span className='p-1'>{adress.time_zone.current_time}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2 md:px-8 md:gap-[.875rem] md:border-l-[1px]">
                <h2 className="uppercase text-center tracking-[1.46px] font-bold text-[clamp(.625rem,.5449rem+.3419vw,.75rem);] text-[#969696]">
                  ISP
                </h2>
                <p className="font-medium text-center text-[clamp(1.25rem,1.0096rem+1.0256vw,1.625rem);] leading-8 break-all">
                  <span className='p-1'>{adress.isp}</span>
                </p>
              </div>
            </div>
          </div>
          <Map adress={adress} />
        </div>
      )}
    </>
  );
}

export default App;