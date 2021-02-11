import { createObjRes } from "../../helpers";
import db from "../models";
import LocalesEnums from "../../../locales/enums";
const { user, address } = db;

export function getUsers(connection, req, res) {
  user
    .findAll({
      include: [
        {
          model: address,
          as: "address",
          required: false
        }
      ]
    })
    .then(function(rows) {
      res.status(200).send(createObjRes(rows));
    })
    .catch(function(err) {
      res.status(500).send(err.message || null);
    });
}

export function getUsersById(connection, req, res) {
  const { userId } = req.params;

  user
    .findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: address,
          as: "address",
          required: false
        }
      ]
    })
    .then(function(row) {
      if (!row) {
        res
          .status(404)
          .send({ description: req.__(LocalesEnums.TR_USER_NOT_FOUND) });
      } else {
        res.status(200).send(createObjRes(row));
      }
    })
    .catch(function(err) {
      res.status(500).send(err.message || null);
    });
}

export function createUsers(connection, req, res) {
  user
    .create(req.body, {
      include: [
        {
          model: address,
          as: "address"
        }
      ]
    })
    .then(function(userCreated) {
      res.status(201).send({ description: "CREATED", schema: userCreated });
    })
    .catch(function(err) {
      throw new Error(err.message || null);
    });
}

export function updateUsersById(connection, req, res) {
  const { userId } = req.params;
  user
    .findOne({
      where: { id: userId },
      include: [
        {
          model: address,
          as: "address"
        }
      ]
    })
    .then(function(member) {
      if (!member) {
        res
          .status(404)
          .send({ description: req.__(LocalesEnums.TR_USER_NOT_FOUND) });
        return;
      }
      member.address.update(req.body.address);
      member.update(req.body).then(function(memberDeleted) {
        res.status(200).send(createObjRes());
      });
    })
    .catch(function(err) {
      throw new Error(err.message || null);
    });
}

export function deleteUsersById(connection, req, res) {
  const { userId } = req.params;
  user
    .findOne({
      where: { id: userId },
      include: [
        {
          model: address,
          as: "address"
        }
      ]
    })
    .then(function(member) {
      if (!member) {
        res
          .status(404)
          .send({ description: req.__(LocalesEnums.TR_USER_NOT_FOUND) });
        return;
      }
      member.address.destroy();
      member.destroy().then(function(memberDeleted) {
        res.status(200).send(createObjRes());
      });
    })
    .catch(function(err) {
      throw new Error(err.message || null);
    });
}
