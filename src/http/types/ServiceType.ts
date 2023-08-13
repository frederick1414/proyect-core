import { Field, InputType } from 'type-graphql'

@InputType({
    description: 'para consultar service',
})
export class QueryServiceInput {
    @Field({
        description: '',
        nullable: true,
    })
    service_id?: string


    @Field({
        description: '',
        nullable: true,
    })
    BUSINESS_ID?: string


    @Field({
        description: '',
        nullable: true,
    })
    EMPLOYEE_ID?: string


    @Field({
        description: '',
        nullable: true,
    })
    ESTATUS?: string


}
