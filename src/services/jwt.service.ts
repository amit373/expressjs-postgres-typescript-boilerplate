import { config } from '@app/config';
import { decode, JwtPayload, sign, verify } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class JwtService {
  verifyToken = async (token: string): Promise<string | JwtPayload> => {
    const decoded = await verify(token, config.JWT.JWT_SECRET);
    return decoded;
  };

  decodeToken = (token: string): string | JwtPayload => {
    const decodedToken = decode(token);
    return decodedToken;
  };

  signToken = (id: string): string => {
    const token = sign({ id }, config.JWT.JWT_SECRET, {
      expiresIn: config.JWT.EXPIRES_IN,
      algorithm: 'RS256',
    });

    return token;
  };
}
