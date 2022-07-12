/* eslint-disable */

import {ethers} from "ethers";
import EnglishAuction from "./artifacts/contracts/EnglishAuction.sol/EnglishAuction.json";
import {useState} from "react";

const englishAuctionAddress = "0x98076b6f013d8377386373C193D5f56E26bC7DC4";
const erc721Address = "0x0dda8257e55a008f273711da507e12f4d77164b3";

export const NavBar = ({ accounts, setAccounts, highestBid, setHighestBid, setBid }) => {

    const [account, setAccount] =useState("");
    const [contract, setContract] =useState(null);
    const isConnected = Boolean(accounts[0]);
   // const [highestBid, setHighestBid] = useState("");


    async function connectAccount() {
        if (typeof window.ethereum !== "undefined") {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);

            initConnection();
        }
    }

    const handlerHighestBid = async (contractEth) => {
        const transaction = await contractEth.highestBid({
            gasLimit: 100000,
        });

        const txToString = ethers.utils.formatUnits(transaction, "wei");
        setHighestBid(Number(txToString));
        setBid(Number(txToString));
        console.log('response: ', transaction);
    }

    const initConnection = async () => {
        if (typeof window.ethereum !== "undefined") {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider =  new ethers.providers.Web3Provider(window.ethereum);
            const newSigner =  provider.getSigner();
            const contractEth =  new ethers.Contract(
                englishAuctionAddress,
                EnglishAuction.abi,
                newSigner
            );
            setAccount(accounts[0]);
            setContract(
                contractEth
            );

            handlerHighestBid(contractEth);

            console.log('provider: ', provider);
            console.log('setAccount: ', accounts);
            console.log('setContract: ', contractEth);
            console.log('Contract: ', contract);


        } else {
            console.log("Please install Metamask!");
        }
    }

    return (
        <div>
            <div>Facebook</div>
            <div>Twitter</div>
            <div>Email</div>

            <div>About Auction</div>
            <div>Bid</div>
            <div>Team</div>

            { isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}

        </div>
    )

}

