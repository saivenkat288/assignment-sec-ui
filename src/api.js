import axios from "axios";

const configs = require("./util/configurations.json");
export async function signIn(email_id, password) {
  var data = JSON.stringify({
    email: email_id,
    password: password,
  });

  var config = {
    method: "post",
    url: configs.base_url + `/user/signin`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let res = await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      return response?.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return res;
}
