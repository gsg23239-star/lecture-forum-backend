import { UserCreateInput } from "../generated/prisma/models/User.ts";
import prisma from "../config/prisma.ts";
import { Prisma } from "../generated/prisma/client.ts";

const createUser = async (data: UserCreateInput) => {
        try {
            return await prisma.user.create({
                data,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                // Prism error 객체 내부에서 code 항목 값이 "P2002"인 것이
                // 중복값이 있을 때의 에러코드임
                if(error.code === "P2002") {
                    const errorMessage = error.message;

                    // 예시. target = ["username", "nickname", "email"]
                    // array의 요소 중 "이 값"이 잇는지 확인하는 메서드는 .includes()
                    // .find()와 비슷한 역할이지만,
                    // .find는 조건을 걸어서 찾을 수 있는 메서드이고
                    // includes는 단순히 집어넣은 값과 완벽히 같은것이 있는지 true/false로 찾음
                    if (errorMessage.includes("username")) {
                        // 상위 함술로 던지는데,
                        // 새로운 자바스입트 표준 에러 객체를 만들어서 던짐
                        // 내용에 "ALREADY_EXIST_USERNAME"이라고 담아서
                        throw new Error("ALREADY_EXISTS_USERNAME");
                    }
                    if (errorMessage.includes("email")) {
                        throw new Error("ALREADY_EXISTS_EMAIL");
                    }
                    if (errorMessage.includes("nickname")) {
                        throw new Error("ALREADY_EXISTS_NICKNAME");
                    }
                    throw new Error("UNKNOWN_ERROR");
                }
            }

            throw new Error("UNKNOWN_ERROR");
        }
};

export default {
    createUser,
};
     