# Benchmarking Txns on an EVM chain

## 0. Clone repo and install dependencies
```
git clone https://github.com/integrations-Polygon/EVM-transaction-benchmarking.git
```

## 1. Set `.env`
```
RPC=
PREFUNDED_KEY=
```

## 2. Check Prefunded Account
```
node check_prefunded_balance.js
``` 

## 3. Test
```
yarn test
```
You may use `npm run test` if you use `npm` as your package manager
