import sequelize from "../db.js";
import { DataTypes, ModelDefined } from "sequelize";
import { 
    UserAttr, UserCreationAttr, 
    WalletAttr, WalletCreationAttr,
    RevenueAndExpenseAttr, RevenueAndExpenseCreationAttr,
    ListWalletsAttr, ListWalletsCreationAttr
} from "../types/typesModels";


// опр таблиц
const User: ModelDefined<UserAttr, UserCreationAttr> = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, primaryKey: true},
    password: {type: DataTypes.STRING},
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

// связи таблиц
User.hasOne(ListWallets);
ListWallets.belongsTo(User);

ListWallets.hasMany(ListWalletsWallet);
ListWalletsWallet.belongsTo(ListWallets);

ListWalletsWallet.hasOne(Wallet);
Wallet.belongsTo(ListWalletsWallet);

Wallet.hasMany(Revenue);
Revenue.belongsTo(Wallet);

Wallet.hasMany(Expense);
Expense.belongsTo(Wallet);


export {
    User, ListWallets, 
    ListWalletsWallet, 
}