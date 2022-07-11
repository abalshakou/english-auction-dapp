/* eslint-disable */

export const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (typeof window.ethereum !== "undefined") {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
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

