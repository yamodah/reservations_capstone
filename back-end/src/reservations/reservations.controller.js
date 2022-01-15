const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
/**
 * List handler for reservation resources
 */
async function list(req, res) {
const data = await service.list()
res.json({data})
}
async function listByDate(req, res) {
const data = await service.listByDate()
res.json({data})
}
async function listByMobileNumber(req, res) {
const data = await service.listByMobileNumber()
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
