import * as CryptoJS from "crypto-js";

class block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  //static으로 만든 메서드는 따로 객체를 만들지 않아도 class 단에서 바로 사용 가능
  static calculateBlockHash = (
    index:number, 
    previousHash:string, 
    timestamp: number, 
    data: string
    ):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString;

  static validateStructure = (aBlock: block) : boolean => 
  typeof aBlock.index === "number" &&  
  typeof aBlock.hash === "string" && 
  typeof aBlock.previousHash === "string" &&
  typeof aBlock.timestamp === "number" &&
  typeof aBlock.data === "string";

  constructor(index: number, hash: string,
previousHash: string,
data: string,
timestamp: number) {
  this.index = index;
  this.hash = hash;
  this.previousHash = previousHash;
  this.data = data;
  this.timestamp = timestamp;
}}

const genesisBlock:block = new block(0, "203001040", "", "Hello", 12345);

let blockChain: [block] =[genesisBlock];  
// [block]으로 지정해 줬으므로 blockchain 배열안에는 항상 block 클래스만 들어가게끔 체크해줌

console.log(blockChain);

const getBlockChain =  (): block[] => blockChain

const getLatestBlock = () : block => blockChain[blockChain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime()/1000)

const createNewBlock = (data:string) : block => {
  const previousBlock : block = getLatestBlock();
  const newIndex : number = previousBlock.index + 1;
  const newTimeStamp : number = getNewTimeStamp();
  const newHash : string = block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
  const newBlock: block = new block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
}

const getHashForBlock = (aBlock : block) : string => block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (candidateBlock : block, previousBlock: block) : boolean => {
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
}

const addBlock = (candidateBlock : block) : void => {
  if(isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
}

createNewBlock("second data")
createNewBlock("third data")

console.log(blockChain);

export {};