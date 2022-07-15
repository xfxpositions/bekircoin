const {Chain,Block} = require("./chain") // import chain transactions and block classes

const chain = new Chain() // create the chain

chain.addNewBlock(new Block(Date.now(),1,["yusuf sent 5 bekircoin to musab"])) // add a test block to chain

console.log(chain.chain)