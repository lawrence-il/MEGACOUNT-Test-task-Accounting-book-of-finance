import sequelize from "../db.js";
import { DataTypes } from "sequelize";
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, primaryKey: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" }
});
const ListWallets = sequelize.define('ListWallets', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const ListWalletsWallet = sequelize.define('ListWalletsWallet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Wallet = sequelize.define('Wallet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    currentBalance: { type: DataTypes.INTEGER, defaultValue: 0 }
});
const Revenue = sequelize.define('Revenue', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, defaultValue: 0 }
});
const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.INTEGER, defaultValue: 0 }
});
User.hasOne(ListWallets);
ListWallets.belongsTo(User);
ListWallets.hasMany(ListWalletsWallet);
ListWalletsWallet.belongsTo(ListWallets);
Wallet.hasOne(ListWalletsWallet);
ListWalletsWallet.belongsTo(Wallet);
Wallet.hasMany(Revenue, { as: 'revenue' });
Revenue.belongsTo(Wallet);
Wallet.hasMany(Expense, { as: 'expense' });
Expense.belongsTo(Wallet);
export { User, ListWallets, ListWalletsWallet, Wallet, Revenue, Expense };
