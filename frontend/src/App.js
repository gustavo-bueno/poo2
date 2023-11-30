import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  VideoCameraOutlined,
  UserOutlined,
  CreditCardOutlined,
  DesktopOutlined,
} from "@ant-design/icons";

import { Users } from "./pages/Users";
import { Series } from "./pages/Series";
import { Movies } from "./pages/Movies";
import { Plans } from "./pages/Plans";
import { Genres } from "./pages/Genres";

import "./App.css";
import { MoviesBackup } from "./pages/MoviesBackup";
import { SeriesBackup } from "./pages/SeriesBackup";
import { SeriesWithGenre } from "./pages/SeriesWithGenre";
import { MoviesWithGenre } from "./pages/MoviesWithGenre";

const items = [
  {
    label: "Usuários",
    key: "",
    icon: <UserOutlined />,
  },
  {
    label: "Séries",
    key: "series",
    icon: <DesktopOutlined />,
  },
  {
    label: "Filmes",
    key: "movies",
    icon: <DesktopOutlined />,
  },
  {
    label: "Gêneros",
    key: "genres",
    icon: <VideoCameraOutlined />,
  },
  {
    label: "Planos",
    key: "plans",
    icon: <CreditCardOutlined />,
  },
  {
    label: "Filmes - Backup",
    key: "backup-movies",
    icon: <DesktopOutlined />,
  },
  {
    label: "Séries - Backup",
    key: "backup-series",
    icon: <DesktopOutlined />,
  },
  {
    label: "Séries e Gêneros",
    key: "series-genre",
    icon: <DesktopOutlined />,
  },
  {
    label: "Filmes e Gêneros",
    key: "movies-genre",
    icon: <DesktopOutlined />,
  },
];

function App() {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <main>
      <header>
        <h1>NetPrime</h1>
      </header>
      <section>
        <Menu
          onClick={onClick}
          selectedKeys={current}
          mode="horizontal"
          items={items}
        />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/series" element={<Series />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/backup-movies" element={<MoviesBackup />} />
          <Route path="/backup-series" element={<SeriesBackup />} />
          <Route path="/series-genre" element={<SeriesWithGenre />} />
          <Route path="/movies-genre" element={<MoviesWithGenre />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
