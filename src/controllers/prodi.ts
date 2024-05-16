import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { NextFunction, Request, Response } from 'express';

const NAMESPACE = 'Prodi';

const getAllProdi = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all prodi.');

    let query = 'SELECT * FROM prodi';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((data) => {
                    logging.info(NAMESPACE, 'Retrieved prodi: ', data);

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

export default { getAllProdi };