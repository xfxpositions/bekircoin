const cryptoJs = require("crypto-js");
const SHA256 = cryptoJs.SHA256;

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    (this.fromAddress = fromAddress),
      (this.toAddress = toAddress),
      (this.amount = amount);
  }
}

class Block {
  constructor(date, index, transactions) {
    this.date = date;
    this.index = index;
    this.transactions = transactions;
    this.prevHash = "";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.date + this.index + this.transactions + this.prevHash + this.nonce
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
  }

  createGenesisBlock() {
    return new Block(Date.now(), 0, ["genesis block"], "0");
  }

  addNewBlock(newBlock) {
    newBlock.prevHash = this.chain[this.chain.length - 1].hash;
    newBlock.hash = newBlock.mineHash(this.difficulty);
    this.chain.push(newBlock);
  }
}

module.exports = {Chain, Transaction, Block};
