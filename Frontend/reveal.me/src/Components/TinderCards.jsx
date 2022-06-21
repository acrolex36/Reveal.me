import React from "react";
import { useState } from "react";
import TinderCard from "react-tinder-card";
import Profile from "./Profile";

const TinderCards = () => {
  const [people, setPeople] = useState([
    {
      name: "Elon",
      url: "https://api.lorem.space/image/album?w=400&h=400",
    },
    {
      name: "Elon",
      url: "https://api.lorem.space/image/album?w=400&h=400",
    },
  ]);

  const swiped = (direction, nameToDelete) => {
    console.log("removing " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen");
  };

  return (
    <div>
      <div class=" p-20">
        {people.map((person) => (
          <TinderCard
            key={person.name}
            preventSwipe={["up", "down"]}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          
          >
            <div class="absolute">
              <Profile></Profile>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default TinderCards;
