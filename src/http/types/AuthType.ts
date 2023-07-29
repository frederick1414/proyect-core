import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../../entity/User";

@InputType({ description: "Login input" })
export class LoginInput {
  @Field(() => String, { description: "", nullable: false })
  USERNAME: string;

  @Field(() => String, { description: "", nullable: false })
  PASSWORD: string;
}

@ObjectType({ description: "session object type" })
export class SessionCookie {
  @Field(() => String, { description: "", nullable: true })
  token: string;

  @Field(() => String, { description: "", nullable: true })
  expiration: string;
}

@ObjectType({ description: "type sesion" })
export class SesionData {
  @Field(() => SessionCookie, { nullable: true })
  sessionCookie: SessionCookie;

  @Field(() => User)
  data: User;
}