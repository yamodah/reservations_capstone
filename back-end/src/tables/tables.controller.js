const service = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
async function list(req, res, next) {
  res.json({ data: await service.list() });
}
async function create(req, res, next) {
  res.status(201).json({ data: await service.list(req.body.data) });
}
//pairs table with reservation and changes reservation status to seated
async function seatReservation(req, res, next) {
  const { reservation_id } = res.locals.reservation;
  const { tableId } = req.params;
  res.json({ data: await service.updateToSeated(tableId, reservation_id) });
}
//removes reservation assignment from table and changes reservation status to finished
async function clear(req, res, next) {
  const { reservation_id } = req.body.data;
  const { tableId } = req.params;
  res.json({ data: await service.updateToSeated(tableId, reservation_id) });
}

//======VALIDATION FUNCTIONS========//

const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  const reservation = await reservationsService.read(reservationId);
  if (reservation) {
    //stores found reservation in locals object to remove the need for unnecessary queries in the future
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Sorry no reservation found with id:${reservationId}`,
    });
  }
};
const tableExists = async (req, res, next) => {
  const { tableId } = req.params;
  const table = await service.read(tableId);
  if (table) {
    //stores found reservation in locals object to remove the need for unnecessary queries in the future
    res.locals.table = table;
    next();
  } else {
    next({
      status: 404,
      message: `Sorry no table found with id:${tableId}`,
    });
  }
};
//checking is data is even present or if the request is empty
const hasPayload = (req, res, next) => {
  const data = req.body.data;
  if (!data) {
    next({
      status: 400,
      message: "Data is required for a valid request",
    });
  } else {
    next();
  }
};
const tableNameValidation = (req, res, next) => {
  const { table_name } = req.body.data;
  if (!table_name || table_name.length <= 1) {
    return next({
      status: 400,
      message: "'table_name' must be at least two characters",
    });
  }
};
const capacityValidation = (req, res, next) => {
  const { capacity } = req.body.data;
  if (!capacity || capacity <= 0) {
    return next({
      status: 400,
      message: "'capacity' must be greater than 0",
    });
  }
};
const VALID_PROPERTIES = [
    "table_name", "capacity", "reservation_id"
];
const hasOnlyValidProperties = (req, res, next) => {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
};
const requiredFieldsCheck = hasProperties(...VALID_PROPERTIES);

const statusValidation = (req,res,next)=>{
    const {status}=res.locals.reservation
    if(status!=="booked"){
        return next({
            status:400,
            message:`reservations with a status of:${status} cannot be seated`
        })
    }
    next()
}
const capacityCheck = (req,res,next) =>{
    const {capacity}=res.locals.table
    const {people}=res.locals.reservation
    if(people>capacity){
        return next({
            status:400,
            message:`people must be less than table capacity`
        })
    }
    next()
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasPayload,
    requiredFieldsCheck,
    hasOnlyValidProperties,
    tableNameValidation,
    capacityValidation,
    asyncErrorBoundary(create),
  ],
  update: [
    hasPayload,
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(reservationExists),
    requiredFieldsCheck,
    hasOnlyValidProperties,
    statusValidation,
    capacityCheck,
    asyncErrorBoundary(seatReservation)
  ],
  delete: [],
};
