import { NextFunction, Request, Response } from 'express';
import i18next from 'i18next';
import { injectable } from 'tsyringe';

@injectable()
export class IndexController {
  /**
   * @swagger
   *
   * /:
   *   get:
   *     tags:
   *      - Health
   *     description: Check server status
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  public index = (_: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        status: 200,
        message: i18next.t('STATUS.OK'),
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default IndexController;
