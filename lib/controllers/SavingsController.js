import * as sequelize from "sequelize";
import {Savings, User} from "../services/db";

exports.getSavings = function(req, res, next) {
    Savings.findAll({where:{ userId: { [sequelize.Op.eq]: req.user.dataValues.id } }})
        .then(function (savings) {
            if(savings){
                res.send(200, {savings });
            } else {
                res.status(404).json('Savings not found');
            }
        })
        .catch(function (err) {
            res.send('Error retrieving savings: ', err.message);
        });
};

exports.postSavings = function(req, res, next) {
    Savings.create({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        userId: req.user.dataValues.id

    })
    .then(function(saving){
        res.send(200, {saving});
    })
    .catch(function (err) {
        res.send('Error create savings: ', err.message);
    });
};

