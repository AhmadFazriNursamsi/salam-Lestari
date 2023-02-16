import db from "../config/db.js"
import database from "../config/database.js"

export const getSubdistrictId = async (subdistricts) => {

    const result = await db.query(`SELECT * FROM tb_ro_subdistricts WHERE subdistrict_name LIKE '%${subdistricts}%'`);

    if (result[0].length == 0) {
        return 0
    } else {
        return result[0][0].subdistrict_id;
    }
};


export const getJNEDestination = async (subdistricts) => {

    const result = await database.query(`SELECT * FROM jne_destinations WHERE DISTRICT_NAME LIKE '%${subdistricts}%'`);

   
        return result[0]
   
};

export const getJNEbranch = async (branch_name) => {

    const result = await database.query(`SELECT * FROM branch_jne WHERE branch_name LIKE '%${branch_name}%'`);

   
        return result[0]
 
};

export const getJNEorigin = async (origin_name) => {

    const result = await database.query(`SELECT * FROM origin_jne WHERE origin_name LIKE '%${origin_name}%'`);

  
        return result[0]
    
};


