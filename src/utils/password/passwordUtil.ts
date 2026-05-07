import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// 암호화를 하는 함수
const hashPassword = async (password: string) => {
    return bcrypt.hash(password, SALT_ROUNDS);
}

// 암호화한 값을 검증하는 함수
const verifyPassword = (plainPassword: string, hashPassword: string) => {
    // bcrypt.compare(비교할인텍스트, 비교할암호화된텍스트) : 비동기함수, 두개이 값을 비교해서 boolean을 리턴
    return bcrypt.compare(plainPassword, hashPassword);
}

export default {
    hashPassword,
    verifyPassword,
};