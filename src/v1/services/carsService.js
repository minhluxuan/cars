const Cars = require("../database/Cars");

const getAllCars = () => {
    const allCars = Cars.getAllCars();
    return allCars;
}

const getOneCar = (carId) => {
    const car = Cars.getOneCar(carId);
    return car;
}

const createNewCar = (newCar) => {
    const createdCar = Cars.createNewCar(newCar);
    return createdCar;
}

const updateOneCar = (carId, changes) => {
    try {
        const updatedCar = Cars.updateOneCar(carId, changes);
        return updatedCar;
    } catch (error) {
        throw error;   
    }
}

const deleteOneCar = (carId) => {
    try {
        Cars.deleteOneCar(carId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCars,
    getOneCar,
    createNewCar,
    updateOneCar,
    deleteOneCar,
}