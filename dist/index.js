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
const genesisBlock = new block(0, "203001040", "", "Hello", 12345);
let blockChain = [genesisBlock];
// [block]으로 지정해 줬으므로 blockchain 배열안에는 항상 block 클래스만 들어가게끔 체크해줌
console.log(blockChain);
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
//# sourceMappingURL=index.js.map