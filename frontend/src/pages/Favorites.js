import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import Card from "../components/Card/Card";
import "../stylesheets/list.css";

export default function Favorites() {
  const [list, setList] = React.useState([]);
  const headers = localStorage.getItem("token");
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color,
        backgroundColor: color,
        height: " 0.2vw",
        width: "94vw",
      }}
    />
  );
  useEffect(() => {
    axios
      .get(
        "http://localhost:2000/api/user/getList",

        {
          headers: {
            auth: headers,
          },
        }
      )
      .then((res) => {
        if (res.data.data === []) {
          setList([]);
        } else {
          const fav = res.data.data;
          const lnew = [];
          for (let i = 0; i < fav.length; i++) {
            lnew.push({
              id: i,
              title: fav[i].title,
              description: fav[i].description,
              genre: fav[i].genre,
              image: fav[i].image,
              fav: true,
            });
          }
          setList(fav);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [list]);

  const handleFavClick = async (event, movie) => {
    event.preventDefault();
    {
      let l = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === movie.id) {
        } else {
          l.push(list[i]);
        }
      }
      setList(l);
      axios
        .post(
          "http://localhost:2000/api/user/removeMovie",
          { title: movie.title },
          {
            headers: {
              auth: headers,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="favourite">Favourite List</div>
      <ColoredLine color="black" />

      <div className="container">
        <div className="row m-2">
          {list.map((item) => (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <Card item={item} handleFavClick={handleFavClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
