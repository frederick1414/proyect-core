import { Field, InputType, ObjectType } from 'type-graphql'

import { Turns } from '../../entity/TurnsEntity'

@InputType({
  description: 'para consultar Turns',
})
export class serviceArray {

  @Field({
    nullable: true,
  })
  SERVICE_ID?: string

}


@InputType({
  description: 'para consultar Turns',
})
export class QueryTurnsInputInsert {
  @Field({
    nullable: true,
  })
  TURN_ID?: string

  @Field({
    nullable: true,
  })
  TYPE_TRANS?: string

  @Field({
    nullable: true,
  })
  EMPLOYEE_ID?: string

  @Field({
    nullable: true,
  })
  USER_ID?: string

  @Field({
    nullable: true,
  })
  SERVICE_ID?: string

  @Field(() => [serviceArray], { nullable: true })
  SERVICES?: serviceArray[]

  @Field({
    nullable: true,
  })
  ESTATUS?: string

  @Field({
    nullable: true,
  })
  TIME?: Date

  @Field({
    nullable: true,
  })
  TIME_INIT?: Date
  
  @Field({
    nullable: true,
  })
  PHONE?: string

  @Field({
    nullable: true,
  })
  CREATE_DATE?: Date

  @Field({
    nullable: true,
  })
  UPDATE_DATE?: Date

  @Field({
    nullable: true,
  })
  BUSINESS_ID?: string

  @Field({
    nullable: true,
  })
  WAITING_TIME?: number


  @Field({
    nullable: true,
  })
  USERNAME?: string


  @Field({
    nullable: true,
  })
  UPDATED_USER?: string


  @Field({
    nullable: true,
  })
  AMOUNT?: number

}


@InputType({
  description: 'para consultar Turns',
})
export class QueryTurnsInput {
  @Field({
    nullable: true,
  })
  TURN_ID?: string

  @Field({
    nullable: true,
  })
  TYPE_TRANS?: string

  @Field({
    nullable: true,
  })
  EMPLOYEE_ID?: string

  @Field({
    nullable: true,
  })
  SERVICE_ID?: string

  @Field({
    nullable: true,
  })
  USER_ID?: string

  @Field(() => [serviceArray], { nullable: true })
  SERVICES?: serviceArray[]
  
  @Field({
    nullable: true,
  })
  ESTATUS?: string

  @Field({
    nullable: true,
  })
  TIME?: Date

  @Field({
    nullable: true,
  })
  PHONE?: string

  @Field({
    nullable: true,
  })
  CREATE_DATE?: Date

  @Field({
    nullable: true,
  })
  UPDATE_DATE?: Date

  @Field({
    nullable: true,
  })
  BUSINESS_ID?: string

  @Field({
    nullable: true,
  })
  WAITING_TIME?: number


  @Field({
    nullable: true,
  })
  USERNAME?: string


  @Field({
    nullable: true,
  })
  UPDATED_USER?: string


  @Field({
    nullable: true,
  })
  AMOUNT?: number

}


@InputType({
  description: 'para Insertar Turns',
})
export class InserTurnsInput extends QueryTurnsInput {

  @Field({
    nullable: false,
  })
  WAITING_TIME: number


}


@InputType({
  description: 'para Consultar Range Turns',
})
export class QueryTurnsRangeInput extends QueryTurnsInput {

  @Field({
    nullable: true,
  })
  FECHA_DESDE?: Date

  @Field({
    nullable: true,
  })
  FECHA_HASTA?: Date
}


@ObjectType({
  description: 'para Consultar Range Turns',
})
export class reponse extends Turns {

  @Field({
    nullable: true,
  })
  ok?: boolean

}



@ObjectType({
  description: 'para update Turns',
})
export class UpdateTurnsResponse {
  @Field({
    nullable: true,
  })
  TURN_ID?: string

  @Field({
    nullable: true,
  })
  EMPLOYEE_ID?: string

  @Field({
    nullable: true,
  })
  USER_ID?: string

  @Field({
    nullable: true,
  })
  SERVICE_ID?: string

  @Field({
    nullable: true,
  })
  ESTATUS?: string

  @Field({
    nullable: true,
  })
  TIME?: Date

  @Field({
    nullable: true,
  })
  TIMETWO?: Date

  @Field({
    nullable: true,
  })
  PHONE?: string

  @Field({
    nullable: true,
  })
  CREATE_DATE?: Date

  @Field({
    nullable: true,
  })
  UPDATE_DATE?: Date

  @Field({
    nullable: true,
  })
  BUSINESS_ID?: string

  @Field({
    nullable: true,
  })
  WAITING_TIME?: number


  @Field({
    nullable: true,
  })
  USERNAME?: string


  @Field({
    nullable: true,
  })
  UPDATED_USER?: string

}

@ObjectType({
  description: 'para update Turns',
})
export class GetMaxTurnResponse {

  @Field({
    nullable: true,
  })
  SECUENCIA?: string
}
