import express from "express";
import { getShard } from "./shard";

const app = express();

app.use(express.json());

app.put("/kv/:key", async (req, res) => {
  const key = req.params.key;

  const shard = getShard(key);

  const ttl = req.body.ttl_sec;

  const expiredAt = new Date(Date.now() + ttl * 1000);

  await shard.query(
    `
    INSERT INTO store(key, value, expired_at)
    VALUES($1, $2, $3)
    ON CONFLICT(key)
    DO UPDATE SET
      value = EXCLUDED.value,
      expired_at = EXCLUDED.expired_at
    `,
    [key, req.body.value, expiredAt]
  );

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("KV server running on port 3000");
});