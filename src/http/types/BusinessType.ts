import { Field, InputType } from 'type-graphql'
import { ACTIVE_GLOBAL } from '../../config/constants'

@InputType({
  description: 'json object for query business data',
})
export class BusinessQueryInput {
  @Field({
    nullable: true,
    description: '',
  })
  BUSINESS_ID: string

  @Field({
    nullable: true,
    description: '',
    defaultValue: ACTIVE_GLOBAL,
  })
  STATUS: string
}

@InputType({
  description: 'json object for register a business',
})
export class BusinessCreateInput {
  @Field({
    nullable: false,
    description: '',
  })
  BUSINESS_ID: string

  @Field({
    nullable: true,
    description: '',
  })
  BUSINESS_NAME: string

  @Field({
    nullable: true,
    description: '',
  })
  ACRONYM: string

  @Field({
    nullable: true,
    description: '',
  })
  ADDRESS: string

  @Field({
    nullable: true,
    description: '',
  })
  PHONE_1: string

  @Field({
    nullable: true,
    description: '',
  })
  PHONE_2: string

  @Field({
    nullable: true,
    description: '',
  })
  EMAIL_1: string

  @Field({
    nullable: true,
    description: '',
  })
  EMAIL_2: string

  @Field({
    nullable: true,
    description: '',
  })
  GENERIC_FIELD_1: string

  @Field({
    nullable: true,
    description: '',
  })
  GENERIC_FIELD_2: string

  @Field({
    nullable: true,
    description: '',
  })
  SLOGAN: string

  @Field({
    nullable: true,
    description: '',
    defaultValue: ACTIVE_GLOBAL,
  })
  STATUS: string
}

@InputType({
    description: 'json object for update business',
  })
  export class BusinessUpdateInput {
    @Field({
      nullable: false,
      description: '',
    })
    BUSINESS_ID: string
  
    @Field({
      nullable: true,
      description: '',
    })
    BUSINESS_NAME: string
  
    @Field({
      nullable: true,
      description: '',
    })
    ACRONYM: string
  
    @Field({
      nullable: true,
      description: '',
    })
    ADDRESS: string
  
    @Field({
      nullable: true,
      description: '',
    })
    PHONE_1: string
  
    @Field({
      nullable: true,
      description: '',
    })
    PHONE_2: string
  
    @Field({
      nullable: true,
      description: '',
    })
    EMAIL_1: string
  
    @Field({
      nullable: true,
      description: '',
    })
    EMAIL_2: string
  
    @Field({
      nullable: true,
      description: '',
    })
    GENERIC_FIELD_1: string
  
    @Field({
      nullable: true,
      description: '',
    })
    GENERIC_FIELD_2: string
  
    @Field({
      nullable: true,
      description: '',
    })
    SLOGAN: string
  
    @Field({
      nullable: true,
      description: '',
      defaultValue: ACTIVE_GLOBAL,
    })
    STATUS: string
  }
