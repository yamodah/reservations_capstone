const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  hasProperties,
  hasOnlyValidProperties,
} = require("../errors/hasProperties");
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  const { mobile_number } = req.query;
  let data;
  //logic to handle optional query parameters for dashboard
  if (date) {
    data = await service.listByDate(date);
  } else if (mobile_number) {
    data = await service.listByMobileNumber(mobile_number);
  } else {
    data = await service.list();
  }
  res.json({ data });
}

async function read(req, res) {
  res.json({ data: await service.read(res.locals.reservation.reservation_id) });
}
async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}
async function update(req, res) {
  const { reservation_id } = res.locals.reservation;
  const editedReservation = {
    ...req.body,
    reservation_id,
  };
  const data = await service.update(editedReservation);
  res.json({ data });
}
async function destroy(req, res) {
  await service.destroy(res.locals.reservation.reservation_id);
  res.sendStatus(201);
}

//======VALIDATION FUNCTIONS========//

const reservationExists = async (req, res, next) => {
  const { reservationId } = req.params;
  const reservation = await service.read(reservationId);
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
//Named to work with hasOnlyValidProperties function
const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
const requiredFieldsCheck = hasProperties(...VALID_PROPERTIES);
const dateValidation = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const today = new Date();
  const reservationDate = new Date(reservation_date);
  //regex to match only digits in YYYY-MM-DD format
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;

  //in case a reservation needs to changed the same day
  if (res.locals.reservation) return next();
  
  if (!dateFormat.test(reservation_date)) {
    next({
      status: 400,
      message: "reservation_date must be submitted in 'YYYY-MM-DD' format.",
    });
  } else if (reservationDate < today) {
    next({
      status: 400,
      message: "reservation_date must be made at least a day in the future",
    });
  } else if (reservationDate.getUTCDay() === 2) {
    // '2' is the equivalent to Tuesday
    console.log(reservationDate.getDay())
    next({
      status: 400,
      message: "Sorry we are closed on Tuesdays please pick a different reservation_date",
    });
  } else {
    next();
  }
};
const timeValidation = (req, res, next) => {
  const { reservation_time } = req.body.data;
  //regex to match time formats (only digits, and hours then minutes, etc.)
  const timeFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  if(!timeFormat.test(reservation_time)){
    next({
      status:400,
      message:"'reservation_time' must be submitted in 'HH:MM:SS' or 'HH:MM' format"
    })
  }else if( reservation_time< "10:30" || reservation_time > "21:30"){
    next({
      status:400,
      message:"reservations must be made between 10:30AM  and 9:30PM"
    })
  }else{
    next()
  }
};
const peopleValidation = (req, res, next) => {
  const { people } = req.body.data;
  //SQL column for poeple is for integers 
  if(people<=0||typeof people !== "number"){
    next({
      status:400,
      message:"'people' must be a NUMBER greater than 0"
    })}else{
      next()
    }
}
;
module.exports = {
  list,
  read: [asyncErrorBoundary(reservationExists), read],
  update: [
    asyncErrorBoundary(reservationExists),
    requiredFieldsCheck,
    dateValidation,
    timeValidation,
    peopleValidation,
    asyncErrorBoundary(update)
  ],
  create: [
    hasPayload,
    requiredFieldsCheck,
    hasOnlyValidProperties,
    dateValidation,
    timeValidation,
    peopleValidation,
    asyncErrorBoundary(create)
  ],
  delete: [asyncErrorBoundary(reservationExists), destroy],
};
