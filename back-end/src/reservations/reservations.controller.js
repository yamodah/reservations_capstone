const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const {hasProperties, hasOnlyValidProperties} = require("../errors/hasProperties")
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
//VALIDATION FUNCTIONS

const reservationExists = async (req,res,next)=>{
  const {reservation_id}=req.params
  const reservation = await service.read(reservation_id)
  if(reservation){
    //stores found reservation in locals object to remove the need for unnecessary queries in the future
    res.locals.reservation = reservation
    next()
  }else{
    next({
      status:404,
      message:`Sorry no reservation found with id:${reservation_id}`
    })
  }
}
//checking is data is even present or if the request is empty
const hasPayload = (req,res,next)=>{
  const data = req.body.data
  if(!data){
    next({
      status:400,
      message:"Data is required for a valid request"
    })
  }else{
    next()
  }
}
//Named to work with hasOnlyValidProperties function
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
];
const requiredFieldsCheck = hasProperties(...VALID_PROPERTIES)
const dateValidation = (req,res,next)=>{
  const { reservation_date } = req.bod.data
  const today = new Date()
  const reservationDate = new Date(reservation_date)
  const dateFormat = /\d\d\d\d-\d\d-\d\d/
  if(!reservation_date.match(dateFormat)){
    next({
      status:400,
      message:"Date must be submitted in 'YYYY-MM-DD' format."
    })
  }else if(reservationDate < today){
    next({
      status:400,
      message:"Reservations must be made at least a day in advance"
    })
  }else if(reservation_date.getDay()=== 2){
    // '2' is the equivalent to Tuesday
    next({
      status:400,
      message:"Sorry we are closed on Tuesdays"
    })
  }else{
    next()
  }
}
const timeValidation = (req,res,next)=>{
  const { people } = req.bod.data
  const timeFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/
}
const peopleValidation = (req,res,next)=>{
const { people } = req.bod.data
}
module.exports = {
  list,
  read:[asyncErrorBoundary(reservationExists),read],
  update:[asyncErrorBoundary(reservationExists),requiredFieldsCheck],
  create:[hasPayload,requiredFieldsCheck,hasOnlyValidProperties,],
  delete:[asyncErrorBoundary(reservationExists),destroy]
};
