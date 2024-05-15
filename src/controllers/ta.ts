import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Mahasiswa';

const getDetailTA = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all TA.');

    let query = 'SELECT m.nim, m.nama, t.judul as judul_ta, t.kategori, t.pembimbing_1, t.pembimbing_2, t.penguji_1, t.penguji_2, t.berkas, t.status FROM ta t JOIN mahasiswa m ON t.nim = m.nim';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((data) => {
                    logging.info(NAMESPACE, 'Retrieved TA: ', data);

                    return res.status(200).json({
                        data
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { getDetailTA };