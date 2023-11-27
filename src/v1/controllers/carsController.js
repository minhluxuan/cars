const carsService = require("../services/carsService");

const getAllCars = (req, res) => {
    const allCars = carsService.getAllCars();
    res.send(allCars);
}

const getOneCar = (req, res) => {
    const {
        params: { carId },
    } = req;
    const car = carsService.getOneCar(carId);
    res.send(car);
}

const createNewCar = (req, res) => {
    const { body } = req;

    if (!body.id || !body.name || !body.price) {
        res.send("Please completely fill in the form!");
    }

    const newCar = {
        id: body.id,
        name: body.name,
        price: body.price,
        createAt: new Date().toLocaleString("en-US", "UTC")
    };

    const createdCar = carsService.createNewCar(newCar);
    res.status(201).send({ status: "New car has been created", data: createdCar });
}

const updateOneCar = (req, res) => {
    const {
        body,
        params: { carId },
    } = req;

    if (!carId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter 'id' can not be empty!" },
            });
    }
    
    try {
        const updatedCar = carsService.updateOneCar(carId, body);
        res.send({ status: "OK", data: updatedCar });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                data: { error: error?.message || error }
            });
    }
    
}

const deleteOneCar = (req, res) => {
    const {
        params: { carId },
    } = req;

    if (!carId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                message: "Parameter 'id' can not be empty!",
            });
    }

    try {
        carsService.deleteOneCar(carId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                data: { error: error?.message || error},
            });
    }
}

module.exports = {
    getAllCars,
    getOneCar,
    createNewCar,
    updateOneCar,
    deleteOneCar,
}