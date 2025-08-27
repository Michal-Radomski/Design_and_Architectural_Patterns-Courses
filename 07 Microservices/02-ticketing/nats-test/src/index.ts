import { Codec, connect, NatsConnection, StringCodec, Subscription } from "nats";

(async function (): Promise<void> {
  // to create a connection to a nats-server:
  const nc: NatsConnection = await connect({ servers: "localhost:4222" });
  // console.log("nc:", nc);

  // create a codec
  const sc: Codec<string> = StringCodec();
  // create a simple subscriber and iterate over messages
  // matching the subscription
  const sub: Subscription = nc.subscribe("hello");
  // console.log("sub:", sub);

  (async () => {
    for await (const m of sub) {
      console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
    console.log("subscription closed");
  })();

  nc.publish("hello", sc.encode("world"));
  nc.publish("hello", sc.encode("again"));

  // we want to ensure that messages that are in flight
  // get processed, so we are going to drain the
  // connection. Drain is the same as close, but makes
  // sure that all messages in flight get seen
  // by the iterator. After calling drain on the connection
  // the connection closes.
  await nc.drain();
})();
