import React from 'react';
import { Link } from "react-router-dom";

const LogoBlock = () => {
  return (<React.Fragment>
        <Link to="/">
            <img className="img-responsive" alt="logo" src="/images/logo.png" />
        </Link>
        <div className="draftpickme col-md-5 animated fadeIn">
            Every year during the National Basketball Association draft each baskeball team picks players. This process is called draft pick. When selecting a player a team receives exclusive rights to sign that player to a contract. The person who is selected first among all the draftees is called `first overall draft pick`. And that is a great honor to be the draft pick #1.
        </div>
        </React.Fragment>);
}
                    
export default LogoBlock;
