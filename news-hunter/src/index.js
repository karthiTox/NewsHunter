import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./index.css";

// services
import AuthService from "./services/authService";

// repositories
import AuthRepository from "./repositories/AuthRepository";

// pages
import LoginPage from "./pages/auth/loginPage";
import WelcomePage from "./pages/auth/welcomePage";
import SignupPage from "./pages/auth/signupPage";
import CheckMailPage from "./pages/auth/checkMailPage";
import HomePage from "./pages/main/homePage";

// redux store
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index";
import NewsService from "./services/newsService";
import TestPage from "./pages/test";
import SearchPage from "./pages/main/searchPage";
import CollectionListPage from "./pages/main/collectionListPage";
import CollectionViewPage from "./pages/main/collectionView";
import SearchPageRedirectPage from "./pages/main/searchPageRedirectPage";
import ProfilePage from "./pages/main/profilePage";
import NewsDetailsPage from "./pages/main/newsDetailsPage";
const store = configureStore({
  reducer: reducers,
});

// repo init
const authService = AuthService.getInstance();
const newsService = NewsService.getInstance();
const authRepo = AuthRepository.getInstance(authService);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          {/* redirect routes */}
          <Route
            exact
            path="/app/"
            element={<Navigate to={"/app/main"} replace={true} />}
          />
          {/* or */}
          <Route
            exact
            path="/app/index.html"
            element={<Navigate to={"/app/main"} replace={true} />}
          />

          {/* app routes */}
          <Route
            exact
            path="/app/welcome"
            element={<WelcomePage authRepository={authRepo} />}
          />
          <Route
            exact
            path="/app/login"
            element={<LoginPage authRepository={authRepo} />}
          />
          <Route
            exact
            path="/app/signup"
            element={<SignupPage authService={authService} />}
          />
          <Route
            exact
            path="/app/checkMail"
            element={<CheckMailPage authRepository={authRepo} />}
          />

          <Route
            exact
            path="/app/main"
            element={
              <HomePage newsService={newsService} authService={authService} />
            }
          />

          <Route
            exact
            path="/app/newsDetails"
            element={
              <NewsDetailsPage newsService={newsService} authService={authService} />
            }
          />

          <Route
            exact
            path="/app/search/:searchText"
            element={
              <SearchPage newsService={newsService} authService={authService} />
            }
          />
          <Route
            exact
            path="/app/search-redirect/:searchText"
            element={<SearchPageRedirectPage />}
          />
          <Route
            exact
            path="/app/profile"
            element={
              <ProfilePage
                newsService={newsService}
                authService={authService}
              />
            }
          />
          <Route
            exact
            path="/app/collection"
            element={
              <CollectionListPage
                newsService={newsService}
                authService={authService}
              />
            }
          />
          <Route
            exact
            path="/app/collectionView"
            element={
              <CollectionViewPage
                newsService={newsService}
                authService={authService}
              />
            }
          />
          <Route exact path="/app/test" element={<TestPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
