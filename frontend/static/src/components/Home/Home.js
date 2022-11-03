import "../../styles/Home.css";
import { useCallback, useEffect, useState } from "react";
import { handleError } from "../../re-usable-func";
import Search from "../Search/Search";
import TrainerProfileCard from "./TrainerProfileCard";

function Home() {
  // const [savedProfiles, setSavedProfiles] = useState([]);
  const [trainerProfiles, setTrainerProfiles] = useState([]);
  const [queryPhrase, setQueryPhrase] = useState("");

  useEffect(() => {
    const getTrainerProfiles = async () => {
      const response = await fetch("/api/v1/profiles/trainers/").catch(handleError);
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      const data = await response.json();
      setTrainerProfiles(data);
      // setSavedProfiles(data);
    };

    getTrainerProfiles();
  }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("queryPhrase", JSON.stringify(queryPhrase));
  // }, [queryPhrase]);

  const keys = ["first_name", "last_name", "specialties"];

  const filtered = trainerProfiles.filter((profile) =>
    keys.some((key) => profile[key].toLowerCase().includes(queryPhrase.toLocaleLowerCase()))
  );

  const trainerProfileList = filtered.map((profile) => (
    <TrainerProfileCard key={profile.id} profile={profile} />
  ));

  return (
    <section className="display-area">
      <aside>
        <Search setQueryPhrase={setQueryPhrase} />
      </aside>
      <div>
        <ul className="list">{trainerProfileList}</ul>
      </div>
    </section>
  );
}

export default Home;
