import { Field, InputType } from 'type-graphql';

@InputType()
export class QueryClientInput {
    @Field({ nullable: true })
    CLIENT_ID?: string;

    @Field({ nullable: true })
    BUSINESS_ID?: string;

    @Field({ nullable: true })
    EMPLOYEE_ID?: string;

    @Field({ nullable: true })
    USERNAME?: string;

    @Field({ nullable: true })
    ESTATUS?: string;

    @Field({ nullable: true })
    PHONE?: string;

    @Field({ nullable: true })
    CREATED_DATE?: Date;

    @Field({ nullable: true })
    CREATED_USER?: string;

    @Field({ nullable: true })
    UPDATED_DATE?: Date;

    @Field({ nullable: true })
    UPDATED_USER?: string;
}
