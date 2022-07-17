const cryptoJs = require("crypto-js");
const SHA256 = cryptoJs.SHA256;

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress,
    this.toAddress = toAddress,
    this.amount = amount;
  }
}

class Block {
  constructor(date, transactions) {
    this.date = date;
    this.transactions = transactions;
    this.prevHash = "";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.date +  this.transactions.toString() + this.prevHash + this.nonce
    ).toString();
  }

  mineHash(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.hash = this.calculateHash();
      this.nonce++;
      console.log("trying hash ..." + this.hash);
    }
    return this.hash;
  }

  addTransaction(newTransaction) {}
}

class Chain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.pendingTransactions = []
    this.miningReward = 50;
  }

  createGenesisBlock() {
    return new Block(Date.parse("January 17 2022"),"genesis block");
  }

  addTransaction(newTransaction){
    this.pendingTransactions.push(newTransaction);
  }
  
  addNewBlock(minerAdress) {
    let block = new Block(Date.now(),this.pendingTransactions);
    block.prevHash = this.chain[this.chain.length - 1].hash;
    block.hash =  block.mineHash(this.difficulty);
    this.pendingTransactions = [new Transaction(null,minerAdress,this.miningReward)];
    this.chain.push(block);
  }

  getBalanceAddress(address){
    for(const block of this.chain){
      for(const transacion of block.transactions){
        let balance = 0;
        if(transacion.fromAddress === address){
          balance = balance - transacion.amount;
        }

        if(transacion.toAddress === address){
          balance = balance + transacion.amount;
        }
        return balance;
      }
    }
  }

  isChainValid() {

    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}




module.exports = {Chain, Transaction, Block};
