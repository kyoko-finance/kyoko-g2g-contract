## Kyoko-g2g


#### Introduction
Kyoko.finance is a cross-chain GameFi NFT lending market for guilds and players.
Kyoko.finance-G2G is mainly a lending agreement for DAO and ordinary users, ordinary users and DAO can deposit stable coins to get interest, DAO can make unsecured loans (or rent game assets) with the credit line.


Users can deposit money (stable coins such as USDT) into LendingPool to get interest, and the deposit will mint the corresponding amount of kToken; designated DAO (containing credit line, credit line is set by multi-signature wallet review and approval) can borrow USDT (a stable coins) or game assets through LendingPool, the interest of both is mainly through The liquidity of the funds in the LendingPool pool is controlled.
The interest rate on the lending side uses a compound interest scheme and the interest rate on the deposit side uses a linear scheme. The interest rate on the credit side is divided into two gradients, slope1 and slope2, and the interest rate is calculated using slope1 for funds within the optimal capital utilization rate, and the interest rate is calculated using the compound operation of slope1 and slope2 for funds above the optimal utilization rate.


There are multiple assets in LendingPool corresponding to Reserve, and only in the case of gen- erating loans, the user’s deposit will have interest, while the higher the utilization rate of funds, the higher the interest rate of loans, and the higher the interest rate of corresponding deposits. deposits and loans in LendingPool are normalized in the system, uniformly normalized to the T0 moment. Each user’s deposit, withdraw, borrow and repay operations will update the Reserve information and the deposit and loan interest rates.