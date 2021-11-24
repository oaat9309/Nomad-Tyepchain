"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
//static으로 만든 메서드는 따로 객체를 만들지 않아도 class 단에서 바로 사용 가능
block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString;
block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new block(0, "203001040", "", "Hello", 12345);
let blockChain = [genesisBlock];
// [block]으로 지정해 줬으므로 blockchain 배열안에는 항상 block 클래스만 들어가게끔 체크해줌
console.log(blockChain);
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second data");
createNewBlock("third data");
console.log(blockChain);
//# sourceMappingURL=index.js.map