import "../styles/globals.css";
import Router from "next/router";
import { useEffect, useState } from "react";
import Spinner from '../Components/Spinner'
import { wrapper, store } from "../store/store";
import { Provider } from "react-redux";
import swal from "sweetalert";


function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const use = async () => {
    (await import('tw-elements')).default;
      };
      use();
  }, []);
    
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
    /* setTimeout(() => {
      setLoading(false);
    },1000) */
  });
  useEffect(() => {
    var t = localStorage.getItem("token");
    setToken(t)
    if (!t) {
      Router.push("/login");
    }
  }, [token]);

  return !loading ? (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  ) : (
    <Spinner />
  ); 
    
}

export default wrapper.withRedux(MyApp);

