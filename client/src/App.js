import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client";
import './App.css'
import { setContext } from '@apollo/client/link/context'

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Project from './pages/Project';
import ProjectPage from './pages/ProjectPage'
import ProjectUpdate from './pages/ProjectUpdate'

const http = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
})

const client = new ApolloClient({
  link: authLink.concat(http),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/project" element={<Project />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/project/:id/update" element={<ProjectUpdate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;