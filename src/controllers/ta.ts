import logging from "../config/logging";
import { Connect, Query } from "../config/mysql";
import { NextFunction, Request, Response } from "express";

const NAMESPACE = "TA";

const getAllTA = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting all TA.");

  let query =
    "SELECT ta.id, mhs.nim, ta.tanggal, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim";

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

const getTAById = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting TA by id.");

  const { id } = req.params;

  let query = `SELECT ta.id, mhs.nim, ta.tanggal, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim WHERE id = '${id}'`;

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

const getTAByNIM = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Getting TA by NIM.");

  const { nim } = req.params;

  let query = `SELECT ta.id, mhs.nim, ta.tanggal, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim WHERE mhs.nim LIKE '%${nim}%'`;

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

const getTAByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting TA by category.");

  const { category } = req.params;

  let query = `SELECT ta.id, mhs.nim, ta.tanggal, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim WHERE kategori = "${category}"`;

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

const getTAByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting TA by status.");

  const { status } = req.params;

  let query = `SELECT ta.id, mhs.nim, ta.tanggal, mhs.nama, ta.judul as judul_ta, ta.kategori, ta.pembimbing_1, ta.pembimbing_2, ta.penguji_1, ta.penguji_2, ta.status FROM ta JOIN mahasiswa mhs ON ta.nim = mhs.nim WHERE status = "${status}"`;

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

const postTA = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Inserting TA.");

  let {
    nim,
    judul_ta,
    kategori,
    pembimbing_1,
    pembimbing_2,
    penguji_1,
    penguji_2,
    status,
    tanggal,
    berkas
  } = req.body;

  let query = `INSERT INTO ta (nim, judul, kategori, pembimbing_1, pembimbing_2, penguji_1, penguji_2, status, tanggal, berkas) VALUES ("${nim}", "${judul_ta}", "${kategori}", "${pembimbing_1}", "${pembimbing_2}", "${penguji_1}", "${penguji_2}", "${status}", "${tanggal}", "${berkas}" )`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Inserted TA: ", data);

          return res.status(201).json({
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

const putTA = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Updating TA.");

  let {
    id,
    judul_ta,
    kategori,
    pembimbing_1,
    pembimbing_2,
    penguji_1,
    penguji_2,
    status,
  } = req.body;

  let query = `UPDATE ta SET judul = "${judul_ta}", kategori = "${kategori}", pembimbing_1 = "${pembimbing_1}", pembimbing_2 = "${pembimbing_2}", penguji_1 = "${penguji_1}", penguji_2 = "${penguji_2}", status = "${status}" WHERE id = ${id}`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Updated TA: ", data);

          return res.status(201).json({
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

const deleteTA = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Deleting TA.");

  const { id } = req.body;

  let query = `DELETE FROM ta WHERE id = ${id}`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          logging.info(NAMESPACE, "Deleted TA: ", data);

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

export default {
  getAllTA,
  getTAById,
  getTAByNIM,
  getTAByCategory,
  getTAByStatus,
  postTA,
  putTA,
  deleteTA,
};
