"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserbyId = exports.getUsers = void 0;
const database_1 = require("../database");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * FROM users");
        console.log(response.rows);
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("internal server error");
    }
});
exports.getUsers = getUsers;
//------------------------------------------------
const getUserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const response = yield database_1.pool.query("SELECT * FROM users WHERE id =$1", [parseInt(id)]);
    return res.json(response.rows);
});
exports.getUserbyId = getUserbyId;
//------------------------------------------------------
//------------------------------------------------------
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const response = yield database_1.pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email]);
        return res.status(200).json({ msg: "the user has been created" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "user creation error" });
    }
});
exports.createUser = createUser;
//---------------------------------------------------------------------
//-------------------------------------------------------------------
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const response = yield database_1.pool.query("UPDATE users SET name=$1, email=$2 WHERE id =$3", [name, email, id]);
        return res.status(200).json({ msg: `User ${id} update successfully` });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ msg: `user update error` });
    }
    const response = yield database_1.pool.query("UPDATE users SET name=$1, email=$2, WHERE id =$3", [name, email, id]);
    return res.send("hola");
});
exports.updateUser = updateUser;
//------------------------------------------------------------------------
//----------------------------------------------------------------------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield database_1.pool.query("DELETE FROM users WHERE id =$1", [id]);
        return res
            .status(200)
            .json({ msg: `the user ${id} was deleted successfully` });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "user deletion error" });
    }
});
exports.deleteUser = deleteUser;
//------------------------------------------------------------------------------
