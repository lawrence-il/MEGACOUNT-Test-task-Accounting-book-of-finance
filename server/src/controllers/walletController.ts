import {Request, Response} from 'express';

class WalletController {
    async createWallet(req: Request, res: Response) {

    }

    async updateWallet(req: Request, res: Response) {

    }

    async deleteWallet(req: Request, res: Response) {

    }

    async getAllWallets(req: Request, res: Response) {
        console.log(res)
        res.json("HELLO WALLET")
    }

    async getWallet(req: Request, res: Response) {

    }

}

export default new WalletController()