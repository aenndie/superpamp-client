const DUMMY_BONDING_CURVE: boolean = false;

// Initial price
// const A: number = 0.0000000000000314;

// Exponential growth factor
//const K: number = 0.00000000111;
const K: number = 1.92e-9;

//const A_DIV_K: number = 0.0000000282;
const A_DIV_K: number = 1.47e4;

// Bonding target
// const BONDING_TARGET: number = 0.65;

const FEES: number = 0.01;
const DELTA: number = 0.00001; // buffer for rounding errors

// Bonding curve function
function bondingCurve2(amount: number): number {
  if (DUMMY_BONDING_CURVE) {
    return amount / 1000000;
  } else {
    const k_x = K * amount;
    let ret = A_DIV_K * Math.exp(k_x);
    return ret;
  }
}
/*
// Calculate buy price
function getPriceBuy(tokenSold: number, amount: number): number {
  return bondingCurve(tokenSold + amount) - bondingCurve(tokenSold);
}

// Calculate sell price
function getPriceSell(tokenSold: number, amount: number): number {
  return bondingCurve(tokenSold) - bondingCurve(tokenSold - amount);
}
*/

// Example Usage
// const tokenSold = 1000000; // Initial tokens sold
// console.log("Buy Price:", getPriceBuy(tokenSold, 1000));
// console.log("Sell Price:", getPriceSell(tokenSold, 1000));

export function get_price(
  buy: boolean,
  tokenSold: number,
  amount_token: number
): number {
  if (DUMMY_BONDING_CURVE) {
    return 0.0;
    //if (buy) return amount_token * 1.01e-6;
    //else return amount_token * 1.01e-6;
  } else {
    if (buy) {
      return (
        (bondingCurve2(tokenSold + amount_token) - bondingCurve2(tokenSold)) *
        (1 + FEES + DELTA)
      );
    } else
      return (
        (bondingCurve2(tokenSold) - bondingCurve2(tokenSold - amount_token)) *
        (1 + FEES + DELTA)
      );
  }
}
