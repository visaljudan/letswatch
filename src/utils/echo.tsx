import Echo from "laravel-echo";
import Pusher from "pusher-js";

(window as any).Pusher = Pusher;

const echo: Echo = new Echo({
  broadcaster: "pusher",
  key: "5c36390bb3c6da2790c4",
  cluster: "ap1",
  encrypted: true,
  forceTLS: true,
});

export default echo;
