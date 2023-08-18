import { Field, InputType } from 'type-graphql'

@InputType({
  description: 'para consultar Turns',
})
export class QueryTurnsInput {
  @Field({
    nullable: true,
  })
  TURN_ID: string

  @Field({
    nullable: true,
  })
  EMPLOYEE_ID: string

  @Field({
    nullable: true,
  })
  USER_ID: string

  @Field({
    nullable: true,
  })
  SERVICE_ID: string

  @Field({
    nullable: true,
  })
  ESTATUS: string

  @Field({
    nullable: true,
  })
  TIME: Date

  @Field({
    nullable: true,
  })
  PHONE: string

  @Field({
    nullable: true,
  })
  CREATE_DATE: Date

  @Field({
    nullable: true,
  })
  UPDATE_DATE: Date

  @Field({
    nullable: true,
  })
  BUSINESS_ID: Date

  @Field({
    nullable: true,
  })
  WAITING_TIME?: number

}
