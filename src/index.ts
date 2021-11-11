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
    ):string => CryptoJS.SHA256(index + previousHash +timestamp + data).toString;
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

export {}