import { Field, InputType } from 'type-graphql'

import { ACTIVE_GLOBAL } from '../../config/constants'

@InputType({
  description: '',
})
export class RegisterUserInput {
  @Field({
    nullable: true,
    description: '',
  })
  ROL_ID?: string

  @Field({
    nullable: true,
    description: '',
  })
  BUSINESS_ID?: string

  @Field({
    nullable: true,
    description: '',
  })
  EMPLOYEE_ID?: string

  @Field({
    nullable: false,
    description: '',
  })
  USERNAME?: string

  @Field({
    nullable: true,
    description: '',
  })
  EMAIL?: string

  @Field({
    nullable: false,
    description: '',
  })
  PASSWORD: string

  @Field({
    nullable: true,
    description: '',
    defaultValue: ACTIVE_GLOBAL,
  })
  STATUS: string

  
  @Field({
    nullable: true,
    description: '',
  })
  PHONE: string



}

@InputType({
  description: '',
})
export class UpdateUserInput {
  @Field({
    nullable: false,
    description: '',
  })
  USER_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  ROL_ID?: string

  @Field({
    nullable: true,
    description: '',
  })
  EMPLOYEE_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  USERNAME: string

  @Field({
    nullable: true,
    description: '',
  })
  EMAIL: string

  @Field({
    nullable: true,
    description: '',
  })
  PASSWORD: string

  @Field({
    nullable: true,
    description: '',
    defaultValue: ACTIVE_GLOBAL,
  })
  STATUS: string  


  @Field({
    nullable: true,
  })
  PHONE?: string  
}

@InputType({
  description: '',
})
export class QueryUserInput {
  @Field({
    description: '',
    nullable: true,
  })
  USER_ID?: string

  @Field({
    description: '',
    nullable: true,
  })
  BUSINESS_ID?: string

  @Field({
    description: '',
    nullable: true,
  })
  USERNAME?: string

  @Field({
    description: '',
    nullable: true,
  })
  ROL_ID?: string
}


@InputType({
  description: '',
})
export class QueryUsuarioInput {
  @Field({
    description: '',
    nullable: true,
  })
  ID_USUARIO?: string

}
