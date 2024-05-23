import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import { NextFunction, Request, Response } from "express";

const NAMESPACE = "Dosen";

const getAllDosen = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting all dosen.");

  let query = "SELECT * FROM dosen";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Retrieved dosen: ", data);

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

const getDosenByNIP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting dosen by NIP.");

  const { nip } = req.params;
  let query = `SELECT * FROM dosen WHERE nip LIKE '%${nip}%'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data: any) => {
          if (data.length === 0) {
            logging.info(NAMESPACE, `No dosen found with NIP = ${nip}`);
            return res.status(404).json({
              message: `No dosen found with NIP = ${nip}`,
            });
          }

          logging.info(NAMESPACE, `Retrieved dosen with NIP = ${nip}`, data);

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

const getDosenByGender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting dosen by gender.");

  const { gender } = req.params;
  let query = `SELECT * FROM dosen WHERE jenis_kelamin LIKE '%${gender}%'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data: any) => {
          if (data.length === 0) {
            logging.info(NAMESPACE, `No dosen found with gender ${gender}`);
            return res.status(404).json({
              message: `No dosen found with gender ${gender}`,
            });
          }

          logging.info(
            NAMESPACE,
            `Retrieved dosen with gender ${gender}`,
            data
          );

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

const postDosen = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Inserting dosen");

  let { nip, nama, jenis_kelamin, keahlian, kuota } = req.body;

  let query = `INSERT INTO dosen (nip, nama, jenis_kelamin, keahlian, kuota) VALUES ("${nip}", "${nama}", "${jenis_kelamin}", "${keahlian}", "${kuota}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Dosen created: ", result);

          return res.status(201).json({
            result,
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

const putDosen = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Updating dosen");

  let { nip, nama, jenis_kelamin, keahlian, kuota } = req.body;

  let query = `UPDATE dosen SET nama = "${nama}", jenis_kelamin = "${jenis_kelamin}", keahlian = "${keahlian}", kuota = "${kuota}" WHERE nip = "${nip}"`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Dosen updated: ", result);

          return res.status(201).json({
            result,
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

const deleteDosen = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Deleting dosen");

  let { nip } = req.body;

  let query = `DELETE FROM dosen WHERE nip = "${nip}"`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Dosen deleted: ", result);

          return res.status(200).json({
            result,
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

export default {
  getAllDosen,
  getDosenByNIP,
  getDosenByGender,
  postDosen,
  putDosen,
  deleteDosen,
};
