const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const has 
async function list(req,res,next){
    res.json({data:await service.list()})  
}
async function create(req,res,next){
    res.status(201).json({data:await service.list(req.body.data)})
}
//pairs table with reservation and changes reservation status to seated
async function seatReservation(req,res,next){
    const {reservation_id} = res.locals.reservation
    const {tableId} = req.params
    res.json({data: await service.updateToSeated(tableId,reservation_id)})
}
//removes reservation assignment from table and changes reservation status to finished
async function clear(req,res,next){
    const {reservation_id}=req.body.data
    const {tableId} = req.params
    res.json({data: await service.updateToSeated(tableId,reservation_id)})
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
  const tableNameValidation = (req,res,next)=>{
      
  }
  const capacityValidation = (req,res,next)=>{

  }
  const tableNameValidation = (req,res,next)=>{

  }
  const tableNameValidation = (req,res,next)=>{

  }
module.exports = {
    list,
    create:[],
    seatReservation:[],
    clear:[]
}