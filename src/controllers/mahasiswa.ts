import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import { NextFunction, Request, Response } from "express";

const NAMESPACE = "Mahasiswa";

const getAllMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting all mahasiswa.");

  let query =
    "SELECT nim, mhs.nama, alamat, tgl_lahir, prodi.nama as prodi FROM mahasiswa mhs JOIN prodi ON mhs.kode_prodi = prodi.kode";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Retrieved mahasiswa: ", data);

          return res.status(200).json({
            data,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, "Closing connection.");
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

export default { getAllMahasiswa };
