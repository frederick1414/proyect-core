import { Field, InputType } from 'type-graphql';

@InputType()
export class QueryRolInput {
    @Field({ nullable: true })
    BUSINESS_ID?: string;

    @Field({ nullable: true })
    NAME?: string;

    @Field({ nullable: true })
    NOTES?: string;

    @Field({ nullable: true })
    ESTATUS?: string;

    @Field({ nullable: true })
    CREATED_DATE?: Date;

    @Field({ nullable: true })
    CREATED_USER?: string;

    @Field({ nullable: true })
    UPDATED_DATE?: Date;

    @Field({ nullable: true })
    UPDATED_USER?: string;
}
