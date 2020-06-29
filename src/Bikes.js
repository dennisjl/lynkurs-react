//skal gjre kall til bysykkel og få tilbake liste med stasjoner og posisjonen og sykkeler tilgjengelig fra sdk.entur.org
import React, {useState, useEffect} from "react";
import createEnturService from '@entur/sdk';

const service = createEnturService({ clientName: 'dennisjl-miniapp' });

const Bikes = () => {
    const [bikeStations, setBikeStations] = useState([]); //gir en tomliste, siden vi vet vi får tilbake en liste


    useEffect(() => {
        //console.log("Heipådeg")
        //metoden tar inn koordinat og threshhold, og returnerer et promise
        service.getBikeRentalStationsByPosition(
            {latitude: 63.428311, longitude: 10.392514},
            230
        )
        .then((data) =>setBikeStations(data));
    }, []);         //setter som regel komme, tom liste som minimum s.a. slipper å laste hele tiden


    console.log(bikeStations)
    return (
        <div className="BikeStations"> Bikes
            <h3>Bysykkel</h3>
            {bikeStations.map(stationData => (
                <Station key={stationData.id} station={stationData}/>
            ))}
        </div>
    );
};

export default Bikes;


//denne blir ikke eksportert så den er bare tilgjengelig herfra.
const Station = (props) => {
    const{ station } = props;
    console.log(station)
    return <div className="station">{station.name} - {station.bikeAvailable} : {station.spacesAvailable} 
    </div>
}