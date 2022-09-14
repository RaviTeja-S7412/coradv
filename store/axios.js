import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const options_data = (data,method) => {
  var options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  }
  if(method !== "get"){
    options['body'] = JSON.stringify(data);
  }
  return options;
}

const axiosIntance = (url,data,method) => fetch(url, options_data(data,method))
  .then((response) => response.json())
  .then((res) => {
    if (res.status === 200 && res.message !== undefined) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
    return res;
  });

export default axiosIntance
