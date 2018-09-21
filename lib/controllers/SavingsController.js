// import * as sequelize from "sequelize";
import {Savings, User, sequelize} from "../services/db";
var moment = require('moment');
import * as LevelUtility from "../utilities/LevelUtility";



exports.getSavings = function(req, res, next) {
    Savings.findAll({where:
            { userId: { [sequelize.Op.eq]: req.user.dataValues.id } }
        })
        .then(function (savings) {
            if(savings){
                res.send(200, {savings});
            } else {
                res.status(404).json('Savings not found');
            }
        })
        .catch(function (err) {
            res.send('Error retrieving savings: ', err.message);
        });
};

async function handleAddSaving(req, res) {
    let transaction;
    let saving;
    try {
        // get transaction
        transaction = await sequelize.transaction();
        let saving =  await Savings.create({
            name: req.body.name,
            description: req.body.description,
            amount: req.body.amount,
            userId: req.user.dataValues.id

        });
        const savings = await  Savings.findAll({
            where: {
                id: {[sequelize.Op.ne]: saving.dataValues.id},
                userId: {[sequelize.Op.eq]: saving.dataValues.userId},
                createdAt: {
                    [sequelize.Op.lt]: new Date(),
                    [sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                }
            },
            limit: 25,
            order: [['updatedAt', 'DESC']],
        });

        let amountToAdd = Math.round(req.body.amount);
        amountToAdd = amountToAdd > 20 ? 20 : amountToAdd;
        let addedXp = req.user.dataValues.exp + amountToAdd + (savings.length * 5);
        let level = LevelUtility.getLevelFromExp(addedXp);

        const updatedUser = await req.user.update({
            exp: addedXp,
            level: level
        });

        let newSaving = {
            id: saving.dataValues.id,
            name: saving.dataValues.name,
            amount: saving.dataValues.amount,
            userLevel: level,
            userExp: addedXp,
            createdAt: saving.dataValues.createdAt
        };

        return newSaving;
    } catch (err) {
        // Rollback transaction if any errors were encountered
        await transaction.rollback();
    }
}

exports.postSavings = function(req, res, next) {
    handleAddSaving(req, res).then(function(saving){
        res.send(200, saving);
    });
};


