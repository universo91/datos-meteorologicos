import React,{ useEffect, useState } from 'react';
import "../styles/styles.css";
import './Weather.css';

const initialInfo = {   
        name:"",
        sys:{
            country:""
        },
        main:{
            temp:0,
            pressure:0
        },
        weather:[
            {
                main:"",
                description:"" 
            }     
        ],
        wind:{
            speed:0,
        },
        clouds:{
            all:0
        }
    }

function Weather() {

    const [data, setData] = useState(initialInfo);
    const [location, setLocation] = useState([]); 
    const [temp, setTemp] = useState(0);
    const [convert, setConvert] = useState(false);

    useEffect( () => {        
        navigator.geolocation.getCurrentPosition(  
            position => { 
                 const latitud = position.coords.latitude;
                 const longitud = position.coords.longitude;    
                setLocation([latitud, longitud]);
            }
        );
    }, []);  

    useEffect( () => {
        if( location[0] ) {
             getOverWatch()
             .then( info => setData(info));            
        }        
    }, [location]);
    
    const handleTemp = () => {
        const celcius = Math.round(data.main.temp - 273.15);
        setTemp(celcius);
    }

    useEffect( () => {
        handleTemp();
    },[data])
    
    const handleConverter = () => {
        setConvert(!convert);
    }

    const getOverWatch = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=ed8178fcbaf2d20a6e3f10c2de63c8cd`;
        let response = await fetch(url);        
        let res = await response.json(); 
        return res;                 
    };
    
    return (
        <div className="container">
            <div className="color card-header">
                <h1 >Weater App</h1>
                <h4 >{data.name}, {data.sys.country}</h4>
            </div>
            <div className="card-body">
                <div className="temperature">
                    <div className="icon-time">

                    </div>
                    <div>
                        <h2> {convert? (temp *  9 / 5) + 32 + "°F":temp + "°C"} </h2>
                    </div>
                </div>
                <div className="information">                    
                   <ul> 
                        <li className="color">"{data.weather[0].description}"</li>
                        <li><span className="color">Wind speed: </span>{data.wind.speed} m/s</li>
                        <li><span className="color">Clouds: </span>{data.clouds.all + "%"}</li>
                        <li><span className="color">Pressure: </span> {data.main.pressure + " hPa"}</li>
                   </ul>
                </div>
                
            </div> 
            <button className="btn" onClick={handleConverter}>DEGREES °F/°C</button>    
            
        </div>
    )
}

export default Weather
