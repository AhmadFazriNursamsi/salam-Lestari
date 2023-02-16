import { Sequelize } from "sequelize"

const db2 = new Sequelize('raja_ongkir', 'root', 'cx2021!', {
    host: "68.183.234.187",
    port: 3307,
    dialect: "mysql",
})

export default db2  
