import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

let mock = new AxiosMockAdapter(axios);

mock.onPost("/auth").reply(200, {
  status: 200,
  token: "21rf9cmi3fisancjlsdk"
});

mock.onGet("/me").reply(200, {
  name: "Shoumen",
  email: "0showman0@gmail.com",
  photo: "/no-photo.jpg"
});
