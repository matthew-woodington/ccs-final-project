import { useCallback, useEffect, useState } from "react";
import { handleError } from "../../re-usable-func";
import TrainerProfileCard from "./TrainerProfileCard";

function Home() {
  const [trainerProfiles, setTrainerProfiles] = useState([]);

  const getTrainerProfiles = useCallback(async () => {
    const response = await fetch("/api/v1/profiles/trainers/").catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      setTrainerProfiles(data);
    }
  }, []);

  useEffect(() => {
    getTrainerProfiles();
  }, [getTrainerProfiles]);

  const trainerProfileList = trainerProfiles.map((profile) => (
    <TrainerProfileCard key={profile.id} profile={profile} />
  ));

  return (
    <>
      <div>
        <ul>{trainerProfileList}</ul>
      </div>
    </>
  );
}

export default Home;
