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

  let query = "SELECT * FROM mahasiswa";

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

const getMahasiswaByNIM = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting mahasiswa by NIM.");

  const { nim } = req.params;
  let query = `SELECT * FROM mahasiswa WHERE nim LIKE '%${nim}%'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data: any) => {
          if (data.length === 0) {
            logging.info(NAMESPACE, `No mahasiswa found with NIM = ${nim}`);
            return res.status(404).json({
              message: `No mahasiswa found with NIM = ${nim}`,
            });
          }

          logging.info(
            NAMESPACE,
            `Retrieved mahasiswa with NIM = ${nim}`,
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

const getMahasiswaByGender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting mahasiswa by gender.");

  const { gender } = req.params;
  let query = `SELECT * FROM mahasiswa WHERE jenis_kelamin LIKE '%${gender}%'`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data: any) => {
          if (data.length === 0) {
            logging.info(NAMESPACE, `No mahasiswa found with gender ${gender}`);
            return res.status(404).json({
              message: `No mahasiswa found with gender ${gender}`,
            });
          }

          logging.info(
            NAMESPACE,
            `Retrieved mahasiswa with gender ${gender}`,
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

const postMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Inserting mahasiswa");

  let { nim, nama, jenis_kelamin } = req.body;

  let query = `INSERT INTO mahasiswa (nim, nama, jenis_kelamin) VALUES ("${nim}", "${nama}", "${jenis_kelamin}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Mahasiswa created: ", result);

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

const putMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Updating mahasiswa");

  let { nim, nama, jenis_kelamin } = req.body;

  let query = `UPDATE mahasiswa SET nama = "${nama}", jenis_kelamin = "${jenis_kelamin}" WHERE nim = "${nim}"`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Mahasiswa updated: ", result);

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

const deleteMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Deleting mahasiswa");

  let { nim } = req.body;

  let query = `DELETE FROM mahasiswa WHERE nim = "${nim}"`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(NAMESPACE, "Mahasiswa deleted: ", result);

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
  getAllMahasiswa,
  getMahasiswaByNIM,
  getMahasiswaByGender,
  postMahasiswa,
  putMahasiswa,
  deleteMahasiswa,
};
