import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import { NextFunction, Request, Response } from "express";

const NAMESPACE = "Tugas Akhir";

const getAllTA = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting all TA.");

  let query =
    "SELECT mhs.nim, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.berkas, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Retrieved TA: ", data);

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

export default { getAllTA };
