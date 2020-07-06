const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newStream = () => {
  const statusChance = Math.random();
  return {
    paymentMethod: statusChance > 0.45 ? "Fiat" : "Crypto",
    address: "0x68478F088E6967722527afd4f2F9071B0EeFB6B0",
    streamInterval:
      statusChance > 0.66
        ? "Hourly"
        : statusChance > 0.33
        ? "Daily"
        : "Every Minute",
    streamLength:
      statusChance > 0.8 ? "1 day" : statusChance > 0.5 ? "14 days" : "30 days",
    amount: Math.floor(Math.random() * 100),
    amountStreamed: Math.floor(Math.random() * 70),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newStream(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
