const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
  
  exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
  };

//Create a checkbody Middleware

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price){
    return res.status(400).json({
        status: 'fail',
        message: 'Please provide a name and a price'
    });
  };
  next();
};

  exports.getAllTours = (req, res) => {
      console.log(req.requestTime);
      res.status(200).json({
        requestedAt: req.requestTime,
        status: 'success',
        results: tours.length,
        data: {
          tours,
        },
      });
    };
    
 /* GET Tour by ID */
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);
    
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    };
    
    /* Create Tour */
    exports.createTour = (req, res) => {
      const newId = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({ id: newId }, req.body);
    
      tours.push(newTour);
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
          res.status(201).json({
            status: 'success',
            data: {
              tour: 'newTour',
            },
          });
        }
      );
    };
    
    /* Update Tour */
    
    exports.updateTour = (req, res) => {
        res.status(200).json({
        status: 'success',
        data: {
          tour: '<updated tour here>',
        },
      });
    };
    
    /* Delete Tour */
    
    exports.deleteTour = (req, res) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    };