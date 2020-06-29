import React, {useState, useEffect} from "react"
//bruker hooks useState og useEffect

const APIUrl = "https://www.reddit.com/r/jokes/top.json?t=day&limit=1"


const Reddit = () => {
    const [joke, setJoke] = useState({});

    //constant som utfører apikall:
    //gir tilbake et promise
    //response er svaret fra fetch, og i dette tilfellet konverterer denne til json
    //det som er viktig med å bruke .then-funksjon er å vente til forrige rekker å gjøre alt den skal
    // før neste kalles.
    const getJoke = () =>{
        fetch(APIUrl)
        .then((response) => response.json())
        //.then((json)=> console.log(json))
        .then((json)=> setJoke(json.data.children[0].data))
        .catch((err) =>console.error(err));
    };
    
    ////gjør call til reddit kontinuerlig
    //getJoke()


    //gir hooken anonym funksjon og getjoke
    //hvis det som endrer seg i [] endrer seg, så vil det kalles på nytt.
    //useeffect kjører uavh av rendermetoden.
    useEffect(() => {
        getJoke();
    }, []);

    console.log(joke);

    //javascript kode inne i html kode når du bruker klammeparanterser
    
     
    return joke ? ( //iternary ifstatement i js. hvis true, så returneres denne, else returnerer den tomme diven under
        <div className="reddit">Reddit
            <p>{joke.title}</p>
            <p>{joke.selftext}</p>
        </div>
    ) : (
        <></> // else returner denne tomme diven
    );
};

export default Reddit;
