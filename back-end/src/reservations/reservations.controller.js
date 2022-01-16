const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query
  const {mobile_number} = req.query
  let data
  if(date){
    data = await service.listByDate(date)
  }else if(mobile_number){
    data = await service.listByMobileNumber(mobile_number)
  }else{
    data = await service.list()
  }
res.json({data})
}

async function read(req, res) {
  res.json({data: await service.read(res.locals.reservation.reservation_id)})
}
async function create(req, res) {
const data = await service.create(res.locals.reservation)
res.json({data})
}
async function update(req, res){
  const {reservation_id} =res.locals.reservation
  const editedReservation = {
      ...req.body,
      reservation_id
  }
  const data = await service.update(editedReservation)
  res.json({data})
}
async function destroy(req, res) {
  await service.destroy(res.locals.reservation.reservation_id)
  res.sendStatus(201)
}
//Validation functions
const reservationExists = async (req,res,next)=>{
  const {reservation_id}=req.params
  const reservation = await service.read(reservation_id)
  if(reservation){
    res.locals.reservation = reservation
    next()
  }else{
    next({
      status:404,
      message:`Sorry no reservation found with id:${reservation_id}`
    })
  }
}
const validFields=[]
const hasValidFields
const hasOnlyValidFields
module.exports = {
  list,
  read:[asyncErrorBoundary(reservationExists),read],
  update,
  create,
  delete:[asyncErrorBoundary(reservationExists),destroy]
};
