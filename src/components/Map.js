import React, { useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useFetch } from "../hooks";

export default function Mobile() {
  const { value, setValue, search, setSearch } = useContext(DataContext);
  const [status, data, setUrl] = useFetch();

  const apiSearch = async () => {
    const url = `https://api.openbrewerydb.org/breweries/search?query=${search}`;
    setUrl(url);
  };

  useEffect(() => {
    setValue(data);
    console.log(data);
  }, [data]);

  const formatPhone = (number) => {
    const temp = number.split("");
    const formattedPhone = `(${temp[0]}${temp[1]}${temp[2]}) ${temp[3]}${temp[4]}${temp[5]} - ${temp[6]}${temp[7]}${temp[8]}${temp[9]}`;
    return formattedPhone;
  };

  const checkLatLon = (item, i) => {
    if (item.latitude)
      return (
        <Marker key={i} position={[item.latitude, value[i].longitude]}>
          <Popup>
            <h3>{item.name}</h3>{" "}
            <p>{`${item.street} ${item.city} ${item.state}, ${item.postal_code}`}</p>
            <p>{formatPhone(item.phone)}</p>
            <a target="_blank" href={item.website_url}>
              {item.website_url}
            </a>
          </Popup>
        </Marker>
      );
    return;
  };

  return (
    <>
      {status === "idle" && (
        <MapContainer
          className="mobile"
          center={[40.73267145, -111.899319900472]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}

      {status === "fetched" && (
        <>
          {data === [] && null}
          {data.length > 1 && (
            <MapContainer
              className="mobile"
              center={[value[0].latitude, value[0].longitude]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {value.map((item, i) => checkLatLon(item, i))}
            </MapContainer>
          )}
        </>
      )}

      <div className="search-container">
        <input onChange={(e) => setSearch(e.target.value)} type="text" />
        <button onClick={apiSearch} className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
}
