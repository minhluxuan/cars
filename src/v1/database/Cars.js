const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllCars = () => {
    return DB.cars;
};

const getOneCar = (carId) => {
    const brand = carId.split("_")[0];
    const carsOfBrand = DB.cars.find((brandCars) => brandCars[brand]);

    if (!carsOfBrand) {
        return "Car not found!";
    }

    const car = carsOfBrand[brand].find((car) => car.id === carId);

    if (!car) {
        return "Car not found!";
    }

    return car;
};

const createNewCar = (newCar) => {
    const brand = newCar.id.split('_')[0];
    const carsOfBrand = DB.cars.find((brandCars) => brandCars[brand]);

    if (carsOfBrand) {
        carsOfBrand[brand].push(newCar);
        saveToDatabase(DB);
        return newCar;
    }

    const newBrand = {[brand]: []};
    newBrand[brand].push(newCar);
    DB.cars.push(newBrand);
    console.log(DB);
    saveToDatabase(DB);
    return newCar;
}

const updateOneCar = (carId, changes) => {
    try {
        const brand = carId.split("_")[0];
        const carsOfBrand = DB.cars.find((brandCar) => brandCar[brand]);

        if (!carsOfBrand) {
            throw {
                status: 400,
                message: `Can not find car with brand ${brand}`,
            }
        }

        const indexToUpdate = carsOfBrand[brand].findIndex((car) => car.id === carId);

        if (indexToUpdate === -1) {
            throw {
                status: 400,
                message: `Can not find car with brand ${brand}`,
            }
        }

        const updatedCar = {
            id: carId,
            ...changes,
            createAt: carsOfBrand[brand][indexToUpdate]["createAt"],
            updateAt: new Date().toLocaleString("en-US", "UTC"),
        };

        carsOfBrand[brand][indexToUpdate] = updatedCar;
        console.log(carsOfBrand[brand][indexToUpdate]);
        
        saveToDatabase(DB);
        return updatedCar;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}

const deleteOneCar = (carId) => {
    try {
        const brand = carId.split("_")[0];
        const carsOfBrand = DB.cars.find((brandCar) => brandCar[brand]);

        if (!carsOfBrand) {
            throw {
                status: 400,
                message: `Can not find car with brand ${brand}`,
            }
        }

        const indexToDelete = carsOfBrand[brand].findIndex((car) => car.id === carId);

        if (indexToDelete === -1) {
            throw {
                status: 400,
                message: `Can not find car with brand ${brand}`,
            }
        }

        carsOfBrand[brand].splice(indexToDelete, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}
module.exports = {
    getAllCars,
    getOneCar,
    createNewCar,
    updateOneCar,
    deleteOneCar,
};