import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s",
};

export default function () {
  const key = `user_${Math.floor(Math.random() * 100000)}`;

  const payload = JSON.stringify({
    value: {
      random: Math.random(),
    },

    ttl_sec: 5,
  });

  http.put(
    `http://localhost:3000/kv/${key}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  sleep(0.01);
}