import { optional, z } from "zod";
import { GenderType} from "../../generated/prisma/enums.ts";

//zod를 통해 검증할 input값에 대한 객체 모양 생성
export const createUserSchema= z.object({
    username: z.string().min(4),
    password: z.string().min(6),
    name: z.string().min(2),
    nickname: z.string().min(2).max(50),
    email: z.email(),
    phoneNumber: z.string().optional(),
    birthdate: z.iso.datetime().optional(),
    gender: z.enum(GenderType),
});

// 웨에서 만든 createUserSchema는 조건을 건 "객체:를 만드는 일이라, 앞으로 다른곳에서 사용할 타입을 만들어줘야함
export type CreateUserInputType = z.infer<typeof createUserSchema>;