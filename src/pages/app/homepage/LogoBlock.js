import React from 'react';
import { Link } from "react-router-dom";

const LogoBlock = () => {
  return (<React.Fragment>
        <Link to="/">
            <img className="img-responsive" alt="logo" src="/images/logo.png" />
        </Link>
        <div className="animated rotateInDownLeft col-md-4">
            What does it mean to be a draft pick? A draft is a process used
            in some countries and sports to allocate certain players to
            teams. In a draft, teams take turns selecting from a pool of
            eligible players. When a team selects a player, the team
            receives exclusive rights to sign that player to a contract, and
            no other team in the league may sign the player.
        </div>
        </React.Fragment>);
}
                    
export default LogoBlock;
