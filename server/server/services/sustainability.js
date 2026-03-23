// sustainabilityModule.js

class SustainabilityModule {

    constructor() {

        // Material sustainability database
        this.materialDatabase = {
            concrete: { carbon: 95, ecoAlternative: "Recycled Concrete", energyScore: 40 },
            steel: { carbon: 85, ecoAlternative: "Recycled Steel", energyScore: 45 },
            brick: { carbon: 60, ecoAlternative: "Fly Ash Bricks", energyScore: 55 },
            wood: { carbon: 25, ecoAlternative: "Bamboo", energyScore: 80 },
            glass: { carbon: 50, ecoAlternative: "Low-E Glass", energyScore: 65 }
        };

    }

    // Calculate total carbon footprint
    calculateCarbon(materialList) {

        let totalCarbon = 0;

        materialList.forEach(material => {

            if (this.materialDatabase[material]) {
                totalCarbon += this.materialDatabase[material].carbon;
            }

        });

        return totalCarbon;

    }

    // Suggest eco friendly materials
    suggestEcoMaterials(materialList) {

        let suggestions = [];

        materialList.forEach(material => {

            if (this.materialDatabase[material]) {

                suggestions.push({
                    material: material,
                    alternative: this.materialDatabase[material].ecoAlternative
                });

            }

        });

        return suggestions;

    }

    // Calculate energy efficiency score
    calculateEnergyScore(materialList) {

        let totalScore = 0;
        let count = 0;

        materialList.forEach(material => {

            if (this.materialDatabase[material]) {

                totalScore += this.materialDatabase[material].energyScore;
                count++;

            }

        });

        return count > 0 ? (totalScore / count).toFixed(2) : 0;

    }

    // Overall sustainability score
    calculateSustainabilityScore(materialList) {

        const carbon = this.calculateCarbon(materialList);
        const energy = this.calculateEnergyScore(materialList);

        let score = (100 - carbon / 5) + Number(energy);

        return Math.max(0, Math.min(100, score)).toFixed(2);

    }

}

// Example usage
const sustainability = new SustainabilityModule();

const projectMaterials = ["concrete", "steel", "wood"];

console.log("Total Carbon:", sustainability.calculateCarbon(projectMaterials));

console.log("Energy Score:", sustainability.calculateEnergyScore(projectMaterials));

console.log("Eco Suggestions:", sustainability.suggestEcoMaterials(projectMaterials));

console.log("Sustainability Score:", sustainability.calculateSustainabilityScore(projectMaterials));