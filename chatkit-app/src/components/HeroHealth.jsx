import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function HeroHealth(props) {
  let heroHealth = 50;
  return (
    <div className="page-topper">

      <div className="book-container">

        <h1 className="container-title">HeroHealth</h1>

        <div id="HeroHealth">
          {
            heroHealth.filter(health => vehicle.category > 30).map(vehicle =>

              <div>
                <div />
              </div>
            )}

  {/* {
              if (heroHealth > 30){color: green}
              else (heroHealth < 15){color: yellow}
              else color: red
              } */}
        </div>

      </div>
    </div>
  )
}

export default withRouter(HeroHealth)