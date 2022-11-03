import "../../styles/Home.css";
import { useEffect, useState } from "react";
import { handleError } from "../../re-usable-func";
import Search from "../Search/Search";
import TrainerProfileCard from "./TrainerProfileCard";
import Fuse from "fuse.js";

function Home() {
  const [trainerProfiles, setTrainerProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [queryPhrase, setQueryPhrase] = useState("");
  const [distance, setDistance] = useState(50);

  useEffect(() => {
    const getTrainerProfiles = async () => {
      const response = await fetch("/api/v1/profiles/trainers/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setTrainerProfiles(data);
      setFilteredProfiles(data);
    };

    getTrainerProfiles();
  }, []);

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

  const trainerProfileList = filteredProfiles.map((profile) => (
    <TrainerProfileCard key={profile.id} profile={profile} />
  ));

  return (
    <section className="display-area">
      <aside>
        <Search
          setDistance={setDistance}
          distance={distance}
          queryPhrase={queryPhrase}
          setQueryPhrase={setQueryPhrase}
        />
      </aside>
      <div>
        <ul className="list">{trainerProfileList}</ul>
      </div>
    </section>
  );
}

export default Home;
