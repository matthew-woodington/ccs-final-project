import "../../styles/Home.css";
import { useEffect, useState } from "react";
import { handleError } from "../../re-usable-func";
import Search from "../Search/Search";
import TrainerProfileCard from "./TrainerProfileCard";
import Fuse from "fuse.js";
import { geocodeByLatLng } from "react-google-places-autocomplete";

function Home({ userState }) {
  const [trainerProfiles, setTrainerProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [queryPhrase, setQueryPhrase] = useState("");
  const [distance, setDistance] = useState(50);
  const [currentLocation, setCurrentLocation] = useState(window.localStorage.currentLocation || "");

  // const noEnteredLocation = [null, undefined, ""].includes(currentLocation);

  useEffect(() => {
    window.localStorage.setItem("currentLocation", JSON.stringify(currentLocation));
  }, [currentLocation]);

  useEffect(() => {
    const getPosition = async () => {
      window.navigator.geolocation.getCurrentPosition((position) =>
        geocodeByLatLng({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }).then((results) => {
          const address = results.find((result) =>
            result.types.includes("postal_code")
          ).formatted_address;
          setCurrentLocation(address);
        })
      );
    };
    getPosition();
  }, []);

  // useEffect(() => {
  //   const getTrainerProfiles = async () => {
  //     const response = await fetch("/api/v1/profiles/trainers/").catch(handleError);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok!");
  //     }

  //     const data = await response.json();
  //     setTrainerProfiles(data);
  //     setFilteredProfiles(data);
  //   };

  //   getTrainerProfiles();
  // }, []);

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
  }, [currentLocation, distance]);

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
          setCurrentLocation={setCurrentLocation}
        />
      </aside>
      <article className="profiles-mainbar">
        {/* <ul className="list">{trainerProfileList}</ul> */}
        {filteredProfiles.length === 0 ? (
          <p>Oops! No profiles match that search, try again.</p>
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
