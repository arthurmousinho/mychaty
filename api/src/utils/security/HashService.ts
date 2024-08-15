import bcrypt from 'bcrypt';

export class HashService {

    hashPassword(password: string) {
        const SALT = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, SALT);
    }

    comparePassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }

}