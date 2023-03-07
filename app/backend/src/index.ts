import "dotenv/config";
import { amadeus } from "./services/amadeus";

console.log("Hello World!");

async function main() {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: "MAD",
    destinationLocationCode: "NYC",
    departureDate: new Date().toISOString().slice(0, 10),
    adults: 1,
  });
  console.log(response.data);
}

main();
