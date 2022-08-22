class WalletController {
    async createWallet(req, res) {
    }
    async updateWallet(req, res) {
    }
    async deleteWallet(req, res) {
    }
    async getAllWallets(req, res) {
        console.log(res);
        res.json("HELLO WALLET");
    }
    async getWallet(req, res) {
    }
}
export default new WalletController();
