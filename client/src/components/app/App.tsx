import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {publicRoutes, userRoutes} from "../../accessRoutes"


const App: FC = () => {
  const auth = true;

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({path, Component}) => {
			return <Route path={path} element={<Component/>}/>
        })}
		{auth && userRoutes.map(({path, Component}) => {
			return <Route path={path} element={<Component/>}/>
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
