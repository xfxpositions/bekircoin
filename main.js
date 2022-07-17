const {Chain,Block, Transaction} = require("./chain") // import chain transactions and block classes

const chain = new Chain() // create the chain


chain.addTransaction(new Transaction("yusuf","musab",100))
chain.addNewBlock("mineraddr1");


console.log("%O",chain.pendingTransactions)
chain.getBalanceAddress("yusuf")
