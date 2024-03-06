class TeaVD {
    constructor(name, symbol, totalSupply, decimals) {
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = totalSupply;
        this.decimals = decimals;
        this.holders = new Map(); // Map to store holders and their balances
    }

    // Method to mint new tokens
    mint(amount, recipient) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid amount to mint');
        }
        if (!this.holders.has(recipient)) {
            this.holders.set(recipient, 0);
        }
        this.totalSupply += amount;
        this.holders.set(recipient, this.holders.get(recipient) + amount);
    }

    // Method to transfer tokens between holders
    transfer(amount, recipient, sender) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Invalid amount to transfer');
        }
        if (!this.holders.has(sender) || this.holders.get(sender) < amount) {
            throw new Error('Insufficient balance');
        }
        if (!this.holders.has(recipient)) {
            this.holders.set(recipient, 0);
        }
        this.holders.set(sender, this.holders.get(sender) - amount);
        this.holders.set(recipient, this.holders.get(recipient) + amount);
    }

    // Method to get the balance of a holder
    balanceOf(holder) {
        if (!this.holders.has(holder)) {
            return 0;
        }
        return this.holders.get(holder);
    }
}

// Example usage:
const teaToken = new TeaVD("CryptoTea", "TEA", 1000000, 18);
teaToken.mint(1000, "Developer1");
teaToken.transfer(500, "Developer2", "Developer1");
console.log(teaToken.balanceOf("Developer2")); // Output: 500
