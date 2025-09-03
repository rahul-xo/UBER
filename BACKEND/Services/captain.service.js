import captainModel from "../Models/captain.model.js"

export const createCaptain=({firstname,lastname,email,password,color,plate,vehicleType,capacity})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !vehicleType || !capacity){
        throw new Error("All fields are required")       
    }

    const captain=captainModel.create({
        email,
        fullname:{
            firstname,
            lastname,
        },
        password,
        vehicle:{
            color,
            capacity,
            plate,
            vehicleType
        }
    })

    return captain
}