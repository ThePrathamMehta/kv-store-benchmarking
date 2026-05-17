import { shards } from "./db";

function hash(key: string) {
  let h = 0;

  for (let i = 0; i < key.length; i++) {
    h = (h + key.charCodeAt(i)) % 2147483647;
  }

  return h;
}

export function getShard(key: string) {
  return shards[hash(key) % shards.length];
}