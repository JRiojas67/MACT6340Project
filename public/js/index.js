"use strict";

(() => {
    let userAddress = null;
    let connect = document.querySelector("#connectWallet");

    // Check if wallet script is loaded and button exists
    if (!connect) {
        console.log("Connect Wallet button not found");
        return;
    }

    // Initialize wallet connection on page load
    if (window.ethereum) {
        checkWalletConnection();
    } else {
        userAddress = null;
        connect.innerHTML = "Connect Wallet";
        connect.disabled = false;
    }

    // Add click event listener
    connect.addEventListener("click", async () => {
        await connectWallet();
    });

    async function checkWalletConnection() {
        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                userAddress = accounts[0];
                updateButtonText();
            } else {
                connect.innerHTML = "Connect Wallet";
                connect.disabled = false;
            }
        } catch (error) {
            console.log("No wallet connected");
            connect.innerHTML = "Connect Wallet";
            connect.disabled = false;
        }
    }

    async function connectWallet() {
        if (!window.ethereum) {
            alert("Please install MetaMask or another Web3 wallet to connect!");
            return;
        }

        try {
            connect.disabled = true;
            connect.innerHTML = "Connecting...";
            
            const accounts = await window.ethereum.request({ 
                method: "eth_requestAccounts" 
            });
            
            userAddress = accounts[0];
            updateButtonText();
            
        } catch (error) {
            connect.disabled = false;
            connect.innerHTML = "Connect Wallet";
            
            if (error.code === 4001) {
                console.log("User rejected wallet connection");
            } else {
                console.error("Wallet connection error:", error);
                alert("Failed to connect wallet. Please try again.");
            }
        }
    }

    function updateButtonText() {
        if (userAddress) {
            const walletString = userAddress.substring(0, 5) + "..." + userAddress.substring(38, 42);
            connect.innerHTML = walletString;
            connect.disabled = false;
        }
    }

    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                userAddress = null;
                connect.innerHTML = "Connect Wallet";
            } else {
                userAddress = accounts[0];
                updateButtonText();
            }
        });
    }

})();
