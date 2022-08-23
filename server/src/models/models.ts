import sequelize from "../db.js";
import { DataTypes, ModelDefined } from "sequelize";
import { 
    UserAttr, UserCreationAttr, 
    WalletAttr, WalletCreationAttr,
    RevenueAndExpenseAttr, RevenueAndExpenseCreationAttr,
    ListWalletsAttr, ListWalletsCreationAttr
} from "../types/typesModels";


const User: ModelDefined<UserAttr, UserCreationAttr> = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, primaryKey: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "user"}
});


const ListWallets: ModelDefined<ListWalletsAttr, ListWalletsCreationAttr> = sequelize.define('ListWallets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const ListWalletsWallet: ModelDefined<ListWalletsAttr, ListWalletsCreationAttr> = sequelize.define('ListWalletsWallet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Wallet: ModelDefined<WalletAttr, WalletCreationAttr> = sequelize.define('Wallet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    currentBalance: {type: DataTypes.INTEGER, defaultValue: 0}
});


const Revenue: ModelDefined<RevenueAndExpenseAttr, RevenueAndExpenseCreationAttr> = sequelize.define('Revenue', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.INTEGER, defaultValue: 0}
});

const Expense: ModelDefined<RevenueAndExpenseAttr, RevenueAndExpenseCreationAttr> = sequelize.define('Expense', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.INTEGER, defaultValue: 0}
});


User.hasOne(ListWallets);
ListWallets.belongsTo(User);

ListWallets.hasMany(ListWalletsWallet);
ListWalletsWallet.belongsTo(ListWallets);

Wallet.hasOne(ListWalletsWallet);
ListWalletsWallet.belongsTo(Wallet);

Wallet.hasMany(Revenue, {as: 'revenue'});
Revenue.belongsTo(Wallet);

Wallet.hasMany(Expense, {as: 'expense'});
Expense.belongsTo(Wallet);


export {
    User, ListWallets,
    ListWalletsWallet, Wallet,
    Revenue, Expense
}