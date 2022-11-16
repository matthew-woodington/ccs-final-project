import "../../styles/Home.css";
import { useEffect, useState } from "react";
import { handleError } from "../../re-usable-func";
import Search from "../Search/Search";
import TrainerProfileCard from "./TrainerProfileCard";
import Fuse from "fuse.js";
import { geocodeByLatLng } from "react-google-places-autocomplete";
import Spinner from "react-bootstrap/Spinner";

function Home({ userState }) {
  const [trainerProfiles, setTrainerProfiles] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(null);
  const [queryPhrase, setQueryPhrase] = useState("");
  const [distance, setDistance] = useState(50);
  const [currentLocation, setCurrentLocation] = useState(
    JSON.parse(localStorage.getItem("currentLocation"))
  );

  const defaultLocationPhrase = "Select location...";
  const noEnteredLocation = [defaultLocationPhrase, null, undefined, ""].includes(currentLocation);

  const clearFilters = () => {
    if (window.localStorage.currentLocation) {
      // setCurrentLocation(window.localStorage.currentLocation);
      setCurrentLocation(JSON.parse(localStorage.getItem("currentLocation")));
    } else {
      setCurrentLocation(defaultLocationPhrase);
    }
    setDistance(50);
    setQueryPhrase("");
  };

  useEffect(() => {
    console.count("effect");
    const getPosition = async () => {
      window.navigator.geolocation.getCurrentPosition(
        (position) =>
          geocodeByLatLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }).then((results) => {
            const address = results.find((result) =>
              result.types.includes("postal_code")
            ).formatted_address;
            setCurrentLocation(address);
            window.localStorage.setItem("currentLocation", JSON.stringify(address));
          })
        // .catch((error) => {
        //   console.error(error);
        //   setCurrentLocation(defaultLocationPhrase);
        // })
      );
      if (!currentLocation) {
        setCurrentLocation(defaultLocationPhrase);
      }
    };
    getPosition();
  }, []);

  useEffect(() => {
    const getTrainerProfiles = async () => {
      const response = await fetch(
        `/api/v1/profiles/filter/?origin=${currentLocation}&distance=${distance}`
      ).catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setTrainerProfiles(data);
      setFilteredProfiles(data);
    };

    getTrainerProfiles();
  }, [currentLocation, distance, noEnteredLocation]);

  useEffect(() => {
    if (!trainerProfiles) {
      return;
    } else if (queryPhrase.length === 0) {
      setFilteredProfiles(trainerProfiles);
      return;
    }

    const searchAndFilter = () => {
      const options = {
        ignoreLocation: true,
        threshold: 0.3,
        keys: ["first_name", "last_name", "specialties"],
      };
      const fuse = new Fuse(trainerProfiles, options);
      const search = fuse.search(queryPhrase);
      const filteredTrainers = search.map((profile) => profile.item);
      return filteredTrainers;
    };
    setFilteredProfiles(searchAndFilter());
  }, [queryPhrase, trainerProfiles]);

  return (
    <section className="display-area">
      <aside className="search-sidebar">
        <Search
          setDistance={setDistance}
          distance={distance}
          queryPhrase={queryPhrase}
          setQueryPhrase={setQueryPhrase}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
          clearFilters={clearFilters}
        />
      </aside>
      <article className="profiles-mainbar">
        {!currentLocation ? (
          <p className="no-data-label">
            REPS would like to use your current location to find trainers near you!
          </p>
        ) : currentLocation === defaultLocationPhrase ? (
          <p className="no-data-label">
            Enable location services or select a location from the search menu to find a trainer!
          </p>
        ) : filteredProfiles === null ? (
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : filteredProfiles.length === 0 ? (
          <p className="no-data-label">Oops! No profiles match that search, try again.</p>
        ) : (
          <div className="list profile-card-list">
            {filteredProfiles.map((profile) => (
              <TrainerProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </article>
    </section>
  );
}

export default Home;
