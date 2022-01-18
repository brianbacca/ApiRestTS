import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    console.log(response.rows);
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("internal server error");
  }
};

//------------------------------------------------
export const getUserbyId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const response: QueryResult = await pool.query(
    "SELECT * FROM users WHERE id =$1",
    [parseInt(id)]
  );
  return res.json(response.rows);
};
//------------------------------------------------------

//------------------------------------------------------
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email } = req.body;
  try {
    const response: QueryResult = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2)",
      [name, email]
    );
    return res.status(200).json({ msg: "the user has been created" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "user creation error" });
  }
};
//---------------------------------------------------------------------

//-------------------------------------------------------------------
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const response: QueryResult = await pool.query(
      "UPDATE users SET name=$1, email=$2 WHERE id =$3",
      [name, email, id]
    );
    return res.status(200).json({ msg: `User ${id} update successfully` });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: `user update error`});
  }
  const response: QueryResult = await pool.query(
    "UPDATE users SET name=$1, email=$2, WHERE id =$3",
    [name, email, id]
  );
  return res.send("hola");
};
//------------------------------------------------------------------------

//----------------------------------------------------------------------
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const response: QueryResult = await pool.query(
      "DELETE FROM users WHERE id =$1",
      [id]
    );
    return res
      .status(200)
      .json({ msg: `the user ${id} was deleted successfully` });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "user deletion error" });
  }
};
//------------------------------------------------------------------------------
