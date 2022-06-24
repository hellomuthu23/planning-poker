import { Grid, Grow, Slide } from "@material-ui/core";
import React from "react";
import { Game } from "../../types/game";
import { Player } from "../../types/player";
import { PlayerCard } from "./PlayerCard/PlayerCard";
import "./Players.css";

interface PlayersProps {
  game: Game;
  players: Player[];
}

export const Players: React.FC<PlayersProps> = ({ game, players }) => {
  return (
    <Grow in={true} timeout={800}>
      <div className="PlayersContainer">
        <Grid container spacing={4} justify="center">
          {players.map((player: Player, index: number) => (
            <Grid key={player.id} item>
              <Slide in={true} direction={"right"} timeout={80 * index}>
                <div>
                  <PlayerCard game={game} player={player} />
                </div>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </div>
    </Grow>
  );
};
