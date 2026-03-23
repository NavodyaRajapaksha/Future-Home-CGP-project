// estimation logic

const MATERIAL_COST = {
    doors: {
        wood: 50000,
        steel: 70000
    },
    floor: {
        wood: 120,
        carpet: 80,
        tiles: 150
    },
    roof: {
        metal: 200,
        clay: 250
    }
};

function calculateEstimate(data) {
    const {
        landSize,
        rooms,
        floors,
        hasGarage,
        materials
    } = data;

    // base construction cost (per sqft)
    const baseRate = 200;

    let baseCost = landSize * baseRate;

    // room cost
    let roomCost = rooms * 50000;

    // floor multiplier
    let floorCost = floors * 100000;

    // garage cost
    let garageCost = hasGarage ? 150000 : 0;

    // material cost
    let materialCost = 0;

    materialCost += MATERIAL_COST.doors[materials.doors] || 0;
    materialCost += (MATERIAL_COST.floor[materials.floor] || 0) * landSize;
    materialCost += (MATERIAL_COST.roof[materials.roof] || 0) * landSize;

    const total =
        baseCost +
        roomCost +
        floorCost +
        garageCost +
        materialCost;

    return {
        baseCost,
        roomCost,
        floorCost,
        garageCost,
        materialCost,
        total
    };
}

module.exports = { calculateEstimate };