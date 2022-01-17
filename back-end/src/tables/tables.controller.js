const service = require("./tables.service")

async function list(req,res,next){
    res.json({data:await service.list()})  
}
async function create(req,res,next){
    res.status(201).json({data:await service.list(req.body.data)})
}
//pairs table with reservation and changes reservation status to seated
async function seatReservation(req,res,next){
    const {reservation_id}=req.body.data
    const {tableId} = req.params
    res.json({data: await service.updateToSeated(tableId,reservation_id)})
}
//removes reservation assignment from table and changes reservation status to finished
async function clear(req,res,next){
    const {reservation_id}=req.body.data
    const {tableId} = req.params
    res.json({data: await service.updateToSeated(tableId,reservation_id)})
}

module.exports = {
    list,
    create,
    seatReservation,
    clear
}