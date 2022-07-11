/* eslint-disable */
import { useState, useEffect } from 'react';
import { ethers, BigNumber } from 'ethers';
import EnglishAuction from  "./artifacts/contracts/EnglishAuction.sol/EnglishAuction.json";

const englishAuctionAddress = "0x2839045d17EB3beEc41a96607e9EbBE75a478eA5";
const erc721Address = "0x0dda8257e55a008f273711da507e12f4d77164b3";

export const MainBid = ({ accounts, setAccounts }) => {

    const [account, setAccount] =useState("");
    const [contract, setContract] =useState(null);
    const [bid, setBid] = useState(1);
    const [started, setStarted] = useState(false);
    const [highestBid, setHighestBid] = useState("");

    const isConnected = Boolean(accounts[0]);

    const handleStart = async () => {
        const transaction = await contract.start({
            gasLimit: 100000,
        });
        await transaction.wait();
        console.log('response: ', transaction);
    }

    const handleEnd = async () => {
        const transaction = await contract.end({
            gasLimit: 100000,
        });
        await transaction.wait();
        console.log('response: ', transaction);
    }

    const handleHighestBid = async () => {
        try {

            const transaction = await contract.highestBid( {
                gasLimit: 100000,
            } );

            const txToString = ethers.utils.formatUnits(transaction, "wei");
            setHighestBid(txToString);

        } catch (error) {
            console.log('error: ', error);
        }

    }

    const handleBid = async () => {
        const transaction = await contract.bid({
            value: bid,
            gasLimit: 100000,
        });
        await transaction.wait();
        console.log('response: ', transaction);
    }

    const handleStarted = async () => {
        const transaction = await contract.started();

        setStarted(transaction)
        console.log('response: ', transaction);
        console.log('setContract: ', contract);

    }

    const handleIncrement =  () => {
      if (bid < 1) return;
        setBid(bid + 1);
    }
    const initConnection = async () => {
        if (typeof window.ethereum !== "undefined") {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = await new ethers.providers.Web3Provider(window.ethereum);
            const newSigner = await provider.getSigner();
            const contractEth = await new ethers.Contract(
                englishAuctionAddress,
                EnglishAuction.abi,
                newSigner
            );
            setAccount(accounts[0]);
            setContract(
                contractEth
            );

            console.log('provider: ', provider);
            console.log('setAccount: ', accounts);
            console.log('setContract: ', contract);

            setTimeout(() => {console.log('setContract: ', contract)}, 3000);
            async function fetchData() {
                try {
                    const transaction = await contract.highestBid({
                        gasLimit: 100000,
                    });

                    const txToString = ethers.utils.formatUnits(transaction, "wei");
                    setHighestBid(txToString);

                } catch (error) {
                    console.log('error: ', error);
                }
            }

           await fetchData();

        } else {
            console.log("Please install Metamask!");
        }
    }

    useEffect( () => {
        initConnection();
       // handleHighestBid();
        // const id =  setInterval(  () => {
        //       initConnection();
        //
        //     console.log(contract);
        // }, 5000);
        //
        // return () => {
        //     clearInterval(id);
        // };

    }, []);



    return (
        <div>

            {isConnected &&
            <>
                <div>Highest bid now: {highestBid ? highestBid : 0 } wei</div>
                <button onClick={handleHighestBid}>high</button>
            <button onClick={handleStart}>start</button>
            <button onClick={handleEnd}>end</button>
            <button onClick={handleStarted}>{started.toString()}</button>

            <input
                type="number"
                className="inputClass ml-10 px-2 py-0.5 bg-stone-100 rounded cursor-pointer"
                onChange={(e) => setBid(e.target.value)}
                placeholder="set your bid (wei)"
                value={bid}
            />
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleBid}>bid</button>
            </>
            }
        </div>
    )

}

