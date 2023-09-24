import { Field, InputType, ObjectType } from "type-graphql"

@InputType({
    description: 'para consultar service',
})
export class QueryEmployeesInput {
    @Field({
        nullable: true,
    })
    BUSINESS_ID?: string


    @Field({
        nullable: true,
    })
    EMPLOYEE_ID?: string

    @Field({
        nullable: true,
    })
    LAST_NAME?: string


    @Field({
        nullable: true,
    })
    BIRTHDATE?: string


    @Field({
        nullable: true,
    })
    HIREDATE?: string


    @Field({
        nullable: true,
    })
    ADDRESS?: string

    @Field({
        nullable: true,
    })
    CITY?: string

    @Field({
        nullable: true,
    })
    PHONE_NUMBER?: string

    @Field({
        nullable: true,
    })
    EMAIL?: string

    @Field({
        nullable: true,
    })
    POSITION_ID?: string


    @Field({
        nullable: true,
    })
    ESTATUS?: string

    @Field({
        nullable: true,
    })
    CREATED_DATE?: Date

    @Field({
        nullable: true,
    })
    UPDATED_DATE?: Date
}



@InputType({
    description: 'para consultar service',
})
export class UpdateEmployeesInput extends QueryEmployeesInput {
    @Field({
        nullable: true,
    })
    FIRST_NAME?: string


    @Field({
        nullable: true,
    })
    WAITING_TIME?: number

    @Field({
        nullable: true,
    })
    USERNAME?:string
}


@ObjectType({
    description:'',
})
export class responseEmployees  {
    @Field({
        nullable: true,
    })
    ok?: string
}