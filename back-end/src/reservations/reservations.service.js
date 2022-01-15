const knex = require("../db/connection")

const list =()=>{
    return knex("reservations")
        .select("*")
        .orderBy("reservation_date")
}
const listByDate =(reservation_date)=>{
    return knex("reservations")
        .select("*")
        .where({reservation_date})
}
const listByMobileNumber =(mobile_number)=>{
    return knex("reservations")
        .select("*")
        .where({mobile_number})
}
const read =(reservation_id)=>{
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .first()
}
const create =(newReservation)=>{
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((reservation)=>reservation[0])
}
const update =({reservation_id})=>{
    return knex("reservations")
        .select("*")
        .where({reservation_id})
        .update(updatedworkout)
        .returning("*")
        .then((workout)=>workout[0])
}
const destroy =(reservation_id)=>{
    return knex("reservations")
        .where({reservation_id})
        .del()
}

module.exports={
    list,
    listByDate,
    listByPhoneNumber,
    read,
    update,
    destroy,
    create
}