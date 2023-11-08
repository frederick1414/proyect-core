import { Field, InputType } from 'type-graphql'

@InputType({
    description: 'para consultar service',
})
export class QueryServiceInput {
    @Field({ description: '', nullable: true, })
    service_id?: string

    @Field({ description: '', nullable: true, })
    BUSINESS_ID?: string

    @Field({ description: '', nullable: true, })
    EMPLOYEE_ID?: string

    @Field({ description: '', nullable: true, })
    ESTATUS?: string

    @Field({ description: '', nullable: true, })
    description?: string

    @Field({ description: '', nullable: true, })
    TIME?: number

    @Field({ description: '', nullable: true, })
    CREATED_DATE?: Date

    @Field({ description: '', nullable: true, })
    UPDATE_DATE?: Date

    @Field({ description: '', nullable: true, })
    CREATED_USER?:string
  
    @Field({ description: '', nullable: true, })
    UPDATED_USER?:string

    @Field({ description: '', nullable: true, })
    AMOUNT?: string
}
