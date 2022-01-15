const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query
  const {mobile_number} = req.query
  let data
  if(date){
    data = await service.listByDate()
  }else if(mobile_number){
    data = await service.listByMobileNumber()
  }else{
    data = await service.list()
  }
res.json({data})
}

async function read(req, res) {
const data = await service.read()
res.json({data})
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
const data = await service.destroy()
res.json({data})
}
//validatoin functions


module.exports = {
  list,
};
